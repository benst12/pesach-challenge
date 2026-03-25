// שאלות המבחנים הרשמיים — מבצע שאגת הארי

export interface ExamQuestion {
  id: number;
  question: string;
  options: { text: string; correct: boolean }[];
}

// ══════════════════════════════════════════
// מבחן א׳ — מסלולים א ב ג — פרקים א+ח — 15 שאלות
// ══════════════════════════════════════════
export const EXAM_ABC_1: ExamQuestion[] = [
  {
    id: 1,
    question: "מה הם שני השמות של פסח המוזכרים בתורה?",
    options: [
      { text: "חג המצות וחג הפסח", correct: true },
      { text: "חג החירות וחג המצות", correct: false },
      { text: "חג האביב וחג הפסח", correct: false },
      { text: "חג הגאולה וחג המצות", correct: false },
    ]
  },
  {
    id: 2,
    question: "מה מסמלת המצה לפי ההגדה?",
    options: [
      { text: "לחם העוני שאכלו ישראל בשעבוד מצרים", correct: false },
      { text: "זכר לניסים שנעשו לישראל במצרים", correct: false },
      { text: `שנגלה הקב\"ה על אבותינו וגאלם קודם שהספיק בצקם להחמיץ`, correct: true },
      { text: "האמונה שישראל נשאו עמם ביציאתם", correct: false },
    ]
  },
  {
    id: 3,
    question: "מה מסמל החמץ לפי פניני הלכה?",
    options: [
      { text: "את הטומאה שדבקה בישראל במצרים", correct: false },
      { text: "גאווה וניפוח היצר", correct: true },
      { text: "את הבצק שלא הספיק להחמיץ", correct: false },
      { text: "את המהירות שבה יצאו ממצרים", correct: false },
    ]
  },
  {
    id: 4,
    question: "מהו חג החירות לפי פניני הלכה?",
    options: [
      { text: "יציאה מעבדות פרעה לחירות פוליטית", correct: false },
      { text: "חירות מחובת העבודה ביום טוב", correct: false },
      { text: "שחרור מעול המצוות לזמן מה", correct: false },
      { text: "שחרור הרוח מעבדות החומר", correct: true },
    ]
  },
  {
    id: 5,
    question: "כמה זמן לפני פסח מצווה להתחיל ללמוד הלכות פסח?",
    options: [
      { text: "ארבעים יום – כנגד מתן תורה", correct: false },
      { text: "שלושים יום", correct: true },
      { text: "חודשיים – כדי להספיק לכל ההכנות", correct: false },
      { text: "שבועיים לפני הפסח", correct: false },
    ]
  },
  {
    id: 6,
    question: "מה מיוחד ביציאת מצרים לעומת אירועים אחרים?",
    options: [
      { text: "נתגלתה הנהגת ה' בעולם בצורה הבולטת והמוחשית ביותר", correct: true },
      { text: "היא האירוע היחיד שבו ניצל עם שלם מעבדות", correct: false },
      { text: "היא הפעם הראשונה שה' התגלה לעם ישראל", correct: false },
      { text: "בה קיבלו ישראל את התורה והמצוות", correct: false },
    ]
  },
  {
    id: 7,
    question: "מה הדין לגבי תרופות שיש בהן חמץ?",
    options: [
      { text: "תרופות חיוניות מותרות אפילו יש בהן חמץ, כי חולה אינו בגדר אוכל", correct: true },
      { text: "אסורות לגמרי", correct: false },
      { text: "מותרות רק לחולים שאינם מסוכנים", correct: false },
      { text: "מותרות רק בהמלצת רב", correct: false },
    ]
  },
  {
    id: 8,
    question: "האם יש בעיה בפסח עם קוסמטיקה ומשחות המכילות חמץ?",
    options: [
      { text: "רק שפתון אסור – כי נוגע בפה", correct: false },
      { text: "בדרך כלל אין בעיה כי אינן ראויות לאכילה", correct: true },
      { text: "יש לבדוק כל מוצר", correct: false },
      { text: "כל קוסמטיקה אסורה בפסח", correct: false },
    ]
  },
  {
    id: 9,
    question: "מה ההבדל בין מנהג יוצאי ספרד ואשכנז לגבי מצה עשירה?",
    options: [
      { text: "ספרדים ואשכנזים שניהם אוסרים", correct: false },
      { text: "לאשכנזים מותרת, לספרדים אסורה", correct: false },
      { text: "לספרדים מותרת, לאשכנזים אסורה לבריאים (מחשש תערובת מים)", correct: true },
      { text: "מותרת לכולם ללא הגבלה", correct: false },
    ]
  },
  {
    id: 10,
    question: "מהי 'מצה שרויה' ומה מנהג החסידים לגביה?",
    options: [
      { text: "מצה יבשה – החסידים מעדיפים אותה", correct: false },
      { text: "מצה ספוגה בדבש – מותרת לכולם", correct: false },
      { text: "מצה שרויה ביין – אסורה מהתורה", correct: false },
      { text: "מצה השרויה במים – החסידים נוהגים שלא לאוכלה", correct: true },
    ]
  },
  {
    id: 11,
    question: "מה דין חלב שנחלב בפסח מפרה של גוי שאכלה חמץ?",
    options: [
      { text: "אסור לחלוטין לכל הדעות", correct: false },
      { text: "נחלקו הפוסקים: יש מקילים ויש מחמירים", correct: true },
      { text: "מותר לחלוטין לכל הדעות", correct: false },
      { text: "מותר רק אם עברו פחות מעשרים וארבע שעות מאכילת החמץ", correct: false },
    ]
  },
  {
    id: 12,
    question: "מה הכלל לגבי תרופה שטעמה מר או חסר טעם ויש בה חמץ?",
    options: [
      { text: "מותר לבולעה בפסח כי נפסלה מאכילת כלב", correct: true },
      { text: "אסורה כי חמץ בפסח אוסר בכלשהו", correct: false },
      { text: "מותרת רק לחולה מסוכן", correct: false },
      { text: "אסורה לגמרי ללא קשר לטעמה", correct: false },
    ]
  },
  {
    id: 13,
    question: "מה דין ביצים שהוטלו בפסח על ידי תרנגולות שאכלו חמץ?",
    options: [
      { text: "מותרות לגמרי ללא כל בעיה", correct: false },
      { text: "אסורות לחלוטין לכל הדעות", correct: false },
      { text: "מותרות רק אם הוטלו על ידי תרנגולות של גוי", correct: false },
      { text: "יש הידור לקנות ביצים שהוטלו לפני הפסח, ויש שמקילים", correct: true },
    ]
  },
  {
    id: 14,
    question: "מה ההבדל בין גישת השולחן ערוך לגישת הרמ\"א בהלכות כשרות לפסח?",
    options: [
      { text: `הרמ\"א מקל יותר מהשולחן ערוך`, correct: false },
      { text: `השולחן ערוך הולך לפי כללי ההלכה הרגילים, הרמ\"א נוטה להחמיר ולחשוש לדעות יחיד`, correct: true },
      { text: "אין ביניהם הבדל עקרוני", correct: false },
      { text: "שניהם שווים ורק נחלקו בפרטים קטנים", correct: false },
    ]
  },
  {
    id: 15,
    question: "האם מותר לשרות מצה במרק או במים בפסח?",
    options: [
      { text: "אסור לחלוטין לכולם", correct: false },
      { text: "מותר לכולם ללא כל חשש", correct: false },
      { text: "מותר על פי רוב הפוסקים, אך חסידים נוהגים להחמיר שלא לאכול מצה שרויה", correct: true },
      { text: "מותר רק בחול המועד ולא בימים טובים", correct: false },
    ]
  },
];


// ══════════════════════════════════════════
// מבחן א׳ — מסלול זהב — פרקים א-ד — 25 שאלות
// ══════════════════════════════════════════
export const EXAM_ZAHAV_1: ExamQuestion[] = [
  {
    id: 101,
    question: "מה הם שני השמות של פסח המוזכרים בתורה?",
    options: [
      { text: "חג המצות וחג הפסח", correct: true },
      { text: "חג החירות וחג המצות", correct: false },
      { text: "חג האביב וחג הפסח", correct: false },
      { text: "חג הגאולה וחג המצות", correct: false },
    ]
  },
  {
    id: 102,
    question: "מה מסמלת המצה לפי ההגדה?",
    options: [
      { text: "לחם העוני שאכלו ישראל בשעבוד מצרים", correct: false },
      { text: "זכר לניסים שנעשו לישראל במצרים", correct: false },
      { text: `שנגלה הקב\"ה על אבותינו וגאלם קודם שהספיק בצקם להחמיץ`, correct: true },
      { text: "האמונה שישראל נשאו עמם ביציאתם", correct: false },
    ]
  },
  {
    id: 103,
    question: "מה מסמל החמץ לפי פניני הלכה?",
    options: [
      { text: "את הטומאה שדבקה בישראל במצרים", correct: false },
      { text: "גאווה וניפוח היצר", correct: true },
      { text: "את הבצק שלא הספיק להחמיץ", correct: false },
      { text: "את המהירות שבה יצאו ממצרים", correct: false },
    ]
  },
  {
    id: 104,
    question: "מהו חג החירות לפי פניני הלכה?",
    options: [
      { text: "יציאה מעבדות פרעה לחירות פוליטית", correct: false },
      { text: "חירות מחובת העבודה ביום טוב", correct: false },
      { text: "שחרור מעול המצוות לזמן מה", correct: false },
      { text: "שחרור הרוח מעבדות החומר", correct: true },
    ]
  },
  {
    id: 105,
    question: "כמה זמן לפני פסח מצווה להתחיל ללמוד הלכות פסח?",
    options: [
      { text: "ארבעים יום – כנגד מתן תורה", correct: false },
      { text: "שלושים יום", correct: true },
      { text: "חודשיים – כדי להספיק לכל ההכנות", correct: false },
      { text: "שבועיים לפני הפסח", correct: false },
    ]
  },
  {
    id: 106,
    question: "מה מיוחד ביציאת מצרים לעומת אירועים אחרים?",
    options: [
      { text: "נתגלתה הנהגת ה' בעולם בצורה הבולטת והמוחשית ביותר", correct: true },
      { text: "היא האירוע היחיד שבו ניצל עם שלם מעבדות", correct: false },
      { text: "היא הפעם הראשונה שה' התגלה לעם ישראל", correct: false },
      { text: "בה קיבלו ישראל את התורה והמצוות", correct: false },
    ]
  },
  {
    id: 107,
    question: 'כמה מצוות מהתורה עוסקות באיסור חמץ בפסח, ומה יחסן?',
    options: [
      { text: "שלוש מצוות – שלוש מצוות לא תעשה בלבד", correct: false },
      { text: "חמש מצוות – שלוש לא תעשה ושתי עשה", correct: false },
      { text: "ארבע מצוות – שלוש מצוות לא תעשה ומצוות עשה אחת", correct: true },
      { text: 'שתי מצוות – בל יראה ובל ימצא', correct: false },
    ]
  },
  {
    id: 108,
    question: 'מאימתי אסור מהתורה לאכול חמץ ביום י"ד בניסן?',
    options: [
      { text: `מתחילת יום י"ד – כיוון שהוא יום ערב פסח`, correct: false },
      { text: "מהשעה החמישית – כפי שאסרו חכמים", correct: false },
      { text: "מהשעה השישית – שאז אסור גם בהנאה מדברי חכמים", correct: false },
      { text: "מחצות היום – שהוא זמן הראוי להקרבת קרבן פסח", correct: true },
    ]
  },
  {
    id: 109,
    question: "מהם חמשת מיני הדגן שחמץ שלהם אסור מן התורה?",
    options: [
      { text: "חיטה, שעורה, כוסמת, שיפון ושיבולת שועל", correct: false },
      { text: "חיטה, שעורה, כוסמין, שיפון ושיבולת שועל", correct: true },
      { text: "חיטה, שעורה, אורז, דוחן ושיפון", correct: false },
      { text: "חיטה, שעורה, כוסמין, אורז ושיבולת שועל", correct: false },
    ]
  },
  {
    id: 110,
    question: "מה דין חמץ שעבר עליו הפסח, כלומר שהיה ברשות יהודי בפסח?",
    options: [
      { text: "מותר באכילה אחרי פסח, שהאיסור חל רק בפסח עצמו", correct: false },
      { text: "אסור באכילה ובהנאה גם לאחר הפסח, כעונש על ששהה אותו", correct: true },
      { text: "מותר בהנאה אך אסור באכילה", correct: false },
      { text: "אסור לאותו יהודי בלבד, אך מותר למכרו לאחרים", correct: false },
    ]
  },
  {
    id: 111,
    question: 'מהו "חמץ נוקשה" ומה דינו?',
    options: [
      { text: "חמץ ישן שיבש לגמרי – מותר לגמרי", correct: false },
      { text: "חמץ שנפסל ממאכל כלב לפני פסח – מותר להשהותו", correct: false },
      { text: "תחילת חימוץ שלא הסתיים והוא ראוי לאכילה רק בשעת הדחק – אסור מדברי חכמים", correct: true },
      { text: "חמץ שנשרה במים ונפסד – מותר מהתורה ואסור מדרבנן", correct: false },
    ]
  },
  {
    id: 112,
    question: "מה עונשו של האוכל חמץ בפסח, ובמה שונה מרוב איסורי אכילה?",
    options: [
      { text: "מלקות – כמו שאר איסורי אכילה בתורה", correct: false },
      { text: "מיתה בידי שמים – חמור אפילו מכרת", correct: false },
      { text: "אין עונש מפורש – רק איסור עשה", correct: false },
      { text: "כרת – בעוד שרוב איסורי אכילה עונשם מלקות בלבד", correct: true },
    ]
  },
  {
    id: 113,
    question: 'מה מצוות "תשביתו" ומתי היא חלה?',
    options: [
      { text: "מצווה לשרוף את החמץ – חלה מתחילת ליל פסח", correct: false },
      { text: `מצווה לבדוק את הבית – חלה מליל י"ד בניסן`, correct: false },
      { text: `מצווה לבער את החמץ מרשותנו – חלה עד חצות יום י"ד בניסן`, correct: true },
      { text: "מצווה לבטל את החמץ בלב – חלה מתחילת חודש ניסן", correct: false },
    ]
  },
  {
    id: 114,
    question: 'האם חמץ של גוי שהפקיד בבית של יהודי עובר עליו בבל יראה ובל ימצא?',
    options: [
      { text: "כן, כיוון שנמצא בתחום ביתו של היהודי", correct: false },
      { text: "כן, אם הגוי עובד אצל היהודי", correct: false },
      { text: `לא, כי "לְךָ" – רק חמץ השייך לו אסור, אך צריך להעמיד מחיצה או לנעול`, correct: true },
      { text: "לא, אם הגוי אחראי עליו, אך כן אם היהודי אחראי", correct: false },
    ]
  },
  {
    id: 115,
    question: "מדוע תיקנו חכמים לבדוק ולבער בנוסף לביטול, אם ביטול מהתורה מספיק?",
    options: [
      { text: "כי הביטול אינו מועיל מהתורה ורק ביעור מועיל", correct: false },
      { text: "שמא לא יבטל בלב שלם, וכן שמא ימצא חמץ ויתאחר לשרפו", correct: true },
      { text: "כי ביטול מועיל רק לחמץ שאינו ידוע, אך לא לחמץ שמצא", correct: false },
      { text: "כי תיקנו חכמים שמצוות ביעור עדיפה על ביטול לכתחילה", correct: false },
    ]
  },
  {
    id: 116,
    question: "מה הדרך המועדפת לביעור חמץ לכתחילה, ומה הדין בדיעבד?",
    options: [
      { text: "לכתחילה שריפה כמנהג, ובדיעבד כל דרך כשרה – פירור לרוח, שטיפה בים וכדומה", correct: true },
      { text: "שריפה בלבד – ואם לא שרף לא יצא ידי חובה", correct: false },
      { text: "שריפה או קבורה בלבד, אך לא פירור לרוח", correct: false },
      { text: "כל דרך כשרה לכתחילה ואין עדיפות לשריפה", correct: false },
    ]
  },
  {
    id: 117,
    question: 'מהם ארבעת השלבים של תהליך השבתת החמץ לפי פניני הלכה?',
    options: [
      { text: "בדיקה, שריפה, ביטול, מכירה", correct: false },
      { text: "ניקוי, בדיקה, ביעור, ביטול", correct: false },
      { text: `בדיקה וביטול ראשון בליל י"ד, ביעור וביטול שני ביום י"ד`, correct: true },
      { text: "ביטול ראשון, בדיקה, ביטול שני, ביעור", correct: false },
    ]
  },
  {
    id: 118,
    question: 'עד מתי ניתן למכור חמץ לגוי ולבטלו ביום י"ד בניסן?',
    options: [
      { text: "עד חצות היום – שאז מתחיל איסור תורה", correct: false },
      { text: "עד סוף שעה חמישית – כי בשעה השישית החמץ אסור בהנאה מדרבנן ואינו ניתן למכירה", correct: true },
      { text: "עד תחילת שעה שישית – שאז מתחיל איסור חכמים באכילה", correct: false },
      { text: "עד שעה שביעית – כי עד אז רק איסור דרבנן", correct: false },
    ]
  },
  {
    id: 119,
    question: 'מתי ובמה מבצעים את בדיקת החמץ לכתחילה?',
    options: [
      { text: `ביום י"ד בניסן בשחרית – לאור פנס חשמלי חזק`, correct: false },
      { text: `בתחילת ליל י"ד בניסן – לאור נר שעווה שאורו ממוקד ומגיע לחורים`, correct: true },
      { text: `בתחילת ליל י"ד בניסן – לאור אבוקה שאורה חזק`, correct: false },
      { text: `בליל ט"ו בניסן לפני הסדר – לאור נר שמן`, correct: false },
    ]
  },
  {
    id: 120,
    question: 'מה הברכה הנאמרת לפני בדיקת החמץ, ומדוע "על ביעור" ולא "על בדיקה"?',
    options: [
      { text: 'על בדיקת חמץ – כי עיקר המצווה היא הבדיקה עצמה', correct: false },
      { text: 'לבדוק את החמץ – כי כך נוסח הברכה לפי כל הפוסקים', correct: false },
      { text: 'על ביעור חמץ – כי הבדיקה היא הכנה לביעור שהוא עיקר המצווה', correct: true },
      { text: `על השבתת חמץ – כי כך לשון התורה "תשביתו"`, correct: false },
    ]
  },
  {
    id: 121,
    question: 'אילו מקומות בבית מחויבים בבדיקת חמץ?',
    options: [
      { text: "כל חדרי הבית ללא יוצא מן הכלל, כולל חדרים שלא הוכנס בהם חמץ מעולם", correct: false },
      { text: "כל מקום שרגיל להכניס בו חמץ – חדרים שלא הוכנס בהם חמץ אינם טעונים בדיקה", correct: true },
      { text: "רק המטבח וחדרי האוכל שבהם מוכנסת אוכל בוודאי", correct: false },
      { text: "כל הבית, אך אפשר לפטור חדרים על ידי נעילתם לפני פסח", correct: false },
    ]
  },
  {
    id: 122,
    question: 'מה מנהג הנחת עשר חתיכות לחם לפני הבדיקה, ומה טעמו?',
    options: [
      { text: "כדי לוודא שיש על מה לשרוף למחרת בבוקר", correct: false },
      { text: "זכר לעשר המכות שהוכו המצרים", correct: false },
      { text: "שעל ידי כך לא ישכח לבטל את החמץ או לא יתרשל בבדיקתו", correct: true },
      { text: "כדי לאמן את הילדים לבדוק ולחפש", correct: false },
    ]
  },
  {
    id: 123,
    question: 'מה עושים אם שכח ולא בדק בליל י"ד בניסן?',
    options: [
      { text: "מבטל את החמץ בלב ודי בכך, ואינו צריך לבדוק", correct: false },
      { text: `בודק ביום י"ד, ואם לא בדק עד ליל פסח – בודק בפסח לאור הנר`, correct: true },
      { text: "אינו צריך לבדוק כלל, כיוון שהביטול יחול עליו", correct: false },
      { text: "ממתין לפסח הבא ומחמיר בהשנה בבדיקה כפולה", correct: false },
    ]
  },
  {
    id: 124,
    question: 'מה הדין לגבי מי שיוצא לטיול לפני פסח ולא יחזור עד אחריו?',
    options: [
      { text: "אינו חייב לבדוק כלל, שהרי לא יהיה בביתו בפסח", correct: false },
      { text: "מבטל את החמץ בלב לפני יציאתו ודי בכך", correct: false },
      { text: "אם יוצא בתוך שלושים יום לפסח – חייב לבדוק לפני יציאתו בלא ברכה", correct: true },
      { text: "חייב לבדוק בלי ברכה בכל מקרה, גם אם יצא קודם לשלושים יום", correct: false },
    ]
  },
  {
    id: 125,
    question: 'מה אסור לעשות חצי שעה לפני זמן בדיקת חמץ, ומה מותר?',
    options: [
      { text: "אסור לאכול כל מאכל ולעשות כל מלאכה, ללא יוצא מן הכלל", correct: false },
      { text: "אסור לאכול ארוחה גדולה בלבד, אך כל מלאכה מותרת", correct: false },
      { text: "אסור להתחיל מלאכה או סעודה, אך מותר לאכול פירות ועוגות בארעי", correct: true },
      { text: "אסור ללמוד תורה ולעשות מלאכה, אך אכילה מותרת לגמרי", correct: false },
    ]
  },
];


// ══════════════════════════════════════════
// מבחן ב׳ — מסלולים א ב ג — פרקים טו+טז — 16 שאלות
// תשובות נכונות מפוזרות: א,ג,ב,ד,א,ג,ב,ד,ג,א,ד,ב,א,ד,ג,ב
// ══════════════════════════════════════════
export const EXAM_ABC_2: ExamQuestion[] = [
  // פרק טו — 8 שאלות
  {
    id: 201,
    question: "מה מיוחד בהלל שאומרים בליל הסדר?",
    options: [
      { text: "חלקו אומרים לפני הסעודה וחלקו אחריה", correct: true },
      { text: "אומרים אותו כולו לפני הסדר", correct: false },
      { text: "אומרים אותו כולו אחרי הסדר", correct: false },
      { text: "לא אומרים הלל בליל הסדר – רק מגיד", correct: false },
    ]
  },
  {
    id: 202,
    question: "מה פירוש הביטוי 'עבדים היינו לפרעה במצרים'?",
    options: [
      { text: "הכרזה שאנחנו עדיין עבדים בגלות", correct: false },
      { text: "תפילה שלא נשוב לגלות מצרים", correct: false },
      { text: "פתיחת המגיד – מתחילים בגנות ומסיימים בשבח", correct: true },
      { text: "סיפור שנאמר רק לבנים הקטנים", correct: false },
    ]
  },
  {
    id: 203,
    question: "מה תפקיד הכרפס בסדר פסח?",
    options: [
      { text: "מין חרוסת שמסמלת את הטיט", correct: false },
      { text: "ירק שטובלים במי מלח כדי שהילדים ישאלו", correct: true },
      { text: "ירק מר שאוכלים במקום מרור בשעת הדחק", correct: false },
      { text: "ירק שאוכלים בסוף הסדר לסיום", correct: false },
    ]
  },
  {
    id: 204,
    question: "מה תפקיד המרור בסדר פסח?",
    options: [
      { text: "לשמור על הבריאות בלילה ארוך", correct: false },
      { text: "לצמצם את התיאבון לפני הסעודה", correct: false },
      { text: "להתנקות מהחמץ שאכלו לפני פסח", correct: false },
      { text: "זכר למרירות השעבוד במצרים", correct: true },
    ]
  },
  {
    id: 205,
    question: "מה שיעור אכילת מרור?",
    options: [
      { text: "כזית", correct: true },
      { text: "כביצה", correct: false },
      { text: "שלושה עלי חסה שלמים", correct: false },
      { text: "כחצי ביצה", correct: false },
    ]
  },
  {
    id: 206,
    question: "מהו המרור המועדף לכתחילה?",
    options: [
      { text: "חזרת – שורש מר", correct: false },
      { text: "פלפל חריף", correct: false },
      { text: "חסה – רומן", correct: true },
      { text: "עלי לענה", correct: false },
    ]
  },
  {
    id: 207,
    question: "מה מסמל החרוסת בסדר?",
    options: [
      { text: "מתיקות הגאולה", correct: false },
      { text: "את הדם שנמרח על המשקופים", correct: false },
      { text: "אדמת ארץ ישראל", correct: false },
      { text: "טיט המצרים שבו עמלו בני ישראל", correct: true },
    ]
  },
  {
    id: 208,
    question: "כמה מצות מניחים על השולחן בליל הסדר ומה הן מסמלות?",
    options: [
      { text: "שתיים – כנגד שתי לחם של שבת", correct: false },
      { text: "שלוש – כנגד כהן לוי וישראל", correct: true },
      { text: "ארבע – כנגד ארבע לשונות גאולה", correct: false },
      { text: "אחת גדולה – כנגד לחם עוני", correct: false },
    ]
  },
  // פרק טז — 8 שאלות
  {
    id: 209,
    question: "מה פירוש 'קדש' בסדר פסח?",
    options: [
      { text: "לשיר שיר קדוש בפתיחה", correct: false },
      { text: "לקדש את השולחן לפני הסעודה", correct: false },
      { text: "קידוש על הכוס – כוס ראשונה", correct: true },
      { text: "להתפלל תפילת ערבית לפני הסדר", correct: false },
    ]
  },
  {
    id: 210,
    question: "מה פירוש 'נרצה'?",
    options: [
      { text: "סיום הסדר – תפילה שיהיה רצוי לפני ה'", correct: true },
      { text: "ריקוד חגיגי סביב השולחן", correct: false },
      { text: "ברכה אחרונה על היין", correct: false },
      { text: "שירה בקול רם לסיום", correct: false },
    ]
  },
  {
    id: 211,
    question: "האם חובה לשתות את כל הכוס בארבע הכוסות?",
    options: [
      { text: "מספיק לטעום טיפה סמלית", correct: false },
      { text: "חייבים לשתות הכל עד הסוף", correct: false },
      { text: "חייבים לשתות רבע כוס בדיוק", correct: false },
      { text: "לכתחילה שותים את רוב הכוס", correct: true },
    ]
  },
  {
    id: 212,
    question: "מה 'ניצח' – שירים שאחרי הסדר?",
    options: [
      { text: "ברכת המזון שאומרים בניגון", correct: false },
      { text: "שירים ופיוטים כחד גדיא ואחד מי יודע", correct: true },
      { text: "ניצחון ישראל על מצרים", correct: false },
      { text: "שיר השירים שקוראים בסוף", correct: false },
    ]
  },
  {
    id: 213,
    question: "מה 'מגיד' בסדר פסח?",
    options: [
      { text: "סיפור יציאת מצרים על פי ההגדה – עיקר מצוות הלילה", correct: true },
      { text: "שירת ים סוף בניגון מיוחד", correct: false },
      { text: "הסבר הלכות פסח לילדים", correct: false },
      { text: "ברכת המזון הארוכה", correct: false },
    ]
  },
  {
    id: 214,
    question: "מה 'צפון' בסדר פסח?",
    options: [
      { text: "חלק נסתר מההגדה", correct: false },
      { text: "שמירת המצה לשנה הבאה", correct: false },
      { text: "ברכת ה'צפון' על הפירות", correct: false },
      { text: "אכילת האפיקומן – חצי מצה שהוצנעה", correct: true },
    ]
  },
  {
    id: 215,
    question: "מה 'כורך' בסדר?",
    options: [
      { text: "עטיפת המצות לפני הסדר", correct: false },
      { text: "אכילת מרור ומצה יחד זכר למנהג הלל", correct: true },
      { text: "קשירת ה'אפיקומן' בבד", correct: false },
      { text: "כריכת ההגדה בסיום הסדר", correct: false },
    ]
  },
  {
    id: 216,
    question: "מה 'שולחן עורך'?",
    options: [
      { text: "הכנת השולחן לפני ליל הסדר", correct: false },
      { text: "סדר עריכת השולחן לפי הלכה", correct: false },
      { text: "אכילת סעודת יום טוב – הסעודה הרגילה", correct: true },
      { text: "ניגון מיוחד על ערך השולחן", correct: false },
    ]
  },
];

// ══════════════════════════════════════════
// מבחן ב׳ — מסלול זהב — פרקים ה-ח — 24 שאלות
// תשובות נכונות מפוזרות על כל האותיות
// ══════════════════════════════════════════
export const EXAM_ZAHAV_2: ExamQuestion[] = [
  // פרק ה — 6 שאלות
  {
    id: 301,
    question: "מה מצוות 'תשביתו' ומתי היא חלה?",
    options: [
      { text: "מצווה לשרוף את החמץ ביום טוב בלבד", correct: false },
      { text: `מצווה לבדוק את הבית בליל י"ד`, correct: false },
      { text: `מצווה לבער את החמץ מרשותנו עד חצות יום י"ד`, correct: true },
      { text: "מצווה לבטל בלב בתחילת חודש ניסן", correct: false },
    ]
  },
  {
    id: 302,
    question: "מדוע תיקנו חכמים לבדוק ולבער בנוסף לביטול?",
    options: [
      { text: "שמא לא יבטל בלב שלם, וכן שמא ימצא חמץ ויתאחר", correct: true },
      { text: "כי הביטול אינו מועיל כלל מהתורה", correct: false },
      { text: "כי כך מצווה מן המובחר לכתחילה", correct: false },
      { text: "כי הביעור מבטל את הצורך בבדיקה", correct: false },
    ]
  },
  {
    id: 303,
    question: "מה הדרך המועדפת לביעור חמץ לכתחילה?",
    options: [
      { text: "קבורה באדמה עמוקה", correct: false },
      { text: "שריפה, ובדיעבד כל דרך ביעור כשרה", correct: false },
      { text: "פירור לרוח", correct: false },
      { text: "שריפה – זו המצווה המועדפת", correct: true },
    ]
  },
  {
    id: 304,
    question: 'עד מתי ניתן למכור חמץ לגוי ביום י"ד?',
    options: [
      { text: "עד סוף שעה חמישית", correct: true },
      { text: "עד חצות היום", correct: false },
      { text: "עד שקיעת החמה", correct: false },
      { text: "עד תחילת שעה שביעית", correct: false },
    ]
  },
  {
    id: 305,
    question: "האם חמץ של גוי שהופקד ביהודי עובר בבל יראה?",
    options: [
      { text: "כן, כי נמצא בביתו של ישראל", correct: false },
      { text: "כן, אם היהודי קיבל אחריות", correct: false },
      { text: "לא, אפילו ללא מחיצה, כי הגוי בעליו", correct: false },
      { text: "לא, כי 'לך' – רק חמץ שלו, אך צריך מחיצה", correct: true },
    ]
  },
  {
    id: 306,
    question: "מה ארבעת שלבי השבתת החמץ?",
    options: [
      { text: `בדיקה וביטול ראשון בליל י"ד, ביעור וביטול שני ביום י"ד`, correct: false },
      { text: "בדיקה, שריפה, ביטול, מכירה", correct: false },
      { text: "ניקוי, בדיקה, ביעור, ביטול", correct: true },
      { text: "ביטול ראשון, בדיקה, ביטול שני, ביעור", correct: false },
    ]
  },
  // פרק ו — 6 שאלות
  {
    id: 307,
    question: "מה הצורך במכירת חמץ לגוי לפני פסח?",
    options: [
      { text: "כדי שהחמץ לא יהיה ברשות היהודי ויעבור על 'בל יראה'", correct: false },
      { text: "כדי להרוויח כסף לצרכי החג", correct: false },
      { text: "כדי להימנע מחיוב בדיקה", correct: false },
      { text: "כדי לסלק חמץ מהבית – מצווה מן המובחר", correct: true },
    ]
  },
  {
    id: 308,
    question: "האם מכירת חמץ לגוי היא מכירה גמורה?",
    options: [
      { text: "כן, המכירה גמורה והגוי יכול לקחת את החמץ", correct: true },
      { text: "לא, זו מכירה פיקטיבית בלבד", correct: false },
      { text: "כן, אך הגוי אינו רשאי לקחת בפועל", correct: false },
      { text: "לא, רק כסוי לחמץ שאינו ידוע", correct: false },
    ]
  },
  {
    id: 309,
    question: "מה קורה אם הגוי בא לקחת את החמץ שמכר לו?",
    options: [
      { text: "מותר לסרב כי המכירה הייתה פיקטיבית", correct: false },
      { text: "חייב לפדות ממנו את החמץ", correct: false },
      { text: "חייב למסור לו את החמץ, שהרי הוא שלו", correct: true },
      { text: "פונה לרב שיבטל את עסקת המכירה", correct: false },
    ]
  },
  {
    id: 310,
    question: "מה דין חמץ שנשאר ברשות יהודי בפסח בשוגג?",
    options: [
      { text: "מותר באכילה כי לא עבר במזיד", correct: false },
      { text: "אסור באכילה ובהנאה אחרי פסח, אפילו בשוגג", correct: false },
      { text: "מותר בהנאה אך אסור באכילה", correct: false },
      { text: "אסור לאותו יהודי, אך מותר למכרו לאחרים", correct: true },
    ]
  },
  {
    id: 311,
    question: "האם ניתן למכור חמץ שאינו ידוע מיקומו?",
    options: [
      { text: "לא, חייבים לדעת היכן החמץ", correct: false },
      { text: "כן, מוכרים 'חמץ כלשהו' שאינו ידוע", correct: true },
      { text: "כן, אך רק חמץ בבית ולא בחנות", correct: false },
      { text: "לא, צריך לבדוק תחילה את כל הבית", correct: false },
    ]
  },
  {
    id: 312,
    question: "מדוע יש להיזהר לא להשתמש בחמץ שנמכר לגוי בפסח?",
    options: [
      { text: "כי הוא שייך לגוי ממש, ושימוש בו הוא גזל", correct: false },
      { text: "כי אסור לנגוע בחמץ כלל בפסח מדרבנן", correct: false },
      { text: "כי השימוש מבטל את תוקף המכירה", correct: true },
      { text: "כי ייראה כאילו לא מקיים מצוות ביעור", correct: false },
    ]
  },
  // פרק ז — 6 שאלות
  {
    id: 313,
    question: "מהם חמשת מיני הדגן שחימוצם אסור מן התורה?",
    options: [
      { text: "חיטה, שעורה, כוסמין, שיפון ושיבולת שועל", correct: false },
      { text: "חיטה, שעורה, אורז, דוחן ושיפון", correct: false },
      { text: "חיטה, שעורה, כוסמת, שיפון ושיבולת שועל", correct: false },
      { text: "חיטה, שעורה, כוסמין, שיפון ושיבולת שועל (כוסמין ולא כוסמת)", correct: true },
    ]
  },
  {
    id: 314,
    question: "מה הדין לגבי אורז וקטניות בפסח?",
    options: [
      { text: "אורז וקטניות אינם חמץ מהתורה, אך אשכנזים נהגו שלא לאוכלם", correct: true },
      { text: "אורז אסור מהתורה כמו חיטה", correct: false },
      { text: "קטניות אסורות מהתורה בכל העדות", correct: false },
      { text: "אורז מותר לכולם כי אינו מחמיץ כלל", correct: false },
    ]
  },
  {
    id: 315,
    question: "כיצד נוצר חמץ מבצק?",
    options: [
      { text: "כאשר הבצק נחשף לחום מעל 40 מעלות", correct: false },
      { text: "כאשר קמח ממיני הדגן מתערב במים ועומד יותר מ-18 דקות", correct: false },
      { text: "כאשר מוסיפים שמרים לקמח ומים", correct: true },
      { text: "כאשר הבצק מתייבש מהר מהרגיל", correct: false },
    ]
  },
  {
    id: 316,
    question: "מה הכלל לגבי תערובת חמץ בפסח?",
    options: [
      { text: "חמץ בטל בשישים כמו שאר איסורים", correct: false },
      { text: "חמץ בטל ברוב אם נפל לפני פסח", correct: false },
      { text: "תלוי אם ניתן להרגיש את טעמו", correct: false },
      { text: "חמץ בפסח אוסר בכל שהוא – אפילו אחד לאלף", correct: true },
    ]
  },
  {
    id: 317,
    question: "מה מצה עשירה ולמי מותרת?",
    options: [
      { text: "מצה שנלושה במיץ פירות – לספרדים מותרת, לאשכנזים אסורה לבריאים", correct: false },
      { text: "מצה ביצה – אסורה לחולים בלבד", correct: false },
      { text: "מצה עם סוכר – מותרת לכולם לכתחילה", correct: true },
      { text: "מצה אפויה מיד – מותרת לכולם", correct: false },
    ]
  },
  {
    id: 318,
    question: "מה דין שכר שנעשה מחמשת מיני דגן?",
    options: [
      { text: "מותר כי הדגן עבר שינוי צורה", correct: false },
      { text: "אסור מהתורה כחמץ גמור לכל דבר", correct: true },
      { text: "אסור מדרבנן בלבד כי אינו נאכל", correct: false },
      { text: "מותר בהנאה אך אסור בשתייה", correct: false },
    ]
  },
  // פרק ח — 6 שאלות
  {
    id: 319,
    question: "מה הדין לגבי תרופות שיש בהן חמץ בפסח?",
    options: [
      { text: "תרופות חיוניות מותרות – חולה אינו בגדר אוכל", correct: false },
      { text: "כל תרופה אסורה בפסח גם לחולה מסוכן", correct: false },
      { text: "מותרות רק בהמלצת רב מוסמך", correct: false },
      { text: "תרופות חיוניות מותרות כי 'פיקוח נפש דוחה' את האיסור", correct: true },
    ]
  },
  {
    id: 320,
    question: "האם יש בעיה בקוסמטיקה המכילה חמץ?",
    options: [
      { text: "בדרך כלל אין בעיה כי אינן ראויות לאכילה", correct: true },
      { text: "כל קוסמטיקה אסורה כי עלולה להיבלע", correct: false },
      { text: "רק שפתון אסור כי נוגע ישירות בפה", correct: false },
      { text: "יש לבדוק כל מוצר אצל הרב", correct: false },
    ]
  },
  {
    id: 321,
    question: "מה ההבדל בין ספרדים ואשכנזים לגבי מצה עשירה?",
    options: [
      { text: "שניהם מתירים למי שקשה לו לאכול מצה רגילה", correct: false },
      { text: "לאשכנזים מותרת, לספרדים אסורה לכולם", correct: false },
      { text: "לספרדים מותרת, לאשכנזים אסורה לבריאים", correct: false },
      { text: "שניהם אוסרים אלא בשעת הדחק ממש", correct: true },
    ]
  },
  {
    id: 322,
    question: "מהי 'מצה שרויה' ומה מנהג החסידים?",
    options: [
      { text: "מצה ספוגה בדבש – מותרת לכולם", correct: false },
      { text: "מצה השרויה במים – החסידים נוהגים שלא לאוכלה", correct: true },
      { text: "מצה ביצה – אסורה לכולם מהתורה", correct: false },
      { text: "מצה טחונה – חסידים מחמירים עליה", correct: false },
    ]
  },
  {
    id: 323,
    question: "מה הכלל לגבי תרופה שטעמה מר?",
    options: [
      { text: "אסורה לגמרי ללא קשר לטעמה", correct: false },
      { text: "מותרת רק לחולה מסוכן", correct: false },
      { text: "אסורה כי חמץ בפסח אוסר בכלשהו", correct: false },
      { text: "מותר לבולעה כי נפסלה מאכילת כלב", correct: true },
    ]
  },
  {
    id: 324,
    question: 'מה ההבדל בין השולחן ערוך לרמ"א בהלכות כשרות לפסח?',
    options: [
      { text: `השולחן ערוך הולך לפי כללי ההלכה הרגילים, הרמ"א נוטה להחמיר`, correct: false },
      { text: `הרמ"א מקל יותר מהשולחן ערוך בפסח`, correct: true },
      { text: "אין ביניהם הבדל עקרוני", correct: false },
      { text: "השולחן ערוך אוסר יותר בתערובות", correct: false },
    ]
  },
];

// ══════════════════════════════════════════
// מבחן ב׳ — מסלול ב׳ (ז-ח) — פרקים טו+טז+זמנים ב+זמנים ג — 24 שאלות
// ══════════════════════════════════════════
export const EXAM_B_2: ExamQuestion[] = [
  // פרק טו — 6 שאלות
  {
    id: 401,
    question: "מה מיוחד בהלל שאומרים בליל הסדר?",
    options: [
      { text: "חלקו אומרים לפני הסעודה וחלקו אחריה", correct: true },
      { text: "אומרים אותו כולו לפני הסדר", correct: false },
      { text: "אומרים אותו כולו אחרי הסדר", correct: false },
      { text: "לא אומרים הלל בליל הסדר", correct: false },
    ]
  },
  {
    id: 402,
    question: "מה פירוש 'עבדים היינו לפרעה במצרים'?",
    options: [
      { text: "הכרזה שאנחנו עדיין עבדים בגלות", correct: false },
      { text: "פתיחת המגיד – מתחילים בגנות ומסיימים בשבח", correct: true },
      { text: "תפילה שלא נשוב לגלות", correct: false },
      { text: "סיפור לבנים הקטנים בלבד", correct: false },
    ]
  },
  {
    id: 403,
    question: "מה תפקיד המרור?",
    options: [
      { text: "לצמצם תיאבון לפני הסעודה", correct: false },
      { text: "להתנקות מהחמץ", correct: false },
      { text: "לשמור על הבריאות", correct: false },
      { text: "זכר למרירות השעבוד במצרים", correct: true },
    ]
  },
  {
    id: 404,
    question: "מה שיעור אכילת מרור?",
    options: [
      { text: "כזית", correct: false },
      { text: "כביצה", correct: false },
      { text: "כזית – שיעור הלכתי מינימלי", correct: true },
      { text: "שלושה עלי חסה", correct: false },
    ]
  },
  {
    id: 405,
    question: "מהו המרור המועדף לכתחילה?",
    options: [
      { text: "חסה – רומן", correct: false },
      { text: "חזרת – שורש", correct: false },
      { text: "פלפל חריף", correct: false },
      { text: "חסה (רומן) לפי רוב הפוסקים", correct: true },
    ]
  },
  {
    id: 406,
    question: "מה מסמל החרוסת?",
    options: [
      { text: "טיט המצרים שבו עמלו בני ישראל", correct: false },
      { text: "מתיקות הגאולה", correct: true },
      { text: "אדמת ארץ ישראל", correct: false },
      { text: "הדם שנמרח על המשקופים", correct: false },
    ]
  },
  // פרק טז — 6 שאלות
  {
    id: 407,
    question: "מה פירוש 'קדש'?",
    options: [
      { text: "קידוש על הכוס – כוס ראשונה", correct: true },
      { text: "לקדש את השולחן", correct: false },
      { text: "להתפלל ערבית", correct: false },
      { text: "לשיר שיר קדוש", correct: false },
    ]
  },
  {
    id: 408,
    question: "מה פירוש 'נרצה'?",
    options: [
      { text: "ריקוד חגיגי", correct: false },
      { text: "ברכה אחרונה על היין", correct: false },
      { text: "סיום הסדר – תפילה שיהיה רצוי לפני ה'", correct: true },
      { text: "שירה בקול רם", correct: false },
    ]
  },
  {
    id: 409,
    question: "האם חובה לשתות את כל הכוס בארבע הכוסות?",
    options: [
      { text: "חייבים לשתות הכל", correct: false },
      { text: "מספיק טיפה סמלית", correct: false },
      { text: "חייבים רבע כוס", correct: false },
      { text: "לכתחילה שותים רוב הכוס", correct: true },
    ]
  },
  {
    id: 410,
    question: "מה 'מגיד' בסדר פסח?",
    options: [
      { text: "סיפור יציאת מצרים – עיקר מצוות הלילה", correct: false },
      { text: "הסבר הלכות פסח לילדים", correct: false },
      { text: "סיפור יציאת מצרים על פי ההגדה", correct: true },
      { text: "ברכת המזון הארוכה", correct: false },
    ]
  },
  {
    id: 411,
    question: "מה 'כורך'?",
    options: [
      { text: "עטיפת המצות לפני הסדר", correct: false },
      { text: "אכילת מרור ומצה יחד זכר למנהג הלל", correct: false },
      { text: "קשירת האפיקומן", correct: false },
      { text: "אכילת מצה, מרור וחרוסת יחד", correct: true },
    ]
  },
  {
    id: 412,
    question: "כמה מצות מניחים ומה הן מסמלות?",
    options: [
      { text: "שלוש – כנגד כהן לוי וישראל", correct: true },
      { text: "שתיים – כנגד שתי לחם", correct: false },
      { text: "ארבע – כנגד ארבע כוסות", correct: false },
      { text: "אחת גדולה – לחם עוני", correct: false },
    ]
  },
  // זמנים פרק ב — 6 שאלות
  {
    id: 413,
    question: "מאימתי מתחילים לספור ספירת העומר?",
    options: [
      { text: "בליל פסח – ליל הסדר", correct: false },
      { text: "בראש חודש אייר", correct: false },
      { text: `בליל ט"ז בניסן – מוצאי יום טוב ראשון`, correct: true },
      { text: `בל"ג בעומר`, correct: false },
    ]
  },
  {
    id: 414,
    question: "כמה ימים סופרים?",
    options: [
      { text: "ארבעים ותשעה ימים", correct: false },
      { text: "חמישים ימים", correct: false },
      { text: "שלושים ושלושה ימים", correct: false },
      { text: "שבעה שבועות – ארבעים ותשעה ימים", correct: true },
    ]
  },
  {
    id: 415,
    question: "מה עיקר משמעות ספירת העומר?",
    options: [
      { text: "ספירה מיציאת מצרים לקבלת התורה", correct: true },
      { text: "זכר להקרבת עומר השעורים", correct: false },
      { text: "מנין הימים עד בניין הבית", correct: false },
      { text: "חישוב זמן קציר השעורה", correct: false },
    ]
  },
  {
    id: 416,
    question: "מה דין מי ששכח לספור לילה אחת?",
    options: [
      { text: "יספור ביום ללא ברכה, ויוכל להמשיך בברכה", correct: false },
      { text: "אינו יכול להמשיך בברכה כלל", correct: false },
      { text: "ימשיך לספור בברכה כרגיל", correct: false },
      { text: "יספור ביום, ויוכל להמשיך בברכה בלילה הבא", correct: true },
    ]
  },
  {
    id: 417,
    question: "האם יש לספור בלילה דווקא?",
    options: [
      { text: "כן, לכתחילה בצאת הכוכבים, בדיעבד ביום", correct: false },
      { text: "אפשר לספור כל היום", correct: false },
      { text: "יש לספור בשחרית", correct: false },
      { text: "לכתחילה בצאת הכוכבים – זמן קבלת שבת", correct: true },
    ]
  },
  {
    id: 418,
    question: 'מה חשיבות ל"ג בעומר?',
    options: [
      { text: "יום שפסקו תלמידי רבי עקיבא למות", correct: true },
      { text: "יום שקיבלו ישראל את התורה", correct: false },
      { text: "יום אמצע הספירה", correct: false },
      { text: `יום הולדת רשב"י`, correct: false },
    ]
  },
  // זמנים פרק ג — 6 שאלות
  {
    id: 419,
    question: "מה נאסר בתקופת ספירת העומר?",
    options: [
      { text: "בישול בשר ויין", correct: false },
      { text: "עריכת נסיעות", correct: false },
      { text: "לימוד תורה בשמחה", correct: false },
      { text: "תספורת, נישואים ושמחות גדולות", correct: true },
    ]
  },
  {
    id: 420,
    question: "מה מנהג רוב האשכנזים?",
    options: [
      { text: "אבלות כל שבעה שבועות", correct: false },
      { text: "אבלות בשבועיים הראשונים", correct: false },
      { text: `אבלות עד ל"ג בעומר`, correct: true },
      { text: "אין מנהג אבלות", correct: false },
    ]
  },
  {
    id: 421,
    question: 'האם מותר לערוך נישואים בל"ג בעומר?',
    options: [
      { text: "אסור כי הוא אמצע הספירה", correct: false },
      { text: "מותר רק אחרי חצות", correct: false },
      { text: `כן, ל"ג בעומר הוא יום שמחה`, correct: false },
      { text: "כן, נהוג לשאת נשים ביום זה", correct: true },
    ]
  },
  {
    id: 422,
    question: "מה הסיבה לאבלות בספירה?",
    options: [
      { text: "שמתו 24,000 תלמידי רבי עקיבא", correct: false },
      { text: "שמתה מרים הנביאה", correct: false },
      { text: "שחרב בית המקדש", correct: false },
      { text: "שמתו תלמידי ר' עקיבא ולא נהגו כבוד זה לזה", correct: true },
    ]
  },
  {
    id: 423,
    question: "מה מנהג ספרדים?",
    options: [
      { text: "ספרדים אינם נוהגים אבלות כלל", correct: false },
      { text: `אבלות מר"ח אייר עד שבועות`, correct: true },
      { text: "אבלות כל ימי הספירה", correct: false },
      { text: "אבלות בשבועיים האחרונים", correct: false },
    ]
  },
  {
    id: 424,
    question: 'מדוע ל"ג בעומר קשור להילולת רשב"י?',
    options: [
      { text: "כי ביום זה סיים את כתיבת הזוהר", correct: false },
      { text: "כי ביום זה יצא מהמערה", correct: false },
      { text: "לפי המסורת ביום זה נפטר וציווה לשמוח", correct: false },
      { text: "כי ביום זה חנך את בית מדרשו", correct: true },
    ]
  },
];

// ══════════════════════════════════════════
// מבחן ב׳ — מסלול ג׳ (ט-יב) — פרקים ה+ו+טו+טז — 24 שאלות
// ══════════════════════════════════════════
export const EXAM_C_2: ExamQuestion[] = [
  // פרק ה — 6 שאלות
  {
    id: 501,
    question: "מה מצוות 'תשביתו'?",
    options: [
      { text: "מצווה לשרוף את החמץ בלבד", correct: false },
      { text: "מצווה לבטל בלב בתחילת ניסן", correct: false },
      { text: `מצווה לבדוק את הבית בליל י"ד`, correct: false },
      { text: `מצווה לבער את החמץ עד חצות יום י"ד`, correct: true },
    ]
  },
  {
    id: 502,
    question: "מדוע תיקנו חכמים לבדוק ולבער מעבר לביטול?",
    options: [
      { text: "שמא לא יבטל בלב שלם, ושמא ימצא חמץ ויתאחר", correct: false },
      { text: "כי הביטול אינו מועיל כלל", correct: true },
      { text: "כי כך מצווה מן המובחר", correct: false },
      { text: "כי הביעור מבטל הצורך בבדיקה", correct: false },
    ]
  },
  {
    id: 503,
    question: "מהי הדרך המועדפת לביעור חמץ?",
    options: [
      { text: "קבורה באדמה", correct: false },
      { text: "שריפה", correct: true },
      { text: "פירור לרוח", correct: false },
      { text: "שטיפה בים", correct: false },
    ]
  },
  {
    id: 504,
    question: "עד מתי ניתן למכור חמץ לגוי?",
    options: [
      { text: "עד חצות היום", correct: false },
      { text: "עד שקיעת החמה", correct: false },
      { text: "עד שעה שביעית", correct: false },
      { text: "עד סוף שעה חמישית", correct: true },
    ]
  },
  {
    id: 505,
    question: "האם חמץ של גוי שהופקד ביהודי עובר בבל יראה?",
    options: [
      { text: "לא, כי 'לך' – רק חמץ שלו, אך צריך מחיצה", correct: false },
      { text: "כן, כי נמצא בביתו של ישראל", correct: false },
      { text: "לא, אפילו ללא מחיצה", correct: true },
      { text: "כן, אם קיבל אחריות", correct: false },
    ]
  },
  {
    id: 506,
    question: "מה ארבעת שלבי השבתת החמץ?",
    options: [
      { text: "ניקוי, בדיקה, ביעור, ביטול", correct: false },
      { text: `בדיקה וביטול ראשון בליל י"ד, ביעור וביטול שני ביום י"ד`, correct: true },
      { text: "בדיקה, שריפה, ביטול, מכירה", correct: false },
      { text: "ביטול ראשון, בדיקה, ביטול שני, ביעור", correct: false },
    ]
  },
  // פרק ו — 6 שאלות
  {
    id: 507,
    question: "מה הצורך במכירת חמץ לגוי?",
    options: [
      { text: "כדי שהחמץ לא יהיה ברשות היהודי בפסח", correct: true },
      { text: "כדי להרוויח כסף לחג", correct: false },
      { text: "כדי להימנע מחיוב בדיקה", correct: false },
      { text: "כדי לסלק חמץ מהבית לגמרי", correct: false },
    ]
  },
  {
    id: 508,
    question: "האם המכירה לגוי היא מכירה גמורה?",
    options: [
      { text: "לא, זו מכירה פיקטיבית", correct: false },
      { text: "כן, אך הגוי לא יכול לקחת בפועל", correct: false },
      { text: "כן, המכירה גמורה לכל דבר", correct: false },
      { text: "כן – הגוי יכול לקחת את החמץ בפועל", correct: true },
    ]
  },
  {
    id: 509,
    question: "מה קורה אם הגוי בא לקחת את החמץ?",
    options: [
      { text: "חייב למסור לו", correct: false },
      { text: "מותר לסרב", correct: true },
      { text: "חייב לפדות ממנו", correct: false },
      { text: "הרב מחליט", correct: false },
    ]
  },
  {
    id: 510,
    question: "האם ניתן למכור חמץ שאינו ידוע מיקומו?",
    options: [
      { text: "לא, חייבים לדעת מיקומו", correct: false },
      { text: "כן, מוכרים 'חמץ כלשהו'", correct: true },
      { text: "כן, רק חמץ בבית", correct: false },
      { text: "לא, צריך לבדוק תחילה", correct: false },
    ]
  },
  {
    id: 511,
    question: "מדוע אסור להשתמש בחמץ שנמכר לגוי?",
    options: [
      { text: "כי השימוש מבטל המכירה", correct: false },
      { text: "כי אסור לנגוע בחמץ בפסח", correct: false },
      { text: "כי הוא שייך לגוי – שימוש הוא גזל", correct: false },
      { text: "כי ייראה כאילו לא קיים ביעור", correct: true },
    ]
  },
  {
    id: 512,
    question: "מה דין חמץ שנשאר ברשות יהודי בשוגג?",
    options: [
      { text: "מותר כי לא עבר במזיד", correct: false },
      { text: "אסור באכילה ובהנאה אחרי פסח", correct: true },
      { text: "מותר בהנאה אך אסור באכילה", correct: false },
      { text: "תלוי אם ביטל לפני פסח", correct: false },
    ]
  },
  // פרק טו — 6 שאלות
  {
    id: 513,
    question: "מה מיוחד בהלל בליל הסדר?",
    options: [
      { text: "חלקו לפני הסעודה וחלקו אחריה", correct: false },
      { text: "אומרים כולו לפני הסדר", correct: false },
      { text: "חלק לפני, חלק אחרי – מסורת עתיקה", correct: true },
      { text: "לא אומרים הלל בלילה זה", correct: false },
    ]
  },
  {
    id: 514,
    question: "מה שיעור מרור?",
    options: [
      { text: "כביצה", correct: false },
      { text: "כזית – שיעור הלכתי", correct: true },
      { text: "שלושה עלים", correct: false },
      { text: "כחצי ביצה", correct: false },
    ]
  },
  {
    id: 515,
    question: "מה מסמל החרוסת?",
    options: [
      { text: "מתיקות הגאולה", correct: false },
      { text: "הדם על המשקופים", correct: false },
      { text: "אדמת ארץ ישראל", correct: false },
      { text: "טיט המצרים שבו עמלו", correct: true },
    ]
  },
  {
    id: 516,
    question: "כמה מצות ומה הן מסמלות?",
    options: [
      { text: "שלוש – כהן לוי וישראל", correct: true },
      { text: "שתיים – כנגד שתי לחם", correct: false },
      { text: "ארבע – כנגד ארבע כוסות", correct: false },
      { text: "אחת גדולה", correct: false },
    ]
  },
  {
    id: 517,
    question: "מה תפקיד המרור?",
    options: [
      { text: "לצמצם תיאבון", correct: false },
      { text: "לשמור על הבריאות", correct: false },
      { text: "זכר למרירות השעבוד", correct: false },
      { text: "זכר לקושי השעבוד וייסורי מצרים", correct: true },
    ]
  },
  {
    id: 518,
    question: "מהו המרור המועדף?",
    options: [
      { text: "חזרת – שורש", correct: false },
      { text: "פלפל חריף", correct: false },
      { text: "חסה – רומן", correct: true },
      { text: "עלי לענה", correct: false },
    ]
  },
  // פרק טז — 6 שאלות
  {
    id: 519,
    question: "מה 'קדש'?",
    options: [
      { text: "לקדש השולחן", correct: false },
      { text: "קידוש – כוס ראשונה", correct: true },
      { text: "להתפלל ערבית", correct: false },
      { text: "שיר קדוש", correct: false },
    ]
  },
  {
    id: 520,
    question: "מה 'נרצה'?",
    options: [
      { text: "סיום הסדר – תפילה שיהיה רצוי", correct: false },
      { text: "ריקוד חגיגי", correct: false },
      { text: "ברכה אחרונה", correct: false },
      { text: "סיום הסדר בתפילה ושבח", correct: true },
    ]
  },
  {
    id: 521,
    question: "האם חובה לשתות כל הכוס?",
    options: [
      { text: "לכתחילה שותים רוב הכוס", correct: false },
      { text: "כל הכוס חובה", correct: false },
      { text: "מספיק טיפה", correct: false },
      { text: "לכתחילה רוב הכוס – ובדיעבד כזית", correct: true },
    ]
  },
  {
    id: 522,
    question: "מה 'מגיד'?",
    options: [
      { text: "הסבר הלכות לילדים", correct: false },
      { text: "ברכת המזון", correct: false },
      { text: "שירת ים סוף", correct: false },
      { text: "סיפור יציאת מצרים – עיקר מצוות הלילה", correct: true },
    ]
  },
  {
    id: 523,
    question: "מה 'כורך'?",
    options: [
      { text: "עטיפת המצות", correct: false },
      { text: "קשירת האפיקומן", correct: false },
      { text: "אכילת מצה ומרור יחד זכר למנהג הלל", correct: true },
      { text: "כריכת ההגדה בסיום", correct: false },
    ]
  },
  {
    id: 524,
    question: "מה 'צפון'?",
    options: [
      { text: "חלק נסתר מההגדה", correct: false },
      { text: "אכילת האפיקומן – חצי מצה שהוצנעה", correct: false },
      { text: "שמירת מצה לשנה הבאה", correct: false },
      { text: "האפיקומן – נאכל בסוף הסעודה", correct: true },
    ]
  },
];

// ══════════════════════════════════════════
// מבחן ג׳ — מסלול ג׳ (ט-יב) — זמנים פרק ב + ג — 25 שאלות
// ══════════════════════════════════════════
export const EXAM_C_3: ExamQuestion[] = [
  // זמנים פרק ב — 13 שאלות
  { id: 601, question: "מאימתי מתחילים לספור ספירת העומר?",
    options: [
      { text: `בליל ט"ז בניסן – מוצאי יום טוב ראשון של פסח`, correct: true },
      { text: `בליל ט"ו בניסן – תחילת פסח`, correct: false },
      { text: "בראש חודש אייר", correct: false },
      { text: `בבוקר י"ז בניסן`, correct: false },
    ]
  },
  { id: 602, question: "כמה ימים סופרים בספירת העומר?",
    options: [
      { text: "חמישים ימים", correct: false },
      { text: "ארבעים ותשעה ימים – שבעה שבועות שלמים", correct: true },
      { text: `שלושים ושלושה ימים – עד ל"ג בעומר`, correct: false },
      { text: "עשרים ואחד יום – שלושה שבועות", correct: false },
    ]
  },
  { id: 603, question: "מה עיקר משמעות ספירת העומר?",
    options: [
      { text: "זכר לקציר השעורים בבית המקדש", correct: false },
      { text: "מנין הימים עד חגיגת הבציר", correct: false },
      { text: "ספירה מיציאת מצרים לקבלת התורה – מקשרת פסח לשבועות", correct: true },
      { text: "חישוב זמן ראש השנה", correct: false },
    ]
  },
  { id: 604, question: "כיצד אומרים את הספירה ביום חמישה עשר?",
    options: [
      { text: "היום חמישה עשר יום שהם שני שבועות ויום אחד לעומר", correct: true },
      { text: "היום יום חמישה עשר לעומר", correct: false },
      { text: "נספור חמישה עשר ימים מפסח", correct: false },
      { text: "היום שני שבועות לעומר", correct: false },
    ]
  },
  { id: 605, question: "מה דין מי ששכח לספור לילה אחת?",
    options: [
      { text: "חייב לחזור לספור מהתחלה", correct: false },
      { text: "אינו יכול להמשיך לספור בברכה כלל", correct: false },
      { text: "ממשיך לספור בברכה כאילו לא פספס", correct: false },
      { text: "יספור ביום ללא ברכה, ויוכל להמשיך בברכה בלילות הבאים", correct: true },
    ]
  },
  { id: 606, question: "האם יש לספור ספירת העומר בלילה דווקא?",
    options: [
      { text: "לכתחילה בצאת הכוכבים; בדיעבד יספור ביום ללא ברכה", correct: true },
      { text: "אפשר לספור בכל שעה ביום ובלילה בברכה", correct: false },
      { text: "חובה לספור בשחרית בלבד", correct: false },
      { text: "יש לספור בשקיעת החמה דווקא", correct: false },
    ]
  },
  { id: 607, question: "מה ברכת ספירת העומר?",
    options: [
      { text: "ברוך ... לספור ימי ספירת העומר", correct: false },
      { text: "ברוך ... על מצות ספירת שבעה שבועות", correct: false },
      { text: "ברוך ... אשר קדשנו במצוותיו וצוונו על ספירת העומר", correct: true },
      { text: "ברוך ... אשר קדשנו לספור ימי עומר", correct: false },
    ]
  },
  { id: 608, question: "מי שספר ביום ולא בלילה – מה דינו?",
    options: [
      { text: "ספירת היום מועילה בדיעבד, וממשיך בברכה", correct: false },
      { text: "ספירתו בטלה ואינה נחשבת", correct: false },
      { text: "ממשיך ללא ברכה בשאר הימים", correct: false },
      { text: "יספור ביום, ויוכל להמשיך בברכה בלילה הבא", correct: true },
    ]
  },
  { id: 609, question: `מה חשיבות ל"ג בעומר?`,
    options: [
      { text: "ביום זה הוקרב העומר לראשונה", correct: false },
      { text: "ביום זה ניתנה התורה לישראל", correct: false },
      { text: "ביום זה פסקו תלמידי רבי עקיבא למות – ולכן הוא יום שמחה", correct: true },
      { text: "ביום זה נפסקה מגפת בני ישראל במדבר", correct: false },
    ]
  },
  { id: 610, question: "מה קורה אם ספר ספירה שגויה ותיקן באותו לילה?",
    options: [
      { text: "אם תיקן לאחר שאמר מספר שגוי – יצא ידי חובה", correct: true },
      { text: "חייב לחזור ולספור למחרת", correct: false },
      { text: "ספירתו בטלה ואינו יכול להמשיך", correct: false },
      { text: "צריך להתייעץ עם רב", correct: false },
    ]
  },
  { id: 611, question: "האם אפשר לספור לפני תפילת ערבית?",
    options: [
      { text: "לא, חובה לספור רק לאחר תפילת ערבית", correct: false },
      { text: "כן, אפשר גם לפני השקיעה", correct: false },
      { text: "לא, יש לספור רק בתוך תפילת ערבית", correct: false },
      { text: "כן, מותר לכתחילה אם כבר חשכה", correct: true },
    ]
  },
  { id: 612, question: "מה חל ביום החמישים לספירה?",
    options: [
      { text: "ראש חודש סיון", correct: false },
      { text: "חג השבועות – יום קבלת התורה", correct: true },
      { text: "מתחילים לספור מחדש", correct: false },
      { text: "יום צום מיוחד", correct: false },
    ]
  },
  { id: 613, question: `מה פירוש המילה 'עומר' בהלכה?`,
    options: [
      { text: "שבעה שבועות של ימי הקציר", correct: false },
      { text: "הזמן שבין פסח לשבועות", correct: false },
      { text: "כלי שבו מדדו את יבול הקמח", correct: false },
      { text: `שיעור מידה של שעורים שהוקרב בבית המקדש בט"ז בניסן`, correct: true },
    ]
  },
  // זמנים פרק ג — 12 שאלות
  { id: 614, question: "מה נאסר בתקופת ספירת העומר?",
    options: [
      { text: "תספורת, נישואים ושמחות גדולות", correct: true },
      { text: "אכילת בשר ושתיית יין", correct: false },
      { text: "נסיעות לחוץ לארץ", correct: false },
      { text: "ביקור בבתי כנסיות", correct: false },
    ]
  },
  { id: 615, question: "מה מנהג רוב האשכנזים לגבי ימי האבלות בספירה?",
    options: [
      { text: "מנהגי אבלות כל שבעה שבועות", correct: false },
      { text: "אבלות רק בשבועיים הראשונים", correct: false },
      { text: `מנהגי האבלות נמשכים עד ל"ג בעומר`, correct: true },
      { text: "אבלות רק מראש חודש אייר עד שבועות", correct: false },
    ]
  },
  { id: 616, question: "מה מנהג הספרדים לגבי ימי האבלות?",
    options: [
      { text: "ספרדים אינם נוהגים אבלות בספירה כלל", correct: false },
      { text: "רוב הספרדים נוהגים אבלות מראש חודש אייר עד שבועות", correct: true },
      { text: "ספרדים מחמירים יותר מהאשכנזים", correct: false },
      { text: "ספרדים נוהגים אבלות בשלושים יום הראשונים", correct: false },
    ]
  },
  { id: 617, question: `האם מותר לערוך חתונה בל"ג בעומר?`,
    options: [
      { text: "מותר רק אחרי חצות היום", correct: false },
      { text: `כן, ל"ג בעומר הוא יום שמחה ומותר לשאת נשים`, correct: true },
      { text: "אסור, כי הוא אמצע ימי הספירה", correct: false },
      { text: "תלוי במנהג המדינה", correct: false },
    ]
  },
  { id: 618, question: "מהי הסיבה לאבלות בספירת העומר?",
    options: [
      { text: "שחרב בית המקדש בתקופה זו", correct: false },
      { text: "שמתו גדולי הדור בגזרות שמד", correct: false },
      { text: "שנאסרה עליית לרגל בתקופה זו", correct: false },
      { text: "שמתו 24,000 תלמידי רבי עקיבא שלא נהגו כבוד זה בזה", correct: true },
    ]
  },
  { id: 619, question: `מה מותר בל"ג בעומר שאסור בשאר ימי הספירה?`,
    options: [
      { text: "תספורת, שמחות ועריכת נישואים", correct: true },
      { text: "אכילת בשר ויין שנאסרו בספירה", correct: false },
      { text: "שמיעת מוסיקה שנאסרה כל הספירה", correct: false },
      { text: "ריקודים שנאסרו מחוץ לשבת", correct: false },
    ]
  },
  { id: 620, question: `מדוע ל"ג בעומר קשור להילולת רשב"י?`,
    options: [
      { text: `כי ביום זה פרסם רשב"י את ספר הזוהר`, correct: false },
      { text: `לפי המסורת, ביום זה נפטר רשב"י וציווה לשמוח ביום פטירתו`, correct: true },
      { text: `כי ביום זה חזר רשב"י מהגלות`, correct: false },
      { text: `כי ביום זה נולד רשב"י`, correct: false },
    ]
  },
  { id: 621, question: "מה מנהג הדלקת המדורות?",
    options: [
      { text: "זכר לאש שירדה מהשמים על הר סיני", correct: false },
      { text: "זכר לשריפת החמץ לפני פסח", correct: false },
      { text: "מנהג כנגד האפלה שהייתה בימי האבלות", correct: false },
      { text: `מנהג לזכר רשב"י שתורתו האירה כאש – נהוג בעיקר במירון`, correct: true },
    ]
  },
  { id: 622, question: "מתי מתחילה תקופת האבלות לפי מנהג ירושלים?",
    options: [
      { text: `מראש חודש אייר עד ל"ג בעומר`, correct: true },
      { text: "מסוף פסח ועד שבועות", correct: false },
      { text: `מי"ז בניסן עד ל"ג בעומר`, correct: false },
      { text: `מל"ג בעומר עד שבועות`, correct: false },
    ]
  },
  { id: 623, question: "האם ניתן לשמוע מוסיקה בימי הספירה?",
    options: [
      { text: "מותר לשמוע מוסיקה שקטה בלבד", correct: false },
      { text: "מותר לגמרי כי אין הגבלה על מוסיקה", correct: false },
      { text: "לפי רוב הפוסקים אסור לשמוע מוסיקה בכלים בימי האבלות", correct: true },
      { text: "אסור לכל אורך הספירה ללא יוצא מן הכלל", correct: false },
    ]
  },
  { id: 624, question: "מה הדין לגבי תספורת ילד קטן בימי הספירה?",
    options: [
      { text: "קטן שלא הגיע לגיל מצוות – הורים נוהגים כמנהגם, ויש המקילים לגלחו", correct: true },
      { text: "אסור לחלוטין לגלח ילד בכל גיל", correct: false },
      { text: "מותר לגלח ילדים עד גיל שלוש בלבד", correct: false },
      { text: "מותר לגלח כל ילד שלא הגיע לבר מצווה", correct: false },
    ]
  },
  { id: 625, question: `מה דין שמיעת שיר חתן וכלה בחתונה שנערכת בל"ג בעומר?`,
    options: [
      { text: "אסור עדיין כי הוא בתוך ימי הספירה", correct: false },
      { text: "מותר רק שירים דתיים", correct: false },
      { text: "תלוי אם החתונה לפני חצות או אחריו", correct: false },
      { text: `מותר לגמרי – ל"ג בעומר הוא יום שמחה מלא`, correct: true },
    ]
  },
];

// ══════════════════════════════════════════
// מבחן ג׳ — מסלול זהב — פרקים ט-טז — 25 שאלות
// ══════════════════════════════════════════
export const EXAM_ZAHAV_3: ExamQuestion[] = [
  // פרק ט — 3 שאלות
  { id: 701, question: "מה הכלל הבסיסי לגבי כשרות מוצרים בפסח?",
    options: [
      { text: "כל מוצר כשר לשנה – כשר גם לפסח", correct: false },
      { text: "רק מוצרים שיש בהם קמח אסורים", correct: false },
      { text: "כל מוצר שאינו כשר לפסח – אסור, גם אם כשר לכל השנה", correct: true },
      { text: "מותר להשתמש במוצרים כשרים אם אין חמץ גלוי", correct: false },
    ]
  },
  { id: 702, question: "מה דין מוצר שיש בו חמץ כלשהו בפסח?",
    options: [
      { text: "חמץ בפסח אוסר בכל שהוא – גם אחד בעשרת אלפים", correct: true },
      { text: "בטל בשישים כמו כל איסור", correct: false },
      { text: "בטל ברוב כשנפל לפני פסח", correct: false },
      { text: "בטל בשישים רק אם נפל בשוגג", correct: false },
    ]
  },
  { id: 703, question: "מה הדין לגבי מוצר שיש בו ספק אם יש בו חמץ?",
    options: [
      { text: "מותר כי ספק דרבנן לקולא", correct: false },
      { text: "אסור בכל מקרה", correct: false },
      { text: "מותר אם לא מוצאים חמץ בבדיקה", correct: false },
      { text: "לכתחילה יש להחמיר; בדיעבד – שאלת רב", correct: true },
    ]
  },
  // פרק י — 3 שאלות
  { id: 704, question: "מה הדין לגבי קטניות בפסח לאשכנזים?",
    options: [
      { text: "קטניות אסורות מהתורה כמו חמץ ממש", correct: false },
      { text: "מנהג אשכנז לאסור קטניות, אך אין בהן איסור תורה", correct: true },
      { text: "קטניות מותרות לאשכנזים לגמרי", correct: false },
      { text: "קטניות אסורות רק אם נפלו למאכל חמץ", correct: false },
    ]
  },
  { id: 705, question: "האם שמן קטניות אסור לאשכנזים בפסח?",
    options: [
      { text: "שמן קטניות אסור לאשכנזים בכל מצב", correct: false },
      { text: "שמן קטניות מותר לכולם כי זה לא הקטניות עצמן", correct: false },
      { text: "יש פוסקים שמתירים; יש הנוהגים להחמיר", correct: true },
      { text: "שמן קטניות אסור מהתורה", correct: false },
    ]
  },
  { id: 706, question: "מה הדין לגבי תרופות שנפסלו מאכילת כלב?",
    options: [
      { text: "כל תרופה אסורה בפסח גם לחולה", correct: false },
      { text: "תרופות שנפסלו מאכילת כלב – מותרות אפילו אם יש בהן חמץ", correct: true },
      { text: "תרופות מותרות רק בהמלצת רב", correct: false },
      { text: "תרופות אסורות לבריאים ומותרות רק לחולים מסוכנים", correct: false },
    ]
  },
  // פרק יא — 3 שאלות
  { id: 707, question: "כיצד מכשירים את הכיריים לפסח?",
    options: [
      { text: "מספיק שטיפה במים רותחים בלבד", correct: false },
      { text: "כיסוי בנייר כסף בלבד מספיק", correct: false },
      { text: "הגעלה בתוך סיר מים רותחים", correct: false },
      { text: "ניקוי יסודי, ואחר כך הדלקת האש עד שהיא לוהטת", correct: true },
    ]
  },
  { id: 708, question: "כיצד מכשירים את השיש?",
    options: [
      { text: "ניקוי יסודי וכיסוי ביריעת פלסטיק, נייר כסף או בד", correct: true },
      { text: "הגעלה בשפיכת מים רותחים בלבד", correct: false },
      { text: "ליבון בלפיד גז", correct: false },
      { text: "מספיק לנקות במים וסבון", correct: false },
    ]
  },
  { id: 709, question: "האם ניתן להכשיר כלי זכוכית לפסח?",
    options: [
      { text: "לספרדים – אינם צריכים הכשרה; לאשכנזים – נחלקו הדעות", correct: true },
      { text: "כלי זכוכית אינם ניתנים להכשרה בכלל", correct: false },
      { text: "כלי זכוכית מותרים לכולם ללא הכשרה", correct: false },
      { text: "כלי זכוכית חייבים ליבון לכולם", correct: false },
    ]
  },
  // פרק יב — 3 שאלות
  { id: 710, question: "מהי מצה שמורה?",
    options: [
      { text: "מצה שמורה במקרר כדי שלא תתחמץ", correct: false },
      { text: "מצה שמורה לשם מצווה מרגע הקצירה – מצווה לאכולה בסדר", correct: true },
      { text: `מצה אפויה ביום י"ד בניסן בלבד`, correct: false },
      { text: "מצה שנעשתה ביד ולא במכונה", correct: false },
    ]
  },
  { id: 711, question: "מה שיעור אכילת מצה בליל הסדר?",
    options: [
      { text: "רק כזית אחד לכל הסדר", correct: false },
      { text: "כביצה בלבד", correct: false },
      { text: "כמה שרוצים – אין שיעור מוגדר", correct: false },
      { text: "כזית לכל אחת מהמצוות – מוציא, כורך ואפיקומן", correct: true },
    ]
  },
  { id: 712, question: "האם מצה מכונה כשרה לליל הסדר?",
    options: [
      { text: "מצה מכונה פסולה לכולם לכתחילה", correct: false },
      { text: "לרוב הפוסקים מצה מכונה כשרה; יש הנוהגים יד בלבד", correct: true },
      { text: "מצה מכונה מותרת ועדיפה כי נעשית מהר", correct: false },
      { text: "אין הבדל – שתי המצות שוות לגמרי", correct: false },
    ]
  },
  // פרק יג — 3 שאלות
  { id: 713, question: "מה הפתרון המקובל לבכורות שלא רוצים להתענות בערב פסח?",
    options: [
      { text: "להשתתף בסיום מסכת – סיום מביא שמחה ומתיר לאכול", correct: true },
      { text: "לשלם כופר לצדקה במקום הצום", correct: false },
      { text: "לאכול פחות מכשיעור בלבד", correct: false },
      { text: "לצום עד חצות ולאחר מכן לאכול", correct: false },
    ]
  },
  { id: 714, question: "מה מנהג ביטול החמץ לאחר השריפה?",
    options: [
      { text: "מספיק השריפה ואין צורך בביטול נוסף", correct: false },
      { text: "הביטול נאמר רק בליל הבדיקה", correct: false },
      { text: "הביטול נאמר רק אם לא שרפו", correct: false },
      { text: "אומרים נוסח ביטול בכל חמירא – מבטלים כל חמץ שלא ידוע לו", correct: true },
    ]
  },
  { id: 715, question: "מתי נאכל קרבן פסח בזמן בית המקדש?",
    options: [
      { text: "ביום ערב פסח – לפני השקיעה", correct: false },
      { text: `בי"ג בניסן – יום לפני ערב פסח`, correct: false },
      { text: "בכל יום מימי פסח לפי הרצון", correct: false },
      { text: `בליל ט"ו בניסן – ליל הסדר`, correct: true },
    ]
  },
  // פרק יד — 3 שאלות
  { id: 716, question: "מה הדין כשערב פסח חל בשבת?",
    options: [
      { text: "בודקים ביום חמישי; שריפה ביום שישי", correct: true },
      { text: "בודקים ביום שישי ושורפים בשבת", correct: false },
      { text: "בודקים ושורפים ביום חמישי", correct: false },
      { text: "בודקים ושורפים ביום שישי כרגיל", correct: false },
    ]
  },
  { id: 717, question: "מה אוכלים בשבת שחל בה ערב פסח?",
    options: [
      { text: "אוכלים מצה כבר משבת זו", correct: false },
      { text: "אסור לאכול חמץ כלל", correct: false },
      { text: "אוכלים חמץ עד שקיעת החמה", correct: false },
      { text: "אוכלים חמץ עד השעה הרביעית, ומבערים עד השעה החמישית", correct: true },
    ]
  },
  { id: 718, question: "האם מותר לאכול מצה בערב פסח?",
    options: [
      { text: "אסור לאכול מצה ביום ערב פסח כדי שתהיה תאבון בסדר", correct: true },
      { text: "מותר לאכול מצה כל היום כהכנה לסדר", correct: false },
      { text: "מותר לאכול מצה עד חצות בלבד", correct: false },
      { text: "מצה מותרת בערב פסח רק לקטנים", correct: false },
    ]
  },
  // פרק טו — 3 שאלות
  { id: 719, question: "מה הסדר הנכון של קדש ורחץ?",
    options: [
      { text: "קדש – קידוש; ורחץ – נטילת ידיים לפני כרפס", correct: true },
      { text: "קדש – לקדש את השולחן; ורחץ – לרחוץ לפני הסעודה", correct: false },
      { text: "קדש – קריאת ההגדה; ורחץ – הגעלת הכלים", correct: false },
      { text: "קדש ורחץ הם שני שמות לאותה מצווה", correct: false },
    ]
  },
  { id: 720, question: "מהו יחץ?",
    options: [
      { text: "שבירת כל שלוש המצות לחצי", correct: false },
      { text: "הנחת המצה על הצלחת המיוחדת", correct: false },
      { text: "ביצוע הבדלה בין פסח לשאר השנה", correct: false },
      { text: "שבירת המצה האמצעית לשתיים – חצי לאפיקומן וחצי לשולחן", correct: true },
    ]
  },
  { id: 721, question: "מה חשיבות מגיד?",
    options: [
      { text: "עיקר מצוות הלילה – סיפור יציאת מצרים בדרך של שאלה ותשובה", correct: true },
      { text: "תפילת ערבית המיוחדת לליל הסדר", correct: false },
      { text: "קריאת שיר השירים לפני הסעודה", correct: false },
      { text: "ברכת המזון המורחבת", correct: false },
    ]
  },
  // פרק טז — 4 שאלות
  { id: 722, question: "מהו אפיקומן ומדוע צריך לאכלו?",
    options: [
      { text: "שיר שאומרים בסוף הסדר", correct: false },
      { text: "כוס חמישית שמוסיפים", correct: false },
      { text: "פרפרת שאוכלים לאחר הסעודה", correct: false },
      { text: "חצי מצה שמסיים את הסעודה – זכר לקרבן פסח שנאכל לבסוף", correct: true },
    ]
  },
  { id: 723, question: "מה מנהג גניבת האפיקומן?",
    options: [
      { text: "הילדים לוקחים את האפיקומן ומחזירים תמורת מתנה – כדי לעניינם", correct: true },
      { text: "הוצאת האפיקומן החוצה לסמל יציאת מצרים", correct: false },
      { text: "העברת האפיקומן מיד ליד לאות חירות", correct: false },
      { text: "הנחת האפיקומן מחוץ לבית כהגנה", correct: false },
    ]
  },
  { id: 724, question: "מה ההלל שאומרים בסיום הסדר?",
    options: [
      { text: "תהלים מיוחד שאומרים בתחילת הסדר", correct: false },
      { text: "חלק שני של הלל – פרקים קטו עד קיח – אחרי הסעודה", correct: true },
      { text: "שירת הים שאומרים בין הסעודה לאפיקומן", correct: false },
      { text: "ברכה מיוחדת בסוף ארבע הכוסות", correct: false },
    ]
  },
  { id: 725, question: "מה ניצח – שירי סיום הסדר?",
    options: [
      { text: "ניצחון ישראל על מצרים שחוגגים בשיר", correct: false },
      { text: "ברכת הנהנין האחרונה", correct: false },
      { text: "ספירת העומר שמתחילה מיד לאחר הסדר", correct: false },
      { text: "שירים ופיוטים שנהגו לשיר לאחר הסדר כחד גדיא ואחד מי יודע", correct: true },
    ]
  },
];
