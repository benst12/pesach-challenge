/* חלון עדכון מספר כיתה לנרשמים ישנים */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useStudent } from "@/contexts/StudentContext";
import { toast } from "sonner";
import { GraduationCap, X } from "lucide-react";

const CLASS_NUMBERS = ["1","2","3","4","5"];

export default function ClassUpdateModal() {
  const { student, setStudent } = useStudent();
  const [classNum, setClassNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // הצג רק למי שיש לו כיתה ללא מספר (למשל "כיתה ח" ולא "כיתה ח1")
  const needsUpdate = student &&
    student.grade &&
    student.grade !== "רכז מוסדי" &&
    /^כיתה [א-ת]+$/.test(student.grade) &&
    !dismissed &&
    !localStorage.getItem(`class_updated_${student.id}`);

  if (!needsUpdate) return null;

  const handleSave = async () => {
    if (!classNum) { toast.error("נא לבחור מספר כיתה"); return; }
    setLoading(true);
    try {
      const newGrade = student!.grade + classNum;
      await supabase.from("students").update({ grade: newGrade }).eq("id", student!.id);
      setStudent({ ...student!, grade: newGrade });
      localStorage.setItem(`class_updated_${student!.id}`, "1");
      toast.success(`כיתה עודכנה ל-${newGrade} ✓`);
    } catch {
      toast.error("שגיאה בעדכון");
    }
    setLoading(false);
  };

  const handleSkip = () => {
    localStorage.setItem(`class_updated_${student!.id}`, "1");
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-sm bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-gold-400/25 rounded-2xl p-7 relative"
        >
          <button onClick={handleSkip}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 transition-colors">
            <X className="h-4 w-4" />
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold-500/15 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-gold-400" />
            </div>
            <h2 className="font-display text-xl text-white mb-2">עדכון קטן 👋</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              הוספנו אפשרות לציין את מספר הכיתה שלך.
              <br />
              אתה רשום כ<span className="text-gold-400 font-bold"> {student!.grade}</span> —
              מה מספר הכיתה שלך?
            </p>
            <p className="text-gray-600 text-xs mt-2">לדוגמה: ח<strong>2</strong> = כיתה ח׳ קבוצה 2</p>
          </div>

          <div className="space-y-4">
            <Select value={classNum} onValueChange={setClassNum}>
              <SelectTrigger className="bg-[#0c1a33] border-royal-400/20 text-white h-12 [&>span]:text-right">
                <SelectValue placeholder="בחר מספר כיתה (1-5)" />
              </SelectTrigger>
              <SelectContent className="bg-[#12243f] border-royal-400/20">
                {CLASS_NUMBERS.map(n => (
                  <SelectItem key={n} value={n} className="text-white hover:bg-gold-500/10 focus:bg-gold-500/10">
                    {student!.grade}{n} (קבוצה {n})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleSave} disabled={loading || !classNum}
              className="w-full bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-12 disabled:opacity-40">
              {loading ? "שומר..." : "עדכן כיתה"}
            </Button>

            <button onClick={handleSkip}
              className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors py-1">
              דלג — אין לי מספר כיתה
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
