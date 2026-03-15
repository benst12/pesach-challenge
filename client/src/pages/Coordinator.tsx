/* Coordinator dashboard — כמו Admin ללא פתיחת מבחנים */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COORDINATOR_PASSWORD, IMAGES, TRACKS } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Lock, Users, Award, Star, Search, ArrowRight,
  Download, Trash2, RefreshCw, AlertTriangle,
  MessageCircle, FileText, Send, BookUser
} from "lucide-react";

interface StudentResult {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  school_name: string;
  grade: string;
  track_id: string;
  results: { score: number; passed: boolean; stage_title?: string }[];
}

export default function Coordinator() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [students, setStudents] = useState<StudentResult[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "school" | "score">("name");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [waMessage, setWaMessage] = useState("שלום! 👋\nתזכורת מאיתנו – מבצע שאגת הארי.\nזוכרים ללמוד את החומר ולהתכונן למבחן הקרוב! 🦁\nבהצלחה, רשת נעם צביה");
  const [reportSchool, setReportSchool] = useState("");
  const [waSearch, setWaSearch] = useState("");
  const [personalMsg, setPersonalMsg] = useState(true);
  const [previewWinners, setPreviewWinners] = useState<{elementary:any,yeshiva:any,ulpana:any} | null>(null);
  const [previewCountdown, setPreviewCountdown] = useState("");

  const getTrackName = (trackId: string) => TRACKS.find(t => t.id === trackId)?.name || "—";

  const loadStudents = async () => {
    setLoading(true);
    try {
      const { data: studentsData } = await supabase
        .from("students")
        .select("id, first_name, last_name, phone, school_name, grade, track_id")
        .order("first_name", { ascending: true });

      const { data: scoresData } = await supabase
        .from("scores")
        .select("student_id, score, quiz_id, created_at, stage_title");

      if (studentsData) {
        const merged = studentsData.map((s: any) => ({
          ...s,
          results: (scoresData || [])
            .filter((r: any) => r.student_id === s.id)
            .map((r: any) => ({
              score: r.score,
              passed: r.score >= 80,
              stage_title: r.stage_title,
            })),
        }));
        setStudents(merged);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calcPreviewWinners = async () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { data: todayScores } = await supabase
      .from("scores")
      .select("student_id, correct_answers")
      .eq("stage_title", "אתגר יומי")
      .eq("correct_answers", 3)
      .gte("created_at", todayStart.toISOString());
    if (!todayScores?.length) {
      toast("אין עדיין תלמידים שענו נכון על כל השאלות היום");
      return;
    }
    const ids = [...new Set(todayScores.map((s: any) => s.student_id))];
    const { data: studs } = await supabase
      .from("students")
      .select("id, first_name, last_name, school_name, grade")
      .in("id", ids);
    if (!studs?.length) return;
    const pick = (arr: any[]) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
    setPreviewWinners({
      elementary: pick(studs.filter((s: any) => s.school_name?.startsWith("נעם"))),
      yeshiva: pick(studs.filter((s: any) => s.school_name?.includes("ישיבת"))),
      ulpana: pick(studs.filter((s: any) => s.school_name?.includes("אולפנת"))),
    });
  };

  useEffect(() => {
    if (!authenticated) return;
    const check = () => {
      const now = new Date();
      if (now.getHours() >= 18) calcPreviewWinners();
      const next20 = new Date(now);
      next20.setHours(20, 0, 0, 0);
      if (now >= next20) next20.setDate(next20.getDate() + 1);
      const diff = Math.max(0, next20.getTime() - now.getTime());
      const hh = Math.floor(diff / 3600000);
      const mm = Math.floor((diff % 3600000) / 60000);
      const ss = Math.floor((diff % 60000) / 1000);
      setPreviewCountdown(
        String(hh).padStart(2, "0") + ":" +
        String(mm).padStart(2, "0") + ":" +
        String(ss).padStart(2, "0")
      );
    };
    check();
    const timer = setInterval(check, 60000);
    return () => clearInterval(timer);
  }, [authenticated]);

  const handleLogin = () => {
    if (password === COORDINATOR_PASSWORD) {
      setAuthenticated(true);
      loadStudents();
    } else {
      alert("סיסמה שגויה");
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await supabase.from("scores").delete().eq("student_id", id);
      await supabase.from("students").delete().eq("id", id);
      setStudents(prev => prev.filter(s => s.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert("שגיאה במחיקה");
    }
  };

  const exportCSV = () => {
    const header = "שם,טלפון,מוסד,כיתה,מסלול,ציון,סטטוס";
    const rows = filteredStudents.map(s => {
      const best = s.results.reduce((b, r) => r.score > (b?.score || 0) ? r : b, null as any);
      const status = best ? (best.score >= 95 ? "מצטיין" : best.passed ? "עבר" : "לא עבר") : "לא נבחן";
      return [s.first_name + " " + s.last_name, s.phone, s.school_name, s.grade, getTrackName(s.track_id), best?.score ?? "", status].join(",");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "תלמידים.csv"; a.click();
  };

  const exportWASender = (schoolName: string) => {
    const list = schoolName ? students.filter(s => s.school_name === schoolName) : students;
    const phones = list.map(s => {
      const clean = (s.phone || "").replace(/[-\s]/g, "");
      return clean.startsWith("0") ? "972" + clean.slice(1) : clean;
    }).filter(Boolean);
    const csv = "Phone\n" + phones.join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = ("wa_" + (schoolName || "כולם") + ".csv"); a.click();
  };

  const bySchool: Record<string, number> = {};
  students.forEach(s => { bySchool[s.school_name || "לא ידוע"] = (bySchool[s.school_name || "לא ידוע"] || 0) + 1; });
  const schoolStats = Object.entries(bySchool).sort((a, b) => b[1] - a[1]);

  const coordinators = students.filter(s => s.grade === "רכז מוסדי");
  const totalRegistered = students.filter(s => s.grade !== "רכז מוסדי").length;
  const tookExam = students.filter(s => s.results.length > 0).length;
  const passed = students.filter(s => s.results.some(r => r.passed)).length;
  const excellent = students.filter(s => s.results.some(r => r.score >= 95)).length;

  const filteredStudents = students
    .filter(s => s.grade !== "רכז מוסדי")
    .filter(s => {
      const q = search.toLowerCase();
      return !q || s.first_name?.toLowerCase().includes(q) || s.last_name?.toLowerCase().includes(q) || s.phone?.includes(q) || s.school_name?.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "name") return (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name, "he");
      if (sortBy === "school") return (a.school_name || "").localeCompare(b.school_name || "", "he");
      if (sortBy === "score") return (b.results[0]?.score ?? -1) - (a.results[0]?.score ?? -1);
      return 0;
    });

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center px-4">
        <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-8 text-center">
            <div className="relative mx-auto mb-4 w-fit">
              <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl" />
              <img src={IMAGES.logo} alt="רשת נעם צביה" className="relative h-14 w-auto brightness-125" />
            </div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/30 to-gold-500/20 flex items-center justify-center">
              <BookUser className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="font-display text-2xl text-white mb-6">כניסת רכז</h1>
            <Input type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="הזן סיסמה"
              className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 h-12 mb-4 text-center" />
            <Button onClick={handleLogin} className="w-full bg-gradient-to-l from-purple-500 to-purple-600 text-white font-bold h-12">
              כניסה
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1a33] py-8 px-4" dir="rtl">
      <div className="container max-w-6xl">

        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span>חזרה לדף הבית</span>
          </button>
          <img src={IMAGES.logo} alt="רשת נעם צביה" className="h-10 w-auto brightness-125" />
        </div>

        <h1 className="font-display text-3xl text-white mb-8">לוח רכזים – מבצע שאגת הארי</h1>

        {/* גרלת זוכים */}
        {new Date().getHours() >= 18 && (
          <div className="bg-gradient-to-l from-[#12243f] to-[#0f1f3a] border border-gold-400/25 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎲</span>
                <div>
                  <h3 className="text-white font-bold text-sm">תצוגה מקדימה — זוכי 20:00</h3>
                  <p className="text-gray-500 text-xs">לאימות לפני הפרסום</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs">פרסום בעוד</p>
                <p className="text-gold-400 font-mono font-bold text-sm">{previewCountdown}</p>
              </div>
            </div>
            {previewWinners ? (
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { label: "🏫 יסודי נעם", winner: previewWinners.elementary },
                  { label: "📖 ישיבה",     winner: previewWinners.yeshiva },
                  { label: "✨ אולפנה",    winner: previewWinners.ulpana },
                ].map((w, i) => (
                  <div key={i} className={"rounded-xl border p-3 text-center " + (w.winner ? "border-gold-400/30 bg-gold-500/8" : "border-gray-700/40 bg-gray-800/20")}>
                    <p className="text-gray-400 text-[10px] font-bold mb-2">{w.label}</p>
                    {w.winner ? (
                      <>
                        <p className="text-white text-xs font-bold">{w.winner.first_name} {w.winner.last_name}</p>
                        <p className="text-gray-500 text-[10px]">{w.winner.school_name}</p>
                        <p className="text-gray-600 text-[10px]">{w.winner.grade}</p>
                      </>
                    ) : (
                      <p className="text-gray-600 text-xs">אין מועמדים</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-3">טוען...</p>
            )}
            <Button onClick={calcPreviewWinners} variant="outline" size="sm"
              className="w-full border-gold-400/20 text-gold-400 hover:bg-gold-400/10 text-xs h-8 mt-2">
              רענן
            </Button>
          </div>
        )}

        {/* סטטיסטיקות */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Users className="h-6 w-6" />, label: "נרשמו", value: totalRegistered, color: "text-royal-300" },
            { icon: <Search className="h-6 w-6" />, label: "נבחנו", value: tookExam, color: "text-gold-400" },
            { icon: <Award className="h-6 w-6" />, label: "עברו (80%+)", value: passed, color: "text-green-400" },
            { icon: <Star className="h-6 w-6" />, label: "הצטיינו (95%+)", value: excellent, color: "text-gold-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#12243f] border border-royal-400/10 rounded-xl p-5">
              <div className={stat.color + " mb-2"}>{stat.icon}</div>
              <div className="font-display text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* WhatsApp + דוחות */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* WhatsApp */}
          <div className="bg-[#0f1d36] border border-green-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-5 w-5 text-green-400" />
              <h3 className="text-white font-bold text-sm">הודעת WhatsApp</h3>
            </div>
            <textarea value={waMessage} onChange={e => setWaMessage(e.target.value)} rows={3}
              className="w-full bg-[#0c1a33] border border-green-500/20 rounded-xl p-3 text-white text-xs resize-none mb-2 focus:outline-none focus:border-green-400/50" />
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input type="checkbox" checked={personalMsg} onChange={e => setPersonalMsg(e.target.checked)} className="accent-green-500 w-3.5 h-3.5" />
              <span className="text-gray-400 text-xs">הוסף "שלום [שם]" בתחילה</span>
            </label>
            <div className="flex gap-2 mb-2">
              <select value={reportSchool} onChange={e => setReportSchool(e.target.value)}
                className="flex-1 bg-[#0c1a33] border border-green-500/20 rounded-xl px-3 py-2 text-white text-xs focus:outline-none">
                <option value="">כל התלמידים</option>
                {schoolStats.map(([school, count]) => (
                  <option key={school} value={school}>{school} ({count})</option>
                ))}
              </select>
            </div>
            <input value={waSearch} onChange={e => setWaSearch(e.target.value)} placeholder="חיפוש לפי שם..."
              className="w-full bg-[#0c1a33] border border-green-500/20 rounded-xl px-3 py-2 text-white text-xs mb-3 focus:outline-none focus:border-green-400/50" />
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {students.filter(s => {
                const q = waSearch.toLowerCase();
                const nameOk = !q || (s.first_name + " " + s.last_name).toLowerCase().includes(q);
                const schoolOk = !reportSchool || s.school_name === reportSchool;
                return nameOk && schoolOk;
              }).map(s => {
                const msg = personalMsg ? ("שלום " + s.first_name + "! 👋\n" + waMessage) : waMessage;
                return (
                  <a key={s.id}
                    href={"https://wa.me/972" + (s.phone?.replace(/^0/, "").replace(/-/g, "")) + "?text=" + encodeURIComponent(msg)}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between bg-green-900/10 border border-green-500/10 rounded-lg px-3 py-1.5 hover:bg-green-900/20 transition-all">
                    <div>
                      <span className="text-white text-xs font-medium">{s.first_name} {s.last_name}</span>
                      <span className="text-gray-500 text-[10px] mr-2">{s.school_name}</span>
                    </div>
                    <Send className="h-3 w-3 text-green-400 flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* דוחות */}
          <div className="bg-[#0f1d36] border border-royal-400/15 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-royal-300" />
              <h3 className="text-white font-bold text-sm">דוחות לפי מוסד</h3>
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              <div className="flex gap-1.5 mb-2">
                <button onClick={() => exportCSV()}
                  className="flex-1 flex items-center justify-center gap-1 bg-royal-600/20 border border-royal-400/20 rounded-xl px-2 py-2 hover:bg-royal-600/30 transition-all">
                  <Download className="h-3 w-3 text-royal-300" />
                  <span className="text-white text-[10px] font-bold">כולם — דוח</span>
                </button>
                <button onClick={() => exportWASender("")}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-900/20 border border-green-500/20 rounded-xl px-2 py-2 hover:bg-green-900/30 transition-all">
                  <MessageCircle className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-[10px] font-bold">כולם — WA</span>
                </button>
              </div>
              {schoolStats.map(([school, count]) => (
                <div key={school} className="flex items-center gap-1.5 bg-[#0c1a33] border border-royal-400/10 rounded-xl px-2 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[10px] font-medium truncate">{school}</p>
                    <p className="text-gray-500 text-[10px]">{count} נרשמים</p>
                  </div>
                  <button onClick={() => exportWASender(school)}
                    className="flex items-center gap-0.5 bg-green-900/20 border border-green-500/20 rounded-lg px-2 py-1 hover:bg-green-900/30 transition-all flex-shrink-0">
                    <MessageCircle className="h-3 w-3 text-green-400" />
                    <span className="text-green-400 text-[10px]">WA</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* רשימת תלמידים */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="חיפוש לפי שם, טלפון, מוסד..."
              className="bg-[#12243f] border-royal-400/20 text-white placeholder:text-gray-600 h-12 pr-10" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
            className="bg-[#12243f] border border-royal-400/20 text-white rounded-lg px-4 h-12 text-sm">
            <option value="name">מיין לפי שם</option>
            <option value="school">מיין לפי מוסד</option>
            <option value="score">מיין לפי ציון</option>
          </select>
          <Button onClick={loadStudents} variant="outline" className="border-royal-400/30 text-royal-300 hover:bg-royal-400/10 h-12 gap-2">
            <RefreshCw className="h-4 w-4" />
            רענן
          </Button>
          <Button onClick={exportCSV} variant="outline" className="border-gold-400/30 text-gold-400 hover:bg-gold-400/10 h-12 gap-2">
            <Download className="h-4 w-4" />
            ייצוא
          </Button>
        </div>

        <div className="bg-[#12243f] border border-royal-400/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-royal-400/10">
                  <th className="text-right text-gray-400 text-sm font-medium p-4">שם</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">טלפון</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">מוסד</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">כיתה</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">מסלול</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">ציונים</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr><td colSpan={7} className="text-center text-gray-500 py-12">{loading ? "טוען..." : "לא נמצאו תלמידים"}</td></tr>
                ) : filteredStudents.map(s => (
                  <tr key={s.id} className="border-b border-[#1a2f50] hover:bg-[#152a48]">
                    <td className="p-4 text-white font-medium">{s.first_name} {s.last_name}</td>
                    <td className="p-4 text-gray-400" dir="ltr">{s.phone}</td>
                    <td className="p-4 text-gray-400 text-sm">{s.school_name}</td>
                    <td className="p-4 text-gray-400">{s.grade}</td>
                    <td className="p-4 text-royal-300 text-sm">{getTrackName(s.track_id)}</td>
                    <td className="p-4">
                      {s.results.length === 0 ? (
                        <span className="text-gray-600 text-sm">לא נבחן</span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {s.results.map((r, ri) => (
                            <span key={ri} className={"text-sm font-medium " + (r.score >= 95 ? "text-gold-400" : r.passed ? "text-green-400" : "text-red-400")}>
                              מבחן {ri + 1}: {r.score}%
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {deleteConfirm === s.id ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => deleteStudent(s.id)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">אשר</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-400 hover:text-white px-2 py-1">ביטול</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(s.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-royal-400/10 text-gray-500 text-sm">
            מציג {filteredStudents.length} מתוך {students.length} תלמידים
          </div>
        </div>

      </div>
    </div>
  );
}
