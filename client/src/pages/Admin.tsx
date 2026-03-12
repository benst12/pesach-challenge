/* Admin dashboard */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ADMIN_PASSWORD, IMAGES, TRACKS } from "@/lib/data";
import { EXAM_CONFIGS, isStageOpen, setStageOpen } from "@/lib/examConfig";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Users, Award, Star, Search, ArrowRight, ToggleLeft, ToggleRight, Download, Trash2, RefreshCw, AlertTriangle } from "lucide-react";

interface StudentResult {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  school_name: string;
  grade: string;
  track_id: string;
  results: { score: number; passed: boolean; exam_number?: number; stage_title?: string }[];
}

export default function Admin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [students, setStudents] = useState<StudentResult[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "school" | "score">("name");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteMultiple, setDeleteMultiple] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);

  const [examStates, setExamStates] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const tc of EXAM_CONFIGS) {
      for (const stage of tc.stages) {
        init[stage.storageKey] = isStageOpen(stage);
      }
    }
    return init;
  });

  const toggleStage = (storageKey: string) => {
    const stage = EXAM_CONFIGS.flatMap(c => c.stages).find(s => s.storageKey === storageKey);
    if (!stage) return;
    const newVal = !examStates[storageKey];
    setStageOpen(stage, newVal);
    setExamStates(prev => ({ ...prev, [storageKey]: newVal }));
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      loadStudents();
    } else {
      alert("סיסמה שגויה");
    }
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const { data: studentsData } = await supabase
        .from("students")
        .select("id, first_name, last_name, phone, school_name, grade, track_id")
        .order("first_name", { ascending: true });

      // טעינת ציונים — רק עמודות שבטוח קיימות
      const { data: scoresData, error: scoresError } = await supabase
        .from("scores")
        .select("student_id, score, quiz_id, created_at");

      if (scoresError) console.error("Scores fetch error:", scoresError);

      if (studentsData) {
        const merged = studentsData.map((s: any) => ({
          ...s,
          results: (scoresData || [])
            .filter((r: any) => r.student_id === s.id)
            .map((r: any) => ({
              score: r.score,
              passed: r.score >= 80,
              stage_title: r.stage_title || r.quiz_id || "מבחן",
            })),
        }));
        setStudents(merged);
      }
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  // מחיקה דרך REST API ישירות עם header מיוחד
  const deleteViaRest = async (table: string, field: string, value: string) => {
    const SUPABASE_URL = "https://qobhbnbbqnzbsnacbfxm.supabase.co";
    const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvYmhibmJicW56YnNuYWNiZnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjU2MTgsImV4cCI6MjA4ODg0MTYxOH0.hmRyy6OsGZRfx9B5KZsuN45mokd6FOflq4zNhbc0JVc";
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${field}=eq.${value}`, {
      method: "DELETE",
      headers: {
        "apikey": ANON_KEY,
        "Authorization": `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
    });
    if (!res.ok && res.status !== 204) {
      const text = await res.text();
      throw new Error(`Delete failed: ${res.status} ${text}`);
    }
  };

  // מחיקת תלמיד אחד
  const deleteStudent = async (id: string) => {
    try {
      // נסה דרך supabase client קודם
      const { error: scoresErr } = await supabase.from("scores").delete().eq("student_id", id);
      const { error: studentErr } = await supabase.from("students").delete().eq("id", id);

      // אם נכשל (RLS) — נסה דרך REST ישיר
      if (scoresErr || studentErr) {
        await deleteViaRest("scores", "student_id", id);
        await deleteViaRest("students", "id", id);
      }

      setStudents(prev => prev.filter(s => s.id !== id));
      setDeleteConfirm(null);
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("שגיאה במחיקה: " + err.message);
    }
  };

  // מחיקת מרובים
  const deleteMultipleStudents = async () => {
    const ids = Array.from(deleteMultiple);
    try {
      for (const id of ids) {
        const { error: scoresErr } = await supabase.from("scores").delete().eq("student_id", id);
        const { error: studentErr } = await supabase.from("students").delete().eq("id", id);
        if (scoresErr || studentErr) {
          await deleteViaRest("scores", "student_id", id);
          await deleteViaRest("students", "id", id);
        }
      }
      setStudents(prev => prev.filter(s => !deleteMultiple.has(s.id)));
      setDeleteMultiple(new Set());
      setSelectMode(false);
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("שגיאה במחיקה: " + err.message);
    }
  };

  const toggleSelect = (id: string) => {
    setDeleteMultiple(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getTrackName = (trackId: string) => TRACKS.find(t => t.id === trackId)?.name || "—";

  const filteredStudents = students
    .filter(s => {
      const q = search.toLowerCase();
      return (
        s.first_name?.toLowerCase().includes(q) ||
        s.last_name?.toLowerCase().includes(q) ||
        s.phone?.includes(q) ||
        s.grade?.includes(q) ||
        s.school_name?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`, "he");
      if (sortBy === "school") return (a.school_name || "").localeCompare(b.school_name || "", "he");
      if (sortBy === "score") {
        const aScore = a.results[0]?.score ?? -1;
        const bScore = b.results[0]?.score ?? -1;
        return bScore - aScore;
      }
      return 0;
    });

  const totalRegistered = students.length;
  const tookExam = students.filter(s => s.results.length > 0).length;
  const passed = students.filter(s => s.results.some(r => r.passed)).length;
  const excellent = students.filter(s => s.results.some(r => r.score >= 95)).length;

  const exportCSV = () => {
    const header = "שם,טלפון,מוסד,כיתה,מסלול,ציון,סטטוס";
    const rows = filteredStudents.map(s => {
      const best = s.results.reduce((b, r) => r.score > (b?.score || 0) ? r : b, null as any);
      const status = best ? (best.score >= 95 ? "מצטיין" : best.passed ? "עבר" : "לא עבר") : "לא נבחן";
      return `${s.first_name} ${s.last_name},${s.phone},${s.school_name},${s.grade},${getTrackName(s.track_id)},${best?.score ?? ""},${status}`;
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "תלמידים.csv"; a.click();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center px-4">
        <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-8 text-center">
            <div className="relative mx-auto mb-4 w-fit">
              <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl" />
              <img src={IMAGES.logo} alt="רשת נעם צביה" className="relative h-14 w-auto brightness-125" />
            </div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-royal-500/30 to-gold-500/20 flex items-center justify-center">
              <Lock className="h-8 w-8 text-gold-400" />
            </div>
            <h1 className="font-display text-2xl text-white mb-6">כניסת מנהל</h1>
            <Input type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="הזן סיסמה"
              className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 h-12 mb-4 text-center" />
            <Button onClick={handleLogin} className="w-full bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-12">
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

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span>חזרה לדף הבית</span>
          </button>
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-white/10 blur-md" />
            <img src={IMAGES.logo} alt="רשת נעם צביה" className="relative h-10 w-auto brightness-125" />
          </div>
        </div>

        <h1 className="font-display text-3xl text-white mb-8">לוח בקרה – מבצע שאגת הארי</h1>

        {/* פתיחת מבחנים */}
        <div className="mb-8">
          <h2 className="font-display text-xl text-white mb-4">פתיחת מבחנים</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXAM_CONFIGS.map(tc => {
              const track = TRACKS.find(t => t.id === tc.trackId);
              return (
                <div key={tc.trackId} className="bg-[#0f1d36] border border-royal-400/15 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-royal-400/10 flex items-center gap-3">
                    <span className="text-xl">{track?.icon}</span>
                    <span className="text-white font-bold text-sm">{track?.name}</span>
                  </div>
                  <div className="divide-y divide-royal-400/10">
                    {tc.stages.map(stage => {
                      const open = examStates[stage.storageKey] ?? false;
                      return (
                        <div key={stage.storageKey} className={`flex items-center justify-between px-4 py-3 transition-colors ${open ? "bg-green-900/10" : ""}`}>
                          <div>
                            <p className="text-white text-sm font-medium">{stage.title}</p>
                            <p className="text-gray-500 text-xs">{stage.date}</p>
                          </div>
                          <Button onClick={() => toggleStage(stage.storageKey)} size="sm"
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 h-auto rounded-lg transition-all ${
                              open ? "bg-red-600/80 hover:bg-red-500 text-white" : "bg-green-700/80 hover:bg-green-600 text-white"
                            }`}>
                            {open ? <ToggleRight className="h-3.5 w-3.5" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                            {open ? "סגור" : "פתח"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* סטטיסטיקות */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Users className="h-6 w-6" />, label: "נרשמו", value: totalRegistered, color: "text-royal-300" },
            { icon: <Search className="h-6 w-6" />, label: "נבחנו", value: tookExam, color: "text-gold-400" },
            { icon: <Award className="h-6 w-6" />, label: "עברו (80%+)", value: passed, color: "text-green-400" },
            { icon: <Star className="h-6 w-6" />, label: "הצטיינו (95%+)", value: excellent, color: "text-gold-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#12243f] border border-royal-400/10 rounded-xl p-5">
              <div className={`${stat.color} mb-2`}>{stat.icon}</div>
              <div className="font-display text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* כלי חיפוש ופעולות */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="חיפוש לפי שם, טלפון, מוסד או כיתה..."
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
          <Button onClick={() => { setSelectMode(!selectMode); setDeleteMultiple(new Set()); }}
            variant="outline"
            className={`h-12 gap-2 ${selectMode ? "border-red-400/50 text-red-400 bg-red-400/10" : "border-red-400/20 text-red-400/60 hover:bg-red-400/10 hover:text-red-400"}`}>
            <Trash2 className="h-4 w-4" />
            {selectMode ? "ביטול בחירה" : "מחיקה מרובה"}
          </Button>
        </div>

        {/* כפתור מחיקה מרובה */}
        {selectMode && deleteMultiple.size > 0 && (
          <div className="mb-4 flex items-center gap-3 bg-red-900/20 border border-red-500/30 rounded-xl p-4">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300 text-sm flex-1">נבחרו {deleteMultiple.size} תלמידים למחיקה</span>
            <Button onClick={deleteMultipleStudents}
              className="bg-red-600 hover:bg-red-500 text-white h-9 px-4 text-sm gap-2">
              <Trash2 className="h-4 w-4" />
              מחק {deleteMultiple.size} תלמידים
            </Button>
          </div>
        )}

        {/* טבלה */}
        <div className="bg-[#12243f] border border-royal-400/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-royal-400/10">
                  {selectMode && <th className="p-4 w-10"></th>}
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
                  <tr><td colSpan={8} className="text-center text-gray-500 py-12">{loading ? "טוען..." : "לא נמצאו תלמידים"}</td></tr>
                ) : (
                  filteredStudents.map(s => (
                    <tr key={s.id} className={`border-b border-[#1a2f50] hover:bg-[#152a48] ${deleteMultiple.has(s.id) ? "bg-red-900/10" : ""}`}>
                      {selectMode && (
                        <td className="p-4">
                          <input type="checkbox" checked={deleteMultiple.has(s.id)}
                            onChange={() => toggleSelect(s.id)}
                            className="w-4 h-4 accent-red-500 cursor-pointer" />
                        </td>
                      )}
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
                              <span key={ri} className={`text-sm font-medium ${r.score >= 95 ? "text-gold-400" : r.passed ? "text-green-400" : "text-red-400"}`}>
                                {r.stage_title || `מבחן ${ri + 1}`}: {r.score}%
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {deleteConfirm === s.id ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => deleteStudent(s.id)}
                              className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">
                              אשר
                            </button>
                            <button onClick={() => setDeleteConfirm(null)}
                              className="text-xs text-gray-400 hover:text-white px-2 py-1">
                              ביטול
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(s.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors p-1 rounded">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
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
