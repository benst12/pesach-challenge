/* Design: Royal Blue & Gold - Track selection */

import { TRACKS, IMAGES } from "@/lib/data";
import { EXAM_CONFIGS } from "@/lib/examConfig";
import { supabase } from "@/lib/supabase";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, BookOpen, CalendarDays, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function SelectTrack() {
  const [, navigate] = useLocation();
  const { student, setStudent, setSelectedTrack } = useStudent();
  const [loading, setLoading] = useState<string | null>(null);

  if (!student) {
    navigate("/register");
    return null;
  }

  const handleSelectTrack = async (track: typeof TRACKS[0]) => {
    setLoading(track.id);
    try {
      if (student.id) {
        const { error } = await supabase
          .from("students")
          .update({ track_id: track.id })
          .eq("id", student.id);
        if (error) throw error;
      }

      setStudent({ ...student, trackId: track.id });
      setSelectedTrack(track);
      toast.success(`נרשמת ל${track.name} בהצלחה!`);
      navigate("/materials");
    } catch (err: any) {
      console.error("Track selection error:", err);
      toast.error("שגיאה בבחירת מסלול, נסה שוב");
    } finally {
      setLoading(null);
    }
  };

  const examNumLabel = (n: number) => {
    if (n === 2) return "2 מבחנים";
    if (n === 3) return "3 מבחנים";
    if (n === 4) return "4 מבחנים";
    return `${n} מבחנים`;
  };

  const examBadgeColor = (n: number) => {
    if (n === 2) return "bg-royal-600/30 text-royal-200 border-royal-400/20";
    if (n === 3) return "bg-gold-600/20 text-gold-300 border-gold-400/20";
    if (n === 4) return "bg-amber-600/20 text-amber-300 border-amber-400/20";
    return "bg-gray-600/20 text-gray-300";
  };

  const stageAleph = ["א", "ב", "ג", "ד"];

  return (
    <div className="min-h-screen bg-[#0c1a33] py-12 px-4">
      <div className="container max-w-5xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8 group"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span>חזרה לדף הבית</span>
        </button>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src={IMAGES.logo} alt="רשת נעם צביה" className="h-14 w-auto mx-auto mb-4" />
          <h1 className="font-display text-4xl text-white mb-3">
            שלום <span className="text-gold-400">{student.firstName}</span>!
          </h1>
          <p className="text-gray-400 text-lg">בחר/י את המסלול שלך</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {TRACKS.map((track, i) => {
            const config = EXAM_CONFIGS.find(c => c.trackId === track.id);
            const stages = config?.stages ?? [];

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, type: "spring" as const }}
                className="group cursor-pointer"
                onClick={() => !loading && handleSelectTrack(track)}
              >
                <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6 hover:border-gold-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(212,160,23,0.12)] h-full flex flex-col">

                  {/* Icon + Title */}
                  <div className="text-5xl mb-3 text-center">{track.icon}</div>
                  <h3 className="font-display text-2xl text-white text-center mb-1">{track.name}</h3>
                  <p className="text-gold-400/80 text-center text-sm mb-1">כיתות {track.grades}</p>
                  <p className="text-gray-400 text-center text-sm mb-3">{track.description}</p>

                  {/* Exam count badge */}
                  <div className="flex justify-center mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${examBadgeColor(stages.length)}`}>
                      <GraduationCap className="h-3.5 w-3.5" />
                      {examNumLabel(stages.length)}
                    </span>
                  </div>

                  {/* Exam schedule */}
                  {stages.length > 0 && (
                    <div className="bg-[#0a1829] border border-royal-400/10 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <CalendarDays className="h-3.5 w-3.5 text-gold-400" />
                        <span className="text-gold-400 text-xs font-bold">לוח מבחנים</span>
                      </div>
                      <div className="space-y-2">
                        {stages.map((stage, si) => (
                          <div key={si} className="flex items-start gap-2">
                            {/* Stage letter bubble */}
                            <div className="w-5 h-5 rounded bg-royal-600/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-royal-200 text-[10px] font-bold">{stageAleph[si]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-white text-xs font-semibold">{stage.title}</span>
                                <span className="text-gold-400/60 text-[10px]">– {stage.dateShort}</span>
                              </div>
                              <p className="text-gray-500 text-[10px] mt-0.5 leading-tight">
                                {stage.chapterNames.map(c => c.name.split(" – ")[0]).join(" · ")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chapters list */}
                  <div className="space-y-1.5 mb-5 flex-1">
                    <div className="flex items-center gap-1.5 mb-2">
                      <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-gray-500 text-xs">כל הפרקים במסלול</span>
                    </div>
                    {track.chapters.map((ch, ci) => (
                      <div key={ci} className="flex items-center gap-2 text-gray-600 text-xs">
                        <div className="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
                        <span>{ch.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="text-center mt-auto">
                    <div className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-l from-gold-500/20 to-gold-600/20 text-gold-400 font-bold group-hover:from-gold-500 group-hover:to-gold-600 group-hover:text-[#0c1a33] transition-all duration-300">
                      {loading === track.id ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : (
                        "בחירת מסלול"
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
