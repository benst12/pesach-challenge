/* Design: Royal Blue & Gold - matching Noam Tzvia logo */

import { Button } from "@/components/ui/button";
import { IMAGES, TRACKS } from "@/lib/data";
import { getDailyQuestions, getTodayKeyFromDayIndex, toHebrewDate } from "@/lib/dailyUtils";
import { useStudent } from "@/contexts/StudentContext";
import { motion } from "framer-motion";
import { BookOpen, Trophy, ChevronLeft, Star, Shield, Zap, GraduationCap, Users, LogIn, ArrowLeft, Calendar, BookMarked, LogOut } from "lucide-react";
import { EXAM_CONFIGS } from "@/lib/examConfig";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

function getChapterNum(name: string): string {
  const match = name.match(/פרק\s+([א-ת"]+)/);
  return match ? match[1] : "";
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.5, type: "spring" as const, stiffness: 200 } }),
};

function LogoWithHalo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="absolute inset-0 rounded-xl bg-white/25 blur-2xl scale-150 pointer-events-none" />
      <div className="absolute inset-0 rounded-xl bg-gold-400/15 blur-xl scale-125 pointer-events-none" />
      <img src={src} alt={alt} className={`relative brightness-125 drop-shadow-[0_2px_16px_rgba(255,255,255,0.4)] ${className ?? ""}`} />
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();
  const { student, selectedTrack, setStudent, setSelectedTrack } = useStudent();
  const [stats, setStats] = useState<{ total: number; topSchools: { name: string; count: number }[]; trackCounts: Record<string, number> } | null>(null);
  const [dailyQs, setDailyQs] = useState<any[]>([]);
  const [dailyLoaded, setDailyLoaded] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [hebrewDate, setHebrewDate] = useState("");
  const [daysToSeder, setDaysToSeder] = useState<number | null>(null);

  useEffect(() => {
    // ליל הסדר תשפ"ו = 12 באפריל 2026
    const seder = new Date("2026-04-12T00:00:00");
    const today = new Date();
    today.setHours(0,0,0,0);
    const diff = Math.ceil((seder.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysToSeder(diff > 0 ? diff : 0);

    setHebrewDate(toHebrewDate(today));
  }, []);

  useEffect(() => {
    const picked = getDailyQuestions();
    setDailyQs(picked);
    setDailyLoaded(true);
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await supabase.from("students").select("school_name, track_id");
        if (!data) return;
        const total = data.length;
        const counts: Record<string, number> = {};
        data.forEach((s: any) => { if (s.school_name) counts[s.school_name] = (counts[s.school_name] || 0) + 1; });
        const topSchools = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }));
        const trackCounts: Record<string, number> = {};
        data.forEach((s: any) => { if (s.track_id) trackCounts[s.track_id] = (trackCounts[s.track_id] || 0) + 1; });
        setStats({ total, topSchools, trackCounts });

        // לוח מובילים אתגר יומי — מסופאבייס
        const { data: scoreData } = await supabase
          .from("scores")
          .select("student_id, correct_answers, total_questions")
          .eq("stage_title", "אתגר יומי");
        if (scoreData && scoreData.length > 0) {
          const totals: Record<string, number> = {};
          scoreData.forEach((s: any) => { totals[s.student_id] = (totals[s.student_id] || 0) + (s.correct_answers || 0); });
          const { data: studData } = await supabase
            .from("students")
            .select("id, first_name, last_name, grade, school_name")
            .in("id", Object.keys(totals));
          if (studData) {
            const board = studData
              .map((s: any) => ({ ...s, total: totals[s.id] || 0 }))
              .sort((a: any, b: any) => b.total - a.total)
              .slice(0, 10);
            setLeaderboard(board);
          }
        }
      } catch {}
    };
    loadStats();
  }, []);

  const handleLogout = () => {
    setStudent(null);
    setSelectedTrack(null);
    localStorage.removeItem("pesach_student");
    localStorage.removeItem("pesach_track");
    localStorage.removeItem("pesach_study_completed");
  };

  // כפתור חכם — אם מחובר מציג המשך, אחרת הרשמה
  const MainCTA = () => {
    if (student && selectedTrack) {
      return (
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <Button size="lg"
            onClick={() => navigate("/materials")}
            className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-lg px-8 py-6 rounded-xl glow-gold">
            <ArrowLeft className="ml-2 h-5 w-5" />
            המשך ל{selectedTrack.name}
          </Button>
          <Button size="lg" variant="outline"
            onClick={() => navigate("/register")}
            className="border-gold-400/30 text-gold-400 hover:bg-gold-400/10 px-8 py-6 rounded-xl text-lg">
            <LogIn className="ml-2 h-5 w-5" />
            כניסה / החלפת משתמש
          </Button>
        </div>
      );
    }
    return (
      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
        <Button size="lg"
          onClick={() => navigate("/register")}
          className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-lg px-8 py-6 rounded-xl glow-gold">
          <GraduationCap className="ml-2 h-5 w-5" />
          הרשמה למבצע
        </Button>
        <Button size="lg" variant="outline"
          onClick={() => navigate("/register")}
          className="border-gold-400/30 text-gold-400 hover:bg-gold-400/10 px-8 py-6 rounded-xl text-lg">
          <LogIn className="ml-2 h-5 w-5" />
          כבר נרשמתי — כניסה
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden" dir="rtl">

      {/* ── Top identity bar ── */}
      <div className="bg-gradient-to-l from-[#0a1628] to-[#0c1a33] border-b border-gold-400/20 py-3">
        <div className="container flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-10 w-auto" />
            <div className="w-px h-7 bg-gold-400/25" />
            <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}>
              <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-8 w-auto" />
            </motion.div>
            <div className="w-px h-7 bg-gold-400/25 hidden sm:block" />
            <span className="text-gold-300/80 text-sm font-medium hidden sm:block">רשת נעם צביה – ישיבות ואולפנות ברחבי הארץ</span>
          </div>

          {/* כפתורים בפס העליון */}
          <div className="flex items-center gap-2">
            {student ? (
              <button onClick={() => navigate("/materials")}
                className="flex items-center gap-2 bg-gold-500/10 border border-gold-400/25 rounded-xl px-4 py-2 text-gold-400 text-sm font-medium hover:bg-gold-500/20 transition-all">
                <span>שלום, {student.firstName}</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-gray-300 text-sm hover:bg-white/10 transition-all">
                <LogIn className="h-4 w-4" />
                <span>כניסה</span>
              </button>
            )}
            {student && (
              <button onClick={handleLogout}
                className="flex items-center gap-2 bg-red-900/20 border border-red-500/20 rounded-xl px-3 py-2 text-red-400 text-xs hover:bg-red-900/30 transition-all">
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:block">התנתק</span>
              </button>
            )}
            <button onClick={() => navigate("/admin")}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-gray-500 text-xs hover:bg-white/10 hover:text-gray-300 transition-all">
              <Shield className="h-3.5 w-3.5" />
              <span className="hidden sm:block">מנהל</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── תאריך עברי + ספירה לאחור ── */}
      <div className="bg-[#080f1e] border-b border-gold-400/10 py-3">
        <div className="container flex items-center justify-center gap-6 flex-wrap">
          {hebrewDate && (
            <div className="flex items-center gap-2">
              <span className="text-gold-400/60 text-sm">📅</span>
              <span className="text-white font-bold text-base">{hebrewDate}</span>
            </div>
          )}
          {hebrewDate && daysToSeder !== null && <div className="w-px h-6 bg-gold-400/20" />}
          {daysToSeder !== null && (
            <div className="flex items-center gap-3">
              {daysToSeder === 0 ? (
                <span className="text-gold-400 font-bold text-xl animate-pulse">🎉 הלילה ליל הסדר!</span>
              ) : (
                <>
                  <span className="text-gray-400 text-sm">עד ליל הסדר:</span>
                  <span className="text-gold-400 font-bold text-2xl">{daysToSeder}</span>
                  <span className="text-gray-400 text-sm">ימים</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a33]/85 via-[#0f1f3d]/70 to-[#0c1a33]" />
        </div>

        <div className="relative z-10 container flex flex-col lg:flex-row items-center gap-8 py-20">
          <motion.div className="flex-1 text-center lg:text-right" initial="hidden" animate="visible">

            <motion.div variants={fadeInUp} custom={0} className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center gap-5 bg-white/5 backdrop-blur-md border border-gold-400/20 rounded-2xl px-6 py-4 shadow-[0_0_50px_rgba(212,160,23,0.08)]">
                <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-20 sm:h-24 w-auto" />
                <div className="w-px h-16 bg-gold-400/25" />
                <motion.div initial={{ opacity: 0, scale: 0.2, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7, type: "spring", stiffness: 160, damping: 10 }}>
                  <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-16 sm:h-20 w-auto" />
                </motion.div>
              </div>
            </motion.div>

            {/* Banner */}
            <motion.div variants={fadeInUp} custom={0.5}
              className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-400/25 rounded-full px-4 py-1.5 mb-6">
              <Star className="h-3.5 w-3.5 text-gold-400" />
              <span className="text-gold-300 text-sm font-medium">✨ ותן בליבנו – רשת נעם צביה לומדת ומתכוננת לפסח</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} custom={1} className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-4">
              מבצע
              <span className="block text-gradient-gold">שאגת הארי</span>
            </motion.h1>

            <motion.p variants={fadeInUp} custom={2} className="text-gray-300 text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              אתגר הלכות פסח לתלמידי רשת נעם צביה
              <br />
              <span className="text-gold-400">למד, התאמן, והצטיין!</span>
            </motion.p>

            {/* כפתור ראשי חכם */}
            <motion.div variants={fadeInUp} custom={3}>
              <MainCTA />
            </motion.div>

          </motion.div>

          {/* Lion */}
          <motion.div className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-3xl scale-125" />
              <img src={IMAGES.heroLion} alt="אריה שואג"
                className="relative w-72 sm:w-96 lg:w-[480px] drop-shadow-[0_0_60px_rgba(212,160,23,0.4)] hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-gradient-to-b from-[#0c1a33] to-[#0a1628]">
        <div className="container">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl text-white mb-4">מה מקבלים במבצע?</h2>
            <p className="text-gray-400 text-lg">כל מה שצריך ללמוד, להתאמן ולהצליח בהלכות פסח</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <BookOpen className="h-7 w-7" />, title: "חומר לימוד מסודר", desc: "פרקים נבחרים מפניני הלכה של הרב אליעזר מלמד, עם קישורים ישירים לכל פרק", color: "text-royal-300" },
              { icon: <Trophy className="h-7 w-7" />, title: "מבחנים + תעודות", desc: "מבחן אמריקאי, 25 דקות, עובר 80% מקבל תעודת הצלחה, עובר 95% מקבל תעודת הצטיינות", color: "text-gold-400" },
              { icon: <Star className="h-7 w-7" />, title: "4 מסלולים לפי כיתה", desc: "כל תלמיד בוחר מסלול המתאים לכיתה שלו – מכיתה ה׳ ועד י״ב, כולל מסלול זהב מורחב", color: "text-amber-400" },
            ].map((f, i) => (
              <motion.div key={i} className="bg-[#12243f] border border-royal-400/10 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className={`${f.color} flex justify-center mb-4`}>{f.icon}</div>
                <h3 className="font-display text-xl text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── לוח מובילים אתגר יומי ── */}
      {leaderboard.length > 0 && (
        <section className="py-10 bg-[#0a1628]">
          <div className="container max-w-3xl">
            <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-400/25 rounded-full px-4 py-1.5 mb-2">
                <Trophy className="h-4 w-4 text-gold-400" />
                <span className="text-gold-300 font-bold text-sm">מצטייני האתגר היומי</span>
              </div>
              <p className="text-gray-500 text-xs">הכי הרבה תשובות נכונות מצטברות</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {leaderboard.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border ${
                    i === 0 ? "bg-gold-500/10 border-gold-400/30" :
                    i === 1 ? "bg-gray-400/5 border-gray-400/15" :
                    i === 2 ? "bg-amber-700/10 border-amber-600/15" :
                    "bg-[#12243f] border-royal-400/10"
                  }`}>
                  <span className="text-base flex-shrink-0">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span className="text-gray-500 text-xs font-bold w-4 text-center">{i+1}</span>}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold truncate">{s.first_name} {s.last_name}</p>
                    <p className="text-gray-500 text-[10px] truncate">{s.school_name} • {s.grade}</p>
                  </div>
                  <span className={`font-bold text-sm flex-shrink-0 ${i < 3 ? "text-gold-400" : "text-gray-400"}`}>{s.total}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── אתגר יומי בדף הבית ── */}
      <section className="py-16 bg-gradient-to-b from-[#0c1a33] to-[#0a1628]">
        <div className="container max-w-3xl">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-400/25 rounded-full px-4 py-1.5 mb-4">
              <span className="text-gold-400">⚡</span>
              <span className="text-gold-300 font-bold">אתגר יומי</span>
            </div>
            <h2 className="font-display text-4xl text-white mb-2">3 שאלות של היום</h2>
            <p className="text-gray-400">היכנס לאזור האישי שלך כדי לענות ולראות תוצאות</p>
          </motion.div>

          {dailyQs.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-6">
              <div className="space-y-6">
                {dailyQs.map((q: any, qi: number) => (
                  <div key={qi} className={qi > 0 ? "pt-6 border-t border-royal-400/10" : ""}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 text-sm font-bold flex items-center justify-center">{qi + 1}</span>
                      <span className="text-gray-500 text-xs">{q.chapter}</span>
                    </div>
                    <p className="text-white font-bold text-lg leading-relaxed">{q.question}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button onClick={() => navigate(student ? "/daily" : "/register")}
                  className="bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold px-8 py-3 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all">
                  {student ? "ענה על האתגר ←" : "הירשם וענה ←"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a33] via-[#0c1a33]/80 to-[#0c1a33]" />
        </div>
        <div className="relative z-10 container text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-16 w-auto" />
              <div className="w-px h-12 bg-gold-400/25" />
              <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-12 w-auto" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
              הצטרפו למבצע שאגת הארי!
            </h2>
            <p className="text-gray-400 text-lg mb-8">הצטרפו למאות תלמידים ברחבי הארץ</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {student ? (
                <Button size="lg" onClick={() => navigate("/materials")}
                  className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-xl px-10 py-7 rounded-xl glow-gold">
                  <ArrowLeft className="ml-2 h-6 w-6" />
                  המשך ל{selectedTrack?.name ?? "המסלול שלי"}
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={() => navigate("/register")}
                    className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-xl px-10 py-7 rounded-xl glow-gold">
                    <GraduationCap className="ml-2 h-6 w-6" />
                    הרשמה עכשיו!
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/register")}
                    className="border-gold-400/30 text-gold-400 hover:bg-gold-400/10 px-10 py-7 rounded-xl text-xl">
                    <LogIn className="ml-2 h-6 w-6" />
                    כבר נרשמתי
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── סטטיסטיקות נרשמים ── */}
      {stats && stats.total > 0 && (
        <section className="py-12 bg-[#0a1628]">
          <div className="container">
            <motion.div className="bg-gradient-to-l from-[#12243f] to-[#0f1f3a] border border-gold-400/15 rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {/* שורה עליונה: מונה + מסלולים */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* מונה כללי */}
                <div className="text-center bg-[#0c1a33] rounded-2xl p-6">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="font-display text-7xl text-gold-400 mb-2">{stats.total}</motion.div>
                  <p className="text-gray-300 text-lg font-medium">תלמידים נרשמו למבצע</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm">רישום פעיל</span>
                  </div>
                </div>

                {/* נרשמים לפי מסלול */}
                {stats.trackCounts && (
                  <div className="bg-[#0c1a33] rounded-2xl p-5">
                    <p className="text-gray-400 text-sm font-medium mb-4">נרשמים לפי מסלול</p>
                    <div className="space-y-3">
                      {TRACKS.map(track => {
                        const count = stats.trackCounts[track.id] || 0;
                        const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                        return (
                          <div key={track.id} className="flex items-center gap-3">
                            <span className="text-xl w-7 text-center">{track.icon}</span>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-white text-sm font-medium">{track.name}</span>
                                <span className="text-gold-400 text-sm font-bold">{count}</span>
                              </div>
                              <div className="h-2 bg-[#12243f] rounded-full overflow-hidden">
                                <motion.div className="h-full bg-gradient-to-l from-gold-500 to-gold-400 rounded-full"
                                  initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                                  viewport={{ once: true }} transition={{ duration: 0.8 }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* שורה תחתונה: מוסדות */}
              <div className="bg-[#0c1a33] rounded-2xl p-5">
                <p className="text-gray-400 text-sm font-medium mb-4">5 המוסדות המובילים</p>
                <div className="space-y-3">
                  {stats.topSchools.map((school, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-gold-400 font-bold text-lg w-6 text-center">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-base font-medium">{school.name}</span>
                          <span className="text-gray-300 text-sm font-bold">{school.count}</span>
                        </div>
                        <div className="h-2 bg-[#12243f] rounded-full overflow-hidden">
                          <motion.div className="h-full bg-gradient-to-l from-gold-500 to-gold-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(school.count / stats.topSchools[0].count) * 100}%` }}
                            viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

            {/* ── Tracks ── */}
      <section className="py-20 bg-[#0a1628]">
        <div className="container">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl text-white mb-4">המסלולים</h2>
            <p className="text-gray-400">בחר את המסלול המתאים לכיתה שלך</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {TRACKS.map((track, i) => {
              const chapterNums = track.chapters.map(ch => getChapterNum(ch.name)).filter(Boolean);
              return (
                <motion.div key={track.id} variants={scaleIn} custom={i}
                  className="group cursor-pointer"
                  onClick={() => navigate("/register")}>
                  <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-5 hover:border-gold-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(212,160,23,0.12)]">
                    <div className="text-4xl mb-3 text-center">{track.icon}</div>
                    <h3 className="font-display text-lg text-white text-center mb-1">{track.name}</h3>
                    <p className="text-gold-400/70 text-center text-xs mb-2">כיתות {track.grades}</p>
                    <p className="text-gray-500 text-center text-xs mb-3">פרקים: {chapterNums.join(" , ")}</p>
                    <div className="text-center">
                      <span className="inline-flex items-center gap-1 text-gold-400 text-xs font-medium group-hover:text-gold-300">
                        <ChevronLeft className="h-4 w-4" /><span>להרשמה</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* ── לוח מבחנים ── */}
      <section className="py-20 bg-gradient-to-b from-[#0a1628] to-[#0c1a33]">
        <div className="container">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-400/25 rounded-full px-4 py-1.5 mb-4">
              <Calendar className="h-4 w-4 text-gold-400" />
              <span className="text-gold-300 text-sm font-medium">לוח מבחנים</span>
            </div>
            <h2 className="font-display text-4xl text-white mb-3">תאריכים וחומר לימוד</h2>
            <p className="text-gray-400">כל מסלול מחולק למבחנים עם תאריכים קבועים מראש</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {EXAM_CONFIGS.map((tc, ti) => {
              const track = TRACKS.find(t => t.id === tc.trackId);
              if (!track) return null;
              const colors = [
                "from-blue-900/30 to-blue-800/10 border-blue-400/20",
                "from-orange-900/30 to-orange-800/10 border-orange-400/20",
                "from-purple-900/30 to-purple-800/10 border-purple-400/20",
                "from-gold-900/30 to-gold-800/10 border-gold-400/30",
              ];
              const dotColors = ["bg-blue-400", "bg-orange-400", "bg-purple-400", "bg-gold-400"];
              return (
                <motion.div key={tc.trackId}
                  className={`bg-gradient-to-b ${colors[ti]} border rounded-2xl overflow-hidden`}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: ti * 0.1 }}>
                  {/* כותרת מסלול */}
                  <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                    <span className="text-2xl">{track.icon}</span>
                    <div>
                      <h3 className="text-white font-bold">{track.name}</h3>
                      <p className="text-gray-400 text-xs">כיתות {track.grades} • {tc.stages.length} מבחנים</p>
                    </div>
                  </div>
                  {/* מבחנים */}
                  <div className="p-4 space-y-4">
                    {tc.stages.map((stage, si) => (
                      <div key={si} className="flex gap-3">
                        {/* קו ציר זמן */}
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${dotColors[ti]}`} />
                          {si < tc.stages.length - 1 && <div className="w-px flex-1 bg-white/10 my-1" />}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-semibold text-sm">{stage.title}</span>
                            <span className="text-gray-400 text-xs bg-white/5 px-2 py-0.5 rounded-full">
                              {stage.dateShort}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {stage.chapterNames.map((ch, ci) => (
                              <span key={ci}
                                className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                                {ch.name.split(" – ")[0]}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* פרטי המבחן + הערה */}
          <motion.div className="mt-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

            {/* כרטיסי פורמט */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: "📝", label: "פורמט", value: "אמריקאי – בחירה מרובה" },
                { icon: "❓", label: "שאלות", value: "15–20 שאלות לכל מבחן" },
                { icon: "⏱️", label: "זמן", value: "25 דקות לכל מבחן" },
                { icon: "✅", label: "עמידה", value: "80% לעבור | 95% הצטיינות" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-5 py-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="text-white text-lg font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-xs text-center">
              * תאריכי המבחנים בתשפ"ו – המבחן נפתח ביום הקבוע ונסגר לפי הנחיית המנהל
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080f1e] border-t border-royal-400/10 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-10 w-auto opacity-80" />
            <div className="w-px h-6 bg-gold-400/20" />
            <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-8 w-auto opacity-70" />
          </div>
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} רשת נעם צביה – כל הזכויות שמורות
          </p>
        </div>
      </footer>

    </div>
  );
}
