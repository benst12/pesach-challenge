/* Design: Royal Blue & Gold - Track selection */

import { TRACKS, IMAGES } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

function getChapterNum(name: string): string {
  const match = name.match(/פרק\s+([א-ת"]+)/);
  return match ? match[1] : "";
}

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

  return (
    <div className="min-h-screen bg-[#0c1a33] py-12 px-4">
      <div className="container max-w-4xl">
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
            const chapterNums = track.chapters.map(ch => getChapterNum(ch.name)).filter(Boolean);
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, type: "spring" as const }}
                className="group cursor-pointer"
                onClick={() => !loading && handleSelectTrack(track)}
              >
                <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6 hover:border-gold-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(212,160,23,0.12)]">
                  <div className="text-5xl mb-4 text-center">{track.icon}</div>
                  <h3 className="font-display text-2xl text-white text-center mb-2">{track.name}</h3>
                  <p className="text-gold-400/80 text-center text-sm mb-2">כיתות {track.grades}</p>
                  <p className="text-gray-400 text-center text-sm mb-2">{track.description}</p>
                  <p className="text-royal-300 text-center text-xs font-medium mb-4">
                    פרקים: {chapterNums.join(" , ")}
                  </p>

                  <div className="space-y-2 mb-6">
                    {track.chapters.map((ch, ci) => (
                      <div key={ci} className="flex items-center gap-2 text-gray-500 text-sm">
                        <BookOpen className="h-3.5 w-3.5 text-gold-500/50 flex-shrink-0" />
                        <span>{ch.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
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
