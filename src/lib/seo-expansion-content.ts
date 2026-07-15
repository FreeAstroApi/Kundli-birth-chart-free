import type { SeoPageConfig } from "@/lib/seo-content";
import type { SeoRoute } from "@/lib/site";

const panchangAlternates = {
  "en-IN": "/panchang-today",
  "hi-IN": "/hi/aaj-ka-panchang",
  "x-default": "/panchang-today",
} as const;

const dailyMuhuratAlternates = {
  "en-IN": "/daily-muhurat-timings",
  "hi-IN": "/hi/aaj-ka-muhurat",
  "x-default": "/daily-muhurat-timings",
} as const;

export const EXPANSION_PAGE_CONTENT = {
  "/panchang-today": {
    route: "/panchang-today",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Today's Panchang by City – Tithi & Nakshatra",
    metaDescription:
      "Check today's local Panchang with Tithi, Nakshatra, Yoga, Karana, lunar month, sunrise, sunset, transition times and Rahu Kalam.",
    eyebrow: "Location-based daily almanac",
    h1: "Today's Panchang for Your City",
    intro:
      "Choose a city, date and local time to see the Panchang that applies there. The calculation follows the local sunrise day and shows both the day's transitions and the Tithi, Nakshatra, Yoga and Karana active at the selected time.",
    calculatorHeading: "Calculate the local Panchang",
    calculatorIntro:
      "Select a verified city so sunrise, sunset, transition times and Rahu Kalam use its coordinates and timezone.",
    trustItems: ["Location-aware timings", "Transition times included", "No account required"],
    methodologyHeading: "What the daily Panchang calculation shows",
    methodology: [
      "A Panchang is tied to place and the sunrise-based civil day. The same date can therefore produce different clock times in Delhi, Mumbai, London or New York even when the underlying lunar positions are the same.",
      "The result separates the day's main element and its ending time from the value active at the exact local time you selected. This matters when a Tithi, Nakshatra, Yoga or Karana changes during the day.",
      "Rahu Kalam is derived from local sunrise, sunset and weekday. It is not a fixed clock interval and should be recalculated when the date or location changes.",
    ],
    features: [
      { title: "Five Panchang elements", description: "Review Vara, Tithi, Nakshatra, Yoga and Karana without reducing the day to a single label." },
      { title: "Exact transitions", description: "See when the current Tithi, Nakshatra, Yoga and Karana end in local time." },
      { title: "Selected-time values", description: "Check which elements are active at the time you intend to use." },
      { title: "Sunrise-based cautions", description: "Compare local sunrise, sunset and Rahu Kalam for the chosen city." },
    ],
    steps: [
      { title: "Choose the location", description: "Select a city from search so the calculation uses verified coordinates and timezone." },
      { title: "Set date and time", description: "Use today's local time or inspect another date and moment." },
      { title: "Read transitions before labels", description: "Check whether an element changes before or during the activity you are planning." },
    ],
    faqs: [
      { question: "Why does today's Panchang differ by city?", answer: "Sunrise, sunset and local clock times depend on coordinates and timezone. A date label alone is not enough to reproduce a local Panchang." },
      { question: "What are the five parts of Panchang?", answer: "The traditional five limbs are Vara, Tithi, Nakshatra, Yoga and Karana. This page shows them separately and includes available transition times." },
      { question: "Is Rahu Kalam the same time every day?", answer: "No. Its weekday segment is applied to the daylight interval between local sunrise and sunset, so the clock time changes by date and location." },
      { question: "Can I check a future date?", answer: "Yes. Choose a date and city to calculate the local values and transitions for that day." },
    ],
    related: [
      { href: "/daily-muhurat-timings", label: "Daily Muhurat timings", description: "Check Hora, Chaughadia, Abhijit and caution periods." },
      { href: "/muhurat", label: "Muhurat search", description: "Search ranked public windows across a date range." },
      { href: "/nakshatra-calculator", label: "Birth Nakshatra calculator", description: "Calculate the Moon's natal Nakshatra and Pada." },
    ],
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Today's Panchang" }],
    disclaimer:
      "Panchang and Muhurat are traditional calendrical frameworks. They are not scientific forecasts and should not replace medical, legal, financial or safety advice.",
    languageAlternates: panchangAlternates,
  },

  "/hi/aaj-ka-panchang": {
    route: "/hi/aaj-ka-panchang",
    kind: "tool",
    locale: "hi-IN",
    metaTitle: "आज का पंचांग – तिथि, नक्षत्र और राहु काल",
    metaDescription:
      "अपने शहर के लिए आज की तिथि, नक्षत्र, योग, करण, सूर्योदय, सूर्यास्त, परिवर्तन समय और राहु काल देखें।",
    eyebrow: "स्थान के अनुसार दैनिक पंचांग",
    h1: "आज का पंचांग आपके शहर के लिए",
    intro:
      "शहर, तारीख और स्थानीय समय चुनकर उस स्थान का पंचांग देखें। परिणाम सूर्योदय-आधारित दिन के साथ चयनित समय पर चल रही तिथि, नक्षत्र, योग और करण भी अलग से दिखाता है।",
    calculatorHeading: "स्थानीय पंचांग की गणना करें",
    calculatorIntro:
      "सही निर्देशांक और समय क्षेत्र के लिए खोज सूची से शहर चुनें।",
    trustItems: ["स्थान के अनुसार समय", "परिवर्तन समय सहित", "खाता आवश्यक नहीं"],
    methodologyHeading: "दैनिक पंचांग में क्या दिखाया जाता है",
    methodology: [
      "पंचांग स्थान और स्थानीय सूर्योदय से जुड़ा होता है। इसलिए एक ही तारीख के समय दिल्ली, मुंबई, लंदन और न्यूयॉर्क में अलग हो सकते हैं।",
      "परिणाम पूरे दिन के मुख्य तत्व और उसके समाप्ति समय को चयनित घड़ी के समय सक्रिय तत्व से अलग रखता है। दिन के बीच तिथि या नक्षत्र बदलने पर यह अंतर आवश्यक है।",
      "राहु काल स्थानीय सूर्योदय, सूर्यास्त और वार से निकाला जाता है। यह हर दिन लागू होने वाला कोई स्थिर घड़ी समय नहीं है।",
    ],
    features: [
      { title: "पंचांग के पाँच अंग", description: "वार, तिथि, नक्षत्र, योग और करण को अलग-अलग देखें।" },
      { title: "सटीक परिवर्तन समय", description: "जानें कि वर्तमान तिथि, नक्षत्र, योग और करण कब समाप्त होंगे।" },
      { title: "चयनित समय की स्थिति", description: "आपके चुने हुए स्थानीय समय पर सक्रिय तत्व देखें।" },
      { title: "सूर्योदय-आधारित राहु काल", description: "शहर के स्थानीय सूर्योदय और सूर्यास्त के अनुसार राहु काल देखें।" },
    ],
    steps: [
      { title: "शहर चुनें", description: "खोज सूची से शहर चुनें ताकि समय क्षेत्र और निर्देशांक सही रहें।" },
      { title: "तारीख और समय भरें", description: "आज का स्थानीय समय रखें या किसी दूसरी तारीख की गणना करें।" },
      { title: "परिवर्तन समय जाँचें", description: "देखें कि नियोजित काम से पहले कोई पंचांग तत्व बदल तो नहीं रहा।" },
    ],
    faqs: [
      { question: "आज का पंचांग शहर के अनुसार क्यों बदलता है?", answer: "सूर्योदय, सूर्यास्त और स्थानीय घड़ी का समय स्थान और समय क्षेत्र पर निर्भर करता है। केवल तारीख से स्थानीय पंचांग तय नहीं होता।" },
      { question: "पंचांग के पाँच अंग कौन से हैं?", answer: "परंपरागत पाँच अंग वार, तिथि, नक्षत्र, योग और करण हैं। यह पेज उपलब्ध परिवर्तन समय के साथ इन्हें अलग-अलग दिखाता है।" },
      { question: "क्या राहु काल रोज़ एक ही समय होता है?", answer: "नहीं। यह स्थानीय सूर्योदय और सूर्यास्त के बीच दिन की अवधि पर आधारित है, इसलिए तारीख और शहर के साथ बदलता है।" },
      { question: "क्या भविष्य की तारीख देख सकते हैं?", answer: "हाँ। शहर और तारीख चुनकर उस दिन के स्थानीय पंचांग की गणना की जा सकती है।" },
    ],
    related: [
      { href: "/hi/aaj-ka-muhurat", label: "आज के मुहूर्त", description: "होरा, चौघड़िया, अभिजीत और सावधानी अवधि देखें।" },
      { href: "/muhurat", label: "मुहूर्त खोज", description: "तारीख अवधि में श्रेष्ठ सार्वजनिक मुहूर्त खोजें।" },
      { href: "/hi/janam-kundli", label: "जन्म कुंडली", description: "जन्म समय और स्थान से कुंडली बनाएं।" },
    ],
    breadcrumbs: [{ label: "मुखपृष्ठ", href: "/" }, { label: "आज का पंचांग" }],
    disclaimer:
      "पंचांग और मुहूर्त पारंपरिक काल-गणना पद्धतियाँ हैं। इन्हें वैज्ञानिक भविष्यवाणी या चिकित्सा, कानूनी, वित्तीय अथवा सुरक्षा सलाह का विकल्प न मानें।",
    languageAlternates: panchangAlternates,
  },

  "/daily-muhurat-timings": {
    route: "/daily-muhurat-timings",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Daily Muhurat Timings – Rahu Kaal, Hora & Choghadiya",
    metaDescription:
      "Calculate local Rahu Kaal, Abhijit and Brahma Muhurta, Hora, Choghadiya, Gowri Panchangam, Panchak and Bhadra timings.",
    eyebrow: "Daily timing lookup",
    h1: "Daily Muhurat Timings for Your City",
    intro:
      "Look up a supported daily timing for a selected place, date and local time. The tool returns structured periods and the current period where applicable instead of answering an open-ended astrology question.",
    calculatorHeading: "Check a daily Muhurat period",
    calculatorIntro:
      "Choose one timing system, then select the city and local date. Hora, Choghadiya and Gowri results can include complete day and night tables.",
    trustItems: ["Nine supported timing topics", "Local sunrise and sunset basis", "Structured period tables"],
    methodologyHeading: "How these daily timing periods are calculated",
    methodology: [
      "Rahu Kaal, Hora and Choghadiya are not fixed UTC schedules. Their clock times are derived from the local daylight or night interval and the weekday sequence.",
      "The lookup is intentionally constrained to supported daily Muhurat systems: Abhijit, Rahu Kaal, Brahma Muhurta, Do Ghati, Hora, Choghadiya, Gowri Panchangam, Panchak and Bhadra.",
      "Where a selected local time is relevant, the result marks the period active at that moment. Full tables remain visible so you can inspect the surrounding intervals rather than relying on one label.",
    ],
    features: [
      { title: "Single-window timings", description: "Check periods such as Rahu Kaal, Abhijit or Brahma Muhurta." },
      { title: "Day and night tables", description: "Review complete Hora, Choghadiya and related sequences." },
      { title: "Current period", description: "Identify the interval active at the selected local time when supported." },
      { title: "Calculation context", description: "Keep sunrise, sunset, weekday and Rahu Kalam beside the result." },
    ],
    steps: [
      { title: "Choose a timing topic", description: "Select the traditional timing system that matches the question." },
      { title: "Select city, date and time", description: "Use the local place and clock time rather than converting the input yourself." },
      { title: "Review the full table", description: "Check adjacent periods and cautions before using a single interval." },
    ],
    faqs: [
      { question: "Does this answer any astrology question?", answer: "No. It only calculates the nine listed daily Muhurat topics and returns an error for unsupported free-form questions." },
      { question: "Why does Choghadiya change by city?", answer: "Its day and night intervals use local sunrise and sunset, so their clock boundaries depend on the selected location and date." },
      { question: "What does current period mean?", answer: "For a supported table, it is the interval containing the local time you entered. It can be empty for a past or future date when no lookup time is applicable." },
      { question: "Is an auspicious label a guarantee?", answer: "No. Muhurat is a traditional selection framework, not a guarantee of an outcome or a substitute for practical judgment." },
    ],
    related: [
      { href: "/panchang-today", label: "Today's Panchang", description: "Review Tithi, Nakshatra, Yoga, Karana and transitions." },
      { href: "/muhurat", label: "Muhurat date search", description: "Search ranked windows across several days." },
      { href: "/vedic-transit-calculator", label: "Vedic transit calculator", description: "Inspect date-range Gochar windows against a birth chart." },
    ],
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Daily Muhurat timings" }],
    disclaimer:
      "Muhurat labels belong to a traditional system and do not guarantee results. Use them as cultural or reflective information, not as professional advice.",
    languageAlternates: dailyMuhuratAlternates,
  },

  "/hi/aaj-ka-muhurat": {
    route: "/hi/aaj-ka-muhurat",
    kind: "tool",
    locale: "hi-IN",
    metaTitle: "आज के मुहूर्त – राहु काल, होरा और चौघड़िया",
    metaDescription:
      "अपने शहर के लिए राहु काल, अभिजीत और ब्रह्म मुहूर्त, होरा, चौघड़िया, गौरी पंचांग, पंचक और भद्रा का समय देखें।",
    eyebrow: "दैनिक शुभ-अशुभ समय",
    h1: "आज के मुहूर्त आपके शहर के लिए",
    intro:
      "स्थान, तारीख और स्थानीय समय चुनकर समर्थित दैनिक मुहूर्त अवधि देखें। यह उपकरण खुला ज्योतिषीय उत्तर बनाने के बजाय गणना से मिली अवधि और तालिका दिखाता है।",
    calculatorHeading: "दैनिक मुहूर्त अवधि देखें",
    calculatorIntro:
      "एक समय पद्धति चुनें, फिर शहर और स्थानीय तारीख भरें। होरा और चौघड़िया में दिन और रात की पूरी तालिका उपलब्ध हो सकती है।",
    trustItems: ["नौ समर्थित विषय", "स्थानीय सूर्योदय आधार", "स्पष्ट अवधि तालिका"],
    methodologyHeading: "दैनिक मुहूर्त समय कैसे निकाले जाते हैं",
    methodology: [
      "राहु काल, होरा और चौघड़िया स्थिर घड़ी समय नहीं हैं। इनकी सीमाएँ स्थानीय सूर्योदय, सूर्यास्त और वार क्रम से निकलती हैं।",
      "गणना अभिजीत, राहु काल, ब्रह्म मुहूर्त, दो घटी मुहूर्त, होरा, चौघड़िया, गौरी पंचांग, पंचक और भद्रा तक सीमित है।",
      "जहाँ चयनित स्थानीय समय लागू होता है, परिणाम उस समय चल रही अवधि बताता है। आसपास की अवधि समझने के लिए पूरी तालिका भी दिखाई जाती है।",
    ],
    features: [
      { title: "एकल समय अवधि", description: "राहु काल, अभिजीत या ब्रह्म मुहूर्त जैसी अवधि देखें।" },
      { title: "दिन और रात की तालिका", description: "होरा, चौघड़िया और संबंधित क्रम पूरे दिन के लिए देखें।" },
      { title: "वर्तमान अवधि", description: "चयनित स्थानीय समय पर चल रही समर्थित अवधि पहचानें।" },
      { title: "गणना संदर्भ", description: "सूर्योदय, सूर्यास्त, वार और राहु काल को परिणाम के साथ रखें।" },
    ],
    steps: [
      { title: "समय पद्धति चुनें", description: "अपने प्रश्न से संबंधित पारंपरिक समय पद्धति चुनें।" },
      { title: "शहर, तारीख और समय भरें", description: "समय को स्वयं बदलने के बजाय स्थानीय घड़ी का समय भरें।" },
      { title: "पूरी तालिका देखें", description: "केवल एक नाम पर निर्भर न रहकर आसपास की अवधि और सावधानी समय भी देखें।" },
    ],
    faqs: [
      { question: "क्या यह किसी भी ज्योतिषीय प्रश्न का उत्तर देता है?", answer: "नहीं। यह केवल सूची में दिए गए नौ दैनिक मुहूर्त विषयों की गणना करता है।" },
      { question: "चौघड़िया शहर के अनुसार क्यों बदलता है?", answer: "दिन और रात की अवधि स्थानीय सूर्योदय और सूर्यास्त पर आधारित होती है, इसलिए घड़ी का समय स्थान और तारीख के साथ बदलता है।" },
      { question: "वर्तमान अवधि का क्या अर्थ है?", answer: "यह आपके भरे हुए स्थानीय समय को शामिल करने वाली अवधि है, जब चुनी गई पद्धति में यह लागू हो।" },
      { question: "क्या शुभ अवधि सफलता की गारंटी है?", answer: "नहीं। मुहूर्त एक पारंपरिक चयन पद्धति है, परिणाम की गारंटी या व्यावहारिक निर्णय का विकल्प नहीं।" },
    ],
    related: [
      { href: "/hi/aaj-ka-panchang", label: "आज का पंचांग", description: "तिथि, नक्षत्र, योग, करण और परिवर्तन समय देखें।" },
      { href: "/muhurat", label: "मुहूर्त खोज", description: "कई दिनों की अवधि में श्रेष्ठ मुहूर्त खोजें।" },
      { href: "/hi/janam-kundli", label: "जन्म कुंडली", description: "जन्म विवरण से ग्रह और भाव की गणना करें।" },
    ],
    breadcrumbs: [{ label: "मुखपृष्ठ", href: "/" }, { label: "आज के मुहूर्त" }],
    disclaimer:
      "मुहूर्त एक पारंपरिक समय-चयन पद्धति है और परिणाम की गारंटी नहीं देता। इसे पेशेवर सलाह के स्थान पर उपयोग न करें।",
    languageAlternates: dailyMuhuratAlternates,
  },

  "/vedic-transit-calculator": {
    route: "/vedic-transit-calculator",
    kind: "tool",
    locale: "en-US",
    metaTitle: "Vedic Transit Calculator – Personal Gochar Timeline",
    metaDescription:
      "Calculate a personal Vedic Gochar timeline for Saturn, Jupiter, Rahu, Ketu and the Moon against your birth chart over a selected date range.",
    eyebrow: "Personal sidereal transit timeline",
    h1: "Vedic Transit and Gochar Calculator",
    intro:
      "Compare current or future sidereal transits with your natal Moon and Ascendant. The timeline groups ingresses, natal triggers and longer Saturn, Jupiter and nodal conditions across the date range you choose.",
    calculatorHeading: "Build your personal Gochar timeline",
    calculatorIntro:
      "Enter the original local birth record, then choose a transit range and the planets you want to follow.",
    trustItems: ["Natal Moon and Lagna references", "Date-range timeline", "Dates and reference points shown"],
    methodologyHeading: "What this Vedic transit timeline measures",
    methodology: [
      "Gochar describes the changing sidereal positions of planets after birth. A personal timeline compares those positions with stable natal reference points rather than presenting the same forecast to every reader.",
      "Slow planets and the lunar nodes can produce long windows, while the Moon creates much shorter changes. The calculator keeps date boundaries and reference points visible so these different time scales are not mixed together.",
      "A transit is one timing layer. Traditional interpretation also considers the natal chart, active Dasha and the life area being examined; a listed window should not be treated as a guaranteed event.",
    ],
    features: [
      { title: "Planet filters", description: "Inspect Saturn, Jupiter, Rahu, Ketu and Moon windows without losing the requested range context." },
      { title: "Natal reference points", description: "See whether a condition is measured from the Moon, Lagna or another natal point." },
      { title: "Chronological windows", description: "Review start, peak and end dates instead of a single current-position snapshot." },
      { title: "Calculation details", description: "See the calculated relation, category and supporting values beside each result." },
    ],
    steps: [
      { title: "Enter the natal record", description: "Use the exact local birth date, time and place used for the underlying Kundli." },
      { title: "Choose the transit range", description: "Select up to 31 days and track the planets relevant to your question." },
      { title: "Read the reference and duration", description: "Separate short events from longer windows and note whether each is measured from Moon or Lagna." },
    ],
    faqs: [
      { question: "What is Gochar in Vedic astrology?", answer: "Gochar is the movement of planets through the sidereal zodiac after birth, commonly read in relation to the natal Moon, Ascendant and houses." },
      { question: "Is this the same as a current planet table?", answer: "No. A current table shows positions at one moment; this tool produces personal windows and transitions across a selected range." },
      { question: "Why include both Moon and Ascendant references?", answer: "They answer different parts of a traditional transit analysis. Keeping the reference visible prevents a Moon-based result from being mistaken for a Lagna-based one." },
      { question: "Does a supportive transit guarantee an event?", answer: "No. The label describes a traditional relation within the selected calculation. Natal promise, Dasha, circumstances and real decisions still matter." },
    ],
    related: [
      { href: "/vimshottari-dasha-calculator", label: "Vimshottari Dasha", description: "Compare transit windows with the active planetary-period stack." },
      { href: "/panchang-today", label: "Today's Panchang", description: "Check the local lunar day and daily timing context." },
      { href: "/vedic-birth-chart-calculator", label: "Vedic birth chart", description: "Verify the natal Moon, Lagna and calculation settings." },
    ],
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Vedic transit calculator" }],
    disclaimer:
      "Transit labels are traditional astrological interpretations, not scientific predictions. Do not use them as a substitute for professional or safety-critical advice.",
  },

  "/nakshatra-calculator": {
    route: "/nakshatra-calculator",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Nakshatra Calculator – Birth Star, Pada & Lord",
    metaDescription:
      "Calculate your Janma Nakshatra, Pada, Nakshatra lord, Moon sign and Vimshottari birth balance from exact birth details.",
    eyebrow: "Moon-based birth star calculation",
    h1: "Nakshatra and Birth Star Calculator",
    intro:
      "Calculate the Moon's sidereal Nakshatra and Pada from your exact local birth time and place. The result keeps the Moon's sign, longitude and Vimshottari birth balance beside the birth-star label so it can be checked rather than guessed from a date alone.",
    calculatorHeading: "Find your Janma Nakshatra",
    calculatorIntro:
      "Select the verified birthplace and review the timezone and ayanamsha before comparing results from another calculator.",
    trustItems: ["Exact Moon longitude", "Nakshatra and Pada", "Vimshottari birth balance"],
    methodologyHeading: "How the birth Nakshatra is determined",
    methodology: [
      "The sidereal zodiac is divided into 27 Nakshatras, each with four Padas. The Moon's calculated longitude at birth determines both the Nakshatra and its quarter.",
      "Birth time and historical timezone matter near a boundary because the Moon continues moving through the zodiac. An ayanamsha difference can also move a borderline longitude into the adjacent segment.",
      "The Nakshatra lord begins the Vimshottari sequence, while the Moon's progress through that Nakshatra determines the remaining balance at birth. The result therefore shows the label and timing basis together.",
    ],
    features: [
      { title: "Janma Nakshatra", description: "See the Moon's birth star from its calculated sidereal longitude." },
      { title: "Pada and lord", description: "Keep the four-part Pada and ruling planet beside the Nakshatra name." },
      { title: "Moon position", description: "Review the Moon sign, degree and natal house used by the result." },
      { title: "Dasha balance", description: "Connect the birth star with the starting Vimshottari lord and remaining balance." },
    ],
    steps: [
      { title: "Enter exact birth details", description: "Use the local date and time recorded at the birthplace." },
      { title: "Select the city", description: "Choose a verified place so the historical timezone and coordinates are available." },
      { title: "Check boundary sensitivity", description: "If the Moon lies near a Nakshatra or Pada boundary, compare the plausible birth-time range." },
    ],
    faqs: [
      { question: "Is Nakshatra the same as Moon sign?", answer: "No. A Moon sign covers 30 degrees, while each Nakshatra covers 13 degrees 20 minutes and is divided into four Padas." },
      { question: "Can I find Nakshatra from date alone?", answer: "A rough daily listing may be possible, but an exact natal result needs the birth time, location, timezone and selected ayanamsha, especially near a boundary." },
      { question: "Why do two Nakshatra calculators disagree?", answer: "Check the local birth time, historical timezone, coordinates and ayanamsha. A small difference matters when the Moon is close to a segment boundary." },
      { question: "How is Nakshatra connected to Vimshottari Dasha?", answer: "The birth Nakshatra identifies the starting planetary lord, and the Moon's progress through it determines the period balance remaining at birth." },
    ],
    related: [
      { href: "/vimshottari-dasha-calculator", label: "Vimshottari Dasha calculator", description: "Inspect the full period timeline that follows the birth-star balance." },
      { href: "/panchang-today", label: "Today's Nakshatra", description: "Check the Nakshatra active for a selected city and time today." },
      { href: "/navamsa-d9-calculator", label: "Navamsa D9", description: "Inspect another birth-time-sensitive divisional layer." },
    ],
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Nakshatra calculator" }],
    disclaimer:
      "Nakshatra meanings belong to a traditional interpretive system and are not scientific personality or outcome measures.",
  },

  "/dashamsa-d10-calculator": {
    route: "/dashamsa-d10-calculator",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Dashamsa D10 Chart Calculator – Career Varga",
    metaDescription:
      "Calculate the Dashamsa D10 chart with D10 Lagna, planetary placements and houses, shown beside transparent birth and ayanamsha settings.",
    eyebrow: "Career-related divisional chart",
    h1: "Dashamsa D10 Chart Calculator",
    intro:
      "Generate the D10 Dashamsa chart from the same exact birth record used for the D1 Rashi chart. The page shows the D10 Lagna, planets and houses without turning a single placement into a fixed career prediction.",
    calculatorHeading: "Calculate your D10 Dashamsa",
    calculatorIntro:
      "Enter the local birth time precisely. Divisional placements can change near a boundary even when the D1 planet remains in the same sign.",
    trustItems: ["D10 Lagna and houses", "Planetary placement table", "Visible calculation settings"],
    methodologyHeading: "How to use a Dashamsa chart carefully",
    methodology: [
      "Dashamsa divides each zodiac sign into ten parts and maps the resulting positions into a separate D10 chart. It is traditionally consulted for work, responsibility, status and professional expression.",
      "The D10 does not replace the D1 chart. Readers usually compare the D10 Lagna, its lord and relevant planets with the natal chart and active Dasha rather than treating one divisional placement as a complete career verdict.",
      "Because the divisions are narrow, an uncertain birth time can change the D10 Ascendant or other fast-moving factors. Test the documented time range when the record is approximate.",
    ],
    features: [
      { title: "D10 chart", description: "View the whole-sign Dashamsa layout in the selected Indian chart style." },
      { title: "D10 Lagna", description: "Keep the divisional Ascendant visible instead of inferring it from the D1 chart." },
      { title: "Planet table", description: "Review each planet's D10 sign, whole-sign house, sign lord and house lord." },
      { title: "D1 context", description: "Return to the natal chart and Dasha before drawing a broader conclusion." },
    ],
    steps: [
      { title: "Use the recorded birth time", description: "Enter the local civil time and select the verified birthplace." },
      { title: "Check D10 Lagna and planets", description: "Read the divisional chart and table before interpreting a single factor." },
      { title: "Compare with D1 and Dasha", description: "Use the natal chart and current period as context for career-related questions." },
    ],
    faqs: [
      { question: "What is the D10 chart used for?", answer: "In Jyotish it is traditionally used as a supporting chart for work, responsibility, reputation and professional activity." },
      { question: "Can D10 predict an exact profession?", answer: "No single D10 placement reliably fixes a profession. A traditional reading compares several chart factors, timing periods, skills and actual circumstances." },
      { question: "Why is birth time important for Dashamsa?", answer: "The divisions are narrow and the divisional Ascendant can move quickly. An approximate time should be tested across its plausible range." },
      { question: "Should I read D10 without the D1 chart?", answer: "It is better treated as a supporting layer. Begin with the natal chart, then compare D10 placements and the active Dasha." },
    ],
    related: [
      { href: "/vedic-birth-chart-calculator", label: "D1 Vedic birth chart", description: "Verify the natal chart used to derive the division." },
      { href: "/vimshottari-dasha-calculator", label: "Vimshottari Dasha", description: "Add the active timing-period context." },
      { href: "/navamsa-d9-calculator", label: "Navamsa D9", description: "Compare another major divisional chart without conflating its purpose with D10." },
    ],
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Dashamsa D10 calculator" }],
    disclaimer:
      "D10 is a traditional astrological framework, not a scientific career assessment. Do not use it as the sole basis for employment, education or financial decisions.",
  },
} satisfies Partial<Record<SeoRoute, SeoPageConfig>>;
