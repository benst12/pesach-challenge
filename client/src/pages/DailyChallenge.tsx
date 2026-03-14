/* אתגר יומי */

import { useState, useEffect, useMemo } from "react";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { IMAGES } from "@/lib/data";
import { getQuestionsForTrack, TRACKS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, CheckCircle, XCircle, Trophy, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function getDailyQuestion(trackId: string) {
  const all = getQuestionsForTrack(trackId, 999);
  if (!all.length) return null;
  // בחר שאלה לפי תאריך
  const d = new Date();
  const dayIndex = d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
  const q = all[dayIndex % all.length];
  const keys = ["A","B","C","D"];
  const shuffled = [...q.options].sort(() => {
    const seed = dayIndex + q.id;
    return (seed % 3) - 1;
  });
  return {
    ...q,
    options: shuffled.map((o, i) => ({ ...o, key: keys[i] })),
  };
}

export default function DailyChallenge() {
  const [, navigate] = useLocation();
  const { student, selectedTrack } = useStudent();
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [previousAnswer, setPreviousAnswer] = useState<{ key: string; correct: boolean } | null>(null);

  const track = selectedTrack || TRACKS.find(t => t.id === student?.trackId);
  const question = useMemo(() => track ? getDailyQuestion(track.id) : null, [track]);
  const todayKey = getTodayKey();
  const storageKey = `pesach_daily_${student?.id}_${todayKey}`;

  useEffect(() => {
    // בדוק אם כבר ענה היום
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      setAlreadyDone(true);
      setPreviousAnswer(data);
      setRevealed(true);
      setSelected(data.key);
    }
    // טען streak
    const streakKey = `pesach_streak_${student?.id}`;
    const s = parseInt(localStorage.getItem(streakKey) || "0");
    setStreak(s);
  }, [storageKey, student?.id]);

  if (!student) { navigate("/register"); return null; }
  if (!question || !track) {
    return (
      <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center">
        <p className="text-gray-400">לא נמצאה שאלה. בחר/י מסלול תחילה.</p>
      </div>
    );
  }

  const handleAnswer = (key: string) => {
    if (revealed) return;
    setSelected(key);
  };

  const handleReveal = () => {
    if (!selected) { toast.error("בחר/י תשובה תחילה"); return; }
    const correctOpt = question.options.find(o => o.correct);
    const isCorrect = question.options.find(o => o.key === selected)?.correct ?? false;
    setRevealed(true);

    // שמור ב-localStorage
    const answerData = { key: selected, correct: isCorrect };
    localStorage.setItem(storageKey, JSON.stringify(answerData));

    // עדכן streak
    const streakKey = `pesach_streak_${student.id}`;
    const lastKey = `pesach_streak_last_${student.id}`;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`;
    const lastPlayed = localStorage.getItem(lastKey);
    let newStreak = isCorrect ? (lastPlayed === yesterdayKey ? streak + 1 : 1) : streak;
    localStorage.setItem(streakKey, String(newStreak));
    localStorage.setItem(lastKey, todayKey);
    setStreak(newStreak);

    // שמור בסופאבייס
    if (student.id && isCorrect) {
      supabase.from("scores").insert({
        student_id: student.id,
        quiz_id: track.id,
        score: 100,
        total_questions: 1,
        correct_answers: 1,
        stage_title: "אתגר יומי",
      }).catch(() => {});
    }

    if (isCorrect) {
      toast.success(`נכון! 🎉 ${newStreak > 1 ? `רצף ${newStreak} ימים!` : ""}`);
    } else {
      toast.error(`לא נכון. התשובה הנכונה: ${correctOpt?.text}`);
    }
  };

  const correctOpt = question.options.find(o => o.correct);
  const userOpt = question.options.find(o => o.key === selected);
  const isCorrect = userOpt?.correct ?? false;

  const today = new Date();
  const dateStr = today.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="min-h-screen bg-[#0c1a33]" dir="rtl">
      {/* Header */}
      <div className="relative h-44 overflow-hidden">
        <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a33]/60 to-[#0c1a33]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl text-white mb-1 flex items-center gap-3 justify-center">
              <Zap className="h-8 w-8 text-gold-400" />
              אתגר יומי
            </h1>
            <p className="text-gold-400 text-sm">{dateStr}</p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 -mt-4 relative z-10">
        <button onClick={() => navigate("/materials")}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8 group">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          חזרה
        </button>

        {/* רצף */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 bg-[#12243f] border border-royal-400/10 rounded-xl px-4 py-3">
            <Flame className="h-5 w-5 text-orange-400" />
            <div>
              <p className="text-white font-bold text-lg leading-none">{streak}</p>
              <p className="text-gray-500 text-xs">ימים ברצף</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#12243f] border border-royal-400/10 rounded-xl px-4 py-3">
            <Calendar className="h-4 w-4 text-gold-400" />
            <span className="text-gray-400 text-sm">שאלה של היום</span>
          </div>
        </div>

        {/* שאלה */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium">
              {question.chapter}
            </span>
            {alreadyDone && (
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">
                ענית היום
              </span>
            )}
          </div>

          <h2 className="text-xl text-white font-bold leading-relaxed mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = selected === opt.key;
              const isCorrectOpt = opt.correct;

              let cls = "border-[#1a2f50] bg-[#0c1a33] text-gray-300 hover:border-gold-500/30 hover:bg-[#0f2040]";
              if (revealed) {
                if (isCorrectOpt) cls = "border-green-500 bg-green-900/20 text-white";
                else if (isSelected && !isCorrectOpt) cls = "border-red-500 bg-red-900/20 text-white";
                else cls = "border-[#1a2f50] bg-[#0c1a33] text-gray-500 opacity-60";
              } else if (isSelected) {
                cls = "border-gold-500 bg-gold-500/10 text-white";
              }

              return (
                <motion.button key={opt.key}
                  onClick={() => handleAnswer(opt.key)}
                  whileTap={!revealed ? { scale: 0.98 } : {}}
                  disabled={revealed}
                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${cls}`}>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    revealed && isCorrectOpt ? "bg-green-500 text-white" :
                    revealed && isSelected && !isCorrectOpt ? "bg-red-500 text-white" :
                    isSelected ? "bg-gold-500 text-[#0c1a33]" : "bg-[#1a2f50] text-gray-500"
                  }`}>
                    {revealed && isCorrectOpt ? <CheckCircle className="h-4 w-4" /> :
                     revealed && isSelected && !isCorrectOpt ? <XCircle className="h-4 w-4" /> :
                     opt.key}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </motion.button>
              );
            })}
          </div>

          {!revealed && (
            <Button onClick={handleReveal} disabled={!selected}
              className="w-full mt-5 bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-12 disabled:opacity-40">
              גלה תשובה
            </Button>
          )}
        </motion.div>

        {/* תוצאה */}
        <AnimatePresence>
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`rounded-2xl p-6 text-center mb-6 ${isCorrect ? "bg-green-900/20 border border-green-500/30" : "bg-red-900/20 border border-red-500/30"}`}>
              {isCorrect ? (
                <>
                  <Trophy className="h-10 w-10 text-gold-400 mx-auto mb-3" />
                  <p className="text-white font-bold text-xl mb-1">נכון! 🎉</p>
                  {streak > 1 && <p className="text-gold-400 text-sm">רצף של {streak} ימים! 🔥</p>}
                </>
              ) : (
                <>
                  <XCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
                  <p className="text-white font-bold text-xl mb-1">לא נכון</p>
                  <p className="text-green-400 text-sm">התשובה הנכונה: {correctOpt?.text}</p>
                </>
              )}
              <p className="text-gray-500 text-xs mt-3">שאלה חדשה מחר!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={() => navigate("/materials")} variant="outline"
          className="w-full border-gold-400/20 text-gold-400 hover:bg-gold-400/10">
          חזרה לחומר הלימוד
        </Button>
      </div>
    </div>
  );
}
