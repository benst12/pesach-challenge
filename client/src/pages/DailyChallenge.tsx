/* אתגר יומי — 3 שאלות, שמירת תשובות, היסטוריה */

import { useState, useEffect, useMemo } from "react";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { IMAGES, TRACKS, getQuestionsForTrack } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, CheckCircle, XCircle, Trophy, Calendar, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEYS = ["א","ב","ג","ד"];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function getDailyQuestions(trackId: string, count = 3) {
  const all = getQuestionsForTrack(trackId, 999);
  if (!all.length) return [];
  const d = new Date();
  const dayIdx = d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
  return Array.from({ length: count }, (_, offset) => {
    const q = all[(dayIdx + offset * 37) % all.length];
    if (!q) return null;
    const shuffled = [...q.options].sort((a, b) => ((dayIdx + offset + a.text.length) % 2) - 0.5);
    return { ...q, options: shuffled.map((o, i) => ({ ...o, key: KEYS[i] })) };
  }).filter(Boolean) as any[];
}

export default function DailyChallenge() {
  const [, navigate] = useLocation();
  const { student, selectedTrack } = useStudent();
  const track = selectedTrack || TRACKS.find(t => t.id === student?.trackId) || TRACKS[0];
  const questions = useMemo(() => getDailyQuestions(track.id, 3), [track.id]);

  const todayKey = getTodayKey();
  const storageKey = `pesach_daily_${student?.id || "guest"}_${todayKey}`;
  const streakKey = `pesach_streak_${student?.id || "guest"}`;
  const historyKey = `pesach_daily_history_${student?.id || "guest"}`;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // טען תשובות היום
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setAnswers(data.answers || {});
        setRevealed(true);
      }
      setStreak(parseInt(localStorage.getItem(streakKey) || "0"));
      const hist = JSON.parse(localStorage.getItem(historyKey) || "[]");
      setHistory(hist);
    } catch {}
  }, [storageKey, streakKey, historyKey]);

  const handleReveal = () => {
    if (Object.keys(answers).length < questions.length) return;
    setRevealed(true);

    const correct = questions.filter((q: any) =>
      q.options.find((o: any) => o.key === answers[q.id])?.correct
    ).length;

    // שמור תשובות היום
    localStorage.setItem(storageKey, JSON.stringify({ answers, correct, total: questions.length }));

    // עדכן streak
    const lastKey = `pesach_streak_last_${student?.id || "guest"}`;
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yKey = `${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`;
    const lastPlayed = localStorage.getItem(lastKey);
    const newStreak = correct > 0 ? (lastPlayed === yKey ? streak + 1 : 1) : streak;
    localStorage.setItem(streakKey, String(newStreak));
    localStorage.setItem(lastKey, todayKey);
    setStreak(newStreak);

    // הוסף להיסטוריה
    const newEntry = { date: todayKey, correct, total: questions.length, answers };
    const newHist = [newEntry, ...history].slice(0, 30);
    localStorage.setItem(historyKey, JSON.stringify(newHist));
    setHistory(newHist);
  };

  const correctCount = revealed
    ? questions.filter((q: any) => q.options.find((o: any) => o.key === answers[q.id])?.correct).length
    : 0;

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
            <p className="text-gold-400 text-sm">{new Date().toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" })}</p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 -mt-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/materials")}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />חזרה
          </button>
          <div className="flex items-center gap-2 bg-[#12243f] border border-royal-400/10 rounded-xl px-4 py-2">
            <Flame className="h-5 w-5 text-orange-400" />
            <span className="text-white font-bold">{streak}</span>
            <span className="text-gray-500 text-sm">ימים ברצף</span>
          </div>
        </div>

        {/* 3 שאלות */}
        <div className="space-y-6 mb-6">
          {questions.map((q: any, qi: number) => (
            <motion.div key={qi} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.1 }}
              className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 text-sm font-bold flex items-center justify-center">{qi + 1}</span>
                <span className="text-gray-500 text-xs">{q.chapter}</span>
                {revealed && (
                  q.options.find((o: any) => o.key === answers[q.id])?.correct
                    ? <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" />נכון</span>
                    : <span className="text-red-400 text-xs flex items-center gap-1"><XCircle className="h-3.5 w-3.5" />לא נכון</span>
                )}
              </div>
              <p className="text-white font-bold text-lg mb-4 leading-relaxed">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt: any) => {
                  const isSelected = answers[q.id] === opt.key;
                  const isCorrect = opt.correct;
                  let cls = "border-[#1a2f50] bg-[#0c1a33] text-gray-300 hover:border-gold-500/30 hover:bg-[#0f2040]";
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

        {/* כפתור גילוי */}
        {!revealed ? (
          <Button onClick={handleReveal}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-14 text-lg disabled:opacity-40 mb-6">
            {Object.keys(answers).length < questions.length
              ? `ענה על כל ${questions.length} השאלות (${Object.keys(answers).length}/${questions.length})`
              : "גלה תשובות"}
          </Button>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-6 text-center mb-6 ${correctCount === questions.length ? "bg-gold-500/10 border border-gold-400/30" : correctCount >= 2 ? "bg-green-900/20 border border-green-500/30" : "bg-red-900/20 border border-red-500/30"}`}>
            <div className="text-4xl mb-2">{correctCount === questions.length ? "🏆" : correctCount >= 2 ? "🌟" : "💪"}</div>
            <p className="text-white font-bold text-xl">{correctCount}/{questions.length} נכון</p>
            {streak > 1 && <p className="text-orange-400 text-sm mt-1">🔥 רצף {streak} ימים!</p>}
            <p className="text-gray-500 text-xs mt-2">שאלות חדשות מחר!</p>
          </motion.div>
        )}

        {/* היסטוריה */}
        {history.length > 0 && (
          <div className="bg-[#12243f] border border-royal-400/10 rounded-2xl p-5">
            <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold-400" />היסטוריית אתגרים
            </h3>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-[#0c1a33] rounded-xl px-4 py-3">
                  <span className="text-gray-400 text-sm">{h.date}</span>
                  <span className={`font-bold text-sm ${h.correct === h.total ? "text-gold-400" : h.correct >= 2 ? "text-green-400" : "text-red-400"}`}>
                    {h.correct}/{h.total} ✓
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
