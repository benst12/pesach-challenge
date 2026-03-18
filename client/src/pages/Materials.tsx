/* Design: Royal Blue & Gold – Study materials + multi-exam stages */

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IMAGES } from "@/lib/data";
import { getTrackExamConfig, isStageOpen, type ExamStage } from "@/lib/examConfig";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, ExternalLink, CheckCircle2,
  GraduationCap, Lock, CalendarDays, ChevronDown, ChevronUp,
  Zap, BarChart2, LogOut,
} from "lucide-react";
import { useState } from "react";
import ClassUpdateModal from "@/components/ClassUpdateModal";

export default function Materials() {
  const [, navigate] = useLocation();
  const { student, selectedTrack, setStudyCompleted, setStudent, setSelectedTrack } = useStudent();

  const handleLogout = () => {
    setStudent(null);
    setSelectedTrack(null);
    localStorage.removeItem("pesach_student");
    localStorage.removeItem("pesach_track");
    localStorage.removeItem("pesach_study_completed");
    navigate("/");
  };
  const [openStage, setOpenStage] = useState<number | null>(0);
  const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});

  if (!student || !selectedTrack) {
    navigate("/register");
    return null;
  }

  const config = getTrackExamConfig(selectedTrack.id);
  if (!config) { navigate("/"); return null; }

  const handleStartExam = (stage: ExamStage) => {
    if (!isStageOpen(stage)) return;
    setStudyCompleted(true);
    localStorage.setItem("pesach_current_stage_chapters", JSON.stringify(stage.chapters));
    localStorage.setItem("pesach_current_stage_title", stage.title);
    navigate("/quiz");
  };

  const heLetters = ["א", "ב", "ג", "ד"];

  return (
    <div className="min-h-screen bg-[#0c1a33]" dir="rtl">
      <ClassUpdateModal />
      {/* Header */}
      <div className="relative h-52 overflow-hidden">
        <img src={IMAGES.books} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a33]/60 to-[#0c1a33]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-3">
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-2xl scale-150" />
              <img src={IMAGES.logo} alt="רשת נעם צביה" className="relative h-12 w-auto brightness-125" />
            </div>
            <h1 className="font-display text-3xl text-white mb-1">חומר הלימוד והמבחנים</h1>
            <p className="text-gold-400">{selectedTrack.name}</p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-3xl py-8 -mt-8 relative z-10 px-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span>חזרה לדף הבית</span>
          </button>
          <div className="flex gap-2">
            <button onClick={() => navigate("/daily")}
              className="flex items-center gap-1.5 bg-gold-500/10 border border-gold-400/25 rounded-xl px-3 py-2 text-gold-400 text-sm hover:bg-gold-500/20 transition-all">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:block">אתגר יומי</span>
            </button>
            <button onClick={() => navigate("/progress")}
              className="flex items-center gap-1.5 bg-royal-500/10 border border-royal-400/20 rounded-xl px-3 py-2 text-royal-300 text-sm hover:bg-royal-500/20 transition-all">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:block">ההתקדמות שלי</span>
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-900/20 border border-red-500/20 rounded-xl px-3 py-2 text-red-400 text-sm hover:bg-red-900/30 transition-all">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">התנתק</span>
            </button>
          </div>
        </div>

        {/* Track banner */}
        <motion.div
          className="bg-gradient-to-l from-royal-600/20 to-gold-500/10 border border-gold-400/20 rounded-2xl p-5 mb-7 flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="text-4xl">{selectedTrack.icon}</div>
          <div>
            <p className="text-white font-bold text-base">{selectedTrack.name}</p>
            <p className="text-gray-400 text-sm">{selectedTrack.description}</p>
            <p className="text-gold-400/70 text-xs mt-1">
              {config.stages.length} מבחנים במסלול זה • הלחצו על כל מבחן לפרטים
            </p>
          </div>
        </motion.div>

        {/* Timeline + stages */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute right-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-gold-500/40 via-royal-400/20 to-transparent" />

          <div className="space-y-4">
            {config.stages.map((stage, idx) => {
              const stageOpen = isStageOpen(stage);
              const isExpanded = openStage === idx;
              const isChecked = checkedMap[stage.examNumber] ?? false;

              return (
                <motion.div
                  key={stage.examNumber}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.07 }}
                >
                  {/* Stage card */}
                  <div className={`mr-14 rounded-2xl border overflow-hidden transition-all duration-300 ${
                    stageOpen
                      ? "border-gold-400/35 bg-gradient-to-b from-[#13243f] to-[#0f1f3a] shadow-lg shadow-gold-500/5"
                      : "border-royal-400/12 bg-[#0e1c34]"
                  }`}>

                    {/* Stage header */}
                    <button
                      className="w-full text-right px-5 py-4 flex items-center gap-3"
                      onClick={() => setOpenStage(isExpanded ? null : idx)}>

                      {/* Dot on timeline */}
                      <div className={`absolute right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                        stageOpen
                          ? "border-gold-400 bg-gold-500 shadow-md shadow-gold-500/40"
                          : "border-gray-600 bg-[#0c1a33]"
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${stageOpen ? "bg-[#0c1a33]" : "bg-gray-600"}`} />
                      </div>

                      {/* Number */}
                      <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center font-display text-xl font-bold ${
                        stageOpen ? "bg-gold-500 text-[#0c1a33]" : "bg-[#192c47] text-gray-500"
                      }`}>
                        {heLetters[idx]}
                      </div>

                      <div className="flex-1 text-right">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold">{stage.title}</span>
                          {stageOpen ? (
                            <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs">✓ פתוח</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-gray-600/25 text-gray-500 text-xs">🔒 סגור</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gold-400/60 mt-0.5">
                          <CalendarDays className="h-3 w-3" />
                          <span>{stage.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {stage.chapterNames.map((c, ci) => (
                            <span key={ci} className="text-[10px] bg-white/5 border border-white/8 text-gray-500 px-1.5 py-0.5 rounded">
                              {c.name.split(" – ")[0]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-gray-600 flex-shrink-0 ml-1">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>

                    {/* Expanded body */}
                    {isExpanded && (
                      <div className="border-t border-royal-400/10 px-5 pb-5">

                        {/* Chapters */}
                        <div className="mt-4 mb-5">
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="h-4 w-4 text-gold-400" />
                            <span className="text-gold-400 text-sm font-medium">פרקים ל{stage.title}</span>
                          </div>
                          <div className="space-y-2">
                            {stage.chapterNames.map((ch, ci) => (
                              <a key={ci} href={ch.url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-between bg-[#0a1829] border border-royal-400/10 rounded-xl px-4 py-3 hover:border-gold-400/25 hover:bg-[#0f2035] transition-all group">
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-md bg-gold-500/10 flex items-center justify-center text-gold-400 text-xs font-bold flex-shrink-0">
                                    {ci + 1}
                                  </span>
                                  <div>
                                    <span className="text-white text-sm">{ch.name.split(" – ")[0]}</span>
                                    {ch.name.includes(" – ") && (
                                      <p className="text-gray-500 text-xs mt-0.5">{ch.name.split(" – ")[1]}</p>
                                    )}
                                  </div>
                                </div>
                                <ExternalLink className="h-3.5 w-3.5 text-gray-600 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Exam entry box */}
                        <div className={`rounded-xl p-5 text-center border ${
                          stageOpen
                            ? "bg-green-950/20 border-green-500/20"
                            : "bg-[#0a1625] border-gray-700/30"
                        }`}>
                          {stageOpen ? (
                            <>
                              <CheckCircle2 className="h-8 w-8 text-gold-400 mx-auto mb-3" />
                              <h3 className="font-display text-xl text-white mb-2">מוכנים ל{stage.title}?</h3>
                              <p className="text-gray-400 text-sm mb-4">
                                קראו את כל הפרקים, סמנו את התיבה ולחצו להתחיל
                              </p>
                              <div className="flex items-center justify-center gap-3 mb-5">
                                <Checkbox
                                  id={`chk-${stage.examNumber}`}
                                  checked={isChecked}
                                  onCheckedChange={(v) => setCheckedMap(m => ({ ...m, [stage.examNumber]: v === true }))}
                                  className="border-2 border-gold-500/50 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500 h-5 w-5"
                                />
                                <label htmlFor={`chk-${stage.examNumber}`}
                                  className="text-gold-300 text-sm font-medium cursor-pointer select-none">
                                  למדתי את הפרקים ואני מוכן/ה
                                </label>
                              </div>
                              <Button
                                onClick={() => handleStartExam(stage)}
                                disabled={!isChecked}
                                className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold px-8 py-5 rounded-xl glow-gold transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100">
                                <GraduationCap className="ml-2 h-5 w-5" />
                                התחלת {stage.title}
                              </Button>
                            </>
                          ) : (
                            <>
                              <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-gray-800/60 flex items-center justify-center">
                                <Lock className="h-5 w-5 text-gray-500" />
                              </div>
                              <h3 className="font-display text-lg text-white mb-1">{stage.title} טרם נפתח</h3>
                              <p className="text-gold-400/50 text-sm">{stage.date}</p>
                              <p className="text-gray-600 text-xs mt-2 mb-4">
                                בינתיים – למדו את הפרקים והתכוננו 📖
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p className="text-center text-gray-700 text-xs mt-8 pb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          הפרקים נלקחים מתוך ספר פניני הלכה של הרב אליעזר מלמד
        </motion.p>
      </div>
    </div>
  );
}
