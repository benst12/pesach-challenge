/* Design: Royal Blue & Gold - Registration form */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SCHOOLS, CLASSES, IMAGES } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [, navigate] = useLocation();
  const { setStudent } = useStudent();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !school || !grade) {
      toast.error("נא למלא את כל השדות");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("students")
        .insert({ first_name: firstName, last_name: lastName, phone, school_name: school, grade })
        .select()
        .single();

      if (error) throw error;

      setStudent({
        id: data.id,
        firstName,
        lastName,
        phone,
        school,
        grade,
      });

      toast.success("נרשמת בהצלחה! עכשיו בחר/י מסלול");
      navigate("/select-track");
    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error("שגיאה בהרשמה, נסה שוב");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center py-12 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8 group"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span>חזרה לדף הבית</span>
        </button>

        <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <img src={IMAGES.logo} alt="רשת נעם צביה" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="font-display text-3xl text-white mb-2">הרשמה למבצע</h1>
            <p className="text-gray-400">מלאו את הפרטים שלכם</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">שם פרטי</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="שם פרטי"
                  className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 focus:border-gold-400/50 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">שם משפחה</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="שם משפחה"
                  className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 focus:border-gold-400/50 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">טלפון</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="050-0000000"
                type="tel"
                dir="ltr"
                className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 focus:border-gold-400/50 h-12 text-left"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">מוסד לימודים</Label>
              <Select value={school} onValueChange={setSchool}>
                <SelectTrigger className="bg-[#0c1a33] border-royal-400/20 text-white h-12 [&>span]:text-right">
                  <SelectValue placeholder="בחרו מוסד" />
                </SelectTrigger>
                <SelectContent className="bg-[#12243f] border-royal-400/20 max-h-60">
                  {SCHOOLS.map((s) => (
                    <SelectItem key={s} value={s} className="text-white hover:bg-gold-500/10 focus:bg-gold-500/10 focus:text-white">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">כיתה</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="bg-[#0c1a33] border-royal-400/20 text-white h-12 [&>span]:text-right">
                  <SelectValue placeholder="בחרו כיתה" />
                </SelectTrigger>
                <SelectContent className="bg-[#12243f] border-royal-400/20">
                  {CLASSES.map((c) => (
                    <SelectItem key={c} value={c} className="text-white hover:bg-gold-500/10 focus:bg-gold-500/10 focus:text-white">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-lg h-14 rounded-xl glow-gold transition-all duration-300 hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "המשך להרשמה"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
