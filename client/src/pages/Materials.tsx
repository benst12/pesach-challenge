/* Design: Royal Blue & Gold - Study materials */

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IMAGES } from "@/lib/data";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ExternalLink, CheckCircle2, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function Materials() {
  const [, navigate] = useLocation();
  const { student, selectedTrack, studyCompleted, setStudyCompleted } = useStudent();
  const [checked, setChecked] = useState(studyCompleted);

  if (!student || !selectedTrack) {
    navigate("/register");
    return null;
  }

  const handleReady = () => {
    setStudyCompleted(true);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-[#0c1a33]">
      {/* Header with books image */}
      <div className="relative h-64 overflow-hidden">
        <img src={IMAGES.books} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a33]/60 to-[#0c1a33]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img src={IMAGES.logo} alt="רשת נעם צביה" className="h-12 w-auto mx-auto mb-3" />
            <h1 className="font-display text-4xl text-white mb-2">חומר הלימוד</h1>
            <p className="text-gold-400 text-lg">{selectedTrack.name}</p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-3xl py-8 -mt-8 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8 group"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span>חזרה לדף הבית</span>
        </button>

        {/* Info card */}
        <motion.div
          className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-gold-400" />
            <h2 className="font-display text-xl text-white">פרקים ללימוד</h2>
          </div>
          <p className="text-gray-400 mb-2">
            לחצו על כל פרק כדי לקרוא אותו באתר פניני הלכה. חשוב לקרוא את כל הפרקים לפני המבחן!
          </p>
          <p className="text-gold-400/80 text-sm">
            הפרקים נלקחים מתוך ספר הלכות פסח של הרב אליעזר מלמד
          </p>
        </motion.div>

        {/* Chapters list */}
        <div className="space-y-3 mb-10">
          {selectedTrack.chapters.map((chapter, i) => (
            <motion.a
              key={i}
              href={chapter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <div className="bg-[#12243f] border border-royal-400/10 rounded-xl p-5 flex items-center justify-between hover:border-gold-400/30 hover:bg-[#152a48] transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 font-display text-lg flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-white font-medium">{chapter.name}</span>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-500 group-hover:text-gold-400 transition-colors flex-shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Ready for exam section */}
        <motion.div
          className="bg-gradient-to-br from-royal-500/10 to-gold-500/10 border border-gold-500/20 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CheckCircle2 className="h-12 w-12 text-gold-400 mx-auto mb-4" />
          <h3 className="font-display text-2xl text-white mb-3">מוכנים למבחן?</h3>
          <p className="text-gray-400 mb-6">
            לאחר שקראתם את כל הפרקים, סמנו את התיבה ולחצו על הכפתור
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Checkbox
              id="study-complete"
              checked={checked}
              onCheckedChange={(v) => setChecked(v === true)}
              className="border-2 border-gold-500/50 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500 h-6 w-6"
            />
            <label htmlFor="study-complete" className="text-gold-300 font-medium text-base cursor-pointer select-none">
              למדתי את החומר ואני מוכן/ה למבחן
            </label>
          </div>

          <Button
            onClick={handleReady}
            disabled={!checked}
            className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-lg px-10 py-6 rounded-xl glow-gold transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            <GraduationCap className="ml-2 h-5 w-5" />
            התחלת מבחן
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
