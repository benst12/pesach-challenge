/* Design: Royal Blue & Gold - Admin dashboard */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ADMIN_PASSWORD, IMAGES } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Users, Award, Star, Search, ArrowRight } from "lucide-react";

interface StudentResult {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  school_name: string;
  grade: string;
  results: { score: number; passed: boolean }[];
}

export default function Admin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [students, setStudents] = useState<StudentResult[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
        .select("id, first_name, last_name, phone, school_name, grade, track_id");

      let scoresData: any[] = [];
      try {
        const res = await supabase
          .from("scores")
          .select("student_id, score");
        if (res.data) scoresData = res.data;
      } catch (e) {
        // scores table may not exist yet
      }

      if (studentsData) {
        const merged = studentsData.map((s: any) => ({
          ...s,
          results: scoresData
            .filter((r: any) => r.student_id === s.id)
            .map((r: any) => ({ score: r.score, passed: r.score >= 80 })),
        }));
        setStudents(merged);
      }
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.first_name?.toLowerCase().includes(q) ||
      s.last_name?.toLowerCase().includes(q) ||
      s.phone?.includes(q) ||
      s.grade?.includes(q) ||
      s.school_name?.toLowerCase().includes(q)
    );
  });

  const totalRegistered = students.length;
  const tookExam = students.filter((s) => s.results.length > 0).length;
  const passed = students.filter((s) => s.results.some((r) => r.passed)).length;
  const excellent = students.filter((s) => s.results.some((r) => r.score >= 95)).length;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0c1a33] flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-b from-[#12243f] to-[#0f1f3a] border border-royal-400/10 rounded-2xl p-8 text-center">
            <img src={IMAGES.logo} alt="רשת נעם צביה" className="h-14 w-auto mx-auto mb-4" />
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-royal-500/30 to-gold-500/20 flex items-center justify-center">
              <Lock className="h-8 w-8 text-gold-400" />
            </div>
            <h1 className="font-display text-2xl text-white mb-6">כניסת מנהל</h1>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="הזן סיסמה"
              className="bg-[#0c1a33] border-royal-400/20 text-white placeholder:text-gray-600 h-12 mb-4 text-center"
            />
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-l from-gold-500 to-gold-600 text-[#0c1a33] font-bold h-12"
            >
              כניסה
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1a33] py-8 px-4">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group"
          >
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span>חזרה לדף הבית</span>
          </button>
          <img src={IMAGES.logo} alt="רשת נעם צביה" className="h-10 w-auto opacity-70" />
        </div>

        <h1 className="font-display text-3xl text-white mb-8">לוח בקרה</h1>

        {/* Stats */}
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

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש לפי שם, טלפון או כיתה..."
            className="bg-[#12243f] border-royal-400/20 text-white placeholder:text-gray-600 h-12 pr-10"
          />
        </div>

        {/* Students table */}
        <div className="bg-[#12243f] border border-royal-400/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-royal-400/10">
                  <th className="text-right text-gray-400 text-sm font-medium p-4">שם</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">טלפון</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">מוסד</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">כיתה</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">ציון</th>
                  <th className="text-right text-gray-400 text-sm font-medium p-4">סטטוס</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-12">
                      {loading ? "טוען..." : "לא נמצאו תלמידים"}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => {
                    const bestResult = s.results.reduce(
                      (best, r) => (r.score > (best?.score || 0) ? r : best),
                      null as { score: number; passed: boolean } | null
                    );
                    return (
                      <tr key={s.id} className="border-b border-[#1a2f50] hover:bg-[#152a48]">
                        <td className="p-4 text-white">{s.first_name} {s.last_name}</td>
                        <td className="p-4 text-gray-400" dir="ltr">{s.phone}</td>
                        <td className="p-4 text-gray-400">{s.school_name}</td>
                        <td className="p-4 text-gray-400">{s.grade}</td>
                        <td className="p-4">
                          {bestResult ? (
                            <span className={bestResult.score >= 95 ? "text-gold-400 font-bold" : bestResult.passed ? "text-green-400" : "text-red-400"}>
                              {bestResult.score}%
                            </span>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                        <td className="p-4">
                          {bestResult ? (
                            bestResult.score >= 95 ? (
                              <span className="px-2 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs">מצטיין</span>
                            ) : bestResult.passed ? (
                              <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">עבר</span>
                            ) : (
                              <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">לא עבר</span>
                            )
                          ) : (
                            <span className="px-2 py-1 rounded-full bg-gray-500/10 text-gray-500 text-xs">לא נבחן</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
