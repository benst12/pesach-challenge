/* Design: Royal Blue & Gold - matching Noam Tzvia logo */

import { Button } from "@/components/ui/button";
import { IMAGES, TRACKS } from "@/lib/data";
import { motion } from "framer-motion";
import { BookOpen, Trophy, ChevronLeft, Star, Shield, Zap, GraduationCap, Users } from "lucide-react";
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

// Logo with halo glow so it's always visible on dark backgrounds
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

  return (
    <div className="min-h-screen overflow-hidden" dir="rtl">

      {/* ── Top identity bar ── */}
      <div className="bg-gradient-to-l from-[#0a1628] to-[#0c1a33] border-b border-gold-400/20 py-3">
        <div className="container flex items-center justify-center gap-5">
          <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-10 w-auto" />
          <div className="w-px h-7 bg-gold-400/25" />
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
          >
            <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-8 w-auto" />
          </motion.div>
          <div className="w-px h-7 bg-gold-400/25" />
          <span className="text-gold-300/80 text-sm font-medium hidden sm:block">רשת נעם צביה – ישיבות ואולפנות ברחבי הארץ</span>
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

            {/* Logos panel */}
            <motion.div variants={fadeInUp} custom={0} className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center gap-5 bg-white/5 backdrop-blur-md border border-gold-400/20 rounded-2xl px-6 py-4 shadow-[0_0_50px_rgba(212,160,23,0.08)]">
                <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-20 sm:h-24 w-auto" />
                <div className="w-px h-16 bg-gold-400/25" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.2, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.7, type: "spring", stiffness: 160, damping: 10 }}
                >
                  <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-16 sm:h-20 w-auto" />
                </motion.div>
              </div>
            </motion.div>

            {/* Big announcement banner */}
            <motion.div variants={fadeInUp} custom={1} className="mb-6 relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-l from-gold-500/20 via-royal-500/15 to-gold-500/20" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="relative border-2 border-gold-400/50 rounded-2xl px-6 py-5 bg-[#0c1a33]/70 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-gold-400 flex-shrink-0" />
                  <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">רשת נעם צביה</span>
                  <Users className="h-5 w-5 text-gold-400 flex-shrink-0" />
                </div>
                <p className="text-white font-bold text-xl sm:text-2xl leading-snug text-center">
                  ✨ ותן בליבנו – רשת נעם צביה לומדת ומתכוננת לפסח
                </p>
                <p className="text-gold-200 text-base sm:text-lg font-semibold text-center mt-1">
                  יחד עם תלמידי ותלמידות הישיבות והאולפנות
                </p>
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} custom={2} className="font-display text-5xl sm:text-6xl lg:text-7xl leading-tight mb-4">
              <span className="text-gradient-gold">מבצע</span>
              <br />
              <span className="text-white">שאגת הארי</span>
            </motion.h1>

            <motion.p variants={fadeInUp} custom={3} className="text-xl sm:text-2xl text-gold-300/80 mb-3 font-light">
              הלכות פסח מתוך פניני הלכה
            </motion.p>

            <motion.div variants={fadeInUp} custom={4} className="bg-gold-500/10 border border-gold-400/20 rounded-xl px-5 py-3 mb-6 max-w-lg mx-auto lg:mx-0">
              <p className="text-gold-300 text-sm sm:text-base font-medium leading-relaxed">
                הלימוד להצלחת ולניצחון עם ישראל וצבא ההגנה לישראל במבצע שאגת הארי
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} custom={5} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => navigate("/register")}
                className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-lg px-8 py-6 rounded-xl glow-gold transition-all duration-300 hover:scale-105">
                <GraduationCap className="ml-2 h-5 w-5" />
                הרשמה למבצע
              </Button>
              <Button size="lg" variant="outline"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="border-gold-400/30 text-gold-400 hover:bg-gold-400/10 font-bold text-lg px-8 py-6 rounded-xl">
                איך זה עובד?
              </Button>
            </motion.div>
          </motion.div>

          {/* Lion with radial fade */}
          <motion.div className="flex-1 max-w-md lg:max-w-lg"
            initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}>
            <img src={IMAGES.heroLion} alt="אריה שואג"
              className="w-full drop-shadow-[0_0_60px_rgba(212,160,23,0.3)]"
              style={{
                maskImage: "radial-gradient(ellipse 78% 78% at 50% 50%, black 35%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 78% 78% at 50% 50%, black 35%, transparent 100%)",
              }} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg viewBox="0 0 1440 96" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 96L1440 0V96H0Z" fill="#0c1a33" />
          </svg>
        </div>
      </section>

      {/* ── Network identity strip ── */}
      <section className="py-10 bg-gradient-to-l from-[#0a1628] to-[#0c1a33] border-y border-gold-400/10">
        <div className="container">
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-16 w-auto" />
            <div>
              <p className="text-white font-bold text-xl sm:text-2xl font-display mb-1">רשת נעם צביה</p>
              <p className="text-gold-300/80 text-base">ישיבות ואולפנות ברחבי הארץ לומדות ומתחרות יחד</p>
            </div>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
              <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-14 w-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 bg-[#0c1a33]">
        <div className="container">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeInUp} custom={0} className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-2">רשת נעם צביה – מבצע שאגת הארי</motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="font-display text-4xl sm:text-5xl text-white mb-4">
              איך זה <span className="text-gold-400">עובד?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-gray-400 text-lg max-w-2xl mx-auto">שלושה שלבים פשוטים ואתם בדרך להצלחה</motion.p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            {[
              { icon: <Zap className="h-8 w-8" />, title: "נרשמים", desc: "מלאו את הפרטים ובחרו מסלול לפי הכיתה שלכם", num: "01" },
              { icon: <BookOpen className="h-8 w-8" />, title: "לומדים", desc: "קראו את הפרקים הרלוונטיים מתוך פניני הלכה", num: "02" },
              { icon: <Trophy className="h-8 w-8" />, title: "נבחנים וזוכים", desc: "עברו את המבחן בהצלחה וקבלו פרסים מגניבים", num: "03" },
            ].map((step, i) => (
              <motion.div key={i} variants={scaleIn} custom={i} className="relative group">
                <div className="bg-gradient-to-b from-[#12243f] to-[#0c1a33] border border-royal-400/10 rounded-2xl p-8 text-center hover:border-gold-400/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute -top-4 right-6 font-display text-6xl text-gold-500/10 group-hover:text-gold-500/20 transition-colors">{step.num}</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-royal-500/30 to-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                  <h3 className="font-display text-2xl text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Prizes ── */}
      <section className="py-20 bg-[#0a1628]">
        <div className="container">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeInUp} custom={0} className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-2">מבצע שאגת הארי | רשת נעם צביה</motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="font-display text-4xl sm:text-5xl text-white mb-4">
              פרסים <span className="text-gold-400">מגניבים</span>
            </motion.h2>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={scaleIn} custom={0}>
              <div className="bg-gradient-to-br from-[#12243f] to-[#0f1f3a] border border-royal-400/20 rounded-2xl p-8 hover:border-gold-400/30 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-400 to-royal-600 flex items-center justify-center"><Shield className="h-7 w-7 text-white" /></div>
                  <div><h3 className="font-display text-2xl text-white">פרס בסיסי</h3><p className="text-gold-400 font-medium">ציון 80% ומעלה</p></div>
                </div>
                <p className="text-gray-300 leading-relaxed">כל מי שעובר את המבחן בציון 80% ומעלה מקבל פרס מגניב!</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} custom={1}>
              <div className="bg-gradient-to-br from-[#1a2a10] to-[#0f1f3a] border border-gold-500/20 rounded-2xl p-8 hover:border-gold-500/40 transition-all duration-500 glow-gold">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center"><Star className="h-7 w-7 text-white" /></div>
                  <div><h3 className="font-display text-2xl text-white">פרס הצטיינות</h3><p className="text-gold-500 font-medium">ציון 95% ומעלה</p></div>
                </div>
                <p className="text-gray-300 leading-relaxed">המצטיינים שמשיגים 95% ומעלה זוכים בפרס מיוחד ויוקרתי!</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="flex justify-center mt-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <img src={IMAGES.trophy} alt="גביע" className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(212,160,23,0.3)]" />
          </motion.div>
        </div>
      </section>

      {/* ── Tracks ── */}
      <section className="py-20 bg-[#0c1a33]">
        <div className="container">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeInUp} custom={0} className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-2">רשת נעם צביה – ישיבות ואולפנות</motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="font-display text-4xl sm:text-5xl text-white mb-4">
              בחרו את <span className="text-gold-400">המסלול</span> שלכם
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-gray-400 text-lg">4 מסלולים לפי רמת הכיתה</motion.p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            {TRACKS.map((track, i) => {
              const chapterNums = track.chapters.map(ch => getChapterNum(ch.name)).filter(Boolean);
              return (
                <motion.div key={track.id} variants={scaleIn} custom={i} className="group cursor-pointer" onClick={() => navigate("/register")}>
                  <div className="bg-gradient-to-b from-[#12243f] to-[#0c1a33] border border-royal-400/10 rounded-2xl p-6 text-center hover:border-gold-400/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(212,160,23,0.12)]">
                    <div className="text-5xl mb-4">{track.icon}</div>
                    <h3 className="font-display text-xl text-white mb-2">{track.name}</h3>
                    <p className="text-gold-400/80 text-sm mb-2">כיתות {track.grades}</p>
                    <p className="text-gray-500 text-sm mb-2">{track.chapters.length} פרקים</p>
                    <p className="text-royal-300 text-xs font-medium">פרקים: {chapterNums.join(" , ")}</p>
                    <div className="mt-4 flex items-center justify-center gap-1 text-gold-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronLeft className="h-4 w-4" /><span>להרשמה</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a33] via-transparent to-[#0c1a33]" />
        </div>
        <motion.div className="container relative z-10 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} custom={0} className="mb-8 flex items-center justify-center">
            <div className="flex items-center gap-5 bg-white/5 backdrop-blur-md border border-gold-400/25 rounded-2xl px-6 py-4">
              <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-16 w-auto" />
              <div className="w-px h-12 bg-gold-400/30" />
              <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-12 w-auto" />
            </div>
          </motion.div>
          <motion.p variants={fadeInUp} custom={1} className="text-gold-400 font-bold text-sm uppercase tracking-widest mb-3">רשת נעם צביה – מבצע שאגת הארי</motion.p>
          <motion.h2 variants={fadeInUp} custom={2} className="font-display text-4xl sm:text-5xl text-white mb-6">
            מוכנים <span className="text-gradient-gold">להתחיל?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} custom={3} className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">הצטרפו למבצע שאגת הארי והוכיחו שאתם שולטים בהלכות פסח!</motion.p>
          <motion.div variants={fadeInUp} custom={4}>
            <Button size="lg" onClick={() => navigate("/register")}
              className="bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-[#0c1a33] font-bold text-xl px-10 py-7 rounded-xl glow-gold-strong transition-all duration-300 hover:scale-105">
              <GraduationCap className="ml-2 h-6 w-6" />
              הרשמה עכשיו!
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-white/5 bg-[#0c1a33]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LogoWithHalo src={IMAGES.logo} alt="רשת נעם צביה" className="h-10 w-auto opacity-80" />
            <div className="w-px h-8 bg-white/10" />
            <LogoWithHalo src={IMAGES.vetenBelibenu} alt="ותן בליבנו" className="h-8 w-auto opacity-70" />
            <p className="text-gray-500 text-sm">מבצע שאגת הארי – רשת נעם צביה</p>
          </div>
          <p className="text-gray-600 text-xs">הלכות פסח מתוך פניני הלכה של הרב אליעזר מלמד</p>
        </div>
      </footer>
    </div>
  );
}
