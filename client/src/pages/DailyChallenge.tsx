/* אתגר יומי — שאלות אחידות לכולם, מתחלפות בחצות */

import { useState, useEffect, useMemo } from "react";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { IMAGES } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { getDailyQuestions, getTodayKeyFromDayIndex, toHebrewDate } from "@/lib/dailyUtils";
import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle, XCircle, Trophy, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DailyChallenge() {
  const [, navigate] = useLocation();
  const { student } = useStudent();

  const questions = useMemo(() => getDailyQuestions(), []);
  const todayDayKey = getTodayKeyFromDayIndex();
  const lsKey = `pesach_daily_${student?.id || "guest"}_${todayDayKey}`;
  const streakKey = `pesach_streak_${student?.id || "guest"}`;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [dbHistory, setDbHistory] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(lsKey);
      if (saved) { const d = JSON.parse(saved); setAnswers(d.answers||{}); setRevealed(true); }
      setStreak(parseInt(localStorage.getItem(streakKey) || "0"));
    } catch {}
    if (student?.id) {
      supabase.from("scores").select("correct_answers, total_questions, created_at")
        .eq("student_id", student.id).eq("stage_title", "אתגר יומי")
        .order("created_at", { ascending: false }).limit(30)
        .then(({ data }) => setDbHistory(data || []));
    }
  }, [student?.id, lsKey, streakKey]);

  const handleReveal = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error(`ענה על כל ${questions.length} השאלות`); return;
    }
    if (!student) { navigate("/register"); return; }
    const correct = questions.filter((q: any) =>
      q.options.find((o: any) => o.key === answers[q.id])?.correct
    ).length;
    setRevealed(true);
    localStorage.setItem(lsKey, JSON.stringify({ answers, correct, total: questions.length }));
    const lastKey = `pesach_streak_last_${student.id}`;
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yDayKey = `day_${Math.floor((yesterday.getTime() + 2*3600000) / 86400000)}`;
    const lastPlayed = localStorage.getItem(lastKey);
    const newStreak = lastPlayed === yDayKey ? streak + 1 : 1;
    localStorage.setItem(streakKey, String(newStreak));
    localStorage.setItem(lastKey, todayDayKey);
    setStreak(newStreak);
    setSaving(true);
    try {
      await supabase.from("scores").insert({
        student_id: student.id, quiz_id: "daily",
        score: Math.round((correct / questions.length) * 100),
        total_questions: questions.length, correct_answers: correct,
        stage_title: "אתגר יומי",
      });
      const { data } = await supabase.from("scores").select("correct_answers, total_questions, created_at")
        .eq("student_id", student.id).eq("stage_title", "אתגר יומי")
        .order("created_at", { ascending: false }).limit(30);
      setDbHistory(data || []);
    } catch(e) { console.error(e); }
    setSaving(false);
    if (correct === questions.length) toast.success("מושלם! 🏆");
    else if (correct >= 2) toast.success(`${correct}/3 נכון 🌟`);
    else toast.error(`${correct}/3 נכון`);
  };

  const correctCount = revealed
    ? questions.filter((q: any) => q.options.find((o: any) => o.key === answers[q.id])?.correct).length : 0;
  const totalCorrectAll = dbHistory.reduce((a, s) => a + (s.correct_answers || 0), 0);

  return (
    <div className="min-h-screen bg-[#0c1a33]" dir="rtl">
      <div className="relative h-44 overflow-hidden">
        <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a33]/60 to-[#0c1a33]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl text-white mb-1 flex items-center gap-3 justify-center">
              <Zap className="h-8 w-8 text-gold-400" />אתגר יומי
            </h1>
            <p className="text-gold-400 text-sm">{toHebrewDate(new Date())}</p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 -mt-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/materials")}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />חזרה
          </button>
          <div className="flex items-center gap-3">
            {totalCorrectAll > 0 && (
              <div className="flex items-center gap-2 bg-gold-500/10 border border-gold-400/20 rounded-xl px-3 py-2">
                <Trophy className="h-4 w-4 text-gold-400" />
                <span className="text-gold-400 font-bold text-sm">{totalCorrectAll} נכון סה״כ</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-[#12243f] border border-royal-400/10 rounded-xl px-3 py-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-white font-bold text-sm">{streak}</span>
              <span className="text-gray-500 text-xs">ימים</span>
            </div>
          </div>
        </div>

        <div className="space-y-5 mb-6">
          {questions.map((q: any, qi: number) => (
            <motion.div key={qi} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.1 }}
              className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 text-sm font-bold flex items-center justify-center">{qi + 1}</span>
                <span className="text-gray-500 text-xs">{q.chapter}</span>
                {revealed && (
                  q.options.find((o: any) => o.key === answers[q.id])?.correct
                    ? <span className="text-green-400 text-xs flex items-center gap-1 mr-auto"><CheckCircle className="h-3.5 w-3.5" />נכון</span>
                    : <span className="text-red-400 text-xs flex items-center gap-1 mr-auto"><XCircle className="h-3.5 w-3.5" />לא נכון</span>
                )}
              </div>
              <p className="text-white font-bold text-lg mb-4 leading-relaxed">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt: any) => {
                  const isSelected = answers[q.id] === opt.key;
                  const isCorrect = opt.correct;
                  let cls = "border-[#1a2f50] bg-[#0c1a33] text-gray-300 hover:border-gold-500/30";
                  if (revealed) {
                    if (isCorrect) cls = "border-green-500 bg-green-900/20 text-white";
                    else if (isSelected) cls = "border-red-500 bg-red-900/20 text-gray-400";
                    else cls = "border-[#1a2f50] bg-[#0c1a33] text-gray-600 opacity-40";
                  } else if (isSelected) cls = "border-gold-500 bg-gold-500/10 text-white";

                  return (
                    <button key={opt.key} disabled={revealed}
                      onClick={() => !revealed && setAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                      className={`w-full text-right p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${cls}`}>
                      <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                        revealed && isCorrect ? "bg-green-500 text-white" :
                        revealed && isSelected ? "bg-red-500 text-white" :
                        isSelected ? "bg-gold-500 text-[#0c1a33]" : "bg-[#1a2f50] text-gray-500"
                      }`}>
                        {revealed && isCorrect ? <CheckCircle className="h-3.5 w-3.5" /> :
                         revealed && isSelected && !isCorrect ? <XCircle className="h-3.5 w-3.5" /> : opt.key}
                      </span>
                      <span className="text-sm leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {!revealed ? (
          <Button onClick={handleReveal}
            disabled={Object.keys(answers).length < questions.length || saving}
            className="w-full bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-14 text-lg disabled:opacity-40 mb-6">
            {Object.keys(answers).length < questions.length
              ? `ענה על עוד ${questions.length - Object.keys(answers).length} שאלות`
              : saving ? "שומר..." : "גלה תשובות"}
          </Button>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-6 text-center mb-6 ${
              correctCount === 3 ? "bg-gold-500/10 border border-gold-400/30" :
              correctCount >= 2 ? "bg-green-900/20 border border-green-500/30" :
              "bg-red-900/20 border border-red-500/30"}`}>
            <div className="text-4xl mb-2">{correctCount === 3 ? "🏆" : correctCount >= 2 ? "🌟" : "💪"}</div>
            <p className="text-white font-bold text-2xl">{correctCount}/{questions.length} נכון</p>
            {streak > 1 && <p className="text-orange-400 text-sm mt-1">🔥 רצף {streak} ימים!</p>}
            <p className="text-gray-500 text-xs mt-2">שאלות חדשות בחצות הלילה!</p>
          </motion.div>
        )}

        {dbHistory.length > 0 && (
          <div className="bg-[#12243f] border border-royal-400/10 rounded-2xl p-5">
            <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold-400" />
              היסטוריה — סה״כ {totalCorrectAll} נכון
            </h3>
            <div className="space-y-2">
              {dbHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-[#0c1a33] rounded-xl px-4 py-3">
                  <span className="text-gray-400 text-sm">{toHebrewDate(new Date(h.created_at))}</span>
                  <span className={`font-bold text-sm ${
                    h.correct_answers === h.total_questions ? "text-gold-400" :
                    h.correct_answers >= 2 ? "text-green-400" : "text-red-400"}`}>
                    {h.correct_answers}/{h.total_questions} ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
