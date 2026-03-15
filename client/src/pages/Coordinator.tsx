/* Coordinator dashboard */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COORDINATOR_PASSWORD, IMAGES, TRACKS } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Users, Award, Star, Search, ArrowRight, ToggleLeft, ToggleRight, Download, Trash2, RefreshCw, AlertTriangle, MessageCircle, Calendar, FileText, Send, BookUser } from "lucide-react";

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

export default function Coordinator() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [students, setStudents] = useState<StudentResult[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "school" | "score">("name");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [coordDeleteConfirm, setCoordDeleteConfirm] = useState<string | null>(null);
  const [deleteMultiple, setDeleteMultiple] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [waSearch, setWaSearch] = useState("");
  const [personalMsg, setPersonalMsg] = useState(true);
  const [dailyLeaders, setDailyLeaders] = useState<any[]>([]);
  const [previewWinners, setPreviewWinners] = useState<{elementary:any,yeshiva:any,ulpana:any} | null>(null);
  const [previewCountdown, setPreviewCountdown] = useState("");
  const [waMessage, setWaMessage] = useState("שלום! 👋\nתזכורת מאיתנו – מבצע שאגת הארי.\nזוכרים ללמוד את החומר ולהתכונן למבחן הקרוב! 🦁\nבהצלחה, רשת נעם צביה");
  const [reportSchool, setReportSchool] = useState("");



  // ייצוא Excel מפורט — מוסד, רכז, תלמידים, ציונים
    const exportFullExcel = () => {
    const bySchoolMap: Record<string, typeof students> = {};
    students.filter(s => s.grade !== "רכז מוסדי").forEach(s => {
      const key = s.school_name || "לא ידוע";
      if (!bySchoolMap[key]) bySchoolMap[key] = [];
      bySchoolMap[key].push(s);
    });

    let rows = `<tr style="background:#0c1a33;color:#d4a017;font-weight:bold;font-size:13px;text-align:right">
      <td style="padding:8px 12px;border:1px solid #2a3f5f">#</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מוסד</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">רכז מוסדי</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">שם תלמיד</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">טלפון</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">כיתה</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מסלול</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן א</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן ב</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן ג</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן ד</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">ציון גבוה</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">סטטוס</td>
    </tr>`;

    let rowNum = 0;
    Object.entries(bySchoolMap).sort((a,b) => a[0].localeCompare(b[0], "he")).forEach(([school, slist]) => {
      const coord = coordinatorBySchool[school] || "—";
      rows += `<tr style="background:#1a2f50;color:#ffffff;font-weight:bold">
        <td colspan="13" style="padding:7px 12px;border:1px solid #2a3f5f;font-size:13px">
          🏫 ${school} &nbsp;|&nbsp; רכז: ${coord} &nbsp;|&nbsp; ${slist.length} תלמידים
        </td>
      </tr>`;
      slist.forEach(s => {
        rowNum++;
        const scores = s.results.map((r: any) => r.score);
        const best = scores.length ? Math.max(...scores) : null;
        const status = best !== null ? (best >= 95 ? "⭐ מצטיין" : best >= 80 ? "✅ עבר" : "❌ לא עבר") : "—";
        const rowBg = rowNum % 2 === 0 ? "#f5f8ff" : "#ffffff";
        const examCells = [0,1,2,3].map(i => {
          const sc = (scores as number[])[i];
          const bg = sc !== undefined ? (sc >= 95 ? "#d1fae5" : sc >= 80 ? "#dcfce7" : "#fee2e2") : "transparent";
          const color = sc !== undefined ? (sc >= 80 ? "#166534" : "#991b1b") : "#aaa";
          return `<td style="padding:6px 12px;border:1px solid #e0e0e0;background:${bg};color:${color};text-align:center;font-weight:bold">${sc !== undefined ? sc + "%" : "—"}</td>`;
        }).join("");
        const bestColor = best !== null ? (best >= 80 ? "#166534" : "#991b1b") : "#888";
        rows += `<tr style="background:${rowBg};color:#111;font-size:12px;text-align:right">
          <td style="padding:6px 12px;border:1px solid #e0e0e0;color:#aaa;text-align:center">${rowNum}</td>
          <td style="padding:6px 12px;border:1px solid #e0e0e0">${school}</td>
          <td style="padding:6px 12px;border:1px solid #e0e0e0;color:#7c6f9e">${coord}</td>
          <td style="padding:6px 12px;border:1px solid #e0e0e0;font-weight:bold">${s.first_name} ${s.last_name}</td>
          <td style="padding:6px 12px;border:1px solid #e0e0e0;direction:ltr;text-align:left">${s.phone || ""}</td>
          <td style="padding:6px 12px;border:1px solid #e0e0e0;text-align:center">${s.grade}</td>
          <td style="padding:6px 12px;border:1px solid #e0e0e0">${getTrackName(s.track_id)}</td>
          ${examCells}
          <td style="padding:6px 12px;border:1px solid #e0e0e0;font-weight:bold;text-align:center;color:${bestColor}">${best !== null ? best + "%" : "—"}</td>
          <td style="padding:6px 12px;border:1px solid #e0e0e0">${status}</td>
        </tr>`;
      });
    });

    const total = students.filter(s => s.grade !== "רכז מוסדי").length;
    const html = `<html dir="rtl" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;direction:rtl}
  table{border-collapse:collapse;width:100%}
  h2{color:#0c1a33;font-size:18px;margin:0 0 4px}
  p{color:#666;font-size:12px;margin:0 0 16px}
</style></head>
<body>
<h2>🦁 מבצע שאגת הארי — דוח תלמידים מלא</h2>
<p>רשת נעם צביה &nbsp;|&nbsp; סה"כ ${total} תלמידים &nbsp;|&nbsp; ${new Date().toLocaleDateString("he-IL")}</p>
<table>${rows}</table>
</body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "דוח_מלא_מבצע_שאגת_הארי.xls";
    a.click();
  };

  // ייצוא דוח לפי מוסד
  const exportSchoolReport = (schoolName: string) => {
    const schoolStudents = schoolName
      ? students.filter(s => s.school_name === schoolName && s.grade !== "רכז מוסדי")
      : students.filter(s => s.grade !== "רכז מוסדי");
    const coord = coordinatorBySchool[schoolName] || "—";

    let rows = `<tr style="background:#0c1a33;color:#d4a017;font-weight:bold;font-size:13px;text-align:right">
      <td style="padding:8px 12px;border:1px solid #2a3f5f">#</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">שם תלמיד</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">טלפון</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">כיתה</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מסלול</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן א</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן ב</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן ג</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">מבחן ד</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">ציון גבוה</td>
      <td style="padding:8px 12px;border:1px solid #2a3f5f">סטטוס</td>
    </tr>`;

    if (schoolName) {
      rows += `<tr style="background:#1a2f50;color:#ffffff;font-weight:bold">
        <td colspan="11" style="padding:7px 12px;border:1px solid #2a3f5f;font-size:13px">
          🏫 ${schoolName} &nbsp;|&nbsp; רכז: ${coord} &nbsp;|&nbsp; ${schoolStudents.length} תלמידים
        </td>
      </tr>`;
    }

    schoolStudents.forEach((s, idx) => {
      const scores = s.results.map((r: any) => r.score);
      const best = scores.length ? Math.max(...scores) : null;
      const status = best !== null ? (best >= 95 ? "⭐ מצטיין" : best >= 80 ? "✅ עבר" : "❌ לא עבר") : "—";
      const rowBg = (idx % 2 === 0) ? "#ffffff" : "#f5f8ff";
      const examCells = [0,1,2,3].map(i => {
        const sc = (scores as number[])[i];
        const bg = sc !== undefined ? (sc >= 95 ? "#d1fae5" : sc >= 80 ? "#dcfce7" : "#fee2e2") : "transparent";
        const color = sc !== undefined ? (sc >= 80 ? "#166534" : "#991b1b") : "#aaa";
        return `<td style="padding:6px 12px;border:1px solid #e0e0e0;background:${bg};color:${color};text-align:center;font-weight:bold">${sc !== undefined ? sc + "%" : "—"}</td>`;
      }).join("");
      const bestColor = best !== null ? (best >= 80 ? "#166534" : "#991b1b") : "#888";
      rows += `<tr style="background:${rowBg};color:#111;font-size:12px;text-align:right">
        <td style="padding:6px 12px;border:1px solid #e0e0e0;color:#aaa;text-align:center">${idx + 1}</td>
        <td style="padding:6px 12px;border:1px solid #e0e0e0;font-weight:bold">${s.first_name} ${s.last_name}</td>
        <td style="padding:6px 12px;border:1px solid #e0e0e0;direction:ltr;text-align:left">${s.phone || ""}</td>
        <td style="padding:6px 12px;border:1px solid #e0e0e0;text-align:center">${s.grade}</td>
        <td style="padding:6px 12px;border:1px solid #e0e0e0">${getTrackName(s.track_id)}</td>
        ${examCells}
        <td style="padding:6px 12px;border:1px solid #e0e0e0;font-weight:bold;text-align:center;color:${bestColor}">${best !== null ? best + "%" : "—"}</td>
        <td style="padding:6px 12px;border:1px solid #e0e0e0">${status}</td>
      </tr>`;
    });

    const title = schoolName || "כל המוסדות";
    const html = `<html dir="rtl" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;direction:rtl}
  table{border-collapse:collapse;width:100%}
  h2{color:#0c1a33;font-size:18px;margin:0 0 4px}
  p{color:#666;font-size:12px;margin:0 0 16px}
</style></head>
<body>
<h2>🦁 מבצע שאגת הארי — ${title}</h2>
<p>רשת נעם צביה &nbsp;|&nbsp; ${schoolStudents.length} תלמידים &nbsp;|&nbsp; ${new Date().toLocaleDateString("he-IL")}</p>
<table>${rows}</table>
</body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (schoolName || "כל_המוסדות") + ".xls";
    a.click();
  };

  // ייצוא רשימת טלפונים ל-WA Sender (עמודה אחת של מספרים בלבד)
  const exportWASender = (schoolName: string) => {
    const schoolStudents = schoolName ? students.filter(s => s.school_name === schoolName) : students;
    // נרמל מספרי טלפון לפורמט בינלאומי 972XXXXXXXXX
    const phones = schoolStudents.map(s => {
      const clean = (s.phone || "").replace(/[-\s]/g, "");
      return clean.startsWith("0") ? "972" + clean.slice(1) : clean;
    }).filter(Boolean);
    const csv = "Phone\n" + phones.join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wa_${schoolName || "כולם"}.csv`;
    a.click();
  };


  const calcPreviewWinners = async () => {
    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    const { data: todayScores } = await supabase
      .from("scores")
      .select("student_id, correct_answers")
      .eq("stage_title", "אתגר יומי")
      .eq("correct_answers", 3)
      .gte("created_at", todayStart.toISOString());
    if (!todayScores?.length) return;
    const ids = [...new Set(todayScores.map((s:any) => s.student_id))];
    const { data: studs } = await supabase
      .from("students")
      .select("id, first_name, last_name, school_name, grade")
      .in("id", ids);
    if (!studs?.length) return;
    // הסר רכזים מהגרלה
    const eligible = studs.filter((s:any) => s.grade !== "רכז מוסדי");
    const pick = (arr: any[]) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
    setPreviewWinners({
      elementary: pick(eligible.filter((s:any) => s.school_name?.startsWith("נעם"))),
      yeshiva: pick(eligible.filter((s:any) => s.school_name?.includes("ישיבת"))),
      ulpana: pick(eligible.filter((s:any) => s.school_name?.includes("אולפנת"))),
    });
  };

  useEffect(() => {
    if (!authenticated) return;
    const check = () => {
      const now = new Date();
      const h = now.getHours(), m = now.getMinutes();
      if (h >= 18) calcPreviewWinners();
      // ספירה לאחור ל-20:00
      const next20 = new Date(now); next20.setHours(20,0,0,0);
      if (now >= next20) next20.setDate(next20.getDate()+1);
      const diff = Math.max(0, next20.getTime() - now.getTime());
      const hh = Math.floor(diff/3600000);
      const mm = Math.floor((diff%3600000)/60000);
      const ss = Math.floor((diff%60000)/1000);
      setPreviewCountdown(`${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`);
    };
    check();
    const timer = setInterval(check, 60000); // כל דקה
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
            .map((r: any, idx: number) => {
              const trackName = TRACKS.find(t => t.id === r.quiz_id)?.name;
              return {
                score: r.score,
                passed: r.score >= 80,
                stage_title: r.stage_title || (trackName ? trackName : `מבחן ${idx + 1}`),
              };
            }),
        }));
        setStudents(merged);
      }
      // טעינת מצטייני אתגר יומי
      const { data: dailyScores } = await supabase
        .from("scores")
        .select("student_id, correct_answers")
        .eq("stage_title", "אתגר יומי");
      if (dailyScores) {
        const totals: Record<string, number> = {};
        dailyScores.forEach((s: any) => { totals[s.student_id] = (totals[s.student_id] || 0) + (s.correct_answers || 0); });
        if (studentsData) {
          const leaders = studentsData
            .filter((s: any) => totals[s.id])
            .map((s: any) => ({ ...s, dailyTotal: totals[s.id] || 0 }))
            .sort((a: any, b: any) => b.dailyTotal - a.dailyTotal);
          setDailyLeaders(leaders);
        }
      }
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  // מחיקת רכז
  const deleteCoordinator = async (id: string) => {
    try {
      await supabase.from("students").delete().eq("id", id);
      setStudents(prev => prev.filter(s => s.id !== id));
      setCoordDeleteConfirm(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("שגיאה במחיקה");
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

  const coordinators = students.filter(s => s.grade === "רכז מוסדי");
  const totalRegistered = students.filter(s => s.grade !== "רכז מוסדי").length;
  const tookExam = students.filter(s => s.results.length > 0).length;
  const passed = students.filter(s => s.results.some(r => r.passed)).length;
  const excellent = students.filter(s => s.results.some(r => r.score >= 95)).length;

  // מונים לפי מוסד
  const bySchool = students.reduce((acc, s) => {
    const key = s.school_name || "לא ידוע";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const schoolStats = Object.entries(bySchool).sort((a, b) => b[1] - a[1]);
  // רכז לפי מוסד
  const coordinatorBySchool: Record<string, string> = {};
  students.filter(s => s.grade === "רכז מוסדי").forEach(s => {
    coordinatorBySchool[s.school_name] = `${s.first_name} ${s.last_name}`;
  });
  // מוסדות נעם בלבד
  const noamStats = Object.entries(bySchool)
    .filter(([name]) => name.startsWith("נעם"))
    .sort((a, b) => b[1] - a[1]);

  // מונים לפי מסלול
  const byTrack = students.reduce((acc, s) => {
    const name = getTrackName(s.track_id) || "לא נבחר";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const trackStats = Object.entries(byTrack).sort((a, b) => b[1] - a[1]);

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
            <h1 className="font-display text-2xl text-white mb-6">כניסת רכז</h1>
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

        <h1 className="font-display text-3xl text-white mb-8">לוח רכזים – מבצע שאגת הארי</h1>

        {/* ── גרלת זוכים ── */}
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
                    ) : <p className="text-gray-600 text-xs">אין מועמדים</p>}
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500 text-sm text-center py-3">טוען...</p>}
            <Button onClick={calcPreviewWinners} variant="outline" size="sm"
              className="w-full border-gold-400/20 text-gold-400 hover:bg-gold-400/10 text-xs h-8 mt-2">
              רענן
            </Button>
          </div>
        )}

        {/* ── WhatsApp + אוטומציה + דוחות ── */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          {/* שליחת WhatsApp */}
          <div className="bg-[#0f1d36] border border-green-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-5 w-5 text-green-400" />
              <h3 className="text-white font-bold text-sm">הודעת WhatsApp</h3>
            </div>
            <textarea
              value={waMessage}
              onChange={e => setWaMessage(e.target.value)}
              rows={3}
              className="w-full bg-[#0c1a33] border border-green-500/20 rounded-xl p-3 text-white text-xs resize-none mb-2 focus:outline-none focus:border-green-400/50"
            />
            <label className="flex items-center gap-2 mb-3 cursor-pointer">
              <input type="checkbox" checked={personalMsg} onChange={e => setPersonalMsg(e.target.checked)}
                className="accent-green-500 w-3.5 h-3.5" />
              <span className="text-gray-400 text-xs">הוסף "שלום [שם]" בתחילת ההודעה</span>
            </label>

            {/* סינון */}
            <div className="flex gap-2 mb-2">
              <select value={reportSchool} onChange={e => setReportSchool(e.target.value)}
                className="flex-1 bg-[#0c1a33] border border-green-500/20 rounded-xl px-3 py-2 text-white text-xs focus:outline-none">
                <option value="">כל התלמידים</option>
                {schoolStats.map(([school, count]) => (
                  <option key={school} value={school}>{school} ({count})</option>
                ))}
              </select>
            </div>
            <input
              value={waSearch}
              onChange={e => setWaSearch(e.target.value)}
              placeholder="חיפוש לפי שם..."
              className="w-full bg-[#0c1a33] border border-green-500/20 rounded-xl px-3 py-2 text-white text-xs mb-3 focus:outline-none focus:border-green-400/50"
            />

            {/* רשימה */}
            {(() => {
              const q = waSearch.toLowerCase();
              const filtered = students.filter(s => {
                const nameMatch = !q || `${s.first_name} ${s.last_name}`.toLowerCase().includes(q);
                const schoolMatch = !reportSchool || s.school_name === reportSchool;
                return nameMatch && schoolMatch;
              });
              return (
                <div className="space-y-1 max-h-52 overflow-y-auto">
                  <p className="text-gray-500 text-xs mb-2">{filtered.length} תלמידים</p>
                  {filtered.map(s => {
                    const msg = personalMsg ? `שלום ${s.first_name}! 👋
${waMessage}` : waMessage;
                    return (
                      <a key={s.id}
                        href={`https://wa.me/972${s.phone?.replace(/^0/,"").replace(/-/g,"")}?text=${encodeURIComponent(msg)}`}
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
              );
            })()}
          </div>

          {/* דוחות לפי מוסד */}
          <div className="bg-[#0f1d36] border border-royal-400/15 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-royal-300" />
              <h3 className="text-white font-bold text-sm">דוחות לפי מוסד</h3>
            </div>
            <p className="text-gray-500 text-xs mb-3">ייצא CSV עם נרשמים וציונים לכל מוסד</p>
            {/* הוראות WA Sender */}
            <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-3 mb-3">
              <p className="text-green-400 text-xs font-bold mb-1">📱 שליחה המונית ב-WA Sender</p>
              <ol className="text-gray-400 text-[10px] space-y-0.5 list-decimal list-inside">
                <li>הורד קובץ טלפונים (WA)</li>
                <li>כנס ל-<a href="https://wa-sender.com" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">wa-sender.com</a></li>
                <li>העלה את הקובץ ושלח לכולם</li>
              </ol>
            </div>

            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {/* כל המוסדות */}
              <div className="flex gap-1.5 mb-1">
                <button onClick={() => exportSchoolReport("")}
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
                  <button onClick={() => exportSchoolReport(school)}
                    className="flex items-center gap-0.5 bg-royal-600/20 border border-royal-400/20 rounded-lg px-2 py-1 hover:bg-royal-600/30 transition-all flex-shrink-0">
                    <Download className="h-3 w-3 text-royal-300" />
                    <span className="text-royal-300 text-[10px]">דוח</span>
                  </button>
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

        {/* סטטיסטיקות */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Users className="h-6 w-6" />, label: "נרשמו", value: totalRegistered, color: "text-royal-300" },
            { icon: <Search className="h-6 w-6" />, label: "נבחנו", value: tookExam, color: "text-gold-400" },
            { icon: <Award className="h-6 w-6" />, label: "עברו (80%+)", value: passed, color: "text-green-400" },
            { icon: <Star className="h-6 w-6" />, label: "הצטיינו (95%+)", value: excellent, color: "text-gold-500" },
          { icon: <BookUser className="h-6 w-6" />, label: "רכזים", value: coordinators.length, color: "text-purple-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#12243f] border border-royal-400/10 rounded-xl p-5">
              <div className={`${stat.color} mb-2`}>{stat.icon}</div>
              <div className="font-display text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>


        {/* מונים לפי מוסד ומסלול */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* לפי מוסד */}
          <div className="bg-[#12243f] border border-royal-400/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-royal-400/10 flex items-center gap-2">
              <Users className="h-4 w-4 text-royal-300" />
              <span className="text-white font-bold text-sm">נרשמים לפי מוסד</span>
            </div>
            <div className="p-4 space-y-2">
              {schoolStats.map(([school, count], i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs w-4 text-center">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <div>
                        <span className="text-white text-xs">{school}</span>
                        {coordinatorBySchool[school] && (
                          <span className="text-purple-400 text-[10px] mr-1.5">• {coordinatorBySchool[school]}</span>
                        )}
                      </div>
                      <span className="text-gold-400 text-xs font-bold flex-shrink-0">{count}</span>
                    </div>
                    <div className="h-1 bg-[#0c1a33] rounded-full overflow-hidden">
                      <div className="h-full bg-royal-400/60 rounded-full"
                        style={{ width: `${(count / (schoolStats[0]?.[1] || 1)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              {schoolStats.length === 0 && <p className="text-gray-600 text-sm text-center py-4">אין נתונים</p>}
            </div>
          </div>

          {/* לפי מסלול */}
          <div className="bg-[#12243f] border border-royal-400/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-royal-400/10 flex items-center gap-2">
              <Award className="h-4 w-4 text-gold-400" />
              <span className="text-white font-bold text-sm">נרשמים לפי מסלול</span>
            </div>
            <div className="p-4 space-y-3">
              {trackStats.map(([track, count], i) => {
                const t = TRACKS.find(tr => tr.name === track);
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl">{t?.icon || "📚"}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-white text-xs">{track}</span>
                        <span className="text-gold-400 text-xs font-bold">{count}</span>
                      </div>
                      <div className="h-1.5 bg-[#0c1a33] rounded-full overflow-hidden">
                        <div className="h-full bg-gold-500/60 rounded-full"
                          style={{ width: `${(count / (trackStats[0]?.[1] || 1)) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              {trackStats.length === 0 && <p className="text-gray-600 text-sm text-center py-4">אין נתונים</p>}
            </div>
          </div>

          {/* בתי ספר נעם */}
          <div className="bg-[#12243f] border border-royal-400/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-royal-400/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🏫</span>
                <span className="text-white font-bold text-sm">בתי ספר נעם</span>
              </div>
              <span className="text-gray-500 text-xs">{noamStats.reduce((a,b) => a + b[1], 0)} סה״כ</span>
            </div>
            <div className="p-4 space-y-2">
              {noamStats.map(([school, count], i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-xs w-4 text-center font-bold ${i===0?"text-gold-400":i===1?"text-gray-300":i===2?"text-amber-600":"text-gray-500"}`}>{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-white text-xs truncate">{school}</span>
                      <span className="text-gold-400 text-xs font-bold">{count}</span>
                    </div>
                    <div className="h-1 bg-[#0c1a33] rounded-full overflow-hidden">
                      <div className="h-full bg-gold-400/60 rounded-full"
                        style={{ width: `${(count / (noamStats[0]?.[1] || 1)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              {noamStats.length === 0 && <p className="text-gray-600 text-sm text-center py-4">אין נתונים</p>}
            </div>
          </div>
        </div>

        {/* ── אתגר יומי — מובילים ── */}
        {dailyLeaders.length > 0 && (
          <div className="bg-[#12243f] border border-gold-400/15 rounded-2xl overflow-hidden mb-8">
            <div className="px-5 py-3 border-b border-royal-400/10 flex items-center gap-2">
              <Star className="h-4 w-4 text-gold-400" />
              <span className="text-white font-bold text-sm">מצטייני אתגר יומי — תשובות נכונות מצטברות</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-royal-400/10">
                    <th className="text-right text-gray-400 text-xs font-medium p-3">#</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">שם</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">מוסד</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">כיתה</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">מסלול</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">נכון מצטבר</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyLeaders.map((s, i) => (
                    <tr key={s.id} className={`border-b border-[#1a2f50] ${i < 3 ? "bg-gold-500/5" : ""}`}>
                      <td className="p-3">
                        <span className="text-lg">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span className="text-gray-500 text-sm">{i+1}</span>}</span>
                      </td>
                      <td className="p-3 text-white font-medium text-sm">{s.first_name} {s.last_name}</td>
                      <td className="p-3 text-gray-400 text-sm">{s.school_name}</td>
                      <td className="p-3 text-gray-400 text-sm">{s.grade}</td>
                      <td className="p-3 text-royal-300 text-sm">{getTrackName(s.track_id)}</td>
                      <td className="p-3">
                        <span className={`font-display text-xl font-bold ${i < 3 ? "text-gold-400" : "text-white"}`}>{s.dailyTotal}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── רשימת רכזים ── */}
        {coordinators.length > 0 && (
          <div className="bg-[#12243f] border border-purple-400/20 rounded-2xl overflow-hidden mb-8">
            <div className="px-5 py-3 border-b border-purple-400/15 flex items-center gap-2">
              <BookUser className="h-4 w-4 text-purple-400" />
              <span className="text-white font-bold text-sm">רכזים מוסדיים</span>
              <span className="text-gray-500 text-xs mr-auto">{coordinators.length} רכזים</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-400/10">
                    <th className="text-right text-gray-400 text-xs font-medium p-3">שם</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">טלפון</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">מוסד</th>
                    <th className="text-right text-gray-400 text-xs font-medium p-3">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {coordinators.map(s => (
                    <tr key={s.id} className="border-b border-[#1a2f50] hover:bg-[#152a48]">
                      <td className="p-3 text-white font-medium text-sm">{s.first_name} {s.last_name}</td>
                      <td className="p-3 text-gray-400 text-sm" dir="ltr">{s.phone}</td>
                      <td className="p-3 text-purple-300 text-sm">{s.school_name}</td>
                      <td className="p-3">
                        {coordDeleteConfirm === s.id ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => deleteCoordinator(s.id)}
                              className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">אשר</button>
                            <button onClick={() => setCoordDeleteConfirm(null)}
                              className="text-xs text-gray-400 hover:text-white px-2 py-1">ביטול</button>
                          </div>
                        ) : (
                          <button onClick={() => setCoordDeleteConfirm(s.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors p-1 rounded">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
          <Button onClick={exportFullExcel} variant="outline" className="border-green-400/30 text-green-400 hover:bg-green-400/10 h-12 gap-2">
            <Download className="h-4 w-4" />
            Excel מלא
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
                                מבחן {ri + 1}: {r.score}%
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
