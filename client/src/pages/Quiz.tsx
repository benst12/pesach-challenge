/* Design: Royal Blue & Gold - Quiz page */

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { getQuestionsForTrack, getQuestionsForChapters, IMAGES } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

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
  chapter: string;
  options: { text: string; isCorrect: boolean; key: string }[];
}

export default function Quiz() {
  const [, navigate] = useLocation();
  const { student, selectedTrack } = useStudent();

  const questions = useMemo<PreparedQuestion[]>(() => {
    // Check if we have stage-specific chapters (from multi-exam flow)
    let pool;
    try {
      const stageChaptersRaw = localStorage.getItem("pesach_current_stage_chapters");
      if (stageChaptersRaw) {
        const stageChapters: string[] = JSON.parse(stageChaptersRaw);
        pool = getQuestionsForChapters(stageChapters, 20);
      } else {
        pool = selectedTrack ? getQuestionsForTrack(selectedTrack.id, 20) : [];
      }
    } catch {
      pool = selectedTrack ? getQuestionsForTrack(selectedTrack.id, 20) : [];
    }
    const keys = ["A", "B", "C", "D"];
    return pool.map((q) => {
      const shuffledOpts = shuffle(q.options.map((o, i) => ({ ...o, origIndex: i })));
      return {
        id: q.id,
        question: q.question,
        chapter: q.chapter,
        options: shuffledOpts.map((o, i) => ({
          text: o.text,
          isCorrect: o.correct,
          key: keys[i],
        })),
      };
    });
  }, [selectedTrack]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (!student || !selectedTrack) {
    navigate("/register");
    return null;
  }

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const selectAnswer = (questionId: number, key: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
  };

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    if (answeredCount < totalQuestions) {
      toast.error(`ענית רק על ${answeredCount} מתוך ${totalQuestions} שאלות. נא לענות על כולן!`);
      return;
    }

    setSubmitting(true);
    try {
      let correct = 0;
      questions.forEach((q) => {
        const selectedKey = answers[q.id];
        const selectedOpt = q.options.find((o) => o.key === selectedKey);
        if (selectedOpt?.isCorrect) correct++;
      });

      const scorePercent = Math.round((correct / totalQuestions) * 100);
      setScore(scorePercent);
      setSubmitted(true);

      try {
        // שמור עם השדות הבסיסיים בלבד — בלי עמודות שאולי לא קיימות
        const insertData: any = {
          student_id: student.id,
          quiz_id: selectedTrack.id,
          score: scorePercent,
          total_questions: totalQuestions,
          correct_answers: correct,
        };

        // הוסף stage_title אם קיים
        const stageTitle = localStorage.getItem("pesach_current_stage_title");
        if (stageTitle) {
          try { insertData.stage_title = stageTitle; } catch {}
        }

        const { error: scoreError } = await supabase.from("scores").insert(insertData);

        if (scoreError) {
          console.error("Score save error:", scoreError);
          // נסה שוב בלי stage_title אם נכשל
          if (scoreError.message?.includes("stage_title") || scoreError.code === "42703") {
            delete insertData.stage_title;
            const { error: retryError } = await supabase.from("scores").insert(insertData);
            if (retryError) console.error("Retry error:", retryError);
          }
        }
      } catch (dbErr) {
        console.error("Error saving results:", dbErr);
      }

      if (scorePercent >= 95) {
        toast.success(`מדהים! ציון ${scorePercent}% - זכית בפרס הצטיינות!`);
      } else if (scorePercent >= 80) {
        toast.success(`כל הכבוד! ציון ${scorePercent}% - עברת בהצלחה!`);
      } else {
        toast.error(`ציון ${scorePercent}% - לא עברת. צריך 80% לפחות. נסה שוב!`);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("שגיאה בשליחת המבחן");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1a33]">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.quizBg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a33]/40 to-[#0c1a33]" />
        </div>

        <div className="relative z-10 container max-w-3xl pt-6 pb-12">
          <button
            onClick={() => navigate("/materials")}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-6 group"
          >
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span>חזרה לחומר הלימוד</span>
          </button>

          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display text-2xl text-white">מבחן - {selectedTrack.name}</h1>
            <div className="flex items-center gap-2 text-gold-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{answeredCount}/{totalQuestions}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-[#12243f] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-l from-gold-500 to-gold-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="container max-w-3xl pb-12 -mt-4">
        {!submitted ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium">
                      שאלה {currentIndex + 1} מתוך {totalQuestions}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#0c1a33] text-gray-500 text-xs">
                      {currentQ.chapter}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl text-white font-bold leading-relaxed mb-8">
                    {currentQ.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQ.options.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => selectAnswer(currentQ.id, opt.key)}
                          className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                            isSelected
                              ? "border-gold-500 bg-gold-500/10 text-white"
                              : "border-[#1a2f50] bg-[#0c1a33] text-gray-300 hover:border-gold-500/30 hover:bg-[#0f2040]"
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                            isSelected
                              ? "bg-gold-500 text-[#0c1a33]"
                              : "bg-[#1a2f50] text-gray-500"
                          }`}>
                            {opt.key}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="border-gold-500/20 text-gold-400 hover:bg-gold-500/10"
              >
                <ChevronRight className="ml-1 h-4 w-4" />
                הקודם
              </Button>

              <div className="flex gap-1 flex-wrap justify-center max-w-[60%]">
                {questions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentIndex
                        ? "bg-gold-500 scale-125"
                        : answers[q.id]
                        ? "bg-gold-500/40"
                        : "bg-[#1a2f50]"
                    }`}
                  />
                ))}
              </div>

              {currentIndex < totalQuestions - 1 ? (
                <Button
                  variant="outline"
                  onClick={goNext}
                  className="border-gold-500/20 text-gold-400 hover:bg-gold-500/10"
                >
                  הבא
                  <ChevronLeft className="mr-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold hover:from-gold-400 hover:to-gold-500"
                >
                  {submitting ? <Loader2 className="animate-spin h-4 w-4" /> : (
                    <>
                      <Send className="ml-1 h-4 w-4" />
                      שליחת מבחן
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-8 ${
              score! >= 80
                ? "bg-gradient-to-br from-gold-500/20 to-green-500/20 glow-gold"
                : "bg-gradient-to-br from-red-500/20 to-gray-500/20"
            }`}>
              {score! >= 80 ? (
                <CheckCircle className="h-16 w-16 text-gold-400" />
              ) : (
                <XCircle className="h-16 w-16 text-red-400" />
              )}
            </div>

            <h2 className="font-display text-4xl text-white mb-4">
              {score! >= 95 ? "אריה אמיתי! 🦁" : score! >= 80 ? "כל הכבוד! 🌟" : "עוד מעט ואתם שם! 💪"}
            </h2>

            <div className="font-display text-6xl mb-4">
              <span className={score! >= 80 ? "text-gradient-gold" : "text-red-400"}>{score}%</span>
            </div>

            <p className="text-gray-400 text-lg mb-2">
              ענית נכון על {Math.round((score! / 100) * totalQuestions)} מתוך {totalQuestions} שאלות
            </p>

            {score! >= 95 && (
              <div className="bg-gold-500/10 border border-gold-400/20 rounded-xl px-6 py-4 mb-8 max-w-lg mx-auto">
                <p className="text-gold-400 font-bold text-lg mb-2">זכית בפרס הצטיינות! 🏆</p>
                <p className="text-gold-300/80 text-sm leading-relaxed">
                  מעולה! אתם אריות אמיתיות – השליטה בחומר בצורה מדהימה! הלימוד שלכם הוא זכות גדולה לעם ישראל ולצבא ההגנה לישראל. המשיכו ללמוד ולהעמיק!
                </p>
              </div>
            )}
            {score! >= 80 && score! < 95 && (
              <div className="bg-gold-500/10 border border-gold-400/20 rounded-xl px-6 py-4 mb-8 max-w-lg mx-auto">
                <p className="text-gold-400 font-bold text-lg mb-2">עברת בהצלחה וזכית בפרס! 🌟</p>
                <p className="text-gold-300/80 text-sm leading-relaxed">
                  יפה מאוד! הוכחתם שאתם שולטים בהלכות פסח. הלימוד שלכם הוא זכות גדולה לעם ישראל ולצבא ההגנה לישראל. המשיכו ללמוד ולהתעלות!
                </p>
              </div>
            )}
            {score! < 80 && (
              <div className="bg-royal-500/10 border border-royal-400/20 rounded-xl px-6 py-4 mb-8 max-w-lg mx-auto">
                <p className="text-royal-300 font-bold text-lg mb-2">אל תוותרו – אתם בדרך הנכונה! 💪</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  העיקר הוא שנרשמתם והתחלתם ללמוד! חזרו על הפרקים, תרגלו את החומר שוב, ותראו שבפעם הבאה אתם מצליחים! כל לימוד שלכם הוא זכות לעם ישראל ולצבא ההגנה לישראל. אל תוותרו!
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-gold-500/20 text-gold-400 hover:bg-gold-500/10 px-8 py-6 text-lg"
              >
                לדף הבית
              </Button>
              {score! < 80 && (
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold px-8 py-6 text-lg"
                >
                  נסה שוב
                </Button>
              )}
            </div>

            {/* Show answers review */}
            {submitted && (
              <div className="mt-12 text-right">
                <h3 className="font-display text-2xl text-white mb-6 text-center">סקירת תשובות</h3>
                <div className="space-y-4">
                  {questions.map((q, i) => {
                    const userKey = answers[q.id];
                    const userOpt = q.options.find((o) => o.key === userKey);
                    const correctOpt = q.options.find((o) => o.isCorrect);
                    const isCorrect = userOpt?.isCorrect;

                    return (
                      <div
                        key={i}
                        className={`bg-[#12243f] border rounded-xl p-5 ${
                          isCorrect ? "border-green-500/30" : "border-red-500/30"
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`mt-1 flex-shrink-0 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                            {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                          </span>
                          <div>
                            <p className="text-white font-medium mb-1">{i + 1}. {q.question}</p>
                            <p className="text-sm text-gray-500">{q.chapter}</p>
                          </div>
                        </div>
                        {!isCorrect && (
                          <div className="mr-8 space-y-1">
                            <p className="text-red-400 text-sm">התשובה שלך: {userOpt?.text}</p>
                            <p className="text-green-400 text-sm">התשובה הנכונה: {correctOpt?.text}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
