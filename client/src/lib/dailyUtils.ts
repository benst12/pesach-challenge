// כלי עזר לאתגר יומי — שאלות אחידות לכולם, מתחלפות בחצות

import { ALL_QUESTIONS } from "@/lib/data";

const KEYS = ["א","ב","ג","ד"];

// מפתח יומי — מספר הימים מאז epoch, כך שמתחלף בחצות ישראל
export function getDayIndex(): number {
  const israelOffset = 2 * 60 * 60 * 1000; // UTC+2
  return Math.floor((Date.now() + israelOffset) / (24 * 60 * 60 * 1000));
}

export function getTodayKeyFromDayIndex(): string {
  return `day_${getDayIndex()}`;
}

// שאלות קבועות ידניות — מוחלפות לפי הנחיה
// כל שאלה: { id, chapter, question, options: [{text, correct, key}] }
const MANUAL_QUESTIONS: any[] | null = [
  {
    id: 113,
    question: 'מה מצוות "תשביתו" ומתי היא חלה?',
    options: [
      { text: 'מצווה לבטל את החמץ בלב – חלה מתחילת חודש ניסן', correct: false, key: "א" },
      { text: 'מצווה לבער את החמץ מרשותנו – חלה עד חצות יום י"ד בניסן', correct: true, key: "ב" },
      { text: 'מצווה לשרוף את החמץ – חלה מתחילת ליל פסח', correct: false, key: "ג" },
      { text: 'מצווה לבדוק את הבית – חלה מליל י"ד בניסן', correct: false, key: "ד" },
    ]
  },
  {
    id: 117,
    question: 'מהם ארבעת השלבים של תהליך השבתת החמץ לפי פניני הלכה?',
    options: [
      { text: 'בדיקה, שריפה, ביטול, מכירה', correct: false, key: "א" },
      { text: 'ביטול ראשון, בדיקה, ביטול שני, ביעור', correct: false, key: "ב" },
      { text: 'ניקוי, בדיקה, ביעור, ביטול', correct: false, key: "ג" },
      { text: 'בדיקה וביטול ראשון בליל י"ד, ביעור וביטול שני ביום י"ד', correct: true, key: "ד" },
    ]
  },
  {
    id: 121,
    question: 'אילו מקומות בבית מחויבים בבדיקת חמץ?',
    options: [
      { text: 'כל מקום שרגיל להכניס בו חמץ – חדרים שלא הוכנס בהם חמץ אינם טעונים בדיקה', correct: true, key: "א" },
      { text: 'כל חדרי הבית ללא יוצא מן הכלל, כולל חדרים שלא הוכנס בהם חמץ מעולם', correct: false, key: "ב" },
      { text: 'רק המטבח וחדרי האוכל שבהם מוכנסת אוכל בוודאי', correct: false, key: "ג" },
      { text: 'כל הבית, אך אפשר לפטור חדרים על ידי נעילתם לפני פסח', correct: false, key: "ד" },
    ]
  },
];

// 3 שאלות יומיות אחידות — אותן שאלות לכולם, מחושבות לפי יום בלבד
export function getDailyQuestions() {
  // אם יש שאלות ידניות — השתמש בהן
  if (MANUAL_QUESTIONS) return MANUAL_QUESTIONS;
  if (!ALL_QUESTIONS.length) return [];
  const total = ALL_QUESTIONS.length;
  const dayIdx = getDayIndex();

  // 3 אינדקסים שונים, קבועים לפי יום
  // משתמשים בנוסחה שמבטיחה שאלות שונות
  const idx0 = (dayIdx * 7 + 13) % total;
  const idx1 = (dayIdx * 11 + 71) % total;
  const idx2 = (dayIdx * 17 + 131) % total;

  // וודא שהאינדקסים שונים
  const finalIdx1 = idx1 === idx0 ? (idx1 + 1) % total : idx1;
  const finalIdx2 = (idx2 === idx0 || idx2 === finalIdx1)
    ? (idx2 + 2) % total : idx2;

  return [idx0, finalIdx1, finalIdx2].map((qi, offset) => {
    const q = ALL_QUESTIONS[qi];
    if (!q) return null;
    // ערבוב Fisher-Yates עם hash seed — התפלגות שווה לכל התשובות
    const hashSeed = (str: string) => {
      let h = 0;
      for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
      return Math.abs(h) || 1;
    };
    let s = hashSeed("day" + dayIdx + "q" + offset);
    const rng = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const shuffled = [...q.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { ...q, options: shuffled.map((o, i) => ({ ...o, key: KEYS[i] })) };
  }).filter(Boolean) as any[];
}

// המרת תאריך גרגוריאני לעברי בפורמט כ"ה אדר תשפ"ו
export function toHebrewDate(date: Date): string {
  try {
    const fmt = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", {
      day: "numeric", month: "long", year: "numeric"
    });
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
      if (n < 20) return 'י"' + units[n - 10];
      const t = Math.floor(n / 10), u = n % 10;
      return u === 0 ? tens[t] + "׳" : tens[t] + '"' + units[u];
    };
    const yearStr = hebrewYears[heYearNum] || String(heYearNum);
    if (heMonth && yearStr) return `${dayStr(heDay)} ${heMonth} ${yearStr}`;
    return "";
  } catch { return ""; }
}
