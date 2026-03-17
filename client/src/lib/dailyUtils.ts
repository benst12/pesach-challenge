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
    id: 31, chapter: "פרק יג",
    question: "מה הפתרון המקובל לבכורות שלא רוצים להתענות?",
    options: [
      { text: "לשלם כופר לצדקה",              correct: false, key: "א" },
      { text: "לאכול מעט לחם ממש בבוקר",      correct: false, key: "ב" },
      { text: "להשתתף בסיום מסכת",             correct: true,  key: "ג" },
      { text: "לצום עד חצות היום בלבד",        correct: false, key: "ד" },
    ]
  },
  {
    id: 149, chapter: "פרק יב",
    question: 'מהי "מצה שמורה" ומדוע היא מיוחדת?',
    options: [
      { text: "מצה שמורה במקרר",                        correct: false, key: "א" },
      { text: "מצה ששמרו אותה לשם מצוה מרגע הקצירה",   correct: true,  key: "ב" },
      { text: "מצה שנשמרה על ידי הגוי",                 correct: false, key: "ג" },
      { text: "מצה שהוכנה בפיקוח רב",                   correct: false, key: "ד" },
    ]
  },
  {
    id: 170, chapter: "פרק טו",
    question: 'מה מיוחד ב"שפיכת כוס אליהו"?',
    options: [
      { text: "כוס שאחד הילדים שופך",          correct: false, key: "א" },
      { text: "כוס שאסור לשתות ממנה",           correct: false, key: "ב" },
      { text: "כוס שמוסיפים לה יין בכל פרשה",  correct: false, key: "ג" },
      { text: "כוס יין שמוזגים לאליהו הנביא",  correct: true,  key: "ד" },
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
