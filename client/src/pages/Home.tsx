/* Design: Royal Blue & Gold - matching Noam Tzvia logo */

import { Button } from "@/components/ui/button";
import { IMAGES, TRACKS } from "@/lib/data";
import { useStudent } from "@/contexts/StudentContext";
import { motion } from "framer-motion";
import { BookOpen, Trophy, ChevronLeft, Star, Shield, Zap, GraduationCap, Users, LogIn, ArrowLeft, Calendar, BookMarked } from "lucide-react";
import { EXAM_CONFIGS } from "@/lib/examConfig";
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
  const { student, selectedTrack } = useStudent();

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
            <button onClick={() => navigate("/admin")}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-gray-500 text-xs hover:bg-white/10 hover:text-gray-300 transition-all">
              <Shield className="h-3.5 w-3.5" />
              <span className="hidden sm:block">מנהל</span>
            </button>
          </div>
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
            <h2 className="font-display text-4xl text-white mb-4">למה להשתתף?</h2>
            <p className="text-gray-400 text-lg">מבצע הלכות פסח ברחבי רשת נעם צביה</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <BookOpen className="h-7 w-7" />, title: "חומר מסודר", desc: "פרקים מתוך פניני הלכה של הרב אליעזר מלמד", color: "text-royal-300" },
              { icon: <Trophy className="h-7 w-7" />, title: "מבחנים מרובים", desc: "כל מסלול מחולק לכמה מבחנים לאורך התקופה", color: "text-gold-400" },
              { icon: <Star className="h-7 w-7" />, title: "הצטיינות", desc: "ציון 95% ומעלה מקנה תעודת הצטיינות", color: "text-amber-400" },
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
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-gray-500 text-xs">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
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
              מוכנים לאתגר?
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
