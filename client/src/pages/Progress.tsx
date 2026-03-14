/* דף התקדמות תלמיד */

import { useState, useEffect } from "react";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { TRACKS, IMAGES } from "@/lib/data";
import { getTrackExamConfig } from "@/lib/examConfig";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Star, Target, BookOpen, CheckCircle, Clock, MessageCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScoreRecord {
  id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  stage_title: string;
  created_at: string;
}

const encouragements = [
  { min: 95, msgs: ["אריה אמיתי! 🦁 השליטה שלך בחומר מדהימה!", "מצטיין על כל הקו! 🏆 המשך כך!", "100% מסירות = תוצאות מדהימות! ✨"] },
  { min: 80, msgs: ["כל הכבוד! עברת בהצלחה 🌟", "יפה מאוד! ממשיכים קדימה 💪", "עבודה יפה! הלימוד שלך משתלם 📚"] },
  { min: 60, msgs: ["כמעט שם! עוד קצת לימוד ותעבור בקלות 💡", "התקדמות יפה! חזרו על החומר ותנסו שוב 🎯", "אתם בדרך הנכונה! אל תוותרו 🔥"] },
  { min: 0,  msgs: ["אל תוותרו! כל לימוד מקרב אתכם 📖", "זה בסדר להתחיל מחדש — חכמה אמיתית לוקחת זמן 🌱", "כל ניסיון הוא צעד קדימה! 💫"] },
];

function getEncouragement(score: number): string {
  const group = encouragements.find(g => score >= g.min)!;
  return group.msgs[Math.floor(Math.random() * group.msgs.length)];
}

function ScoreBar({ score, animated = true }: { score: number; animated?: boolean }) {
  const color = score >= 95 ? "from-gold-500 to-amber-400" : score >= 80 ? "from-green-500 to-emerald-400" : score >= 60 ? "from-orange-500 to-yellow-400" : "from-red-500 to-rose-400";
  return (
    <div className="h-3 bg-[#0c1a33] rounded-full overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-l ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
      />
    </div>
  );
}

export default function Progress() {
  const [, navigate] = useLocation();
  const { student, selectedTrack } = useStudent();
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyHistory, setDailyHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!student?.id) return;
    supabase
      .from("scores")
      .select("*")
      .eq("student_id", student.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        const all = data || [];
        setScores(all.filter(s => s.stage_title !== "אתגר יומי"));
        setDailyHistory(all.filter(s => s.stage_title === "אתגר יומי"));
        setLoading(false);
      });
  }, [student?.id]);

  if (!student) { navigate("/register"); return null; }

  const track = selectedTrack || TRACKS.find(t => t.id === student.trackId);
  const config = track ? getTrackExamConfig(track.id) : null;

  const bestScore = scores.length ? Math.max(...scores.map(s => s.score)) : null;
  const avgScore = scores.length ? Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length) : null;
  const passed = scores.filter(s => s.score >= 80).length;
  const totalExams = config?.stages.length ?? 0;

  const whatsappMsg = encodeURIComponent(
    `שלום! 👋\nאני ${student.firstName} ${student.lastName} ממבצע שאגת הארי.\n` +
    (bestScore !== null ? `הציון הטוב ביותר שלי: ${bestScore}%\n` : "") +
    `מוסד: ${student.school}\nמסלול: ${track?.name ?? ""}\n\nאשמח לקבל עידוד! 🦁`
  );

  return (
    <div className="min-h-screen bg-[#0c1a33]" dir="rtl">
      {/* Header */}
      <div className="relative h-44 overflow-hidden">
        <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a33]/60 to-[#0c1a33]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-3">
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-2xl scale-150" />
              <img src={IMAGES.logo} alt="רשת נעם צביה" className="relative h-10 w-auto brightness-125" />
            </div>
            <h1 className="font-display text-3xl text-white mb-1">ההתקדמות שלי</h1>
            <p className="text-gold-400">{student.firstName} {student.lastName}</p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 -mt-4 relative z-10">
        <button onClick={() => navigate("/materials")}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8 group">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span>חזרה לחומר הלימוד</span>
        </button>

        {/* פרטי תלמיד */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-l from-royal-600/20 to-gold-500/10 border border-gold-400/20 rounded-2xl p-5 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gold-500/20 flex items-center justify-center text-3xl flex-shrink-0">
            {track?.icon ?? "📚"}
          </div>
          <div>
            <p className="text-white font-bold">{student.firstName} {student.lastName}</p>
            <p className="text-gray-400 text-sm">{student.school} • {student.grade}</p>
            <p className="text-gold-400/70 text-xs mt-1">{track?.name ?? "לא נבחר מסלול"}</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">טוען נתונים...</div>
        ) : (
          <>
            {/* סטטיסטיקות */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { icon: <BookOpen className="h-5 w-5" />, label: "מבחנים שנגשתי", value: scores.length, color: "text-royal-300" },
                { icon: <CheckCircle className="h-5 w-5" />, label: "עברתי", value: passed, color: "text-green-400" },
                { icon: <Star className="h-5 w-5" />, label: "ציון טוב ביותר", value: bestScore !== null ? `${bestScore}%` : "—", color: "text-gold-400" },
                { icon: <Target className="h-5 w-5" />, label: "ממוצע", value: avgScore !== null ? `${avgScore}%` : "—", color: "text-amber-400" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#12243f] border border-royal-400/10 rounded-xl p-4 text-center">
                  <div className={`${s.color} flex justify-center mb-2`}>{s.icon}</div>
                  <div className="font-display text-2xl text-white mb-1">{s.value}</div>
                  <div className="text-gray-500 text-xs">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* התקדמות לפי מבחנים */}
            {config && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-[#12243f] border border-royal-400/10 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-gold-400" />
                  התקדמות במסלול
                </h3>
                <div className="space-y-4">
                  {config.stages.map((stage, i) => {
                    const stageScore = scores.find(s => s.stage_title === stage.title || s.quiz_id === track?.id);
                    const allForStage = scores.filter((_, si) => si === i);
                    const best = allForStage.length ? Math.max(...allForStage.map(s => s.score)) : null;
                    const displayScore = best ?? (scores[i]?.score ?? null);
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${displayScore !== null && displayScore >= 80 ? "bg-gold-500 text-[#0c1a33]" : "bg-[#0c1a33] text-gray-500"}`}>
                              {["א","ב","ג","ד"][i]}
                            </div>
                            <span className="text-white text-sm font-medium">{stage.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {displayScore !== null ? (
                              <>
                                <span className={`text-sm font-bold ${displayScore >= 95 ? "text-gold-400" : displayScore >= 80 ? "text-green-400" : "text-red-400"}`}>
                                  {displayScore}%
                                </span>
                                {displayScore >= 95 && <Trophy className="h-4 w-4 text-gold-400" />}
                                {displayScore >= 80 && displayScore < 95 && <Star className="h-4 w-4 text-green-400" />}
                              </>
                            ) : (
                              <span className="text-gray-600 text-xs flex items-center gap-1">
                                <Clock className="h-3 w-3" />טרם נגשתי
                              </span>
                            )}
                          </div>
                        </div>
                        <ScoreBar score={displayScore ?? 0} />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* היסטוריית מבחנים */}
            {scores.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-[#12243f] border border-royal-400/10 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-lg text-white mb-4">היסטוריית מבחנים</h3>
                <div className="space-y-3">
                  {scores.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#0c1a33] rounded-xl p-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${s.score >= 95 ? "bg-gold-500/20 text-gold-400" : s.score >= 80 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {s.score}%
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{s.stage_title || `מבחן ${i + 1}`}</p>
                        <p className="text-gray-500 text-xs">{new Date(s.created_at).toLocaleDateString("he-IL")}</p>
                      </div>
                      <div className="text-xs text-gray-500">{s.correct_answers}/{s.total_questions} נכון</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* הודעת עידוד */}
            {scores.length > 0 && bestScore !== null && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-gold-500/10 border border-gold-400/20 rounded-2xl p-5 mb-6 text-center">
                <p className="text-gold-300 font-medium text-lg">{getEncouragement(bestScore)}</p>
                <p className="text-gray-500 text-sm mt-1">רשת נעם צביה – מבצע שאגת הארי</p>
              </motion.div>
            )}

            {scores.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-12 bg-[#12243f] border border-royal-400/10 rounded-2xl mb-6">
                <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-white font-display text-xl mb-2">טרם נגשת למבחן</p>
                <p className="text-gray-400 text-sm mb-6">למד את החומר ונגש למבחן הראשון!</p>
                <Button onClick={() => navigate("/materials")}
                  className="bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold">
                  לחומר הלימוד
                </Button>
              </motion.div>
            )}

            {/* אתגר יומי */}
            {dailyHistory.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                className="bg-[#12243f] border border-gold-400/15 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-lg text-white mb-1 flex items-center gap-2">
                  <span className="text-xl">⚡</span>אתגר יומי
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  סה״כ {dailyHistory.reduce((a, s) => a + (s.correct_answers || 0), 0)} תשובות נכונות מצטברות
                </p>
                <div className="space-y-2">
                  {dailyHistory.slice(-10).reverse().map((s, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#0c1a33] rounded-xl px-4 py-3">
                      <span className="text-gray-400 text-sm">{new Date(s.created_at).toLocaleDateString("he-IL")}</span>
                      <span className={`font-bold text-sm ${s.correct_answers === s.total_questions ? "text-gold-400" : s.correct_answers >= 2 ? "text-green-400" : "text-red-400"}`}>
                        {s.correct_answers}/{s.total_questions} ✓
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* שיתוף בוואטסאפ */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="bg-[#12243f] border border-green-500/20 rounded-2xl p-5 text-center">
              <MessageCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <p className="text-white font-bold mb-1">שתף את ההתקדמות שלך</p>
              <p className="text-gray-400 text-sm mb-4">שלח הודעה לחבר, להורה או למחנך/ת</p>
              <a href={`https://wa.me/?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-500 text-white font-bold gap-2">
                  <MessageCircle className="h-4 w-4" />
                  שתף בוואטסאפ
                </Button>
              </a>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
