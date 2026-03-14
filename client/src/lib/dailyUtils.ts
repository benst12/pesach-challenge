// כלי עזר לאתגר יומי — שאלות אחידות לכולם, מתחלפות בחצות

import { getQuestionsForTrack, TRACKS } from "@/lib/data";

const KEYS = ["א","ב","ג","ד"];

// מפתח יומי — מספר הימים מאז epoch, כך שמתחלף בחצות
export function getDayIndex(): number {
  const now = new Date();
  // אפס שעה לחצות UTC+2 (ישראל)
  const israelOffset = 2 * 60 * 60 * 1000;
  return Math.floor((now.getTime() + israelOffset) / (24 * 60 * 60 * 1000));
}

export function getTodayKeyFromDayIndex(): string {
  return `day_${getDayIndex()}`;
}

// 3 שאלות יומיות אחידות — אותן שאלות לכולם
export function getDailyQuestions() {
  // השתמש במסלול הראשון כבסיס לשאלות (שאלות כלליות)
  const all = getQuestionsForTrack(TRACKS[0].id, 999);
  if (!all.length) return [];
  const dayIdx = getDayIndex();
  return Array.from({ length: 3 }, (_, offset) => {
    const q = all[(dayIdx * 3 + offset * 47) % all.length];
    if (!q) return null;
    // ערבוב קבוע לפי יום — אותו ערבוב לכולם
    const seed = dayIdx + offset;
    const shuffled = [...q.options].sort((a, b) => {
      const ha = (seed * 31 + a.text.charCodeAt(0)) % 4;
      const hb = (seed * 31 + b.text.charCodeAt(0)) % 4;
      return ha - hb;
    });
    return { ...q, options: shuffled.map((o, i) => ({ ...o, key: KEYS[i] })) };
  }).filter(Boolean) as any[];
}

// המרת תאריך גרגוריאני לעברי
export function toHebrewDate(date: Date): string {
  try {
    const fmt = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", { day: "numeric", month: "long", year: "numeric" });
    const parts = fmt.formatToParts(date);
    const heDay = parseInt(parts.find(p => p.type === "day")?.value || "1");
    const heMonth = parts.find(p => p.type === "month")?.value || "";
    const heYearNum = parseInt(parts.find(p => p.type === "year")?.value || "5786");
    const hebrewYears: Record<number, string> = {
      5785: 'תשפ"ה', 5786: 'תשפ"ו', 5787: 'תשפ"ז', 5788: 'תשפ"ח'
    };
    const units = ["","א","ב","ג","ד","ה","ו","ז","ח","ט"];
    const tens  = ["","י","כ","ל"];
    const dayStr = (n: number): string => {
      if (n <= 9) return units[n] + "׳";
      if (n === 15) return 'ט"ו';
      if (n === 16) return 'ט"ז';
      if (n < 20) return "י\"" + units[n-10];
      const t = Math.floor(n/10), u = n%10;
      return u === 0 ? tens[t]+"׳" : tens[t]+"\""+units[u];
    };
    const yearStr = hebrewYears[heYearNum] || "";
    if (heMonth && yearStr) return `${dayStr(heDay)} ${heMonth} ${yearStr}`;
    return "";
  } catch { return ""; }
}
