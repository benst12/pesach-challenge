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
    id: 108,
    question: 'מאימתי אסור מהתורה לאכול חמץ ביום י"ד בניסן?',
    options: [
      { text: 'מתחילת יום י"ד – כיוון שהוא ערב פסח', correct: false, key: "א" },
      { text: 'מחצות היום – שהוא זמן הראוי להקרבת קרבן פסח', correct: true, key: "ב" },
      { text: 'מהשעה החמישית – כפי שאסרו חכמים', correct: false, key: "ג" },
      { text: 'מהשעה השביעית – כי עד אז מותר מהתורה', correct: false, key: "ד" },
    ]
  },
  {
    id: 115,
    question: 'האם חמץ של גוי שהפקיד בבית יהודי עובר בבל יראה?',
    options: [
      { text: 'כן, כיוון שנמצא בתחום ביתו של היהודי', correct: false, key: "א" },
      { text: 'כן, אם היהודי קיבל אחריות על הנזק', correct: false, key: "ב" },
      { text: 'לא, כי "לְךָ" – רק חמץ השייך לו אסור, אך צריך להעמיד מחיצה', correct: true, key: "ג" },
      { text: 'לא, אפילו ללא מחיצה, כי הגוי הוא הבעלים', correct: false, key: "ד" },
    ]
  },
  {
    id: 125,
    question: 'מה אסור לעשות חצי שעה לפני זמן בדיקת החמץ?',
    options: [
      { text: 'אסור לאכול כל מאכל ולעשות כל מלאכה', correct: false, key: "א" },
      { text: 'אסור לאכול ארוחה גדולה בלבד', correct: false, key: "ב" },
      { text: 'אסור ללמוד תורה ולעשות מלאכה', correct: false, key: "ג" },
      { text: 'אסור להתחיל מלאכה או סעודה, אך מותר לאכול פירות ועוגות בארעי', correct: true, key: "ד" },
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
