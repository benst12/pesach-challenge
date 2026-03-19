// ============================================================
// תצורת מבחנים מרובים – מבצע שאגת הארי
// ============================================================

export interface ExamStage {
  examNumber: number;
  title: string;
  date: string;
  dateShort: string;
  chapters: string[];
  chapterNames: { name: string; url: string }[];
  storageKey: string;
}

export interface TrackExamConfig {
  trackId: string;
  stages: ExamStage[];
}

export const ID_HE_VAV  = "613e89d3-72ac-465a-a1f3-5af2652f080b";
export const ID_ZET_HET = "f6ac6419-5a1d-44e3-a076-6a28154b371e";
export const ID_TET_YOD = "eb05b110-d693-4eee-a704-f87fab9ff1a5";
export const ID_ZAHAV   = "7e2b7ab0-7dcd-428a-91d8-3e7d4bd0c308";

function sk(trackId: string, n: number) {
  return `pesach_exam_open_${trackId.slice(0, 8)}_${n}`;
}

// ─── לוח זמנים ───────────────────────────────────────────────
// מבחן א (כל המסלולים)  – יום רביעי  כ"ט אדר
// מבחן ב (כל המסלולים)  – יום שני  ה' ניסן
// מבחן ג (מסלולים ג+ד)  – יום חמישי  ח' ניסן
// מבחן ד (מסלול זהב בלבד) – יום שלישי  י"ג ניסן
// ─────────────────────────────────────────────────────────────

export const EXAM_CONFIGS: TrackExamConfig[] = [

  // ══════════════════════════════════════════════════
  // מסלול א – כיתות ה-ו  |  2 מבחנים
  // פרקים: א, ח, טו, טז
  // מבחן א  → פרקים א + ח
  // מבחן ב  → פרקים טו + טז
  // ══════════════════════════════════════════════════
  {
    trackId: ID_HE_VAV,
    stages: [
      {
        examNumber: 1,
        title: "מבחן א'",
        date: 'יום רביעי, כ"ט אדר תשפ"ה',
        dateShort: 'כ"ט אדר',
        chapters: ["פרק א", "פרק ח"],
        chapterNames: [
          { name: "פרק א – משמעות החג",  url: "https://ph.yhb.org.il/04-01/" },
          { name: "פרק ח – תערובת חמץ", url: "https://ph.yhb.org.il/04-08/" },
        ],
        storageKey: sk(ID_HE_VAV, 1),
      },
      {
        examNumber: 2,
        title: "מבחן ב'",
        date: "יום שני, ה' ניסן תשפ\"ו",
        dateShort: "ה' ניסן",
        chapters: ["פרק טו", "פרק טז"],
        chapterNames: [
          { name: "פרק טו – הכנות לליל הסדר", url: "https://ph.yhb.org.il/04-15/" },
          { name: "פרק טז – ליל הסדר",         url: "https://ph.yhb.org.il/04-16/" },
        ],
        storageKey: sk(ID_HE_VAV, 2),
      },
    ],
  },

  // ══════════════════════════════════════════════════
  // מסלול ב – כיתות ז-ח  |  2 מבחנים
  // פרקים: א, ח, טו, טז + זמנים ב-ג
  // מבחן א  → פרקים א + ח
  // מבחן ב  → פרקים טו + טז + זמנים ב + זמנים ג
  // ══════════════════════════════════════════════════
  {
    trackId: ID_ZET_HET,
    stages: [
      {
        examNumber: 1,
        title: "מבחן א'",
        date: 'יום רביעי, כ"ט אדר תשפ"ה',
        dateShort: 'כ"ט אדר',
        chapters: ["פרק א", "פרק ח"],
        chapterNames: [
          { name: "פרק א – משמעות החג",  url: "https://ph.yhb.org.il/04-01/" },
          { name: "פרק ח – תערובת חמץ", url: "https://ph.yhb.org.il/04-08/" },
        ],
        storageKey: sk(ID_ZET_HET, 1),
      },
      {
        examNumber: 2,
        title: "מבחן ב'",
        date: "יום שני, ה' ניסן תשפ\"ו",
        dateShort: "ה' ניסן",
        chapters: ["פרק טו", "פרק טז", "זמנים פרק ב", "זמנים פרק ג"],
        chapterNames: [
          { name: "פרק טו – הכנות לליל הסדר",               url: "https://ph.yhb.org.il/04-15/" },
          { name: "פרק טז – ליל הסדר",                       url: "https://ph.yhb.org.il/04-16/" },
          { name: "זמנים פרק ב – הלכות ספירת העומר",        url: "https://ph.yhb.org.il/05-02/" },
          { name: "זמנים פרק ג – מנהגי אבלות בספירת העומר", url: "https://ph.yhb.org.il/05-03/" },
        ],
        storageKey: sk(ID_ZET_HET, 2),
      },
    ],
  },

  // ══════════════════════════════════════════════════
  // מסלול ג – כיתות ט-יב  |  3 מבחנים
  // פרקים: א, ה, ו, ח, טו, טז + זמנים ב-ג
  // מבחן א  → פרקים א + ח
  // מבחן ב  → פרקים ה + ו + טו + טז
  // מבחן ג  → זמנים פרק ב + זמנים פרק ג
  // ══════════════════════════════════════════════════
  {
    trackId: ID_TET_YOD,
    stages: [
      {
        examNumber: 1,
        title: "מבחן א'",
        date: 'יום רביעי, כ"ט אדר תשפ"ה',
        dateShort: 'כ"ט אדר',
        chapters: ["פרק א", "פרק ח"],
        chapterNames: [
          { name: "פרק א – משמעות החג",  url: "https://ph.yhb.org.il/04-01/" },
          { name: "פרק ח – תערובת חמץ", url: "https://ph.yhb.org.il/04-08/" },
        ],
        storageKey: sk(ID_TET_YOD, 1),
      },
      {
        examNumber: 2,
        title: "מבחן ב'",
        date: "יום שני, ה' ניסן תשפ\"ו",
        dateShort: "ה' ניסן",
        chapters: ["פרק ה", "פרק ו", "פרק טו", "פרק טז"],
        chapterNames: [
          { name: "פרק ה – ביטול חמץ ושריפתו",  url: "https://ph.yhb.org.il/04-05/" },
          { name: "פרק ו – מכירת חמץ",           url: "https://ph.yhb.org.il/04-06/" },
          { name: "פרק טו – הכנות לליל הסדר",   url: "https://ph.yhb.org.il/04-15/" },
          { name: "פרק טז – ליל הסדר",           url: "https://ph.yhb.org.il/04-16/" },
        ],
        storageKey: sk(ID_TET_YOD, 2),
      },
      {
        examNumber: 3,
        title: "מבחן ג'",
        date: "יום חמישי, ח' ניסן תשפ\"ה",
        dateShort: "ח' ניסן",
        chapters: ["זמנים פרק ב", "זמנים פרק ג"],
        chapterNames: [
          { name: "זמנים פרק ב – הלכות ספירת העומר",        url: "https://ph.yhb.org.il/05-02/" },
          { name: "זמנים פרק ג – מנהגי אבלות בספירת העומר", url: "https://ph.yhb.org.il/05-03/" },
        ],
        storageKey: sk(ID_TET_YOD, 3),
      },
    ],
  },

  // ══════════════════════════════════════════════════
  // מסלול ד – זהב  |  4 מבחנים
  // פרקים: כל 16 פרקי פסח + זמנים ב-ג
  // מבחן א  → פרקים א–ד
  // מבחן ב  → פרקים ה–ח
  // מבחן ג  → פרקים ט–יד + טו + טז
  // מבחן ד  → זמנים פרק ב + זמנים פרק ג
  // ══════════════════════════════════════════════════
  {
    trackId: ID_ZAHAV,
    stages: [
      {
        examNumber: 1,
        title: "מבחן א'",
        date: 'יום רביעי, כ"ט אדר תשפ"ה',
        dateShort: 'כ"ט אדר',
        chapters: ["פרק א", "פרק ב", "פרק ג", "פרק ד"],
        chapterNames: [
          { name: "פרק א – משמעות החג",       url: "https://ph.yhb.org.il/04-01/" },
          { name: "פרק ב – כללי איסור חמץ",   url: "https://ph.yhb.org.il/04-02/" },
          { name: "פרק ג – מצוות השבתת חמץ",  url: "https://ph.yhb.org.il/04-03/" },
          { name: "פרק ד – בדיקת חמץ",         url: "https://ph.yhb.org.il/04-04/" },
        ],
        storageKey: sk(ID_ZAHAV, 1),
      },
      {
        examNumber: 2,
        title: "מבחן ב'",
        date: "יום שני, ה' ניסן תשפ\"ו",
        dateShort: "ה' ניסן",
        chapters: ["פרק ה", "פרק ו", "פרק ז", "פרק ח"],
        chapterNames: [
          { name: "פרק ה – ביטול חמץ ושריפתו", url: "https://ph.yhb.org.il/04-05/" },
          { name: "פרק ו – מכירת חמץ",          url: "https://ph.yhb.org.il/04-06/" },
          { name: "פרק ז – חמשת מיני דגן",       url: "https://ph.yhb.org.il/04-07/" },
          { name: "פרק ח – תערובת חמץ",          url: "https://ph.yhb.org.il/04-08/" },
        ],
        storageKey: sk(ID_ZAHAV, 2),
      },
      {
        examNumber: 3,
        title: "מבחן ג'",
        date: "יום חמישי, ח' ניסן תשפ\"ה",
        dateShort: "ח' ניסן",
        chapters: ["פרק ט", "פרק י", "פרק יא", "פרק יב", "פרק יג", "פרק יד", "פרק טו", "פרק טז"],
        chapterNames: [
          { name: "פרק ט – כללי כשרות לפסח",         url: "https://ph.yhb.org.il/04-09/" },
          { name: "פרק י – כשרות מוצרים שונים",       url: "https://ph.yhb.org.il/04-10/" },
          { name: "פרק יא – הכשרת המטבח",             url: "https://ph.yhb.org.il/04-11/" },
          { name: "פרק יב – הלכות מצה",               url: "https://ph.yhb.org.il/04-12/" },
          { name: "פרק יג – הלכות ערב פסח ומנהגיו",  url: "https://ph.yhb.org.il/04-13/" },
          { name: "פרק יד – ערב פסח שחל בשבת",        url: "https://ph.yhb.org.il/04-14/" },
          { name: "פרק טו – הכנות לליל הסדר",        url: "https://ph.yhb.org.il/04-15/" },
          { name: "פרק טז – ליל הסדר",                url: "https://ph.yhb.org.il/04-16/" },
        ],
        storageKey: sk(ID_ZAHAV, 3),
      },
      {
        examNumber: 4,
        title: "מבחן ד'",
        date: 'יום שלישי, י"ג ניסן תשפ"ה',
        dateShort: 'י"ג ניסן',
        chapters: ["זמנים פרק ב", "זמנים פרק ג"],
        chapterNames: [
          { name: "זמנים פרק ב – הלכות ספירת העומר",        url: "https://ph.yhb.org.il/05-02/" },
          { name: "זמנים פרק ג – מנהגי אבלות בספירת העומר", url: "https://ph.yhb.org.il/05-03/" },
        ],
        storageKey: sk(ID_ZAHAV, 4),
      },
    ],
  },
];

export function getTrackExamConfig(trackId: string): TrackExamConfig | undefined {
  return EXAM_CONFIGS.find(c => c.trackId === trackId);
}

export const PREVIEW_CODE = "פסח כשר";

export function isStageOpen(stage: ExamStage): boolean {
  try {
    if (localStorage.getItem(stage.storageKey) === "true") return true;
    // preview mode — קוד גישה מיוחד
    if (localStorage.getItem("pesach_preview_mode") === "true") return true;
    return false;
  } catch { return false; }
}

export function activatePreviewMode(code: string): boolean {
  if (code === PREVIEW_CODE) {
    localStorage.setItem("pesach_preview_mode", "true");
    return true;
  }
  return false;
}

export function isPreviewMode(): boolean {
  try { return localStorage.getItem("pesach_preview_mode") === "true"; } catch { return false; }
}

export function setStageOpen(stage: ExamStage, open: boolean): void {
  try { localStorage.setItem(stage.storageKey, String(open)); } catch {}
}
