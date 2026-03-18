/* Quiz — מבחן רשמי עם שאלות מוגדרות, ערבוב אקראי, 25 דקות */

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Loader2, Send, Download, Trophy, Star } from "lucide-react";
import { toast } from "sonner";
import { EXAM_ABC_1, EXAM_ZAHAV_1, type ExamQuestion } from "@/lib/examQuestions";
import { ID_HE_VAV, ID_ZET_HET, ID_TET_YOD, ID_ZAHAV } from "@/lib/examConfig";

const EXAM_DURATION = 25 * 60;
const KEYS = ["א", "ב", "ג", "ד"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface PreparedQuestion {
  id: number;
  question: string;
  options: { text: string; isCorrect: boolean; key: string }[];
}

function prepareQuestions(pool: ExamQuestion[]): PreparedQuestion[] {
  return shuffle(pool).map(q => {
    const shuffled = shuffle(q.options.map(o => ({ ...o })));
    return {
      id: q.id,
      question: q.question,
      options: shuffled.map((o, i) => ({
        text: o.text,
        isCorrect: o.correct,
        key: KEYS[i],
      })),
    };
  });
}

// ── תעודה ──
function Certificate({ student, score, trackName, onClose }: {
  student: { firstName: string; lastName: string; school: string };
  score: number;
  trackName: string;
  onClose: () => void;
}) {
  const isExcellent = score >= 95;
  const certRef = useRef<HTMLDivElement>(null);

  const printCert = () => {
    const el = certRef.current;
    if (!el) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html dir="rtl"><head>
        <meta charset="utf-8">
        <title>תעודה</title>
        <style>
          body { font-family: 'David', serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f0e8; }
          .cert { width: 700px; padding: 50px; border: 8px double ${isExcellent ? "#c9a227" : "#1a4a7a"}; text-align: center; background: white; }
          h1 { font-size: 32px; color: ${isExcellent ? "#c9a227" : "#1a4a7a"}; }
          h2 { font-size: 26px; }
          p { font-size: 18px; line-height: 1.8; }
          .score { font-size: 48px; font-weight: bold; color: ${isExcellent ? "#c9a227" : "#1a4a7a"}; }
        </style>
      </head><body>
        <div class="cert">
          <h1>${isExcellent ? "🏆 תעודת הצטיינות" : "📜 תעודת הצלחה"}</h1>
          <p>מוענקת בגאון ל</p>
          <h2>${student.firstName} ${student.lastName}</h2>
          <p>${student.school}</p>
          <p>אשר השלים בהצלחה את המבחן</p>
          <p><strong>${trackName}</strong></p>
          <div class="score">${score}%</div>
          <p>מבצע שאגת הארי – רשת נעם צביה</p>
        </div>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div ref={certRef} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
        className={`relative rounded-2xl p-10 max-w-lg w-full text-center border-4 ${isExcellent ? "bg-gradient-to-b from-[#1a1200] to-[#0c1a33] border-gold-400" : "bg-gradient-to-b from-[#0c1a33] to-[#12243f] border-royal-400"}`}>
        <div className="text-7xl mb-4">{isExcellent ? "🏆" : "🎓"}</div>
        <h2 className={`font-display text-3xl mb-2 ${isExcellent ? "text-gold-400" : "text-white"}`}>
          {isExcellent ? "תעודת הצטיינות!" : "תעודת הצלחה!"}
        </h2>
        <p className="text-gray-400 mb-4">מוענקת ל</p>
        <p className="text-white text-2xl font-bold mb-1">{student.firstName} {student.lastName}</p>
        <p className="text-gray-400 mb-6">{student.school}</p>
        <div className={`font-display text-6xl font-bold mb-2 ${isExcellent ? "text-gold-400" : "text-royal-300"}`}>{score}%</div>
        <p className="text-gray-400 mb-8">{trackName}</p>
        <div className="flex gap-3">
          <Button onClick={printCert} className="flex-1 bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-12 gap-2">
            <Download className="h-4 w-4" />הדפס תעודה
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1 border-gray-600 text-gray-300 h-12">
            סגור
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Quiz() {
  const [, navigate] = useLocation();
  const { student, selectedTrack } = useStudent();

  // בחר שאלות לפי מסלול
  const questions = useMemo<PreparedQuestion[]>(() => {
    const stageNum = parseInt(localStorage.getItem("pesach_current_stage_num") || "1");
    let pool: ExamQuestion[] = [];

    if (selectedTrack?.id === ID_ZAHAV) {
      if (stageNum === 1) pool = EXAM_ZAHAV_1.length > 0 ? EXAM_ZAHAV_1 : EXAM_ABC_1;
    } else {
      // מסלולים א ב ג — מבחן 1
      if (stageNum === 1) pool = EXAM_ABC_1;
    }

    if (pool.length === 0) {
      toast.error("אין שאלות זמינות למבחן זה");
      return [];
    }
    return prepareQuestions(pool);
  }, [selectedTrack]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showCert, setShowCert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alreadyTaken, setAlreadyTaken] = useState(false);

  const stageTitle = localStorage.getItem("pesach_current_stage_title") || "מבחן";
  const examId = `exam_${selectedTrack?.id?.slice(0,8)}_${localStorage.getItem("pesach_current_stage_num") || "1"}`;

  // בדוק אם כבר נבחן
  useEffect(() => {
    if (!student?.id) return;
    supabase.from("scores").select("id, score")
      .eq("student_id", student.id)
      .eq("quiz_id", examId)
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setAlreadyTaken(true);
          setScore(data[0].score);
          setSubmitted(true);
        }
      });
  }, [student?.id, examId]);

  // טיימר
  useEffect(() => {
    if (submitted || alreadyTaken) return;
    if (timeLeft <= 0) { handleSubmit(true); return; }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted, alreadyTaken]);

  const handleSubmit = useCallback(async (timeout = false) => {
    if (submitting || submitted) return;
    if (!student) { navigate("/register"); return; }
    setSubmitting(true);

    const correct = questions.filter(q =>
      q.options.find(o => o.key === answers[q.id])?.isCorrect
    ).length;
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setSubmitted(true);

    try {
      await supabase.from("scores").insert({
        student_id: student.id,
        quiz_id: examId,
        score: pct,
        total_questions: questions.length,
        correct_answers: correct,
        stage_title: stageTitle,
      });
    } catch (e) { console.error(e); }

    setSubmitting(false);
    if (timeout) toast("הזמן נגמר! המבחן הוגש אוטומטית");
  }, [submitting, submitted, student, questions, answers, examId, stageTitle]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  if (!student) {
    return (
      <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">צריך להתחבר כדי לגשת למבחן</p>
          <Button onClick={() => navigate("/register")} className="bg-gold-500 text-[#0c1a33] font-bold">כניסה</Button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">המבחן אינו פתוח כרגע</p>
          <Button onClick={() => navigate("/materials")} variant="outline">חזרה</Button>
        </div>
      </div>
    );
  }

  // ── תוצאה ──
  if (submitted && score !== null) {
    const passed = score >= 80;
    const excellent = score >= 95;
    return (
      <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center p-4" dir="rtl">
        {showCert && (
          <Certificate
            student={{ firstName: student.firstName, lastName: student.lastName, school: student.school }}
            score={score}
            trackName={stageTitle}
            onClose={() => setShowCert(false)}
          />
        )}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center">
          <div className="text-8xl mb-6">{excellent ? "🏆" : passed ? "✅" : "💪"}</div>
          <h1 className="font-display text-4xl text-white mb-2">
            {alreadyTaken ? "כבר נבחנת!" : excellent ? "מצוין!" : passed ? "כל הכבוד!" : "נסה שוב בפעם הבאה"}
          </h1>
          {alreadyTaken && <p className="text-gray-400 mb-4">כל תלמיד יכול לגשת למבחן פעם אחת בלבד</p>}
          <div className={`font-display text-7xl font-bold mb-2 ${excellent ? "text-gold-400" : passed ? "text-green-400" : "text-red-400"}`}>
            {score}%
          </div>
          <p className="text-gray-400 mb-8">{stageTitle}</p>
          <div className="flex flex-col gap-3">
            {passed && (
              <Button onClick={() => setShowCert(true)}
                className="bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-12 gap-2">
                <Trophy className="h-5 w-5" />צפה בתעודה
              </Button>
            )}
            <Button onClick={() => navigate("/materials")} variant="outline"
              className="border-royal-400/30 text-royal-300 h-12">
              חזרה לחומר
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── מבחן ──
  return (
    <div className="min-h-screen bg-[#0c1a33]" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#080f1e]/95 backdrop-blur border-b border-royal-400/10 px-4 py-3">
        <div className="container max-w-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-sm">{stageTitle}</span>
            <span className="text-gray-500 text-sm">{answeredCount}/{questions.length} נענו</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-lg ${
            timeLeft < 300 ? "bg-red-900/30 text-red-400 animate-pulse" :
            timeLeft < 600 ? "bg-amber-900/30 text-amber-400" :
            "bg-[#12243f] text-gold-400"
          }`}>
            <Clock className="h-4 w-4" />
            {String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-8 px-4">
        {/* ניווט שאלות */}
        <div className="flex flex-wrap gap-2 mb-6">
          {questions.map((q, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                i === currentIndex ? "bg-gold-500 text-[#0c1a33]" :
                answers[q.id] ? "bg-green-600/30 text-green-400 border border-green-500/30" :
                "bg-[#12243f] text-gray-500 hover:bg-[#1a2f50]"
              }`}>
              {i + 1}
            </button>
          ))}
        </div>

        {/* שאלה */}
        {currentQ && (
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-400 text-sm font-bold flex items-center justify-center">
                  {currentIndex + 1}
                </span>
              </div>
              <p className="text-white font-bold text-xl leading-relaxed mb-6">{currentQ.question}</p>
              <div className="space-y-3">
                {currentQ.options.map(opt => {
                  const selected = answers[currentQ.id] === opt.key;
                  return (
                    <button key={opt.key} onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: opt.key }))}
                      className={`w-full text-right p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        selected ? "border-gold-500 bg-gold-500/10 text-white" :
                        "border-[#1a2f50] bg-[#0c1a33] text-gray-300 hover:border-royal-400/40 hover:bg-[#12243f]"
                      }`}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        selected ? "bg-gold-500 text-[#0c1a33]" : "bg-[#1a2f50] text-gray-500"
                      }`}>{opt.key}</span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ניווט */}
        <div className="flex items-center justify-between gap-3">
          <Button onClick={() => setCurrentIndex(p => Math.max(0, p - 1))} disabled={currentIndex === 0}
            variant="outline" className="border-royal-400/30 text-royal-300 h-12 gap-2 disabled:opacity-30">
            <ChevronRight className="h-4 w-4" />הקודם
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button onClick={() => handleSubmit(false)} disabled={submitting}
              className="flex-1 bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-12 gap-2">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {answeredCount < questions.length ? `שלח (${answeredCount}/${questions.length})` : "שלח מבחן"}
            </Button>
          ) : (
            <Button onClick={() => setCurrentIndex(p => Math.min(questions.length - 1, p + 1))}
              className="flex-1 bg-[#12243f] hover:bg-[#1a2f50] text-white h-12 gap-2 border border-royal-400/10">
              הבא<ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
