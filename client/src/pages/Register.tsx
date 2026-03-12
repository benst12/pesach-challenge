/* Design: Royal Blue & Gold - Registration + returning student login */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SCHOOLS, CLASSES, IMAGES, TRACKS } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useStudent } from "@/contexts/StudentContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, UserPlus, Phone, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [, navigate] = useLocation();
  const { setStudent, setSelectedTrack } = useStudent();

  // mode: "choose" | "login" | "register"
  const [mode, setMode] = useState<"choose" | "login" | "register">("choose");

  // Login state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [phone, setPhone]         = useState("");
  const [school, setSchool]       = useState("");
  const [grade, setGrade]         = useState("");
  const [regLoading, setRegLoading] = useState(false);

  // ── כניסה חוזרת לפי טלפון ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone.trim()) { toast.error("נא להזין מספר טלפון"); return; }
    setLoginLoading(true);
    try {
      // נקה את הטלפון — הסר מקפים ורווחים
      const cleanPhone = loginPhone.trim().replace(/[-\s]/g, "");

      // חפש עם וגם בלי מקפים
      let { data, error } = await supabase
        .from("students")
        .select("*")
        .or(`phone.eq.${loginPhone.trim()},phone.eq.${cleanPhone}`)
        .limit(1)
        .single();

      // אם לא נמצא — נסה חיפוש חלקי (ilike)
      if (error || !data) {
        const res2 = await supabase
          .from("students")
          .select("*")
          .ilike("phone", `%${cleanPhone.slice(-8)}%`)
          .limit(1)
          .single();
        data = res2.data;
        error = res2.error;
      }

      if (error || !data) {
        toast.error("לא נמצא תלמיד עם מספר זה. בדקו שוב או הירשמו.");
        setLoginLoading(false);
        return;
      }

      setStudent({
        id: data.id,
        firstName: data.first_name,
        lastName:  data.last_name,
        phone:     data.phone,
        school:    data.school_name,
        grade:     data.grade,
        trackId:   data.track_id,
      });

      if (data.track_id) {
        const track = TRACKS.find(t => t.id === data.track_id);
        if (track) setSelectedTrack(track);
        toast.success(`ברוך הבא/ה חזרה, ${data.first_name}!`);
        navigate("/materials");
      } else {
        toast.success(`ברוך הבא/ה, ${data.first_name}! בחר/י מסלול`);
        navigate("/select-track");
      }
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בכניסה, נסה שוב");
    } finally {
      setLoginLoading(false);
    }
  };

  // ── הרשמה חדשה ──
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !school || !grade) {
      toast.error("נא למלא את כל השדות");
      return;
    }
    setRegLoading(true);
    try {
      // בדוק אם כבר קיים תלמיד עם אותו טלפון
      const cleanPhone = phone.trim().replace(/[-\s]/g, "");
      const { data: existing } = await supabase
        .from("students")
        .select("id, first_name, last_name, track_id")
        .or(`phone.eq.${phone.trim()},phone.eq.${cleanPhone}`)
        .limit(1)
        .single();

      if (existing) {
        toast.error(`מספר הטלפון כבר רשום! אם זה אתה, השתמש ב"כבר נרשמתי" כדי להיכנס.`);
        setRegLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("students")
        .insert({ first_name: firstName, last_name: lastName, phone: phone.trim(), school_name: school, grade })
        .select()
        .single();

      if (error) throw error;

      setStudent({ id: data.id, firstName, lastName, phone, school, grade });
      toast.success("נרשמת בהצלחה! עכשיו בחר/י מסלול");
      navigate("/select-track");
    } catch (err: any) {
      console.error(err);
      toast.error("שגיאה בהרשמה, נסה שוב");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center py-12 px-4">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>

        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8 group">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span>חזרה לדף הבית</span>
        </button>

        <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <img src={IMAGES.logo} alt="רשת נעם צביה" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="font-display text-3xl text-white mb-2">כניסה למבצע</h1>
            <p className="text-gray-400">נרשמת כבר? כנסו עם הטלפון שלכם</p>
          </div>

          <AnimatePresence mode="wait">

            {/* ── בחירה ראשונית ── */}
            {mode === "choose" && (
              <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-4">
                <button onClick={() => setMode("login")}
                  className="w-full flex items-center gap-4 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-400/30 rounded-xl p-5 transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-gold-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">כבר נרשמתי</p>
                    <p className="text-gray-400 text-sm">כניסה לפי מספר טלפון</p>
                  </div>
                </button>

                <button onClick={() => setMode("register")}
                  className="w-full flex items-center gap-4 bg-royal-600/10 hover:bg-royal-600/20 border border-royal-400/20 rounded-xl p-5 transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-royal-500/20 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="h-5 w-5 text-royal-300" />
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">הרשמה ראשונה</p>
                    <p className="text-gray-400 text-sm">תלמיד/ה חדש/ה? הירשמו כאן</p>
                  </div>
                </button>
              </motion.div>
            )}

            {/* ── כניסה חוזרת ── */}
            {mode === "login" && (
              <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-gray-300">מספר טלפון</Label>
                    <Input
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="050-0000000"
                      type="tel"
                      dir="ltr"
                      className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 focus:border-gold-400/50 h-12 text-left"
                    />
                    <p className="text-gray-500 text-xs">הזן/י את הטלפון שהזנת בהרשמה</p>
                  </div>

                  <Button type="submit" disabled={loginLoading}
                    className="w-full bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-lg h-14 rounded-xl glow-gold">
                    {loginLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                      <><LogIn className="ml-2 h-5 w-5" />כניסה</>
                    )}
                  </Button>

                  <button type="button" onClick={() => setMode("choose")}
                    className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors py-2">
                    חזרה
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── הרשמה חדשה ── */}
            {mode === "register" && (
              <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">שם פרטי</Label>
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        placeholder="שם פרטי"
                        className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 focus:border-gold-400/50 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">שם משפחה</Label>
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)}
                        placeholder="שם משפחה"
                        className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 focus:border-gold-400/50 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">טלפון</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="050-0000000" type="tel" dir="ltr"
                      className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 focus:border-gold-400/50 h-12 text-left" />
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

                  <Button type="submit" disabled={regLoading}
                    className="w-full bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-lg h-14 rounded-xl glow-gold">
                    {regLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "הרשמה"}
                  </Button>

                  <button type="button" onClick={() => setMode("choose")}
                    className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors py-2">
                    חזרה
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
