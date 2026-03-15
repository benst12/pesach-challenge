// ============================================================
// Design: "אריה דיגיטלי" - Bold & Fierce esports/gamification
// Colors: Dark charcoal + fiery amber + crimson
// Font: Secular One (display) + Heebo (body)
// ============================================================

export const SCHOOLS = [
  // בתי ספר יסודיים - נעם
  "נעם אופקים",
  "נעם אשדוד",
  "נעם בני ברק",
  "נעם בני דקלים בנים",
  "נעם בני דקלים בנות",
  "נעם גן יבנה",
  "נעם דימונה",
  "נעם חבל יבנה",
  "נעם חומת שמואל",
  "נעם יבנה",
  "נעם לוד בנות (המאירי)",
  "נעם לוד בנים (רז)",
  "נעם לוד בנים (נריה)",
  "נעם לוד בנות (נהורא)",
  "נעם מעלה התורה בנים",
  "נעם מעלה התורה בנות",
  "נעם מצפה יריחו",
  "נעם נצרים בנות",
  "נעם נצרים בנים",
  "נעם פסגת זאב בנות",
  "נעם פסגת זאב בנים",
  "נעם פרדס חנה",
  "נעם צפת",
  'נעם קמ"ש בנות ירושלים',
  'נעם קמ"ש בנים ירושלים',
  "נעם קרית אתא",
  "נעם ראש העין",
  "נעם רחובות בנים",
  "נעם רחובות בנות",
  'נעם רחובות תתמ"ד',
  "נעם רמות בנות",
  "נעם רמות בנים",
  // אולפנות וישיבות - צביה
  "ישיבת צביה אילת",
  "צביה ארץ הצבי",
  "אולפנת צביה אשקלון",
  "ישיבת צביה אשקלון",
  "אולפנת צביה בני ברק",
  "אולפנת צביה בקעת הירדן",
  "ישיבת צביה בקעת הירדן",
  "אולפנת צביה בת ים",
  "ישיבת צביה דימונה",
  "אולפנת צביה הר ברכה",
  "ישיבת צביה הר ברכה",
  "אולפנת צביה הר חברון",
  "אולפנת צביה הרצליה",
  "אולפנת צביה חיפה",
  "אולפנת צביה חפץ חיים",
  "אולפנת צביה טהר",
  "אולפנת צביה יצירתית",
  "אולפנת צביה ירושלים",
  "ישיבת נעם",
  "אולפנת צביה כוכב יעקב",
  "ישיבת צביה כרמי קטיף",
  "אולפנת צביה דימונה",
  "אולפנת צביה לוד",
  "ישיבת צביה לוד",
  'אולפנת צביה מע"א',
  'ישיבת צביה מע"א',
  "אולפנת צביה מעלות",
  "אולפנת צביה עפולה",
  "ישיבת צביה פתח תקווה",
  "קריית חינוך צביה נחל שורק",
  "אולפנת צביה רבבה",
  "אולפנת צביה רננה",
  "אולפנת צביה שבות בית שמש",
  "ישיבת צביה מצפה רחובות",
  "אחר",
];

export const CLASSES = [
  "כיתה ה",
  "כיתה ה1",
  "כיתה ה2",
  "כיתה ה3",
  "כיתה ה4",
  "כיתה ה5",
  "כיתה ו",
  "כיתה ו1",
  "כיתה ו2",
  "כיתה ו3",
  "כיתה ו4",
  "כיתה ו5",
  "כיתה ז",
  "כיתה ז1",
  "כיתה ז2",
  "כיתה ז3",
  "כיתה ז4",
  "כיתה ז5",
  "כיתה ח",
  "כיתה ח1",
  "כיתה ח2",
  "כיתה ח3",
  "כיתה ח4",
  "כיתה ח5",
  "כיתה ט",
  "כיתה ט1",
  "כיתה ט2",
  "כיתה ט3",
  "כיתה ט4",
  "כיתה ט5",
  "כיתה י",
  "כיתה י1",
  "כיתה י2",
  "כיתה י3",
  "כיתה י4",
  "כיתה י5",
  "כיתה יא",
  "כיתה יא1",
  "כיתה יא2",
  "כיתה יא3",
  "כיתה יא4",
  "כיתה יא5",
  "כיתה יב",
  "כיתה יב1",
  "כיתה יב2",
  "כיתה יב3",
  "כיתה יב4",
  "כיתה יב5",
];

export interface Track {
  id: string;
  name: string;
  description: string;
  grades: string;
  chapters: { name: string; url: string }[];
  icon: string;
}

// URLs: 04-XX for Pesach, 05-XX for Zmanim (Sefirat HaOmer)
export const TRACKS: Track[] = [
  {
    id: "613e89d3-72ac-465a-a1f3-5af2652f080b",
    name: "מסלול כיתות ה-ו",
    description: "4 פרקים מתוך פניני הלכה - הלכות פסח",
    grades: "ה-ו",
    chapters: [
      { name: "פרק א – משמעות החג", url: "https://ph.yhb.org.il/04-01/" },
      { name: "פרק ח – תערובת חמץ", url: "https://ph.yhb.org.il/04-08/" },
      { name: "פרק טו – הכנות לליל הסדר", url: "https://ph.yhb.org.il/04-15/" },
      { name: "פרק טז – ליל הסדר", url: "https://ph.yhb.org.il/04-16/" },
    ],
    icon: "🦁",
  },
  {
    id: "f6ac6419-5a1d-44e3-a076-6a28154b371e",
    name: "מסלול כיתות ז-ח",
    description: "6 פרקים מתוך פניני הלכה - הלכות פסח וספירת העומר",
    grades: "ז-ח",
    chapters: [
      { name: "פרק א – משמעות החג", url: "https://ph.yhb.org.il/04-01/" },
      { name: "פרק ח – תערובת חמץ", url: "https://ph.yhb.org.il/04-08/" },
      { name: "פרק טו – הכנות לליל הסדר", url: "https://ph.yhb.org.il/04-15/" },
      { name: "פרק טז – ליל הסדר", url: "https://ph.yhb.org.il/04-16/" },
      { name: "זמנים פרק ב – הלכות ספירת העומר", url: "https://ph.yhb.org.il/05-02/" },
      { name: "זמנים פרק ג – מנהגי אבלות בספירת העומר", url: "https://ph.yhb.org.il/05-03/" },
    ],
    icon: "🔥",
  },
  {
    id: "eb05b110-d693-4eee-a704-f87fab9ff1a5",
    name: "מסלול כיתות ט-יב",
    description: "8 פרקים מתוך פניני הלכה - הלכות פסח וספירת העומר",
    grades: "ט-יב",
    chapters: [
      { name: "פרק א – משמעות החג", url: "https://ph.yhb.org.il/04-01/" },
      { name: "פרק ה – ביטול חמץ ושריפתו", url: "https://ph.yhb.org.il/04-05/" },
      { name: "פרק ו – מכירת חמץ", url: "https://ph.yhb.org.il/04-06/" },
      { name: "פרק ח – תערובת חמץ", url: "https://ph.yhb.org.il/04-08/" },
      { name: "פרק טו – הכנות לליל הסדר", url: "https://ph.yhb.org.il/04-15/" },
      { name: "פרק טז – ליל הסדר", url: "https://ph.yhb.org.il/04-16/" },
      { name: "זמנים פרק ב – הלכות ספירת העומר", url: "https://ph.yhb.org.il/05-02/" },
      { name: "זמנים פרק ג – מנהגי אבלות בספירת העומר", url: "https://ph.yhb.org.il/05-03/" },
    ],
    icon: "⚔️",
  },
  {
    id: "7e2b7ab0-7dcd-428a-91d8-3e7d4bd0c308",
    name: "מסלול זהב",
    description: "כל 16 פרקי פסח + 2 פרקי ספירת העומר",
    grades: "כל הכיתות",
    chapters: [
      { name: "פרק א – משמעות החג", url: "https://ph.yhb.org.il/04-01/" },
      { name: "פרק ב – כללי איסור חמץ", url: "https://ph.yhb.org.il/04-02/" },
      { name: "פרק ג – מצוות השבתת חמץ", url: "https://ph.yhb.org.il/04-03/" },
      { name: "פרק ד – בדיקת חמץ", url: "https://ph.yhb.org.il/04-04/" },
      { name: "פרק ה – ביטול חמץ ושריפתו", url: "https://ph.yhb.org.il/04-05/" },
      { name: "פרק ו – מכירת חמץ", url: "https://ph.yhb.org.il/04-06/" },
      { name: "פרק ז – חמשת מיני דגן", url: "https://ph.yhb.org.il/04-07/" },
      { name: "פרק ח – תערובת חמץ", url: "https://ph.yhb.org.il/04-08/" },
      { name: "פרק ט – כללי כשרות לפסח", url: "https://ph.yhb.org.il/04-09/" },
      { name: "פרק י – כשרות מוצרים שונים", url: "https://ph.yhb.org.il/04-10/" },
      { name: "פרק יא – הכשרת המטבח", url: "https://ph.yhb.org.il/04-11/" },
      { name: "פרק יב – הלכות מצה", url: "https://ph.yhb.org.il/04-12/" },
      { name: "פרק יג – הלכות ערב פסח ומנהגיו", url: "https://ph.yhb.org.il/04-13/" },
      { name: "פרק יד – ערב פסח שחל בשבת", url: "https://ph.yhb.org.il/04-14/" },
      { name: "פרק טו – הכנות לליל הסדר", url: "https://ph.yhb.org.il/04-15/" },
      { name: "פרק טז – ליל הסדר", url: "https://ph.yhb.org.il/04-16/" },
      { name: "זמנים פרק ב – הלכות ספירת העומר", url: "https://ph.yhb.org.il/05-02/" },
      { name: "זמנים פרק ג – מנהגי אבלות בספירת העומר", url: "https://ph.yhb.org.il/05-03/" },
    ],
    icon: "👑",
  },
];

export interface Question {
  id: number;
  chapter: string;
  question: string;
  options: { text: string; correct: boolean }[];
}

// All 130 questions organized by chapter
export const ALL_QUESTIONS: Question[] = [
  { id: 1, chapter: "פרק א", question: "מה הם שני השמות של פסח המוזכרים בתורה?", options: [{ text: "חג המצות וחג הפסח", correct: true }, { text: "חג החירות וחג הסוכות", correct: false }, { text: "חג האביב וחג הקציר", correct: false }, { text: "חג הגאולה וחג השמחה", correct: false }] },
  { id: 2, chapter: "פרק א", question: "כנגד מה הוא \"חג המצות\" ומה הוא \"חג הפסח\"?", options: [{ text: "חג המצות כנגד גילוי האמונה, חג הפסח כנגד סגולת ישראל", correct: true }, { text: "חג המצות לזכר המצרים, חג הפסח לזכר הפסיחה", correct: false }, { text: "חג המצות לכבוד הלחם, חג הפסח לכבוד השה", correct: false }, { text: "חג המצות לחמישה עשר בניסן, חג הפסח לארבעה עשר בניסן", correct: false }] },
  { id: 3, chapter: "פרק א", question: "מה מסמלת המצה לפי ההגדה?", options: [{ text: "שנגלה הקב\"ה על אבותינו וגאלם קודם שהספיק בצקם להחמיץ", correct: true }, { text: "שהמצרים לא ידעו לאפות לחם", correct: false }, { text: "שמשה שכח לשים שמרים", correct: false }, { text: "שישראל היו עניים ולא יכלו לקנות לחם", correct: false }] },
  { id: 4, chapter: "פרק א", question: "מה מסמל קרבן הפסח?", options: [{ text: "סגולת ישראל", correct: true }, { text: "כוחם של הכהנים", correct: false }, { text: "שחיטה לשם שמים", correct: false }, { text: "ארוחת שישי מיוחדת", correct: false }] },
  { id: 5, chapter: "פרק א", question: "מי שלא נימול – מה דינו לגבי קרבן הפסח?", options: [{ text: "אינו רשאי לאכול ממנו", correct: true }, { text: "אוכל אבל לא מקריב", correct: false }, { text: "מקריב אבל לא אוכל", correct: false }, { text: "חייב להתגייר קודם", correct: false }] },
  { id: 6, chapter: "פרק א", question: "מה מסמל החמץ לפי פניני הלכה?", options: [{ text: "גאווה וניפוח היצר", correct: true }, { text: "עצלות וחוסר מרץ", correct: false }, { text: "לחם עשיר שרק לעשירים", correct: false }, { text: "בצק שנאפה יותר מדי", correct: false }] },
  { id: 7, chapter: "פרק א", question: "לפי חז\"ל (מסכת שבת פח), מה היה תנאי קיום העולם בבריאה?", options: [{ text: "שישראל יקבלו את התורה", correct: true }, { text: "שהשמש תזרח כל יום", correct: false }, { text: "שנח יבנה תיבה", correct: false }, { text: "שהמבול לא יחזור", correct: false }] },
  { id: 8, chapter: "פרק א", question: "מהו חג החירות לפי פניני הלכה?", options: [{ text: "שחרור הרוח מעבדות החומר", correct: true }, { text: "יום שאין בו עבודה", correct: false }, { text: "חופשה שנתית מהחיים", correct: false }, { text: "חג שניתן לעשות בו מה שרוצים", correct: false }] },
  { id: 9, chapter: "פרק א", question: "כמה זמן לפני פסח מצווה להתחיל ללמוד הלכות פסח?", options: [{ text: "שלושים יום", correct: true }, { text: "שבועיים", correct: false }, { text: "שבעה ימים", correct: false }, { text: "רק בערב פסח – לא מפספסים!", correct: false }] },
  { id: 10, chapter: "פרק א", question: "מה מיוחד ביציאת מצרים לעומת אירועים אחרים?", options: [{ text: "נתגלתה הנהגת ה\' בעולם בצורה הבולטת והמוחשית ביותר", correct: true }, { text: "זו הפעם היחידה שמשה דיבר עם פרעה", correct: false }, { text: "שלא היו שם ניסים אחרים", correct: false }, { text: "שרק שבט לוי יצא ממצרים", correct: false }] },
  { id: 11, chapter: "פרק א", question: "מה מיוחד בקרבן הפסח מבין כל הקרבנות?", options: [{ text: "הוא הקרבן היחיד שמקריבים כל ישראל יחד", correct: true }, { text: "רק הכהנים רשאים להקריבו", correct: false }, { text: "הוא מוקרב בלילה בלבד", correct: false }, { text: "מביאים אותו מחו\"ל דווקא", correct: false }] },
  { id: 12, chapter: "פרק א", question: "מה פירוש \"פסח שני\"?", options: [{ text: "הזדמנות להקריב קרבן פסח בי\"ד באייר למי שלא יכול היה בניסן", correct: true }, { text: "חג נוסף שחוגגים בחודש אייר", correct: false }, { text: "פסח למי שנרדם בסדר ולא הספיק לגמור", correct: false }, { text: "ארוחה שניה של ליל הסדר", correct: false }] },
  { id: 101, chapter: "פרק ב", question: "כמה מצוות לא תעשה יש הקשורות לאיסור חמץ?", options: [{ text: "ארבע", correct: true }, { text: "שתיים", correct: false }, { text: "שש", correct: false }, { text: "אחת גדולה שמכסה הכל", correct: false }] },
  { id: 102, chapter: "פרק ב", question: "מהי ההגדרה של חמץ?", options: [{ text: "בצק מחמשת מיני דגן שהחמיץ", correct: true }, { text: "כל מאכל שאינו כשר לפסח", correct: false }, { text: "לחם שנאפה לפני פסח", correct: false }, { text: "כל מה שאמא אומרת שאסור", correct: false }] },
  { id: 103, chapter: "פרק ב", question: "מהם חמשת מיני הדגן שמהם יכולה להיות חמץ?", options: [{ text: "חיטה, שעורה, כוסמת, שיפון ושיבולת שועל", correct: true }, { text: "חיטה, שעורה, תירס, אורז וקטניות", correct: false }, { text: "חיטה, קמח, לחם, מצה ועוגה", correct: false }, { text: "חיטה ושעורה בלבד – השאר זה סתם קטניות", correct: false }] },
  { id: 104, chapter: "פרק ב", question: "כמה זמן לוקח לבצק להחמיץ אם אינו נלוש?", options: [{ text: "שמונה עשר דקות", correct: true }, { text: "שעה", correct: false }, { text: "חצי שעה", correct: false }, { text: "יום שלם", correct: false }] },
  { id: 105, chapter: "פרק ב", question: "האם יש איסור חמץ מהתורה כבר מתחילת יום י\"ד בניסן?", options: [{ text: "לא, האיסור מן התורה מתחיל מחצי היום", correct: true }, { text: "כן, מתחילת יום י\"ד", correct: false }, { text: "לא, האיסור רק מליל ט\"ו", correct: false }, { text: "כן, כבר מר\"ח ניסן", correct: false }] },
  { id: 106, chapter: "פרק ב", question: "מה ההבדל בין \"חמץ נוקשה\" לחמץ רגיל?", options: [{ text: "חמץ נוקשה הוא תערובת שאינה ראויה לאכילה, איסורו קל יותר", correct: true }, { text: "חמץ נוקשה הוא חמץ ישן מאשתקד", correct: false }, { text: "חמץ נוקשה הוא חמץ שנמצא בחוץ לארץ", correct: false }, { text: "חמץ נוקשה הוא חמץ שהוקפא", correct: false }] },
  { id: 107, chapter: "פרק ב", question: "האם מותר לקיים חמץ ברשותו בפסח, גם בלי לאכול אותו?", options: [{ text: "לא, יש איסור מיוחד – \"בל יראה ובל ימצא\"", correct: true }, { text: "כן, כל עוד לא אוכל", correct: false }, { text: "מותר רק אם מכסה אותו", correct: false }, { text: "מותר רק בחדר נעול", correct: false }] },
  { id: 108, chapter: "פרק ב", question: "מהו \"חמץ שעבר עליו הפסח\"?", options: [{ text: "חמץ שהיה ברשות יהודי בפסח ואסור באכילה גם לאחריו", correct: true }, { text: "חמץ שנמכר לגוי", correct: false }, { text: "חמץ ישן שכבר לא ראוי לאכילה", correct: false }, { text: "חמץ שנמצא אחרי פסח בשוגג", correct: false }] },
  { id: 176, chapter: "פרק ב", question: "האם חמץ של גוי שנמצא בביתו של ישראל אסור?", options: [{ text: "לא, אם לא קיבל עליו אחריות – מותר", correct: true }, { text: "כן, תמיד אסור", correct: false }, { text: "כן, אם נמצא יותר מיום", correct: false }, { text: "תלוי בגודל הכמות", correct: false }] },
  { id: 177, chapter: "פרק ב", question: "כלב של בית – האם צריך לדאוג שלא יאכל חמץ בפסח?", options: [{ text: "לא, אין חיוב להאכיל בהמות וחיות בלא חמץ – רק לאדם", correct: true }, { text: "כן, גם בעלי חיים אסורים", correct: false }, { text: "כן, אם הם של ישראל", correct: false }, { text: "לא, אבל עדיף להאכילם מצה", correct: false }] },
  { id: 180, chapter: "פרק ב", question: "האם מותר לתת לחיות מחמד אוכל המכיל חמץ בפסח?", options: [{ text: "לא, אסור לשים חמץ בביתו גם כאוכל לבעלי חיים", correct: true }, { text: "כן, כי הוא לא שלנו", correct: false }, { text: "כן, כי בעלי חיים לא אסורים", correct: false }, { text: "כן, אם הם לא ישנים בחדר השינה", correct: false }] },
  { id: 109, chapter: "פרק ג", question: "מה מצוות \"תשביתו\"?", options: [{ text: "מצווה לבטל את החמץ מהלב ולהשבית אותו", correct: true }, { text: "מצווה לאכול מצה", correct: false }, { text: "מצווה לנקות את הבית", correct: false }, { text: "מצווה לשרוף חמץ דווקא", correct: false }] },
  { id: 110, chapter: "פרק ג", question: "האם ביטול החמץ בלב בלבד – מספיק מן התורה?", options: [{ text: "כן, ביטול בלב מועיל מן התורה", correct: true }, { text: "לא, צריך גם לשרוף", correct: false }, { text: "לא, צריך גם למכור", correct: false }, { text: "לא, צריך לאכול אותו", correct: false }] },
  { id: 111, chapter: "פרק ג", question: "מדוע חייבו חכמים גם לבדוק ולשרוף, אם ביטול מועיל?", options: [{ text: "שמא ימצא חמץ בפסח ויבוא לאכלו", correct: true }, { text: "כדי לנקות את הבית לכבוד הפסח", correct: false }, { text: "כי הביטול לא מועיל כלל", correct: false }, { text: "כי לבד זה לא מספיק לתחושה הפנימית", correct: false }] },
  { id: 112, chapter: "פרק ג", question: "האם מצוות \"תשביתו\" חלה גם על חמץ שאינו שלו?", options: [{ text: "לא, רק על חמץ שברשותו", correct: true }, { text: "כן, על כל חמץ שרואה", correct: false }, { text: "כן, גם על חמץ של שכנים", correct: false }, { text: "כן, על חמץ בכל הרחוב", correct: false }] },
  { id: 113, chapter: "פרק ג", question: "האם אפשר לקיים מצוות ביעור חמץ על ידי שטיפה בים?", options: [{ text: "כן, שטיפה בנהר ים או אוקיינוס נחשבת ביעור", correct: true }, { text: "לא, רק שריפה מועילה", correct: false }, { text: "לא, רק קבורה", correct: false }, { text: "לא, רק מכירה לגוי", correct: false }] },
  { id: 114, chapter: "פרק ג", question: "מהי העדיפות לכתחילה לביעור חמץ?", options: [{ text: "שריפה", correct: true }, { text: "קבורה", correct: false }, { text: "פירור לרוח", correct: false }, { text: "הורדה בשירותים – מהיר יותר!", correct: false }] },
  { id: 13, chapter: "פרק ד", question: "מתי מבצעים את בדיקת החמץ?", options: [{ text: "בתחילת ליל י\"ד בניסן", correct: true }, { text: "בבוקר י\"ד בניסן", correct: false }, { text: "בערב פסח אחרי הצהריים", correct: false }, { text: "בליל ט\"ו לפני הסדר", correct: false }] },
  { id: 14, chapter: "פרק ד", question: "באיזה כלי מאירים לכתחילה בבדיקת חמץ?", options: [{ text: "נר שעווה", correct: true }, { text: "פנס חשמלי חזק", correct: false }, { text: "נורת לד", correct: false }, { text: "אבוקה – כדי לפחד את החמץ!", correct: false }] },
  { id: 15, chapter: "פרק ד", question: "מדוע בודקים דווקא עם נר?", options: [{ text: "אורו מגיע לסדקים וחורים שאור חשמלי לא מגיע אליהם", correct: true }, { text: "זה זול יותר מחשמל", correct: false }, { text: "כדי לשרוף את החמץ ישר", correct: false }, { text: "לאבותינו לא היה חשמל ואנחנו שומרים מסורת", correct: false }] },
  { id: 16, chapter: "פרק ד", question: "אם שכח ולא בדק בליל י\"ד – מה עליו לעשות?", options: [{ text: "בודק ביום י\"ד בניסן", correct: true }, { text: "אינו בודק כלל ומבטל", correct: false }, { text: "מוכר את הבית לגוי", correct: false }, { text: "מחכה לפסח הבא", correct: false }] },
  { id: 17, chapter: "פרק ד", question: "אילו מקומות מחויבים בבדיקת חמץ?", options: [{ text: "כל מקום שרגיל להכניס בו חמץ", correct: true }, { text: "רק המטבח", correct: false }, { text: "כל הבית ללא יוצא מן הכלל", correct: false }, { text: "רק החדרים שישנים בהם", correct: false }] },
  { id: 18, chapter: "פרק ד", question: "מה עושים עם החמץ שמוצאים בבדיקה?", options: [{ text: "מניחים אותו בצד לשריפה למחרת", correct: true }, { text: "זורקים אותו מיד לפח", correct: false }, { text: "נותנים אותו לשכן הגוי", correct: false }, { text: "אוכלים אותו מיד – חבל לזרוק!", correct: false }] },
  { id: 19, chapter: "פרק ד", question: "מה אומרים אחרי בדיקת החמץ?", options: [{ text: "ביטול חמץ – \"כל חמירא וחמיעא\"", correct: true }, { text: "תפילת ערבית", correct: false }, { text: "ברכת המזון", correct: false }, { text: "שירת הים – כי סוף סוף מצאנו הכל!", correct: false }] },
  { id: 20, chapter: "פרק ד", question: "מה הברכה הנאמרת לפני בדיקת החמץ?", options: [{ text: "\"על ביעור חמץ\"", correct: true }, { text: "\"על אכילת מצה\"", correct: false }, { text: "\"לבער חמץ מן הבית\"", correct: false }, { text: "\"אשר קידשנו ממצרים\"", correct: false }] },
  { id: 21, chapter: "פרק ד", question: "האם צריך לבדוק חדר שלא הכניסו בו חמץ מעולם?", options: [{ text: "לא, אין חובה לבדוק", correct: true }, { text: "כן, בודקים הכל ללא יוצא מן הכלל", correct: false }, { text: "כן, אבל בלי ברכה", correct: false }, { text: "כן, רק אם גודלו 4 אמות ומעלה", correct: false }] },
  { id: 22, chapter: "פרק ד", question: "מה עושים עם החמץ שנאסף בסיום הבדיקה?", options: [{ text: "שורפים אותו ביום י\"ד", correct: true }, { text: "קוברים אותו בגינה", correct: false }, { text: "מפזרים אותו ברוח", correct: false }, { text: "נותנים לעני שיאכל", correct: false }] },
  { id: 23, chapter: "פרק ד", question: "מהו מנהג הנחת עשרה חתיכות לחם לפני הבדיקה?", options: [{ text: "כדי שלא תהיה הברכה לבטלה אם לא מוצאים חמץ", correct: true }, { text: "כדי לאמן ילדים לספור עד עשר", correct: false }, { text: "כדי לתת לעני אחרי הבדיקה", correct: false }, { text: "כדי שיהיה לנו מה לאכול בשעת הבדיקה", correct: false }] },
  { id: 24, chapter: "פרק ד", question: "עד מתי ניתן לאכול חמץ בערב פסח?", options: [{ text: "עד סוף שעה חמישית", correct: true }, { text: "עד חצות הלילה", correct: false }, { text: "עד שקיעת החמה", correct: false }, { text: "עד שמישהו מתחיל לשיר \"מה נשתנה\"", correct: false }] },
  { id: 25, chapter: "פרק ד", question: "מי שיצא לטיול לפני פסח ולא יחזור עד אחריו – מה עליו לעשות?", options: [{ text: "לבדוק לפני יציאתו", correct: true }, { text: "לבקש שכן שיבדוק", correct: false }, { text: "אינו חייב כלל לבדוק", correct: false }, { text: "לשרוף את הבית – פתרון קיצוני אך יעיל!", correct: false }] },
  { id: 115, chapter: "פרק ה", question: "מה פירוש \"ביטול חמץ\"?", options: [{ text: "הפקרת החמץ בלב כאילו אינו שלו ואינו קיים", correct: true }, { text: "שריפת החמץ", correct: false }, { text: "מכירת החמץ לגוי", correct: false }, { text: "נתינת החמץ לעניים", correct: false }] },
  { id: 116, chapter: "פרק ה", question: "מתי אומרים את נוסח הביטול הראשון (ביטול לאחר בדיקה)?", options: [{ text: "בליל י\"ד אחרי הבדיקה", correct: true }, { text: "בבוקר י\"ד לפני השריפה", correct: false }, { text: "בחצות ליל י\"ד", correct: false }, { text: "ממש לפני כניסת פסח", correct: false }] },
  { id: 117, chapter: "פרק ה", question: "מתי אומרים את נוסח הביטול השני?", options: [{ text: "ביום י\"ד אחרי שריפת החמץ", correct: true }, { text: "בליל י\"ד לפני הבדיקה", correct: false }, { text: "בליל הסדר", correct: false }, { text: "בשבת שלפני פסח", correct: false }] },
  { id: 118, chapter: "פרק ה", question: "מדוע יש לומר את נוסח הביטול בשפה שמבינים?", options: [{ text: "כי הביטול הוא מחשבה ורצון בלב, צריך להבין מה אומרים", correct: true }, { text: "כי זה חובה מהתורה", correct: false }, { text: "כי כך נפסק בשולחן ערוך", correct: false }, { text: "כי ילדים לא מבינים ארמית", correct: false }] },
  { id: 119, chapter: "פרק ה", question: "אם שכח לבטל בליל י\"ד – מה דינו?", options: [{ text: "יבטל ביום י\"ד לפני שעה שישית", correct: true }, { text: "אינו צריך לבטל כלל", correct: false }, { text: "ביטולו לא מועיל כבר", correct: false }, { text: "ישלם קנס לצדקה", correct: false }] },
  { id: 120, chapter: "פרק ה", question: "האם אפשר למכור חמץ שאינו ידוע מיקומו?", options: [{ text: "כן, מוכרים \"חמץ כלשהו\" שאינו ידוע", correct: true }, { text: "לא, חייבים לדעת היכן החמץ", correct: false }, { text: "לא, מה שלא יודעים – מבטלים", correct: false }, { text: "כן, אבל רק בשווי של שקל אחד", correct: false }] },
  { id: 121, chapter: "פרק ו", question: "מה עיקר ענין מכירת חמץ?", options: [{ text: "מכירה אמיתית לגוי כדי שהחמץ לא יהיה ברשותו של ישראל בפסח", correct: true }, { text: "מכירה פיקטיבית שהרב עושה בשמו", correct: false }, { text: "העברת הבעלות לאישה", correct: false }, { text: "רישום החמץ במחשב של הרבנות", correct: false }] },
  { id: 122, chapter: "פרק ו", question: "האם מכירת חמץ היא מכירה גמורה?", options: [{ text: "כן, זוהי מכירה אמיתית מבחינת ההלכה", correct: true }, { text: "לא, זה רק \"כאילו\"", correct: false }, { text: "זה תלוי בדעת הרב", correct: false }, { text: "זה נחשב מכירה רק בדיעבד", correct: false }] },
  { id: 123, chapter: "פרק ו", question: "איזה חמץ לא ניתן למכור?", options: [{ text: "חמץ גמור שנמצא ברשותו ואינו מגדיר מיקומו – עדיף לבער", correct: true }, { text: "אין חמץ שלא ניתן למכור", correct: false }, { text: "חמץ של ילדים קטנים", correct: false }, { text: "חמץ בעל ערך כספי גבוה", correct: false }] },
  { id: 124, chapter: "פרק ו", question: "האם מותר להשתמש בחמץ שנמכר לגוי בחדר הנעול בפסח?", options: [{ text: "לא, הוא שייך לגוי", correct: true }, { text: "כן, כי זו מכירה פיקטיבית", correct: false }, { text: "כן, בתנאי שלא נהנים ממנו", correct: false }, { text: "כן, רק בחצות הלילה", correct: false }] },
  { id: 125, chapter: "פרק ו", question: "מה עושים עם החמץ שנמכר לגוי לאחר פסח?", options: [{ text: "ממתינים שהגוי \"ימכור\" אותו חזרה, ואז רוכשים אותו", correct: true }, { text: "זורקים אותו", correct: false }, { text: "נותנים אותו לצדקה", correct: false }, { text: "אוכלים אותו בשמחה – \"כשר לאחר פסח\"!", correct: false }] },
  { id: 175, chapter: "פרק ו", question: "האם מותר לקחת חמץ בפיקדון מגוי לפני פסח?", options: [{ text: "לא, אם לקח עליו אחריות – הרי הוא כשלו", correct: true }, { text: "כן, תמיד מותר", correct: false }, { text: "כן, בתנאי שהוא נעול", correct: false }, { text: "כן, כי הוא לא שלו ממש", correct: false }] },
  { id: 126, chapter: "פרק ז", question: "מה הדין אם נפל פירור חמץ לתוך תבשיל בפסח?", options: [{ text: "כל כמות של חמץ אוסרת", correct: true }, { text: "אם החמץ פחות מאחד בשישים – התבשיל מותר", correct: false }, { text: "תלוי אם הרגישו בטעם", correct: false }, { text: "מותר אם מבשלים עוד שעה", correct: false }] },
  { id: 127, chapter: "פרק ז", question: "מה ייחודי בדיני תערובת חמץ לעומת שאר האיסורים?", options: [{ text: "חמץ בפסח אוסר בכל שהוא, לא בשישים", correct: true }, { text: "חמץ בפסח מותר עד רוב", correct: false }, { text: "חמץ בפסח מותר בשישים כמו שאר איסורים", correct: false }, { text: "חמץ בפסח מותר בשניים ומאתיים", correct: false }] },
  { id: 128, chapter: "פרק ז", question: "מה הדין בתערובת חמץ שנפלה לפני פסח?", options: [{ text: "לפני פסח חמץ בטל בשישים כמו שאר האיסורים", correct: true }, { text: "לפני פסח חמץ אוסר בכל שהוא", correct: false }, { text: "לפני פסח מותר הכל", correct: false }, { text: "לפני פסח חמץ בטל ברוב", correct: false }] },
  { id: 129, chapter: "פרק ז", question: "מה הדין אם נפלה טיפת בירה לסיר מרק בפסח?", options: [{ text: "אוסרת את המרק כולו כי חמץ בפסח אוסר בכל שהוא", correct: true }, { text: "מותר אם יש שישים כנגדה", correct: false }, { text: "מותר כי בירה זה לא חמץ גמור", correct: false }, { text: "מותר אם מבשלים עוד שעתיים", correct: false }] },
  { id: 130, chapter: "פרק ז", question: "האם חמץ שנפל לתוך תבשיל ואחר כך הוצא – התבשיל מותר?", options: [{ text: "לא, גם אם הוצא – הבלוע שהעניק אוסר", correct: true }, { text: "כן, כי החמץ יצא", correct: false }, { text: "כן, אם בישל עוד שעה", correct: false }, { text: "כן, אם שפך את הרוטב", correct: false }] },
  { id: 178, chapter: "פרק ח", question: "מה הדין לגבי תרופות שיש בהן חמץ?", options: [{ text: "תרופות חיוניות מותרות אפילו יש בהן חמץ, כי חולה אינו בגדר אוכל", correct: true }, { text: "אסורות לגמרי", correct: false }, { text: "מותרות רק לחולים שאינם מסוכנים", correct: false }, { text: "מותרות רק בהמלצת רב", correct: false }] },
  { id: 179, chapter: "פרק ח", question: "האם יש בעיה בפסח עם קוסמטיקה ומשחות המכילות חמץ?", options: [{ text: "בדרך כלל אין בעיה כי אינן ראויות לאכילה", correct: true }, { text: "יש לבדוק כל מוצר", correct: false }, { text: "כל קוסמטיקה אסורה בפסח", correct: false }, { text: "רק שפתון אסור – כי נוגע בפה", correct: false }] },
  { id: 131, chapter: "פרק ט", question: "מהו \"קטניות\" ומדוע אשכנזים נהגו לאסור?", options: [{ text: "קטניות כגון אורז ועדשים – נהגו לאסור כי הם דומים לדגן ויש חשש לתערובת", correct: true }, { text: "כי התורה אסרה אותם", correct: false }, { text: "כי הם מחמיצים כמו חיטה", correct: false }, { text: "כי הם גורמים לנפיחות – ואיך אוכלים בהסיבה?", correct: false }] },
  { id: 132, chapter: "פרק ט", question: "האם ספרדים מותרים לאכול קטניות בפסח?", options: [{ text: "כן, ספרדים לא קיבלו את המנהג לאסור קטניות", correct: true }, { text: "לא, גם ספרדים אוסרים", correct: false }, { text: "כן, אבל לא אורז", correct: false }, { text: "כן, אבל לא חמוצים", correct: false }] },
  { id: 133, chapter: "פרק ט", question: "האם מותר לאשכנזי לאכול אצל ספרדי תבשיל קטניות בפסח?", options: [{ text: "יש הסוברים שמותר לאשכנזי בדיעבד כשאוכל אצל ספרדי", correct: true }, { text: "לא, אסור לחלוטין", correct: false }, { text: "כן, כי מנהג הספרדי פוטר", correct: false }, { text: "רק אם הרב אשכנזי נתן אישור", correct: false }] },
  { id: 134, chapter: "פרק ט", question: "האם תערובת של קטניות בתבשיל אוסרת?", options: [{ text: "לא, קטניות בתערובת אינן אוסרות", correct: true }, { text: "כן, אוסרות בכל שהוא", correct: false }, { text: "כן, אוסרות ברוב", correct: false }, { text: "כן, אוסרות בשישים", correct: false }] },
  { id: 135, chapter: "פרק ט", question: "האם קמח קטניות מותר לאשכנזים?", options: [{ text: "לא, רבים נוהגים לאסור גם קמח קטניות", correct: true }, { text: "כן, כי זה לא הקטניות עצמן", correct: false }, { text: "כן, כי כך פסק הרמ\"א", correct: false }, { text: "כן, כי אין בו גרגרים", correct: false }] },
  { id: 136, chapter: "פרק י", question: "איזה כלים צריכים הגעלה לפסח?", options: [{ text: "כלים שבלעו חמץ על ידי בישול במים", correct: true }, { text: "כל הכלים בבית", correct: false }, { text: "רק סירים", correct: false }, { text: "רק כלים שאין להם תעודת כשרות", correct: false }] },
  { id: 137, chapter: "פרק י", question: "מה עיקר ההגעלה?", options: [{ text: "רתיחת מים בכלי עד שיצא הבלוע", correct: true }, { text: "שטיפה חמה בנוזל כלים", correct: false }, { text: "חימום בתנור", correct: false }, { text: "שריית הכלי במים קרים 24 שעות", correct: false }] },
  { id: 138, chapter: "פרק י", question: "כלי חרס (קרמיקה) – האם ניתן להגעיל לפסח?", options: [{ text: "לא, כלי חרס אינם ניתנים להגעלה", correct: true }, { text: "כן, מגעילים אותם כמו מתכת", correct: false }, { text: "כן, אך רק בהגעלה כפולה", correct: false }, { text: "כן, אך רק על ידי רב", correct: false }] },
  { id: 139, chapter: "פרק י", question: "מה ההבדל בין \"הגעלה\" ל\"ליבון\"?", options: [{ text: "הגעלה במים רותחים, ליבון בחום ישיר של אש עד שניצוצות יוצאים", correct: true }, { text: "הגעלה לכלי אוכל, ליבון לכלי שתייה", correct: false }, { text: "הגעלה לסירים, ליבון לסכינים", correct: false }, { text: "שניהם אותו דבר בדיוק", correct: false }] },
  { id: 140, chapter: "פרק י", question: "כלי זכוכית – האם צריך הגעלה לפסח?", options: [{ text: "לפי דעת רבים הזכוכית לא בולעת ודי בשטיפה", correct: true }, { text: "חייבים הגעלה מלאה", correct: false }, { text: "חייבים ליבון", correct: false }, { text: "חייבים לקנות כלים חדשים", correct: false }] },
  { id: 141, chapter: "פרק י", question: "כלי שנשתמש בו בחמץ ב-24 השעות האחרונות – מה דינו להגעלה?", options: [{ text: "נקרא \"בן יומו\" ויש מעלה להגעיל לפני שיעבור יממה", correct: true }, { text: "אסור להגעיל", correct: false }, { text: "ניתן להשתמש בו בלי הגעלה", correct: false }, { text: "יש להמתין שלושה ימים ואז להגעיל", correct: false }] },
  { id: 142, chapter: "פרק י", question: "מה הכלל \"כבולעו כך פולטו\"?", options: [{ text: "כלי פולט את הבלוע בדרך שבה בלע – אם בלע בחום, פולט בחום", correct: true }, { text: "כלי שבלע קר פולט קר", correct: false }, { text: "כלי שנשרה ביום פולט בלילה", correct: false }, { text: "כלי שבלע הרבה פולט הרבה", correct: false }] },
  { id: 143, chapter: "פרק יא", question: "כיצד מכשירים את הכיריים לפסח?", options: [{ text: "ניקוי יסודי ואז הדלקת האש לזמן מה", correct: true }, { text: "שטיפה קרה בלבד", correct: false }, { text: "ניקוי ואז כיסוי בנייר כסף בלבד", correct: false }, { text: "הזמנת מגעיל מקצועי בלבד", correct: false }] },
  { id: 144, chapter: "פרק יא", question: "כיצד מכשירים את השיש (משטח מטבח) לפסח?", options: [{ text: "ניקוי יסודי ואז כיסוי עם בד, נייר כסף או פלסטיק", correct: true }, { text: "הגעלה בכלי מלא מים רותחים", correct: false }, { text: "ליבון בלפיד גז", correct: false }, { text: "קנייה חדשה – הפתרון הטוב ביותר!", correct: false }] },
  { id: 145, chapter: "פרק יא", question: "כיצד מכשירים את המקרר לפסח?", options: [{ text: "ניקוי יסודי מכל שאריות חמץ", correct: true }, { text: "הגעלה", correct: false }, { text: "ליבון", correct: false }, { text: "השארת מים קרים 24 שעות", correct: false }] },
  { id: 146, chapter: "פרק יא", question: "האם צריך להחליף את ספוגי הכיור לפסח?", options: [{ text: "כן, עדיף לקנות ספוגים חדשים", correct: true }, { text: "לא, מספיק לשטוף אותם", correct: false }, { text: "לא, הם לא בולעים חמץ", correct: false }, { text: "כן, אבל רק אם הם ישנים", correct: false }] },
  { id: 147, chapter: "פרק יא", question: "את ה\"מיקסר\" – האם ניתן להכשיר לפסח?", options: [{ text: "יש לפרק, לנקות היטב, ויש חלקים שאינם ניתנים להכשרה", correct: true }, { text: "מגעילים את כולו בתוך סיר מים רותחים", correct: false }, { text: "שוטפים במים קרים בלבד", correct: false }, { text: "קונים מיקסר חדש – תמיד הייתם רוצים כזה!", correct: false }] },
  { id: 148, chapter: "פרק יב", question: "מה שיעור אכילת מצה בליל הסדר?", options: [{ text: "כזית – כ-27 גרם", correct: true }, { text: "כביצה", correct: false }, { text: "כמה שרוצים", correct: false }, { text: "כביצה וחצי", correct: false }] },
  { id: 149, chapter: "פרק יב", question: "מהי \"מצה שמורה\" ומדוע היא מיוחדת?", options: [{ text: "מצה ששמרו אותה לשם מצוה מרגע הקצירה", correct: true }, { text: "מצה שהוכנה בפיקוח", correct: false }, { text: "מצה שמורה במקרר", correct: false }, { text: "מצה שנשמרה על ידי הגוי", correct: false }] },
  { id: 150, chapter: "פרק יב", question: "האם מצה עשירה (מצה שנלושה במיץ פירות) מותרת בפסח?", options: [{ text: "לספרדים מותרת, לאשכנזים אסורה לבריאים", correct: true }, { text: "מותרת לכולם", correct: false }, { text: "אסורה לכולם", correct: false }, { text: "מותרת רק לחולים", correct: false }] },
  { id: 151, chapter: "פרק יב", question: "האם אפשר לצאת ידי חובת מצת מצווה עם מצה עשירה?", options: [{ text: "לא, אין יוצאים ידי חובה במצה עשירה", correct: true }, { text: "כן, יוצאים", correct: false }, { text: "כן, לספרדים בלבד", correct: false }, { text: "כן, אבל רק בדיעבד", correct: false }] },
  { id: 152, chapter: "פרק יב", question: "מהם שיעורי הזמן שיש לאכול את המצה?", options: [{ text: "בתוך כדי אכילת פרס – כ-4-7 דקות", correct: true }, { text: "בתוך חצי שעה", correct: false }, { text: "ברצף ללא הפסקות", correct: false }, { text: "כמה שרוצים", correct: false }] },
  { id: 153, chapter: "פרק יב", question: "האם מצה מכונה כשרה למצות?", options: [{ text: "כן, לרוב הפוסקים מצה מכונה כשרה", correct: true }, { text: "לא, רק מצה ידנית", correct: false }, { text: "לא, כי המכונה לא יכולה לעשות לשם מצווה", correct: false }, { text: "כן, אבל פחות עדיפה ממצה ידנית", correct: false }] },
  { id: 154, chapter: "פרק יב", question: "מהו שיעור \"כזית\" שצריך לאכול מהמצה?", options: [{ text: "כ-27-30 גרם", correct: true }, { text: "חצי מצה", correct: false }, { text: "שליש מצה שלמה", correct: false }, { text: "מצה שלמה", correct: false }] },
  { id: 26, chapter: "פרק יג", question: "מדוע אין אוכלים מצה בערב פסח?", options: [{ text: "כדי שאכילת המצה בליל הסדר תיחשב חשובה ומיוחדת", correct: true }, { text: "כי מצה זמינה לקנייה רק מהלילה", correct: false }, { text: "כי אסור לאכול כלל לפני הסדר", correct: false }, { text: "כדי להיות מאוד רעבים ולאכול יותר בליל הסדר", correct: false }] },
  { id: 27, chapter: "פרק יג", question: "מה הדין לגבי סעודה גדולה בערב פסח אחרי הצהריים?", options: [{ text: "אין לאכול סעודה גדולה אחרי חצות היום", correct: true }, { text: "מותר לאכול כל כמות שרוצים", correct: false }, { text: "אסור לאכול כלל מהבוקר", correct: false }, { text: "מותר רק אם מדובר בסעודת מצווה", correct: false }] },
  { id: 28, chapter: "פרק יג", question: "עד מתי שורפים את החמץ בערב פסח?", options: [{ text: "עד סוף שעה שישית", correct: true }, { text: "מיד בבוקר עם הנץ החמה", correct: false }, { text: "בצהריים לאחר תפילת שחרית", correct: false }, { text: "בלילה לאחר הסדר – לחמם את הבית!", correct: false }] },
  { id: 29, chapter: "פרק יג", question: "מה אומרים אחרי שריפת החמץ?", options: [{ text: "ביטול חמץ שנית", correct: true }, { text: "אוכלים מצה לראשונה", correct: false }, { text: "מתפללים מנחה", correct: false }, { text: "שוטפים את הרצפה – כי נשאר פחם!", correct: false }] },
  { id: 30, chapter: "פרק יג", question: "מדוע בכורות מתענים בערב פסח?", options: [{ text: "זכר לכך שבכורות ישראל ניצלו ממכת בכורות", correct: true }, { text: "כי הם ירשו יותר ולכן מתענים מרוב שמחה", correct: false }, { text: "כי פרעה עצמו היה בכור", correct: false }, { text: "כדי לאכול יותר בליל הסדר", correct: false }] },
  { id: 31, chapter: "פרק יג", question: "מה הפתרון המקובל לבכורות שלא רוצים להתענות?", options: [{ text: "להשתתף בסיום מסכת", correct: true }, { text: "לשלם כופר לצדקה", correct: false }, { text: "לאכול מעט לחם ממש בבוקר", correct: false }, { text: "לקנות \"פדיון בכור\" מהרב – במחיר מיוחד!", correct: false }] },
  { id: 32, chapter: "פרק יג", question: "עד מתי אפשר לאכול חמץ ביום ערב פסח?", options: [{ text: "עד סוף שעה חמישית", correct: true }, { text: "עד חצות הלילה", correct: false }, { text: "עד שעה שישית", correct: false }, { text: "עד שאמא אומרת \"נמאס ממך עם העוגיות!\"", correct: false }] },
  { id: 33, chapter: "פרק יג", question: "האם ערב פסח יש הגבלות על עשיית מלאכה?", options: [{ text: "מחצי היום ואילך מנהג שלא לעשות מלאכה", correct: true }, { text: "כן, כל היום אסור לגמרי", correct: false }, { text: "לא, מותר לעשות מלאכה כל היום", correct: false }, { text: "תלוי בשכונה – יש מנהגים שונים", correct: false }] },
  { id: 34, chapter: "פרק יג", question: "מה הדין לגבי תספורת בערב פסח?", options: [{ text: "מסתפרים לכבוד פסח לפני חצות היום", correct: true }, { text: "אסור להסתפר כל ערב פסח", correct: false }, { text: "מסתפרים רק אחרי שריפת החמץ", correct: false }, { text: "כל עוד זה לא עולה יותר ממחצית השקל – מותר!", correct: false }] },
  { id: 35, chapter: "פרק יג", question: "עד מתי צריך לגמור לאכול חמץ ולנקות שאריותיו?", options: [{ text: "לפני שעה שישית", correct: true }, { text: "לפני שעה חמישית", correct: false }, { text: "לפני שעה שביעית", correct: false }, { text: "לפני שהשכן שואל \"מה הריח הזה?\"", correct: false }] },
  { id: 36, chapter: "פרק יג", question: "מה מכינים בערב פסח לצורך ליל הסדר?", options: [{ text: "מרור, כרפס, חרוסת וביצים קשות", correct: true }, { text: "רק את המצות", correct: false }, { text: "את כל אוכל הסדר מבושל מראש", correct: false }, { text: "את הכוסות – ורק הכוסות הארבע!", correct: false }] },
  { id: 37, chapter: "פרק יג", question: "מה עניין בדיקת המצות לפני הסדר?", options: [{ text: "לבדוק שהמצות שלמות ולא שבורות לצורך מצות הלילה", correct: true }, { text: "לטעום אם הן טעימות", correct: false }, { text: "לספור שיש מספיק לכולם", correct: false }, { text: "לוודא שאין עליהן חמץ – הפרדוקס הגדול!", correct: false }] },
  { id: 155, chapter: "פרק טו", question: "מה תפקידה של ההגדה בליל הסדר?", options: [{ text: "לספר את סיפור יציאת מצרים בכל דור ודור", correct: true }, { text: "לומר תפילות", correct: false }, { text: "ללמוד הלכות פסח", correct: false }, { text: "לאמר את ספר שמות", correct: false }] },
  { id: 156, chapter: "פרק טו", question: "מה פירוש הביטוי \"כנגד ארבעה בנים דברה תורה\"?", options: [{ text: "התורה מצווה לספר לארבעה סוגי בנים", correct: true }, { text: "ארבע מצוות בסדר", correct: false }, { text: "ארבעה בנים ישבו ושאלו את משה", correct: false }, { text: "יש ארבע מצוות בסדר", correct: false }] },
  { id: 157, chapter: "פרק טו", question: "מה מיוחד בחיוב סיפור יציאת מצרים?", options: [{ text: "חייב לספר בלשון גדולה ובהרחבה – \"כל המרבה הרי זה משובח\"", correct: true }, { text: "רק אומרים את ההגדה", correct: false }, { text: "חייב לקרוא את ספר שמות כולו", correct: false }, { text: "מספיק להזכיר יציאת מצרים פעם אחת", correct: false }] },
  { id: 158, chapter: "פרק טו", question: "האם נשים חייבות בסיפור יציאת מצרים?", options: [{ text: "כן, גם נשים חייבות", correct: true }, { text: "לא, זו מצות עשה שהזמן גרמא", correct: false }, { text: "כן, אבל לא חייבות לשבת בסדר", correct: false }, { text: "לא, רק אנשים מעל גיל 13", correct: false }] },
  { id: 159, chapter: "פרק טו", question: "מה מיוחד בנוסח ההגדה לגבי מצרים – \"ויענונו המצרים\"?", options: [{ text: "חייבים לומר ולהסביר את פסוקי ההגדה בדרשה ובהרחבה", correct: true }, { text: "אומרים אותו בלחש", correct: false }, { text: "מדלגים עליו", correct: false }, { text: "אומרים אותו בקול רם פעמיים", correct: false }] },
  { id: 160, chapter: "פרק טו", question: "מה ה\"מה נשתנה\" ומי אומר אותו?", options: [{ text: "ארבע שאלות שהילדים שואלים על השינויים של ליל הסדר", correct: true }, { text: "שיר שאבא אומר", correct: false }, { text: "פרק תהלים", correct: false }, { text: "שאלות שהרב שואל", correct: false }] },
  { id: 161, chapter: "פרק טו", question: "מהי המשמעות של \"עבדים היינו לפרעה במצרים\"?", options: [{ text: "פתיחת המגיד – מתחילים בגנות ומסיימים בשבח", correct: true }, { text: "סיפור שנאמר לבנים קטנים בלבד", correct: false }, { text: "הכרזה על עצמנו שאנחנו עדיין עבדים", correct: false }, { text: "תפילה שלא נשוב לגלות", correct: false }] },
  { id: 162, chapter: "פרק טו", question: "למה שופכים טיפות יין בעת אמירת עשר המכות?", options: [{ text: "כי שמחתנו חסרה כשהמצרים נענשו", correct: true }, { text: "כי היין קדוש", correct: false }, { text: "כדי להפחיד את הילדים", correct: false }, { text: "כי זה ניסוי כימי מוצלח", correct: false }] },
  { id: 163, chapter: "פרק טו", question: "מה ה\"דצ\"ך עד\"ש באח\"ב\"?", options: [{ text: "סימן לזכירת עשר המכות על פי רבי יהודה", correct: true }, { text: "שם קדוש מהקבלה", correct: false }, { text: "ראשי תיבות של שבח לה\'", correct: false }, { text: "שיר שאומרים בסוף הסדר", correct: false }] },
  { id: 164, chapter: "פרק טו", question: "מה מיוחד בהלל שאומרים בליל הסדר?", options: [{ text: "חלקו אומרים לפני הסעודה וחלקו אחריה", correct: true }, { text: "אומרים אותו כולו לפני הסדר", correct: false }, { text: "אומרים אותו כולו אחרי הסדר", correct: false }, { text: "לא אומרים הלל בליל הסדר – רק מגיד", correct: false }] },
  { id: 165, chapter: "פרק טו", question: "מה היא ה\"כרפס\"?", options: [{ text: "ירק שטובלים במי מלח בתחילת הסדר", correct: true }, { text: "מין חרוסת", correct: false }, { text: "מין מרור", correct: false }, { text: "ירק שאוכלים בסוף הסדר", correct: false }] },
  { id: 166, chapter: "פרק טו", question: "מה מסמל ה\"חרוסת\"?", options: [{ text: "טיט המצרים שבו עמלו בני ישראל", correct: true }, { text: "הדם שנמרח על המזוזות", correct: false }, { text: "מתיקות הגאולה", correct: false }, { text: "אדמת ארץ ישראל", correct: false }] },
  { id: 167, chapter: "פרק טו", question: "מה תפקיד ה\"מרור\"?", options: [{ text: "זכר למרירות השעבוד", correct: true }, { text: "לצמצם את התיאבון", correct: false }, { text: "לשמור על הבריאות", correct: false }, { text: "להתנקות מהחמץ", correct: false }] },
  { id: 168, chapter: "פרק טו", question: "מה שיעור אכילת מרור?", options: [{ text: "כזית", correct: true }, { text: "כביצה", correct: false }, { text: "כמה שרוצים", correct: false }, { text: "שלוש עלים חסה", correct: false }] },
  { id: 169, chapter: "פרק טו", question: "מהו המרור המועדף לכתחילה?", options: [{ text: "חסה – רומן", correct: true }, { text: "חזרת – שורש", correct: false }, { text: "עלי תירס מרים", correct: false }, { text: "ורד – כי הוא מר", correct: false }] },
  { id: 170, chapter: "פרק טו", question: "מה מיוחד ב\"שפיכת כוס אליהו\"?", options: [{ text: "כוס יין שמוזגים לאליהו הנביא", correct: true }, { text: "כוס שאחד הילדים שופך", correct: false }, { text: "כוס שאסור לשתות", correct: false }, { text: "כוס שמוסיפים לה יין בכל פרשה", correct: false }] },
  { id: 171, chapter: "פרק טו", question: "מה המשמעות של פתיחת הדלת ב\"שפוך חמתך\"?", options: [{ text: "ביטחון באמונה שה\' שומר ומנהגים שאין לפחד", correct: true }, { text: "לתת לאליהו להיכנס", correct: false }, { text: "לאוורר את הבית", correct: false }, { text: "ל\"שחרר\" את האפיקומן", correct: false }] },
  { id: 172, chapter: "פרק טו", question: "מה זמן אמירת ההלל השני (לאחר הסעודה)?", options: [{ text: "בין כוס שלישית לרביעית", correct: true }, { text: "לפני הסעודה", correct: false }, { text: "בסוף הסדר לגמרי", correct: false }, { text: "בתחילת הסדר", correct: false }] },
  { id: 173, chapter: "פרק טו", question: "האם חולה מותר לשתות יין מבושל לקיים ארבע כוסות?", options: [{ text: "כן, יין מבושל כשר לארבע כוסות", correct: true }, { text: "לא, חייב יין לא מבושל", correct: false }, { text: "כן, אבל לא יוצא ידי חובה", correct: false }, { text: "לא, ישתה מיץ ענבים", correct: false }] },
  { id: 38, chapter: "פרק טז", question: "כמה כוסות יין שותים בליל הסדר?", options: [{ text: "ארבע", correct: true }, { text: "שלוש", correct: false }, { text: "חמש", correct: false }, { text: "שתיים – ואחת לאליהו!", correct: false }] },
  { id: 39, chapter: "פרק טז", question: "מה סדר ה\"סימנים\" של ליל הסדר?", options: [{ text: "קדש, ורחץ, כרפס, יחץ, מגיד, רחצה, מוציא מצה, מרור, כורך, שולחן עורך, צפון, ברך, הלל, נרצה", correct: true }, { text: "קידוש, מצה, מרור, אוכל, ברכה, שיר", correct: false }, { text: "קידוש, סיפור, אוכל, ברכה", correct: false }, { text: "קידוש, מצה, מרור, ברכה, הלל – וזהו!", correct: false }] },
  { id: 40, chapter: "פרק טז", question: "מה פירוש \"קדש\"?", options: [{ text: "קידוש על הכוס – כוס ראשונה", correct: true }, { text: "לקדש את השולחן", correct: false }, { text: "להתפלל תפילת ערבית", correct: false }, { text: "לשיר שיר קדוש", correct: false }] },
  { id: 41, chapter: "פרק טז", question: "מה פירוש \"יחץ\"?", options: [{ text: "שוברים את המצה האמצעית לשניים", correct: true }, { text: "חותכים את המרור", correct: false }, { text: "מחלקים את האפיקומן לילדים", correct: false }, { text: "מחלקים את היין לכולם", correct: false }] },
  { id: 42, chapter: "פרק טז", question: "מה עושים עם החלק הגדול של המצה השבורה?", options: [{ text: "שומרים אותו לאפיקומן", correct: true }, { text: "אוכלים אותו מיד", correct: false }, { text: "נותנים אותו לאורח", correct: false }, { text: "זורקים אותו – כי הוא שבור!", correct: false }] },
  { id: 43, chapter: "פרק טז", question: "מה פירוש \"כורך\"?", options: [{ text: "אוכלים מצה ומרור יחד כזכר להלל", correct: true }, { text: "כורכים את המצה בנייר", correct: false }, { text: "כורכים את הילדים בשמיכה", correct: false }, { text: "כורכים את שאר האוכל לאחר הסדר", correct: false }] },
  { id: 44, chapter: "פרק טז", question: "מה פירוש \"צפון\"?", options: [{ text: "אוכלים את האפיקומן שהיה צפון (מוסתר)", correct: true }, { text: "מסתירים את המצות", correct: false }, { text: "מחפשים את האפיקומן", correct: false }, { text: "צופים בכוכבים בחוץ", correct: false }] },
  { id: 45, chapter: "פרק טז", question: "מתי אוכלים את האפיקומן?", options: [{ text: "בסוף הסעודה לפני ברכת המזון", correct: true }, { text: "בתחילת הסעודה", correct: false }, { text: "אחרי ברכת המזון", correct: false }, { text: "בכל זמן שרוצים – זה כמו קינוח!", correct: false }] },
  { id: 46, chapter: "פרק טז", question: "האם מותר לאכול משהו אחרי האפיקומן?", options: [{ text: "לא, כדי שטעם המצה יישאר בפה", correct: true }, { text: "כן, מותר לאכול קינוח", correct: false }, { text: "כן, מותר לאכול פירות", correct: false }, { text: "כן, אבל רק שוקולד – כי הוא לא חמץ!", correct: false }] },
  { id: 47, chapter: "פרק טז", question: "מה פירוש \"נרצה\"?", options: [{ text: "סיום הסדר – תפילה שיהיה רצוי לפני ה\'", correct: true }, { text: "ריצה סביב השולחן", correct: false }, { text: "ריקוד חגיגי", correct: false }, { text: "ברכה אחרונה על היין", correct: false }] },
  { id: 48, chapter: "פרק טז", question: "כמה מצות מניחים על השולחן בליל הסדר?", options: [{ text: "שלוש", correct: true }, { text: "שתיים", correct: false }, { text: "ארבע", correct: false }, { text: "אחת גדולה במיוחד", correct: false }] },
  { id: 49, chapter: "פרק טז", question: "מה מסמלות שלוש המצות?", options: [{ text: "כהן, לוי וישראל", correct: true }, { text: "אברהם, יצחק ויעקב", correct: false }, { text: "משה, אהרן ומרים", correct: false }, { text: "עבר, הווה ועתיד", correct: false }] },
  { id: 50, chapter: "פרק טז", question: "האם חובה לשתות את כל הכוס בכל אחת מארבע הכוסות?", options: [{ text: "לכתחילה שותים את רוב הכוס", correct: true }, { text: "חייבים לשתות הכל עד הסוף", correct: false }, { text: "מספיק לטעום טיפה", correct: false }, { text: "חייבים לשתות רבע כוס בלבד", correct: false }] },
  { id: 174, chapter: "פרק טז", question: "מה \"ניצח\" – השירים שאחרי הסדר?", options: [{ text: "שירים ופיוטים שנהגו לשיר לאחר ההגדה כחד גדיא ואחד מי יודע", correct: true }, { text: "ניצחון ישראל על מצרים", correct: false }, { text: "ברכת המזון", correct: false }, { text: "שיר השירים", correct: false }] },

  // ====== זמנים – פרק ב: הלכות ספירת העומר ======
  { id: 201, chapter: "זמנים פרק ב", question: "מאימתי מתחילים לספור ספירת העומר?", options: [{ text: "בליל ט\"ז בניסן – מוצאי יום טוב ראשון של פסח", correct: true }, { text: "בליל פסח – ליל הסדר", correct: false }, { text: "בראש חודש אייר", correct: false }, { text: "בל\"ג בעומר", correct: false }] },
  { id: 202, chapter: "זמנים פרק ב", question: "כמה ימים סופרים בספירת העומר?", options: [{ text: "ארבעים ותשעה ימים", correct: true }, { text: "שלושים ושלושה ימים", correct: false }, { text: "חמישים ימים", correct: false }, { text: "שבעה שבועות בלי לספור ימים", correct: false }] },
  { id: 203, chapter: "זמנים פרק ב", question: "מה הברכה הנאמרת לפני ספירת העומר?", options: [{ text: "\"אשר קדשנו במצוותיו וצוונו על ספירת העומר\"", correct: true }, { text: "\"אשר קדשנו במצוותיו וצוונו לספור את העומר\"", correct: false }, { text: "\"על מצוות ספירה\"", correct: false }, { text: "\"על ספירת שבע שבתות\"", correct: false }] },
  { id: 204, chapter: "זמנים פרק ב", question: "מתי לכתחילה סופרים ספירת העומר?", options: [{ text: "בלילה מיד אחרי צאת הכוכבים", correct: true }, { text: "ביום בשעות הבוקר", correct: false }, { text: "בכל עת שנזכרים", correct: false }, { text: "בזמן תפילת מנחה", correct: false }] },
  { id: 205, chapter: "זמנים פרק ב", question: "מה הדין אם שכח לספור בלילה?", options: [{ text: "יספור ביום בלא ברכה, ובלילות הבאים יחזור לספור עם ברכה", correct: true }, { text: "הפסיד את כל המצווה ואינו סופר יותר", correct: false }, { text: "יספור ביום עם ברכה", correct: false }, { text: "אינו צריך לספור כלל באותו יום", correct: false }] },
  { id: 206, chapter: "זמנים פרק ב", question: "מה הדין אם שכח לספור יום שלם (לילה + יום)?", options: [{ text: "לדעת בעל הלכות גדולות הפסיד המצווה, ולמעשה ממשיך לספור בלא ברכה", correct: true }, { text: "ממשיך לספור בברכה כרגיל", correct: false }, { text: "מתחיל מחדש את הספירה", correct: false }, { text: "פטור מהמצווה לגמרי", correct: false }] },
  { id: 207, chapter: "זמנים פרק ב", question: "האם נשים חייבות בספירת העומר?", options: [{ text: "לא, נשים פטורות כי זו מצות עשה שהזמן גרמא", correct: true }, { text: "כן, חייבות כמו אנשים", correct: false }, { text: "כן, אבל ללא ברכה", correct: false }, { text: "תלוי במנהג המשפחה", correct: false }] },
  { id: 208, chapter: "זמנים פרק ב", question: "כיצד אומרים את הספירה – לדוגמה ביום העשירי?", options: [{ text: "\"היום עשרה ימים שהם שבוע אחד ושלושה ימים לעומר\"", correct: true }, { text: "\"היום יום עשירי לעומר\"", correct: false }, { text: "\"נספור יום עשירי\"", correct: false }, { text: "\"עשרה ימים מפסח\"", correct: false }] },
  { id: 209, chapter: "זמנים פרק ב", question: "מדוע נקראת הספירה \"ספירת העומר\"?", options: [{ text: "על שם קרבן העומר שהיה מוקרב בבית המקדש בט\"ז בניסן", correct: true }, { text: "על שם הספירה עצמה", correct: false }, { text: "על שם עמר – תלמידו של משה", correct: false }, { text: "על שם מידת העומר שמוזכרת בתורה", correct: false }] },
  { id: 210, chapter: "זמנים פרק ב", question: "מה הקשר בין ספירת העומר לחג השבועות?", options: [{ text: "ספירת העומר מחברת את יציאת מצרים לקבלת התורה בשבועות", correct: true }, { text: "ספירת העומר היא הכנה לתפילות שבועות", correct: false }, { text: "אין קשר מיוחד – זו מצווה עצמאית", correct: false }, { text: "ספירת העומר מסתיימת בשבועות כי אז מביאים ביכורים", correct: false }] },
  { id: 221, chapter: "זמנים פרק ב", question: "האם מותר לספור ספירת העומר לפני צאת הכוכבים?", options: [{ text: "לא, לכתחילה יש לספור רק אחרי צאת הכוכבים", correct: true }, { text: "כן, מותר מפלג המנחה", correct: false }, { text: "כן, מותר משקיעת החמה", correct: false }, { text: "כן, מותר מחצות היום", correct: false }] },
  { id: 222, chapter: "זמנים פרק ב", question: "מה ספרו לפנינו בספירת העומר – ימים בלבד או גם שבועות?", options: [{ text: "את שני הדברים – גם ימים וגם שבועות, כגון: שבוע אחד וארבעה ימים", correct: true }, { text: "ימים בלבד", correct: false }, { text: "שבועות בלבד", correct: false }, { text: "זה תלוי בנוסח שנהגו בו", correct: false }] },
  { id: 223, chapter: "זמנים פרק ב", question: "אם שאלו אדם באיזה יום בספירה אנו נמצאים וענה – האם יכול לספור בברכה?", options: [{ text: "אם ענה בלשון עבר (כגון: 'אמש היה') – יכול לספור בברכה. אם ענה בלשון עכשיו – לא יברך", correct: true }, { text: "לא, איבד את זכות הברכה", correct: false }, { text: "כן, תמיד יכול לברך", correct: false }, { text: "תלוי אם התכוון לצאת ידי חובה", correct: false }] },
  { id: 224, chapter: "זמנים פרק ב", question: "מה מקור מצוות ספירת העומר בתורה?", options: [{ text: "\"וּסְפַרְתֶּם לָכֶם מִמָּחֳרַת הַשַּׁבָּת... שֶׁבַע שַׁבָּתוֹת תְּמִימֹת\" (ויקרא כג)", correct: true }, { text: "\"זָכוֹר אֶת הַיּוֹם הַזֶּה\" (שמות יג)", correct: false }, { text: "\"וְסָפַרְתָּ שֶׁבַע שַׁבְּתֹת שָׁנִים\" (ויקרא כה)", correct: false }, { text: "\"שִׁבְעָה שָׁבֻעֹת תִּסְפָּר לָךְ\" (דברים טז)", correct: false }] },
  { id: 225, chapter: "זמנים פרק ב", question: "מה פירוש \"שבתות תמימות\" בפסוק ספירת העומר?", options: [{ text: "שיש לספור שבעה שבועות שלמים – 49 ימים מלאים", correct: true }, { text: "שיש לספור רק בשבת", correct: false }, { text: "שהספירה חייבת להיות ברצף ללא הפסקה", correct: false }, { text: "שהספירה נמשכת שבעה שבועות קדושים", correct: false }] },

  // ====== זמנים – פרק ג: מנהגי אבלות בספירת העומר ======
  { id: 211, chapter: "זמנים פרק ג", question: "מדוע נוהגים אבלות בימי ספירת העומר?", options: [{ text: "לזכר תלמידי רבי עקיבא שמתו בתקופה זו", correct: true }, { text: "לזכר חורבן בית המקדש", correct: false }, { text: "לזכר מלחמת עמלק", correct: false }, { text: "כי אלו ימי דין קשים", correct: false }] },
  { id: 212, chapter: "זמנים פרק ג", question: "מה אסור לעשות בימי ספירת העומר לפי מנהג האבלות?", options: [{ text: "להסתפר ולישא אישה", correct: true }, { text: "לאכול בשר", correct: false }, { text: "לשמוע כל מוזיקה", correct: false }, { text: "לצאת לטיולים", correct: false }] },
  { id: 213, chapter: "זמנים פרק ג", question: "מדוע מתו תלמידי רבי עקיבא לפי חז\"ל?", options: [{ text: "שלא נהגו כבוד זה בזה", correct: true }, { text: "שלא למדו תורה מספיק", correct: false }, { text: "שעברו על איסור לשון הרע", correct: false }, { text: "שלא שמרו שבת כהלכה", correct: false }] },
  { id: 214, chapter: "זמנים פרק ג", question: "מתי נוהגים לחגוג ל\"ג בעומר ולהסתפר?", options: [{ text: "ביום ל\"ג בעומר, כי לפי המסורת פסקו התלמידים למות", correct: true }, { text: "ביום ל\"ד בעומר בלבד", correct: false }, { text: "ביום ראש חודש אייר", correct: false }, { text: "בשבוע שלפני שבועות", correct: false }] },
  { id: 215, chapter: "זמנים פרק ג", question: "האם מותר לקיים סעודת ברית מילה עם מוזיקה בימי הספירה?", options: [{ text: "כן, כי זו שמחה של מצווה", correct: true }, { text: "לא, כל מוזיקה אסורה", correct: false }, { text: "כן, אבל רק שירה בפה ללא כלים", correct: false }, { text: "לא, אפילו סעודת מצווה אסורה", correct: false }] },
  { id: 216, chapter: "זמנים פרק ג", question: "האם מותר לברך \"שהחיינו\" בימי ספירת העומר?", options: [{ text: "כן, מותר לברך שהחיינו על פרי חדש או בגד חדש", correct: true }, { text: "לא, אסור לגמרי", correct: false }, { text: "מותר רק בשבת", correct: false }, { text: "מותר רק בל\"ג בעומר", correct: false }] },
  { id: 217, chapter: "זמנים פרק ג", question: "מה מנהג הנוהגים על פי האר\"י לגבי תספורת בספירה?", options: [{ text: "אינם מסתפרים כלל עד ערב שבועות", correct: true }, { text: "מסתפרים בל\"ג בעומר בלבד", correct: false }, { text: "מסתפרים אחרי ראש חודש אייר", correct: false }, { text: "מסתפרים כל שבת לכבוד השבת", correct: false }] },
  { id: 218, chapter: "זמנים פרק ג", question: "האם מותר לצאת לטיול בבית ספר בימי ספירת העומר?", options: [{ text: "עדיף להמתין עד אחר ל\"ג בעומר, אבל אין איסור גמור", correct: true }, { text: "אסור לגמרי", correct: false }, { text: "מותר לגמרי ללא הגבלה", correct: false }, { text: "מותר רק בשישי ושבת", correct: false }] },
  { id: 219, chapter: "זמנים פרק ג", question: "האם יום העצמאות נחשב ליום שמחה שמותר להסתפר בו?", options: [{ text: "כן, מי שרגיל להתגלח צריך להתגלח לקראת יום העצמאות", correct: true }, { text: "לא, אין לו מעמד מיוחד בהלכה", correct: false }, { text: "כן, אבל רק ספרדים", correct: false }, { text: "לא, רק ל\"ג בעומר מותר", correct: false }] },
  { id: 220, chapter: "זמנים פרק ג", question: "מה הלקח שחז\"ל רוצים שנלמד מאבלות ספירת העומר?", options: [{ text: "להתחזק באהבת הרע ולנהוג כבוד זה בזה", correct: true }, { text: "להרבות בלימוד תורה", correct: false }, { text: "להיזהר מגאווה", correct: false }, { text: "לצום ולהתפלל יותר", correct: false }] },
  { id: 226, chapter: "זמנים פרק ג", question: "מה מנהג רוב האשכנזים לגבי תקופת האבלות בספירה?", options: [{ text: "מנהגי האבלות נמשכים עד ל\"ג בעומר שבו פסקו תלמידי רבי עקיבא למות", correct: true }, { text: "מנהגי האבלות כל ימי הספירה", correct: false }, { text: "מנהגי האבלות רק בשבועיים הראשונים", correct: false }, { text: "מנהגי האבלות רק מאחרי פסח עד ראש חודש אייר", correct: false }] },
  { id: 227, chapter: "זמנים פרק ג", question: "האם מותר להכניס ספר תורה לבית הכנסת בשירה וריקודים בימי ספירת העומר?", options: [{ text: "כן, כי אלו ריקודים וניגונים של מצווה", correct: true }, { text: "לא, כל ריקוד אסור", correct: false }, { text: "כן, אבל רק בשקט ובלי כלי זמר", correct: false }, { text: "לא, יש להמתין עד אחרי ל\"ג בעומר", correct: false }] },
  { id: 228, chapter: "זמנים פרק ג", question: "מהו אירוע ל\"ג בעומר הקשור לרבי שמעון בר יוחאי?", options: [{ text: "יום פטירתו של רשב\"י שנחגג כיום שמחה ולא אבל", correct: true }, { text: "יום לידתו של רשב\"י", correct: false }, { text: "היום שבו גילה את הזוהר", correct: false }, { text: "יום שבו רשב\"י ניצל מן הרומאים", correct: false }] },
  { id: 229, chapter: "זמנים פרק ג", question: "מה מנהג ה'חלקה' שנהגו בל\"ג בעומר?", options: [{ text: "תספורת ראשונה לילדים בגיל שלוש בל\"ג בעומר ליד קבר רשב\"י במירון", correct: true }, { text: "תספורת לכל ילדי השכונה בבית הכנסת", correct: false }, { text: "מנהג לגזוז את שיער הבנות ולחלקו לעניים", correct: false }, { text: "מנהג ישן שאינו נהוג כיום", correct: false }] },
  { id: 230, chapter: "זמנים פרק ג", question: "האם מותר לשמוע מוזיקה בימי ספירת העומר?", options: [{ text: "לא, מנהג שלא לשמוע מוזיקה בכלי זמר בימי הספירה", correct: true }, { text: "כן, מותר לגמרי", correct: false }, { text: "מותר רק שירה בפה", correct: false }, { text: "מותר רק מוזיקה דתית", correct: false }] },
];

// Track to chapter mapping for question selection
export const TRACK_CHAPTERS: Record<string, string[]> = {
  "613e89d3-72ac-465a-a1f3-5af2652f080b": ["פרק א", "פרק ח", "פרק טו", "פרק טז"], // ה-ו
  "f6ac6419-5a1d-44e3-a076-6a28154b371e": ["פרק א", "פרק ח", "פרק טו", "פרק טז", "זמנים פרק ב", "זמנים פרק ג"], // ז-ח
  "eb05b110-d693-4eee-a704-f87fab9ff1a5": ["פרק א", "פרק ה", "פרק ו", "פרק ח", "פרק טו", "פרק טז", "זמנים פרק ב", "זמנים פרק ג"], // ט-יב
  "7e2b7ab0-7dcd-428a-91d8-3e7d4bd0c308": ["פרק א", "פרק ב", "פרק ג", "פרק ד", "פרק ה", "פרק ו", "פרק ז", "פרק ח", "פרק ט", "פרק י", "פרק יא", "פרק יב", "פרק יג", "פרק יד", "פרק טו", "פרק טז", "זמנים פרק ב", "זמנים פרק ג"], // זהב
};

// Get questions for a specific track, selecting randomly from relevant chapters
export function getQuestionsForTrack(trackId: string, count: number = 25): Question[] {
  const chapters = TRACK_CHAPTERS[trackId];
  if (!chapters) return [];
  
  // Filter questions by chapters relevant to this track
  const pool = ALL_QUESTIONS.filter(q => chapters.includes(q.chapter));
  
  // Ensure we have questions from each chapter
  const byChapter: Record<string, Question[]> = {};
  for (const q of pool) {
    if (!byChapter[q.chapter]) byChapter[q.chapter] = [];
    byChapter[q.chapter].push(q);
  }
  
  // Select at least 1 question from each chapter, then fill randomly
  const selected: Question[] = [];
  const usedIds = new Set<number>();
  
  // First pass: 1 random question from each chapter
  for (const ch of chapters) {
    const chQuestions = byChapter[ch] || [];
    if (chQuestions.length > 0) {
      const idx = Math.floor(Math.random() * chQuestions.length);
      selected.push(chQuestions[idx]);
      usedIds.add(chQuestions[idx].id);
    }
  }
  
  // Second pass: fill remaining slots randomly from pool
  const remaining = pool.filter(q => !usedIds.has(q.id));
  const shuffled = remaining.sort(() => Math.random() - 0.5);
  
  for (const q of shuffled) {
    if (selected.length >= count) break;
    selected.push(q);
  }
  
  // Shuffle the final selection
  return selected.sort(() => Math.random() - 0.5);
}

// Get questions for an explicit list of chapters (used by multi-exam stages)
export function getQuestionsForChapters(chapters: string[], count: number = 20): Question[] {
  const pool = ALL_QUESTIONS.filter(q => chapters.includes(q.chapter));
  const byChapter: Record<string, Question[]> = {};
  for (const q of pool) {
    if (!byChapter[q.chapter]) byChapter[q.chapter] = [];
    byChapter[q.chapter].push(q);
  }
  const selected: Question[] = [];
  const usedIds = new Set<number>();
  // 1 from each chapter first
  for (const ch of chapters) {
    const qs = byChapter[ch] || [];
    if (qs.length > 0) {
      const idx = Math.floor(Math.random() * qs.length);
      selected.push(qs[idx]);
      usedIds.add(qs[idx].id);
    }
  }
  // fill remaining
  const remaining = pool.filter(q => !usedIds.has(q.id)).sort(() => Math.random() - 0.5);
  for (const q of remaining) {
    if (selected.length >= count) break;
    selected.push(q);
  }
  return selected.sort(() => Math.random() - 0.5);
}

// Backward compatibility
export const QUESTIONS_HE_VAV = ALL_QUESTIONS.filter(q => 
  ["פרק א", "פרק ד", "פרק יג", "פרק טז"].includes(q.chapter)
);

export const ADMIN_PASSWORD = "1967";
export const COORDINATOR_PASSWORD = "יתגבר כארי";

export const IMAGES = {
  heroLion: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368814931/2BoQ6VXxhE4awMaEseKDF7/hero-lion-iethWpX4jKuLsCmxLpSTWA.webp",
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368814931/2BoQ6VXxhE4awMaEseKDF7/hero-bg-j7rrCzc7HqnEtx3dHiZiNo.webp",
  trophy: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368814931/2BoQ6VXxhE4awMaEseKDF7/trophy-prize-LUBi7db5dtEw3CY5VZ74L9.webp",
  books: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368814931/2BoQ6VXxhE4awMaEseKDF7/books-study-4hWajnWpzo8qaXHt2iBseX.webp",
  quizBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368814931/2BoQ6VXxhE4awMaEseKDF7/quiz-bg-iYYf4y6DpdSCTj57NPgJE7.webp",
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368814931/2BoQ6VXxhE4awMaEseKDF7/noam-tzvia-logo_057460a5.png",
  vetenBelibenu: "/veten-belibenu.png",
};
