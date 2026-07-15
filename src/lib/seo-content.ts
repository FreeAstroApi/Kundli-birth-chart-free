import type { SeoRoute, SiteLocale } from "@/lib/site";
import { EXPANSION_PAGE_CONTENT } from "@/lib/seo-expansion-content";

export type SeoPageKind = "tool" | "guide";

export type SeoBreadcrumb = {
  label: string;
  href?: "/" | SeoRoute;
};

export type SeoFeature = {
  title: string;
  description: string;
};

export type SeoStep = {
  title: string;
  description: string;
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoRelatedLink = {
  href: SeoRoute;
  label: string;
  description: string;
};

export type SeoPageConfig = {
  route: SeoRoute;
  kind: SeoPageKind;
  locale: SiteLocale;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  calculatorHeading?: string;
  calculatorIntro?: string;
  trustItems: readonly string[];
  methodologyHeading: string;
  methodology: readonly string[];
  features: readonly SeoFeature[];
  steps: readonly SeoStep[];
  faqs: readonly SeoFaq[];
  related: readonly SeoRelatedLink[];
  breadcrumbs: readonly SeoBreadcrumb[];
  disclaimer: string;
  languageAlternates?: Partial<Record<SiteLocale | "x-default", SeoRoute>>;
};

export const SEO_PAGE_CONTENT = {
  ...EXPANSION_PAGE_CONTENT,
  "/vedic-birth-chart-calculator": {
    route: "/vedic-birth-chart-calculator",
    kind: "tool",
    locale: "en-US",
    metaTitle: "Free Vedic Birth Chart Calculator",
    metaDescription:
      "Calculate a free sidereal Vedic birth chart with D1 and D9 charts, planetary positions, dashas, and selectable ayanamsha settings.",
    eyebrow: "Free sidereal chart tool",
    h1: "Vedic Birth Chart Calculator",
    intro:
      "Create a sidereal birth chart from your date, exact local time, and birthplace. For births in the United States, selecting the actual city and its named timezone is especially important because historical daylight-saving rules are date-specific. The calculator keeps the astronomical settings visible, so you can compare a Vedic sidereal result with another chart without confusing it with the tropical zodiac used by most Western astrology sites.",
    calculatorHeading: "Calculate your Vedic birth chart",
    calculatorIntro:
      "Enter the birth record as written locally, select the birthplace from search, then review the calculation settings before generating the chart.",
    trustItems: [
      "No account required",
      "Lahiri, Raman, and KP options",
      "North, South, and East Indian layouts",
    ],
    methodologyHeading: "What this Vedic chart calculation includes",
    methodology: [
      "A Vedic chart begins with an astronomical snapshot for the birth moment and coordinates. The calculator converts the local civil time using the selected place, applies the chosen sidereal ayanamsha, and organizes the resulting longitudes into the selected house system.",
      "Your D1 Rashi chart is the main natal view. Supporting outputs such as D9 Navamsa, planetary tables, Vimshottari dasha, yogas, strength measures, and Panchang details should be read as connected layers rather than isolated verdicts.",
      "For a US record, enter the clock time exactly as recorded and select the city rather than manually converting it to UTC. A named zone such as America/New_York carries date-dependent offset information that a fixed label such as EST does not fully express. If the birth occurred near a daylight-saving transition, verify the recorded time and the returned timezone metadata before interpreting a fast-moving ascendant or house cusp.",
    ],
    features: [
      {
        title: "D1 and divisional context",
        description:
          "Start with the Rashi chart and compare supporting varga views instead of treating one placement as the whole reading.",
      },
      {
        title: "Transparent chart settings",
        description:
          "Choose the ayanamsha, house system, node type, and regional chart style used to produce the result.",
      },
      {
        title: "Consultation-ready tables",
        description:
          "Review signs, houses, degrees, nakshatras, dashas, yogas, Shadbala, and Ashtakavarga in one workspace.",
      },
      {
        title: "US timezone context",
        description:
          "Search the birthplace with coordinates and a named timezone, then review the timezone used instead of assuming a modern UTC offset applies to every historical date.",
      },
    ],
    steps: [
      {
        title: "Enter the birth record",
        description:
          "Use the local date and time of birth. Even a small time difference can change the ascendant or house positions.",
      },
      {
        title: "Confirm place and settings",
        description:
          "Select the correct birthplace and keep a note of the ayanamsha and house system if you plan to compare calculators.",
      },
      {
        title: "Read from the whole chart",
        description:
          "Begin with the D1 chart, then use D9, dasha, strengths, and yogas as supporting evidence rather than stand-alone labels.",
      },
      {
        title: "Save the comparison settings",
        description:
          "When checking another calculator, record the city, timezone, ayanamsha, house system, and mean or true node choice along with the planetary degrees.",
      },
    ],
    faqs: [
      {
        question: "Is this a sidereal birth chart calculator?",
        answer:
          "Yes. It calculates a Vedic sidereal chart and lets you choose among supported ayanamsha settings. A tropical Western chart can therefore show different zodiac signs for the same birth data.",
      },
      {
        question: "How exact does the birth time need to be?",
        answer:
          "Use the most reliable recorded time available. The ascendant moves quickly, and uncertain times can affect houses, divisional charts, and timing analysis. Do not invent a precise time when it is unknown.",
      },
      {
        question: "Why does my chart differ from another website?",
        answer:
          "Check the timezone, coordinates, daylight-saving treatment, ayanamsha, house system, and mean-versus-true node setting. A difference in any one of these can change the displayed result.",
      },
      {
        question: "How does daylight saving time affect a US Vedic birth chart?",
        answer:
          "The birth time must be converted with the offset that applied in that city on that historical date. US daylight-saving rules have changed and local exceptions exist, so use the named birthplace timezone and verify ambiguous records near a clock change rather than subtracting a present-day offset by hand.",
      },
      {
        question: "Why are my Vedic and Western zodiac signs different?",
        answer:
          "This calculator uses a sidereal zodiac after applying the selected ayanamsha. Most Western astrology charts use the tropical zodiac, whose zero point is defined differently. The same birth moment can therefore produce different sign labels without either chart using a different birth record.",
      },
    ],
    related: [
      {
        href: "/navamsa-d9-calculator",
        label: "Navamsa D9 calculator",
        description: "Study the ninth divisional chart alongside the D1 chart.",
      },
      {
        href: "/vimshottari-dasha-calculator",
        label: "Vimshottari dasha calculator",
        description: "View the planetary period sequence calculated from birth data.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Why Kundli calculators differ",
        description: "Compare the settings that commonly cause conflicting charts.",
      },
      {
        href: "/north-indian-birth-chart-calculator",
        label: "North Indian chart layout",
        description: "Learn how fixed houses and moving sign numbers represent the same planetary data.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Vedic birth chart calculator" },
    ],
    disclaimer:
      "Vedic astrology is a cultural and interpretive tradition. This chart is for personal reflection and entertainment, not medical, legal, financial, or other professional advice.",
    languageAlternates: {
      "en-US": "/vedic-birth-chart-calculator",
      "en-IN": "/kundli",
      "hi-IN": "/hi/janam-kundli",
      "x-default": "/vedic-birth-chart-calculator",
    },
  },

  "/kundli": {
    route: "/kundli",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Free Kundli Online – Janam Kundali & Dasha",
    metaDescription:
      "Make a free Janam Kundli online with birth chart, Navamsa, Vimshottari dasha, yogas, strengths, and regional chart styles.",
    eyebrow: "Janam Kundli online",
    h1: "Free Kundli Online",
    intro:
      "Generate a Janam Kundli from your birth date, local time, and place. The result brings the Rashi chart, Navamsa, planetary positions, dasha sequence, yogas, and strength tables into one readable workspace without requiring registration.",
    calculatorHeading: "Create your Janam Kundli",
    calculatorIntro:
      "Choose your birthplace carefully and use the time printed on the birth record when available. You can change the chart layout without changing the underlying placements.",
    trustItems: [
      "Free without registration",
      "Indian chart layouts",
      "Calculation settings shown",
    ],
    methodologyHeading: "How the online Kundli is prepared",
    methodology: [
      "The Kundli calculation uses the birth moment and geographic coordinates to determine the sidereal positions of the ascendant, planets, and lunar nodes. The selected ayanamsha defines the offset from the tropical zodiac, while the house setting controls how placements are grouped for interpretation.",
      "A complete Janam Kundli is more than a chart drawing. This page keeps the chart beside the underlying degree table and supporting layers, making it easier to verify a placement before reading dasha, yoga, strength, or compatibility implications.",
      "For an Indian birth record, use the time written at the place of birth and choose the actual town, district, or nearest verified city rather than the current residence. Two places that both use Asia/Kolkata can still have different coordinates, which changes local horizon calculations and can matter for the ascendant near a sign boundary.",
    ],
    features: [
      {
        title: "Rashi and Navamsa charts",
        description:
          "Compare the natal D1 chart with D9 without re-entering the birth details.",
      },
      {
        title: "Dasha and yoga review",
        description:
          "See the returned Vimshottari periods and named combinations in the same report.",
      },
      {
        title: "Printable working report",
        description:
          "Use the organized chart, tables, and notes as a practical reference for a consultation or personal study.",
      },
      {
        title: "Full supporting modules",
        description:
          "Open the returned Vimshottari, yoga and dosha, varga, Panchang, Shadbala, and Ashtakavarga sections without re-entering the Janam details.",
      },
    ],
    steps: [
      {
        title: "Add birth details",
        description:
          "Enter the date, local clock time, and the correct city of birth rather than the current residence.",
      },
      {
        title: "Select your convention",
        description:
          "Keep Lahiri and the default house options unless you deliberately work with another Jyotish convention.",
      },
      {
        title: "Verify before interpreting",
        description:
          "Check the ascendant, Moon sign, degrees, and calculation metadata before drawing conclusions from yogas or dashas.",
      },
      {
        title: "Keep the birth source",
        description:
          "Note whether the time came from a hospital record, certificate, family memory, or rectification so later readers understand its accuracy limit.",
      },
    ],
    faqs: [
      {
        question: "Can I make a Kundli online without registration?",
        answer:
          "Yes. You can calculate and review a Kundli without creating an account. Avoid entering invented data simply to obtain a result; birth time and place materially affect the chart.",
      },
      {
        question: "Are Kundli and Kundali the same thing?",
        answer:
          "Yes. Kundli, Kundali, and Janam Kundli are common spellings for a Vedic natal horoscope prepared from birth details.",
      },
      {
        question: "Can a Kundli be made with only a name?",
        answer:
          "A name alone cannot reproduce an astronomical birth chart. A calculated Janam Kundli needs a birth date, time, and place. Name-based readings are a different practice and should not be presented as the same calculation.",
      },
      {
        question: "Does using another Indian city change the Kundli if the timezone is still IST?",
        answer:
          "It can. The timezone may remain Asia/Kolkata, but latitude and longitude affect the local horizon and ascendant. Choose the birth location, not a convenient metro, especially when the recorded time places the ascendant close to a sign change.",
      },
      {
        question: "Which results are included in this free Janam Kundli?",
        answer:
          "The workspace can return the D1 chart and planet table, D9 and other requested vargas, active Vimshottari information, yoga and dosha data, Panchang, Shadbala, and Ashtakavarga. A module that the upstream calculation does not return is shown as unavailable rather than filled with a guessed value.",
      },
    ],
    related: [
      {
        href: "/hi/janam-kundli",
        label: "हिंदी जन्म कुंडली",
        description: "यही जन्म कुंडली अनुभव हिंदी में खोलें।",
      },
      {
        href: "/kundli-matching",
        label: "Kundli matching",
        description: "Compare two complete birth profiles with Ashtakoota details.",
      },
      {
        href: "/manglik-dosha-calculator",
        label: "Manglik Dosha calculator",
        description: "Review how Mars is evaluated instead of relying on a label alone.",
      },
      {
        href: "/ashtakavarga-calculator",
        label: "Ashtakavarga tables",
        description: "Examine the returned BAV rows and twelve-sign SAV distribution from the same natal chart.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Free Kundli" },
    ],
    disclaimer:
      "A Kundli belongs to a living interpretive tradition. Use the result for cultural study and reflection, not as a substitute for qualified medical, legal, financial, or relationship advice.",
    languageAlternates: {
      "en-US": "/vedic-birth-chart-calculator",
      "en-IN": "/kundli",
      "hi-IN": "/hi/janam-kundli",
      "x-default": "/vedic-birth-chart-calculator",
    },
  },

  "/hi/janam-kundli": {
    route: "/hi/janam-kundli",
    kind: "tool",
    locale: "hi-IN",
    metaTitle: "जन्म कुंडली ऑनलाइन फ्री – दशा और नवांश",
    metaDescription:
      "जन्म तिथि, सही समय और स्थान से मुफ्त जन्म कुंडली बनाएं। राशि चार्ट, नवांश, विंशोत्तरी दशा, योग और ग्रह बल एक साथ देखें।",
    eyebrow: "मुफ़्त वैदिक ज्योतिष उपकरण",
    h1: "जन्म कुंडली ऑनलाइन फ्री",
    intro:
      "अपनी जन्म तिथि, स्थानीय जन्म समय और जन्म स्थान से वैदिक जन्म कुंडली तैयार करें। परिणाम में राशि कुंडली, नवांश, ग्रहों की डिग्री, विंशोत्तरी दशा, योग और बल संबंधी तालिकाएँ एक ही जगह मिलती हैं। खाता बनाना आवश्यक नहीं है।",
    calculatorHeading: "अपनी जन्म कुंडली बनाएं",
    calculatorIntro:
      "जन्म प्रमाणपत्र या परिवार के विश्वसनीय रिकॉर्ड में दिया गया समय भरें। शहर खोज से सही जन्म स्थान चुनें और गणना से पहले अयनांश की सेटिंग देख लें।",
    trustItems: [
      "बिना रजिस्ट्रेशन",
      "लाहिड़ी, रमन और KP विकल्प",
      "उत्तर, दक्षिण और पूर्व भारतीय शैली",
    ],
    methodologyHeading: "जन्म कुंडली की गणना कैसे होती है",
    methodology: [
      "गणना स्थानीय जन्म समय को चुने हुए स्थान के समय क्षेत्र और निर्देशांकों के साथ जोड़ती है। इसके बाद अयनांश लागू करके लग्न, ग्रहों और चंद्र नोड्स की निरयण स्थिति निकाली जाती है। इसलिए सही शहर और समय केवल औपचारिक जानकारी नहीं, बल्कि गणना का आधार हैं।",
      "राशि कुंडली मुख्य जन्म मानचित्र है। नवांश, दशा, योग, षड्बल और अष्टकवर्ग उसके सहायक स्तर हैं। किसी एक योग या दोष को अंतिम निर्णय मानने के बजाय पूरे चार्ट और चल रही दशा के संदर्भ में पढ़ना अधिक उचित है।",
      "भारत में अधिकांश आधुनिक जन्म रिकॉर्ड Asia/Kolkata समय क्षेत्र में होते हैं, फिर भी जन्म शहर के अक्षांश और देशांतर से लग्न की गणना बदल सकती है। गाँव या छोटे शहर का नाम न मिले तो निकटतम विकल्प चुनने से पहले उसकी दूरी और निर्देशांक जाँचें। सीमा के पास बैठा लग्न कुछ मिनट या स्थान की बड़ी दूरी से दूसरी राशि में जा सकता है।",
    ],
    features: [
      {
        title: "राशि और नवांश साथ-साथ",
        description:
          "D1 जन्म कुंडली के साथ D9 नवांश देखें और एक ही ग्रह की दोनों वर्गों में स्थिति की तुलना करें।",
      },
      {
        title: "दशा, योग और ग्रह बल",
        description:
          "विंशोत्तरी अवधि, लौटाए गए योग, षड्बल और अष्टकवर्ग को अलग-अलग टैब में समझें।",
      },
      {
        title: "स्पष्ट गणना सेटिंग",
        description:
          "अयनांश, भाव पद्धति, राहु-केतु की गणना और कुंडली की दृश्य शैली स्वयं चुनें।",
      },
      {
        title: "पूरा सहायक परिणाम",
        description:
          "उपलब्ध होने पर D1 और D9 के साथ सक्रिय दशा, योग-दोष, पंचांग, षड्बल के छह घटक और अष्टकवर्ग की BAV/SAV तालिकाएँ देखें।",
      },
    ],
    steps: [
      {
        title: "जन्म विवरण भरें",
        description:
          "तिथि और उस स्थान का स्थानीय समय भरें जहाँ जन्म हुआ था। अनुमानित समय को सटीक समय की तरह न लिखें।",
      },
      {
        title: "शहर और पद्धति जाँचें",
        description:
          "सही शहर चुनें। दूसरे ऐप से तुलना करनी हो तो दोनों में अयनांश और भाव पद्धति समान रखें।",
      },
      {
        title: "पहले मूल चार्ट पढ़ें",
        description:
          "लग्न, चंद्र राशि और ग्रहों की डिग्री जाँचने के बाद नवांश, दशा, योग और बल की ओर बढ़ें।",
      },
      {
        title: "समय के स्रोत को लिखें",
        description:
          "अस्पताल रिकॉर्ड, जन्म प्रमाणपत्र या परिवार की स्मृति—समय जहाँ से मिला है उसे नोट करें, ताकि उसकी सीमा स्पष्ट रहे।",
      },
    ],
    faqs: [
      {
        question: "क्या यह जन्म कुंडली सच में मुफ्त है?",
        answer:
          "हाँ। कुंडली की गणना और परिणाम देखने के लिए खाता या भुगतान आवश्यक नहीं है। जन्म विवरण सही भरना आपकी जिम्मेदारी है।",
      },
      {
        question: "जन्म समय पता न हो तो क्या करें?",
        answer:
          "बिना विश्वसनीय समय के लग्न, भाव और कई वर्ग कुंडलियाँ बदल सकती हैं। उपलब्ध रिकॉर्ड देखें या किसी अनुभवी विशेषज्ञ से समय-संशोधन पर चर्चा करें; मनमाना समय भरकर परिणाम को निश्चित न मानें।",
      },
      {
        question: "दो वेबसाइटों की कुंडली अलग क्यों आती है?",
        answer:
          "समय क्षेत्र, स्थान के निर्देशांक, डेलाइट सेविंग, अयनांश, भाव पद्धति और राहु-केतु के mean या true विकल्प अलग होने पर परिणाम बदल सकते हैं। पहले इन सेटिंगों की तुलना करें।",
      },
      {
        question: "क्या भारत में एक ही समय क्षेत्र होने पर जन्म शहर से फर्क पड़ता है?",
        answer:
          "हाँ। समय क्षेत्र समान हो सकता है, लेकिन अक्षांश और देशांतर से स्थानीय क्षितिज और लग्न तय होते हैं। खासकर लग्न राशि की सीमा के पास सही जन्म स्थान चुनना जरूरी है।",
      },
      {
        question: "निरयण कुंडली और वेस्टर्न जन्म चार्ट अलग क्यों दिखते हैं?",
        answer:
          "यह उपकरण चुने हुए अयनांश के साथ निरयण राशि चक्र उपयोग करता है, जबकि अधिकांश वेस्टर्न चार्ट सायन राशि चक्र पर बनते हैं। दोनों की शून्य-बिंदु पद्धति अलग होने से एक ही जन्म विवरण में ग्रह राशि के नाम अलग हो सकते हैं।",
      },
    ],
    related: [
      {
        href: "/hi/kundli-milan",
        label: "कुंडली मिलान",
        description: "दो जन्म विवरणों से अष्टकूट और दोष संबंधी परिणाम देखें।",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "नवांश D9 कैलकुलेटर",
        description: "D9 वर्ग कुंडली की गणना और सही उपयोग समझें।",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "कुंडली कैलकुलेटर अलग क्यों होते हैं",
        description: "अयनांश, समय क्षेत्र और भाव पद्धति के प्रभाव की तुलना करें।",
      },
      {
        href: "/shadbala-calculator",
        label: "षड्बल कैलकुलेटर",
        description: "ग्रह का कुल रूप बल और लौटाए गए छह बल घटक अलग-अलग देखें।",
      },
    ],
    breadcrumbs: [
      { label: "मुखपृष्ठ", href: "/" },
      { label: "जन्म कुंडली" },
    ],
    disclaimer:
      "वैदिक ज्योतिष एक सांस्कृतिक और व्याख्यात्मक परंपरा है। परिणाम आत्मचिंतन और मनोरंजन के लिए हैं; इन्हें चिकित्सा, कानूनी, वित्तीय या अन्य पेशेवर सलाह न मानें।",
    languageAlternates: {
      "en-US": "/vedic-birth-chart-calculator",
      "en-IN": "/kundli",
      "hi-IN": "/hi/janam-kundli",
      "x-default": "/vedic-birth-chart-calculator",
    },
  },

  "/navamsa-d9-calculator": {
    route: "/navamsa-d9-calculator",
    kind: "tool",
    locale: "en-US",
    metaTitle: "Navamsa D9 Chart Calculator – Free Online",
    metaDescription:
      "Calculate a Navamsa D9 chart from exact birth details and compare it with the D1 Rashi chart using clear sidereal settings.",
    eyebrow: "Ninth divisional chart",
    h1: "Navamsa D9 Chart Calculator",
    intro:
      "Calculate the ninth divisional chart from the same birth data and sidereal settings as your D1 chart. The side-by-side result helps you inspect dignity and repeated patterns without treating the Navamsa as a replacement natal chart.",
    calculatorHeading: "Calculate your D1 and D9 charts",
    calculatorIntro:
      "A divisional chart is sensitive to the recorded birth time. Use the most reliable time available and keep the ayanamsha unchanged when comparing D1 and D9.",
    trustItems: [
      "D1 and D9 together",
      "Exact planetary degrees",
      "Selectable sidereal settings",
    ],
    methodologyHeading: "How Navamsa positions are derived",
    methodology: [
      "Navamsa divides each 30-degree zodiac sign into nine parts of 3°20′. A planet's exact sidereal longitude determines which Navamsa sign it occupies, so the calculation depends on the underlying degree rather than simply copying the sign shown in D1.",
      "In Jyotish practice, D9 is commonly used to refine planetary strength, dharma, and relationship themes. Sound analysis returns to D1 for the natal promise, then checks reinforcement or tension in D9 and the relevant dasha period.",
      "Vargottama describes a planet or point occupying the same zodiac sign in D1 and D9. The workspace derives its Vargottama summary by directly matching the returned D1 and D9 sign data; it is not a separate API verdict. A repeated sign is not automatically a promise of benefic results: house rulership, dignity, aspects, and the rest of both charts still matter.",
    ],
    features: [
      {
        title: "Linked D1 reference",
        description:
          "Keep the Rashi chart visible so the D9 is interpreted as a divisional layer, not an independent horoscope.",
      },
      {
        title: "Degree-based division",
        description:
          "Use calculated sidereal longitudes to place each planet into one of the nine subdivisions of its sign.",
      },
      {
        title: "Consistent visual style",
        description:
          "Display D1 and D9 in the same North, South, or East Indian layout for easier comparison.",
      },
      {
        title: "D1–D9 sign comparison",
        description:
          "Use the rendered D1 and D9 placements to check whether a planet changes sign or repeats the same sign, the basic observation behind a Vargottama comparison.",
      },
    ],
    steps: [
      {
        title: "Use an accurate birth time",
        description:
          "D9 boundaries are much narrower than sign boundaries, so a time error can move the ascendant or fast-changing points.",
      },
      {
        title: "Confirm the D1 first",
        description:
          "Check that the birthplace, timezone, ayanamsha, and planetary degrees are correct in the natal chart.",
      },
      {
        title: "Compare repeated themes",
        description:
          "Look for dignity, rulership, and patterns that repeat across D1 and D9 before making an interpretive claim.",
      },
      {
        title: "Mark uncertain boundaries",
        description:
          "If the recorded time is approximate, note which D9 ascendant or fast-moving placement could change before treating a house-based reading as settled.",
      },
    ],
    faqs: [
      {
        question: "What is a Navamsa or D9 chart?",
        answer:
          "Navamsa is the ninth divisional chart in Jyotish. Each zodiac sign is divided into nine equal parts, and exact planetary longitudes are mapped into a new chart for supporting analysis.",
      },
      {
        question: "Is D9 only a marriage chart?",
        answer:
          "No. Marriage is a prominent use, but many traditions also use D9 to examine dharma, maturity, and how natal planetary strength unfolds. Interpretation should remain anchored to D1.",
      },
      {
        question: "Can Navamsa be accurate without a birth time?",
        answer:
          "Planetary D9 signs may sometimes remain stable for a time window, but the D9 ascendant and house framework require a reliable time. Do not present a timed D9 reading as certain when the time is unknown.",
      },
      {
        question: "What does Vargottama mean in a D9 chart?",
        answer:
          "Vargottama means that a planet or point occupies the same zodiac sign in the D1 Rashi chart and the D9 Navamsa. It is a repeated sign placement, not an automatic guarantee that the planet will give only favourable results.",
      },
      {
        question: "Why can the D9 ascendant change after a small birth-time correction?",
        answer:
          "Each Navamsa segment spans only 3°20′, and the ascendant advances continuously. Near a division boundary, a correction of minutes can move the D9 ascendant while slower planets remain in the same D9 signs. Test the plausible time range when the record is approximate.",
      },
    ],
    related: [
      {
        href: "/vedic-birth-chart-calculator",
        label: "Vedic birth chart calculator",
        description: "Generate the full D1 chart and supporting natal tables.",
      },
      {
        href: "/kundli-matching",
        label: "Kundli matching",
        description: "Compare two birth profiles with classical matching factors.",
      },
      {
        href: "/vimshottari-dasha-calculator",
        label: "Vimshottari dasha",
        description: "Place divisional themes in the context of planetary periods.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Why D9 results differ",
        description: "Check birth time, timezone, ayanamsha, and exact degrees before comparing two Navamsa charts.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Navamsa D9" },
    ],
    disclaimer:
      "Navamsa interpretation is part of a cultural and interpretive tradition. Use it for study and reflection, not as professional or deterministic relationship advice.",
  },

  "/vimshottari-dasha-calculator": {
    route: "/vimshottari-dasha-calculator",
    kind: "tool",
    locale: "en-US",
    metaTitle: "Vimshottari Dasha Calculator – Mahadasha Timeline",
    metaDescription:
      "Calculate a Vimshottari Mahadasha timeline from your Moon's birth nakshatra and review planetary periods with natal chart context.",
    eyebrow: "Planetary period timeline",
    h1: "Vimshottari Dasha Calculator",
    intro:
      "Calculate Vimshottari periods from the Moon's sidereal position at birth. The result highlights the active Mahadasha and Antardasha when those levels are returned, including their date ranges and progress, and places the returned Mahadasha chronology beside the natal chart instead of presenting a generic calendar.",
    calculatorHeading: "Calculate your dasha sequence",
    calculatorIntro:
      "Enter exact birth data and verify the Moon's nakshatra. The balance of the first Mahadasha depends on how far the Moon had progressed through that nakshatra.",
    trustItems: [
      "Birth-specific timeline",
      "Active period date ranges",
      "Moon nakshatra basis",
    ],
    methodologyHeading: "How the starting dasha is calculated",
    methodology: [
      "Vimshottari uses a fixed 120-year sequence governed by nine grahas. The Moon's birth nakshatra identifies the first ruler, while its fractional progress through that nakshatra determines how much of the opening Mahadasha remains after birth.",
      "Dates describe a timing framework, not guaranteed events. Interpretation still depends on the dasha lord's natal sign, house, dignity, aspects, yogas, divisional support, and the shorter subperiod operating within the larger period.",
      "The active-period cards report only the levels present in the returned calculation. When Mahadasha and Antardasha are supplied, each is shown with its ruler, start, end, and progress; the page does not invent a missing subperiod. Boundary dates should be read with the timezone and date convention used by the calculation, especially when checking a changeover day.",
    ],
    features: [
      {
        title: "Calculated opening balance",
        description:
          "Start from the Moon's exact nakshatra position rather than assuming a full first period begins on the birth date.",
      },
      {
        title: "Readable period sequence",
        description:
          "Review the returned Mahadasha rulers and boundaries in chronological order for practical timeline work.",
      },
      {
        title: "Natal chart context",
        description:
          "Keep the dasha timeline beside planetary placements, yogas, strengths, and divisional charts.",
      },
      {
        title: "Active Mahadasha and Antardasha",
        description:
          "See the currently active returned levels with their rulers, start and end dates, and elapsed progress rather than inferring them from a generic sequence.",
      },
    ],
    steps: [
      {
        title: "Calculate the Moon position",
        description:
          "Use the correct birthplace, local time, and ayanamsha to determine the Moon's birth nakshatra and degree.",
      },
      {
        title: "Find the active period",
        description:
          "Locate the date inside the returned Mahadasha range and note the ruling planet.",
      },
      {
        title: "Return to the natal chart",
        description:
          "Assess the period ruler in D1 and relevant divisional charts before interpreting the timing theme.",
      },
      {
        title: "Check changeover dates",
        description:
          "If a question falls on a period boundary, compare the exact returned start and end values and retain the birth timezone and ayanamsha in your notes.",
      },
    ],
    faqs: [
      {
        question: "What determines the first Vimshottari Mahadasha?",
        answer:
          "The Moon's nakshatra at birth determines the first dasha ruler. The Moon's progress through that nakshatra determines the remaining balance of that period.",
      },
      {
        question: "Why do dasha dates differ between calculators?",
        answer:
          "Differences can come from the birth time, timezone, coordinates, ayanamsha, ephemeris precision, or date-boundary conventions. Compare the Moon's longitude and nakshatra first.",
      },
      {
        question: "Does a Mahadasha predict a fixed event?",
        answer:
          "No. It identifies a planetary period used for interpretive timing. Outcomes are not guaranteed and are normally judged from the whole natal chart, subperiods, and current context.",
      },
      {
        question: "Does this calculator show the active Antardasha?",
        answer:
          "Yes, when the dasha response returns an active Antardasha, the active-period section shows its ruler, date range, and progress alongside the active Mahadasha. If that level is absent from the response, the page does not manufacture one.",
      },
      {
        question: "What is the difference between the active periods and the Mahadasha timeline?",
        answer:
          "Active periods answer which returned Mahadasha or Antardasha contains the calculation date. The Mahadasha timeline is the broader chronological sequence of major-period rulers and boundaries returned for the birth chart.",
      },
    ],
    related: [
      {
        href: "/vedic-birth-chart-calculator",
        label: "Vedic birth chart",
        description: "Inspect the natal condition of each dasha ruler.",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "Navamsa D9",
        description: "Compare divisional support during important planetary periods.",
      },
      {
        href: "/shadbala-calculator",
        label: "Shadbala calculator",
        description: "Review the component strengths reported for a period ruler.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Why dasha dates differ",
        description: "Audit the Moon longitude, timezone, ayanamsha, and period-boundary convention before comparing dates.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Vimshottari dasha" },
    ],
    disclaimer:
      "Dasha dates are an interpretive timing framework from Jyotish. They do not guarantee events and should not be used as a substitute for professional advice or urgent decisions.",
  },

  "/kundli-matching": {
    route: "/kundli-matching",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Free Kundli Matching – Ashtakoota 36 Guna",
    metaDescription:
      "Match two Kundlis online with Ashtakoota score, individual kootas, Nadi, Bhakoot, and Mangal compatibility details.",
    eyebrow: "Two-chart compatibility tool",
    h1: "Kundli Matching Calculator",
    intro:
      "Compare two complete birth profiles using the Ashtakoota framework. Instead of stopping at a score out of 36, the report separates the individual kootas and returned dosha notes so you can see what contributed to the total.",
    calculatorHeading: "Enter both birth profiles",
    calculatorIntro:
      "Use the date, local time, and birthplace for each person. Names help label the report, but the astrological calculation comes from the two birth records.",
    trustItems: [
      "Eight kootas itemized",
      "Nadi and Bhakoot shown",
      "No name-only matching claim",
    ],
    methodologyHeading: "What the 36-guna score does and does not measure",
    methodology: [
      "Ashtakoota matching compares eight Moon- and nakshatra-based factors: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi. Their assigned points total 36, but each factor covers a different traditional compatibility theme.",
      "The total is a screening framework, not a complete relationship judgment. Many Jyotish approaches also examine both natal charts, the condition of the seventh house and its lord, Venus and Jupiter, Manglik considerations, Navamsa, dashas, and real-world consent and compatibility.",
      "The traditional maxima increase across the eight kootas: Varna 1, Vashya 2, Tara 3, Yoni 4, Graha Maitri 5, Gana 6, Bhakoot 7, and Nadi 8. Reading the obtained and maximum values together shows whether the same total came from many moderate factors or from a few large-point strengths and deficits.",
    ],
    features: [
      {
        title: "Itemized Ashtakoota result",
        description:
          "See the contribution of each koota instead of receiving only a pass-or-fail number.",
      },
      {
        title: "Dosha context",
        description:
          "Review the returned Nadi, Bhakoot, and Mangal compatibility notes alongside the score.",
      },
      {
        title: "Two verified birth records",
        description:
          "Calculate from both dates, times, and places rather than presenting name matching as a birth-chart comparison.",
      },
      {
        title: "Score, status, and evidence",
        description:
          "Review the total and recommendation together with each returned koota score, status, evidence note, and Nadi, Bhakoot, or Manglik summary.",
      },
    ],
    steps: [
      {
        title: "Enter person one",
        description:
          "Add the first person's birth date, local time, and actual place of birth, then select the correct city result.",
      },
      {
        title: "Enter person two",
        description:
          "Use the same care for the second profile. A rounded or guessed time can affect chart factors outside the Moon-based score.",
      },
      {
        title: "Read the components",
        description:
          "Review individual kootas and dosha notes before considering the total, then place them in broader chart and real-life context.",
      },
      {
        title: "Keep a printable record",
        description:
          "Save or print the itemized result with both birth labels so a later discussion refers to the same inputs, not a remembered total.",
      },
    ],
    faqs: [
      {
        question: "What is a good score out of 36 in Kundli matching?",
        answer:
          "A common traditional threshold is 18 out of 36, with 18 or more often treated as the minimum for an acceptable Ashtakoota match. That is a convention, not a guarantee or universal rule: individual kootas, especially high-weight Nadi and Bhakoot results, recognised exceptions, both natal charts, and the couple's real circumstances still matter.",
      },
      {
        question: "Can Kundli matching be done by name only?",
        answer:
          "Name-based matching is not the same as calculated Kundli matching. A birth-chart comparison needs the birth date, time, and place for both people.",
      },
      {
        question: "Does a low Guna score mean a marriage will fail?",
        answer:
          "No. The score belongs to a traditional screening system and cannot guarantee a relationship outcome. It should never override consent, safety, communication, or informed personal choice.",
      },
      {
        question: "How are the 36 points divided among the eight kootas?",
        answer:
          "The usual maxima are Varna 1, Vashya 2, Tara 3, Yoni 4, Graha Maitri 5, Gana 6, Bhakoot 7, and Nadi 8. The calculator itemizes the returned scores so a 36-point total is not read without its component pattern.",
      },
      {
        question: "Does the calculator replace a full marriage consultation?",
        answer:
          "No. It reports the returned Ashtakoota and dosha data from two birth records. It cannot assess consent, communication, safety, shared goals, health, finances, family circumstances, or every lineage's chart-comparison method.",
      },
    ],
    related: [
      {
        href: "/hi/kundli-milan",
        label: "हिंदी कुंडली मिलान",
        description: "अष्टकूट मिलान का यही अनुभव हिंदी में देखें।",
      },
      {
        href: "/manglik-dosha-calculator",
        label: "Manglik Dosha calculator",
        description: "Review the Mars placements used in a Manglik assessment.",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "Navamsa D9 calculator",
        description: "Generate the divisional chart often consulted in relationship work.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Audit both birth charts",
        description: "Check timezone, coordinates, and ayanamsha before investigating why two matching reports disagree.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Kundli matching" },
    ],
    disclaimer:
      "Kundli matching is a cultural compatibility framework, not a guarantee or instruction to marry. Relationship decisions must center consent, safety, communication, and informed personal choice.",
    languageAlternates: {
      "en-IN": "/kundli-matching",
      "hi-IN": "/hi/kundli-milan",
      "x-default": "/kundli-matching",
    },
  },

  "/hi/kundli-milan": {
    route: "/hi/kundli-milan",
    kind: "tool",
    locale: "hi-IN",
    metaTitle: "कुंडली मिलान फ्री – अष्टकूट 36 गुण मिलान",
    metaDescription:
      "दो जन्म विवरणों से मुफ्त कुंडली मिलान करें। अष्टकूट के 36 गुण, नाड़ी, भकूट, गण और मंगल अनुकूलता का विवरण देखें।",
    eyebrow: "दो कुंडलियों का अष्टकूट विश्लेषण",
    h1: "कुंडली मिलान फ्री – 36 गुण",
    intro:
      "दोनों व्यक्तियों की जन्म तिथि, स्थानीय समय और जन्म स्थान से अष्टकूट मिलान निकालें। रिपोर्ट केवल कुल गुण नहीं दिखाती; वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी के अंक अलग-अलग देती है।",
    calculatorHeading: "दोनों जन्म विवरण भरें",
    calculatorIntro:
      "नाम रिपोर्ट की पहचान के लिए हैं। वास्तविक गणना के लिए दोनों व्यक्तियों की तिथि, समय और जन्म स्थान आवश्यक हैं।",
    trustItems: [
      "आठों कूट का अलग अंक",
      "नाड़ी और भकूट विवरण",
      "केवल नाम से मिलान का दावा नहीं",
    ],
    methodologyHeading: "36 गुण के परिणाम को कैसे समझें",
    methodology: [
      "अष्टकूट प्रणाली चंद्र राशि और जन्म नक्षत्र पर आधारित आठ कारकों की तुलना करती है। हर कूट का अधिकतम अंक अलग है और कुल 36 बनते हैं। इसलिए समान कुल अंक वाली दो जोड़ियों में भी मजबूत और कमजोर कूट अलग हो सकते हैं।",
      "गुणों का योग संपूर्ण वैवाहिक निर्णय नहीं है। पारंपरिक विश्लेषण में दोनों जन्म कुंडलियाँ, सप्तम भाव, उसके स्वामी, शुक्र-बृहस्पति, मंगल दोष, नवांश और दशाएँ भी देखी जा सकती हैं। वास्तविक जीवन में सहमति, सुरक्षा, संवाद और समान मूल्यों को प्राथमिकता मिलनी चाहिए।",
      "आठ कूटों के पारंपरिक अधिकतम अंक क्रमशः वर्ण 1, वश्य 2, तारा 3, योनि 4, ग्रह मैत्री 5, गण 6, भकूट 7 और नाड़ी 8 हैं। प्राप्त और अधिकतम अंक साथ देखने से पता चलता है कि कुल स्कोर कई मध्यम परिणामों से बना है या किसी अधिक भार वाले कूट ने उसे बहुत बढ़ाया या घटाया है।",
    ],
    features: [
      {
        title: "अष्टकूट का पूरा विभाजन",
        description:
          "कुल 36 गुण के साथ हर कूट के प्राप्त और अधिकतम अंक देखें।",
      },
      {
        title: "दोष संबंधी संदर्भ",
        description:
          "लौटाए गए नाड़ी, भकूट और मंगल अनुकूलता संकेतों को कुल अंक के साथ पढ़ें।",
      },
      {
        title: "दो पूर्ण जन्म प्रोफ़ाइल",
        description:
          "नाम के अनुमान के बजाय दोनों व्यक्तियों की वास्तविक जन्म जानकारी से तुलना करें।",
      },
      {
        title: "अंक, स्थिति और साक्ष्य",
        description:
          "कुल गुण के साथ लौटाया गया सुझाव, हर कूट का अंक और स्थिति, तथा नाड़ी, भकूट और मांगलिक सार पढ़ें।",
      },
    ],
    steps: [
      {
        title: "पहला जन्म विवरण जोड़ें",
        description:
          "पहले व्यक्ति की जन्म तिथि, स्थानीय समय और सही जन्म शहर चुनें।",
      },
      {
        title: "दूसरा विवरण जोड़ें",
        description:
          "दूसरे व्यक्ति के लिए भी उतनी ही सटीक जानकारी भरें और शहर खोज का सही विकल्प चुनें।",
      },
      {
        title: "कुल से पहले कूट पढ़ें",
        description:
          "आठों कूट, नाड़ी-भकूट और मंगल संबंधी नोट देखें; केवल एक अंक से निर्णय न लें।",
      },
      {
        title: "परिणाम सुरक्षित रखें",
        description:
          "दोनों नाम और जन्म इनपुट सहित रिपोर्ट प्रिंट करें, ताकि बाद में उसी गणना पर बात हो, केवल याद किए गए कुल अंक पर नहीं।",
      },
    ],
    faqs: [
      {
        question: "कुंडली मिलान में कितने गुण अच्छे माने जाते हैं?",
        answer:
          "एक प्रचलित पारंपरिक सीमा 18/36 है और 18 या उससे अधिक गुणों को अक्सर स्वीकार्य मिलान की न्यूनतम सीमा माना जाता है। यह गारंटी या हर परंपरा का एकमात्र नियम नहीं है; नाड़ी और भकूट जैसे अधिक भार वाले कूट, मान्य अपवाद, दोनों जन्म कुंडलियाँ और वास्तविक संबंध की परिस्थितियाँ भी महत्वपूर्ण हैं।",
      },
      {
        question: "क्या केवल नाम से 36 गुण मिल सकते हैं?",
        answer:
          "नाम-आधारित मिलान और जन्म कुंडली से निकला अष्टकूट मिलान एक जैसी गणना नहीं हैं। पूर्ण मिलान के लिए दोनों व्यक्तियों की जन्म तिथि, समय और स्थान चाहिए।",
      },
      {
        question: "कम गुण होने पर विवाह असफल होगा?",
        answer:
          "नहीं। अष्टकूट एक पारंपरिक संकेतक है, भविष्य की गारंटी नहीं। सहमति, सम्मान, सुरक्षा, संवाद और व्यक्तिगत निर्णय किसी भी ज्योतिषीय अंक से अधिक महत्वपूर्ण हैं।",
      },
      {
        question: "36 गुण आठ कूटों में कैसे बँटते हैं?",
        answer:
          "पारंपरिक अधिकतम अंक वर्ण 1, वश्य 2, तारा 3, योनि 4, ग्रह मैत्री 5, गण 6, भकूट 7 और नाड़ी 8 हैं। कैलकुलेटर लौटाए गए हर कूट का अलग अंक दिखाता है, इसलिए केवल कुल जोड़ पर निर्भर नहीं रहना पड़ता।",
      },
      {
        question: "क्या यह रिपोर्ट पूरी विवाह सलाह का विकल्प है?",
        answer:
          "नहीं। यह दो जन्म विवरणों से लौटे अष्टकूट और दोष परिणाम दिखाती है। सहमति, संवाद, सुरक्षा, स्वास्थ्य, आर्थिक स्थिति, साझा लक्ष्य या हर ज्योतिष परंपरा की पूरी पद्धति को कोई ऑनलाइन स्कोर नहीं माप सकता।",
      },
    ],
    related: [
      {
        href: "/hi/janam-kundli",
        label: "जन्म कुंडली बनाएं",
        description: "एक व्यक्ति की राशि कुंडली, नवांश और दशा देखें।",
      },
      {
        href: "/manglik-dosha-calculator",
        label: "मांगलिक दोष कैलकुलेटर",
        description: "मंगल की स्थिति और लागू नियमों को विस्तार से देखें।",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "नवांश D9 कैलकुलेटर",
        description: "संबंध विश्लेषण में उपयोग होने वाली वर्ग कुंडली बनाएं।",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "दोनों जन्म इनपुट जाँचें",
        description: "अलग मिलान रिपोर्टों की तुलना से पहले समय क्षेत्र, निर्देशांक और अयनांश समान करें।",
      },
    ],
    breadcrumbs: [
      { label: "मुखपृष्ठ", href: "/" },
      { label: "कुंडली मिलान" },
    ],
    disclaimer:
      "कुंडली मिलान एक सांस्कृतिक अनुकूलता पद्धति है, विवाह की गारंटी या आदेश नहीं। संबंध संबंधी निर्णय में सहमति, सुरक्षा, संवाद और स्वतंत्र समझ को प्राथमिकता दें।",
    languageAlternates: {
      "en-IN": "/kundli-matching",
      "hi-IN": "/hi/kundli-milan",
      "x-default": "/kundli-matching",
    },
  },

  "/ashtakavarga-calculator": {
    route: "/ashtakavarga-calculator",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Ashtakavarga Calculator – BAV & SAV Scores",
    metaDescription:
      "Calculate Ashtakavarga bindu scores and review Bhinnashtakavarga and Sarvashtakavarga patterns by zodiac sign.",
    eyebrow: "Bindu distribution by sign",
    h1: "Ashtakavarga Calculator",
    intro:
      "Review how bindus are distributed across the twelve signs in the returned Ashtakavarga tables. The calculator keeps individual planetary contributions distinct from the combined Sarvashtakavarga view, which helps prevent a single total from being overread.",
    calculatorHeading: "Calculate Ashtakavarga from a birth chart",
    calculatorIntro:
      "Generate the natal chart first, then open the Ashtakavarga section. Use the same ayanamsha and birth details for any transit or chart comparison.",
    trustItems: [
      "Sign-by-sign bindus",
      "Individual and combined views",
      "Linked to the natal chart",
    ],
    methodologyHeading: "Understanding BAV and SAV tables",
    methodology: [
      "Ashtakavarga assigns bindus according to traditional rules based on relationships among planets, signs, and the ascendant. Bhinnashtakavarga separates the contributions associated with each planet, while Sarvashtakavarga combines eligible totals into a sign-by-sign overview.",
      "A higher or lower count is contextual rather than universally good or bad. Readers commonly consider the relevant house, its lord, natal promise, running dasha, and the purpose of the analysis before using Ashtakavarga for transit or strength judgments.",
      "The result view accepts a twelve-number Sarvashtakavarga row and returned twelve-sign Bhinnashtakavarga rows by planet. It identifies the highest and lowest SAV signs for navigation, but that highlight is descriptive rather than a verdict. For example, a high count in Taurus must first be mapped to the house Taurus occupies in this natal chart before it can be discussed in a house-based question.",
    ],
    features: [
      {
        title: "Bhinnashtakavarga detail",
        description:
          "Inspect the individual planetary tables instead of reducing the system to one combined score.",
      },
      {
        title: "Sarvashtakavarga overview",
        description:
          "Compare the combined bindu distribution across all twelve zodiac signs.",
      },
      {
        title: "Chart-linked interpretation",
        description:
          "Keep sign totals connected to natal houses, rulers, dashas, and the question being studied.",
      },
      {
        title: "Highest and lowest SAV markers",
        description:
          "Locate the strongest and weakest returned sign totals quickly, then inspect the complete twelve-sign pattern instead of treating either marker as a prediction.",
      },
    ],
    steps: [
      {
        title: "Generate the natal chart",
        description:
          "Enter accurate birth details and confirm the ascendant and planetary positions before opening strength tables.",
      },
      {
        title: "Compare individual tables",
        description:
          "Review each available BAV row to see which planet contributes to a sign's pattern.",
      },
      {
        title: "Read the SAV total in context",
        description:
          "Map the sign back to its natal house and current timing rather than assigning a fixed meaning to the count.",
      },
      {
        title: "Keep methods comparable",
        description:
          "When comparing software, use the same birth data and settings and compare all twelve values in the same BAV or SAV row, not only the largest number.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between BAV and SAV?",
        answer:
          "Bhinnashtakavarga presents planet-specific bindu patterns. Sarvashtakavarga combines eligible contributions into a broader sign-by-sign total.",
      },
      {
        question: "Is a high Ashtakavarga score always good?",
        answer:
          "No. A count is interpreted in relation to the sign, natal house, house lord, planet, timing technique, and the question being examined. It is not a universal grade.",
      },
      {
        question: "Can I use Ashtakavarga without a birth time?",
        answer:
          "Some planetary contributions can still be calculated, but ascendant-based context and house mapping need a reliable birth time. A full natal interpretation should state that limitation.",
      },
      {
        question: "What exactly does this Ashtakavarga result display?",
        answer:
          "When returned by the strength endpoint, the page displays a twelve-sign Sarvashtakavarga row, marks its highest and lowest values, and lists available twelve-sign Bhinnashtakavarga rows by planet. It does not turn those counts into guaranteed events.",
      },
      {
        question: "Is there one good SAV score for every house?",
        answer:
          "No. Traditional averages and comparison rules may be useful within a defined method, but a raw number is not a universal pass mark. The natal house, its lord, the relevant planet, the running dasha, and the transit question all change how the count is used.",
      },
    ],
    related: [
      {
        href: "/shadbala-calculator",
        label: "Shadbala calculator",
        description: "Compare a different classical framework for planetary strength.",
      },
      {
        href: "/vimshottari-dasha-calculator",
        label: "Vimshottari dasha",
        description: "Add the active planetary period to the strength context.",
      },
      {
        href: "/vedic-birth-chart-calculator",
        label: "Vedic birth chart",
        description: "Return to the D1 chart and underlying planetary positions.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Compare calculation settings",
        description: "Rule out birth-input and convention differences before comparing two BAV or SAV tables.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Ashtakavarga" },
    ],
    disclaimer:
      "Ashtakavarga belongs to a traditional interpretive system. Bindu totals are not scientific risk scores and should not direct medical, financial, legal, or safety decisions.",
  },

  "/shadbala-calculator": {
    route: "/shadbala-calculator",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Shadbala Calculator – Sixfold Planetary Strength",
    metaDescription:
      "Calculate Shadbala and review the six classical components of planetary strength with the natal chart and calculation settings.",
    eyebrow: "Six-component strength analysis",
    h1: "Shadbala Calculator",
    intro:
      "Inspect the sixfold strength data returned for the natal planets. The report keeps component values visible so a planet is not described as simply strong or weak without showing what contributes to that assessment.",
    calculatorHeading: "Calculate planetary Shadbala",
    calculatorIntro:
      "Start with accurate birth details, especially local time and place. Several strength components depend on the chart angles, houses, and temporal conditions at birth.",
    trustItems: [
      "Component values shown",
      "Natal chart beside strengths",
      "No one-number verdict",
    ],
    methodologyHeading: "The six parts of Shadbala",
    methodology: [
      "Shadbala combines Sthana Bala, Dig Bala, Kala Bala, Cheshta Bala, Naisargika Bala, and Drik Bala. These describe different sources of strength such as placement, direction, time, motion, inherent luminosity, and aspects or influences.",
      "A combined value is most useful when its components can be inspected. Strength does not automatically mean benevolence or a desirable outcome; it describes a planet's capacity to express its natal role, which must still be judged from rulership, dignity, aspects, yogas, dashas, and context.",
      "For each returned planet, this page shows total Shadbala in Rupas, the corresponding Virupas value returned by the API or transparently derived as Rupas × 60, the minimum requirement and ratio, plus six returned components: Sthana Bala, Dig Bala, Kala Bala, Cheshta Bala, Naisargika Bala, and Drik Bala. Bhavabala or Ishta-Kashta data appears only when that optional structure is actually present in the response.",
    ],
    features: [
      {
        title: "Sixfold breakdown",
        description:
          "Review the returned component measures that contribute to each planet's total strength.",
      },
      {
        title: "Comparable planet table",
        description:
          "Scan planets in a consistent format while retaining access to their signs, houses, and degrees.",
      },
      {
        title: "Interpretive guardrails",
        description:
          "Distinguish strength from beneficence and avoid treating a total as a prediction by itself.",
      },
      {
        title: "Rupas, Virupas, minimum, and ratio",
        description:
          "Read each total in Rupas and Virupas beside its minimum requirement and ratio, then review the same row's six component values.",
      },
    ],
    steps: [
      {
        title: "Verify the timed chart",
        description:
          "Confirm local time, location, ascendant, and house positions before relying on time- and direction-sensitive components.",
      },
      {
        title: "Inspect the components",
        description:
          "Look at which type of bala raises or lowers the total rather than comparing only the final figures.",
      },
      {
        title: "Interpret the planet's role",
        description:
          "Return to rulership, dignity, aspects, yogas, divisional support, and dasha activation for a fuller judgment.",
      },
      {
        title: "Compare like with like",
        description:
          "When checking another report, match the birth inputs and conventions and compare the same named component before comparing totals.",
      },
    ],
    faqs: [
      {
        question: "What does Shadbala measure?",
        answer:
          "It is a Jyotish framework that combines six categories of planetary strength. It describes capacity through several traditional factors, not whether a planet is universally good or bad.",
      },
      {
        question: "Is the strongest planet always the best planet?",
        answer:
          "No. A strong planet may express its natal functions forcefully, but those functions depend on the whole chart. Strength and beneficence are different questions.",
      },
      {
        question: "Why might Shadbala totals differ across software?",
        answer:
          "Differences can arise from input data, timezone handling, ayanamsha, house or sunrise conventions, ephemeris precision, and implementation details. Compare component values and settings, not only totals.",
      },
      {
        question: "Which Shadbala values are shown on this page?",
        answer:
          "The page shows each returned planet's total Shadbala in Rupas and Virupas, minimum requirement, ratio, and six component values: Sthana, Dig, Kala, Cheshta, Naisargika, and Drik Bala. Optional Bhavabala or Ishta-Kashta sections are shown only when returned, not inferred when absent.",
      },
      {
        question: "What does a Shadbala ratio below one mean?",
        answer:
          "In this result, the ratio compares the returned total with the returned minimum requirement, so a value below one is below that reference. It is still not a scientific deficiency score or a complete judgment of the planet's outcomes.",
      },
    ],
    related: [
      {
        href: "/ashtakavarga-calculator",
        label: "Ashtakavarga calculator",
        description: "Explore sign-based bindu patterns as a separate strength framework.",
      },
      {
        href: "/vimshottari-dasha-calculator",
        label: "Vimshottari dasha",
        description: "Check when a planet's natal indications become timing-relevant.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Why calculators differ",
        description: "Audit settings before comparing strength outputs.",
      },
      {
        href: "/vedic-birth-chart-calculator",
        label: "Planetary signs and houses",
        description: "Return to the natal roles, dignities, and placements that give a strength figure interpretive context.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Shadbala" },
    ],
    disclaimer:
      "Shadbala is a traditional interpretive measure, not a scientific test of personality, health, or future outcomes. Use it for cultural study and reflection.",
  },

  "/manglik-dosha-calculator": {
    route: "/manglik-dosha-calculator",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Manglik Dosha Calculator – Check Mangal Dosha",
    metaDescription:
      "Check Manglik or Mangal Dosha from a Vedic birth chart and review the Mars houses, reference points, and rule context behind the result.",
    eyebrow: "Mars placement review",
    h1: "Manglik Dosha Calculator",
    intro:
      "Check the Mars placements commonly considered in a Manglik or Mangal Dosha assessment. The page is designed to show the chart evidence and rule context rather than turning a traditional factor into a frightening yes-or-no label.",
    calculatorHeading: "Check Mangal Dosha from birth details",
    calculatorIntro:
      "Enter the local birth time and place, then verify the ascendant and Mars position before reviewing any dosha result. Different traditions may test from more than one reference point.",
    trustItems: [
      "Mars house visible",
      "Rule context explained",
      "Compatibility is not reduced to one label",
    ],
    methodologyHeading: "How Manglik rules are evaluated",
    methodology: [
      "Manglik assessment traditionally examines whether Mars occupies particular houses counted from the ascendant and, in some approaches, from the Moon or Venus. The included houses and weighting can vary by lineage, which is why the rule set should be stated alongside the result.",
      "Many traditions also apply cancellations, exceptions, sign conditions, aspects, mutual chart factors, or balancing rules. A responsible reading therefore verifies the underlying Mars placement and considers both charts rather than treating the word 'Manglik' as a fixed judgment about a person.",
      "The calculator view grounds its headline in Manglik, Mangal Dosha, or Kuja Dosha evidence actually returned by the yoga/dosha response and separately shows Mars's natal sign and house when available. The explanatory text compares common traditions, but it does not pretend that every house list, reference point, cancellation, or lineage rule was calculated when that evidence was not returned.",
    ],
    features: [
      {
        title: "Visible Mars placement",
        description:
          "Check Mars by sign, house, and degree in the natal chart before reading the assessment.",
      },
      {
        title: "Multiple-reference awareness",
        description:
          "Understand that some methods count houses from the ascendant, Moon, or Venus, without assuming all three tests were performed unless the returned evidence says so.",
      },
      {
        title: "Cancellation context",
        description:
          "Treat exceptions and balancing factors as part of a fuller chart review, not as an afterthought.",
      },
      {
        title: "Returned evidence first",
        description:
          "Separate the endpoint's active flag, description, or rule fields from broader traditional rules that may require a different calculation.",
      },
    ],
    steps: [
      {
        title: "Calculate the natal chart",
        description:
          "Use reliable birth details and verify the ascendant because house-based Manglik rules depend on it.",
      },
      {
        title: "Locate Mars",
        description:
          "Check the displayed sign, house, degree, and the reference point used by the returned rule set.",
      },
      {
        title: "Review the full compatibility picture",
        description:
          "Consider exceptions, both natal charts, matching factors, and the couple's real circumstances before reaching any conclusion.",
      },
      {
        title: "Name the rule used",
        description:
          "When sharing a result, record whether it came from returned dosha evidence or a separately chosen Lagna, Moon, or Venus house-counting tradition.",
      },
    ],
    faqs: [
      {
        question: "Which houses cause Manglik Dosha?",
        answer:
          "A common six-house rule examines Mars in the 1st, 2nd, 4th, 7th, 8th, or 12th house from the Lagna. A common five-house version omits the 2nd, and some traditions repeat the count from the Moon or Venus or apply different exceptions. These are lineage-dependent rule sets; the calculator should not be assumed to have tested a version unless its returned evidence identifies it.",
      },
      {
        question: "Can Manglik Dosha be cancelled?",
        answer:
          "Many Jyotish traditions describe exceptions or balancing conditions based on signs, aspects, conjunctions, both partners' charts, or other factors. Their application varies and needs chart-level review.",
      },
      {
        question: "Does being Manglik predict divorce or harm?",
        answer:
          "No calculator can guarantee a relationship outcome or justify fear, stigma, or coercion. Manglik is a traditional interpretive factor and should never override consent, safety, communication, or professional support.",
      },
      {
        question: "What evidence does this Manglik result use?",
        answer:
          "The result headline follows an explicit Manglik or Mangal Dosha object or a matching active yoga/dosha row returned for the chart. The page also shows natal Mars by sign and house when available. General house lists on this page explain traditions; they are not extra calculator findings.",
      },
      {
        question: "Is Mars in the 2nd house always treated as Manglik?",
        answer:
          "No. The 2nd house appears in a common six-house formulation, while widely used five-house formulations omit it. Reference points and cancellations also differ, so state the adopted rule rather than applying one list universally.",
      },
    ],
    related: [
      {
        href: "/kundli-matching",
        label: "Kundli matching",
        description: "Place Mangal compatibility beside the full Ashtakoota result.",
      },
      {
        href: "/vedic-birth-chart-calculator",
        label: "Vedic birth chart",
        description: "Verify Mars, the ascendant, houses, aspects, and chart settings.",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "Navamsa D9",
        description: "Add divisional context commonly consulted in relationship work.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Verify the Mars house",
        description: "Check birth time, coordinates, ayanamsha, and house settings before comparing conflicting Manglik results.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Manglik Dosha" },
    ],
    disclaimer:
      "Manglik Dosha is a cultural astrology concept, not proof of danger, character, or relationship outcome. Never use it to stigmatize, pressure, or frighten anyone.",
  },

  "/muhurat": {
    route: "/muhurat",
    kind: "tool",
    locale: "en-IN",
    metaTitle: "Muhurat Calculator – Find Auspicious Date Windows",
    metaDescription:
      "Search Muhurat date and time windows by purpose, place, and date range with Panchang criteria and visible sidereal settings.",
    eyebrow: "Panchang-based time search",
    h1: "Muhurat Calculator",
    intro:
      "Search a date range for candidate Muhurat windows tied to a selected place and one of six supported purposes: general work, vehicle purchase, property purchase, Griha Pravesh, Namkaran, or Mundan. Each returned window keeps its Panchang criteria visible so you can compare the local date and time, tithi, nakshatra, weekday, score, reasons, and warnings. Wedding or Vivah Muhurat is not supported by this search.",
    calculatorHeading: "Search for Muhurat windows",
    calculatorIntro:
      "Choose the place where the activity will occur, select a supported purpose, and set a practical date range. Muhurat times are local to the selected location.",
    trustItems: [
      "Location-specific local time",
      "Panchang criteria shown",
      "Candidate windows ranked",
    ],
    methodologyHeading: "Why Muhurat depends on place and purpose",
    methodology: [
      "Panchang factors change through the day and are calculated for a location. A window shown for one city should not be copied to another timezone without recalculation. The selected purpose also matters because a rule set may favor or avoid different combinations for different activities.",
      "A returned window is a candidate from the supported rules, not universal permission or a guarantee of success. Personal-chart electional work, local customs, venue availability, legal deadlines, safety, and practical constraints may require additional judgment.",
      "The supported purpose values are limited to general work, vehicle purchase, property purchase, Griha Pravesh, Namkaran, and Mundan. Searches cover at most 31 calendar days and can request between 1 and 50 best windows. General work is not a catch-all substitute for an unsupported wedding or Vivah election, because purpose-specific rules are part of the calculation.",
    ],
    features: [
      {
        title: "Purpose-based search",
        description:
          "Choose the supported activity so the result is evaluated against the relevant rule set rather than a generic good-day label.",
      },
      {
        title: "Local start and end times",
        description:
          "Calculate candidate windows for the selected city and display the boundaries as local civil time.",
      },
      {
        title: "Criteria beside each result",
        description:
          "Review tithi, nakshatra, weekday, duration, and returned ranking details before choosing a window.",
      },
      {
        title: "Six defined purposes",
        description:
          "Search general work, vehicle purchase, property purchase, Griha Pravesh, Namkaran, or Mundan without implying that a wedding rule set is available.",
      },
    ],
    steps: [
      {
        title: "Choose the event location",
        description:
          "Search for the city where the activity will happen, because Panchang boundaries and local time depend on place.",
      },
      {
        title: "Set purpose and range",
        description:
          "Select the closest supported purpose and use a focused start and end date rather than an unnecessarily broad search.",
      },
      {
        title: "Compare practical candidates",
        description:
          "Read the criteria and duration, then check logistics, safety, legal requirements, and any personal-chart considerations.",
      },
      {
        title: "Retain the rule context",
        description:
          "Save the purpose, city, timezone, ayanamsha, date range, reasons, and warnings with the chosen window so the result can be reproduced.",
      },
    ],
    faqs: [
      {
        question: "Does the same Muhurat work in every city?",
        answer:
          "No. Panchang elements and the displayed civil time depend on location and timezone. Recalculate for the place where the activity will occur.",
      },
      {
        question: "What details are used in a Muhurat search?",
        answer:
          "The supported search uses the selected purpose, location, date range, ayanamsha, and returned Panchang criteria such as tithi, nakshatra, and weekday. The exact rule set should remain visible.",
      },
      {
        question: "Does an auspicious window guarantee success?",
        answer:
          "No. Muhurat is a traditional electional framework. It cannot replace preparation, consent, safety checks, medical guidance, contracts, or legal and financial due diligence.",
      },
      {
        question: "Which purposes does this Muhurat calculator support?",
        answer:
          "It supports exactly six choices: general work, vehicle purchase, property purchase, Griha Pravesh, Namkaran, and Mundan. The selected purpose is sent with the search so the returned windows use the corresponding supported rule context.",
      },
      {
        question: "Can I use this calculator for a wedding or Vivah Muhurat?",
        answer:
          "No. Wedding or Vivah is not one of the six supported purposes, and general work should not be used as a substitute. Use a method that explicitly supports wedding rules and any required personal-chart comparison.",
      },
    ],
    related: [
      {
        href: "/vedic-birth-chart-calculator",
        label: "Vedic birth chart",
        description: "Create a natal chart if personal timing context is also needed.",
      },
      {
        href: "/vimshottari-dasha-calculator",
        label: "Vimshottari dasha",
        description: "Review the native's active planetary period separately.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Calculation settings guide",
        description: "Understand why timezone, coordinates, and ayanamsha matter.",
      },
      {
        href: "/kundli",
        label: "Janam Kundli for personal context",
        description: "Generate the natal chart separately when an astrologer needs birth-specific context beyond the public Muhurat search.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Muhurat calculator" },
    ],
    disclaimer:
      "Muhurat is a cultural electional practice, not a guarantee of outcome. Practical safety, consent, laws, contracts, medical guidance, and professional advice always take priority.",
  },

  "/north-indian-birth-chart-calculator": {
    route: "/north-indian-birth-chart-calculator",
    kind: "tool",
    locale: "en-US",
    metaTitle: "North Indian Birth Chart Calculator – Free Kundli",
    metaDescription:
      "Create a free North Indian diamond-style Kundli with the ascendant, houses, signs, planets, and D9 Navamsa from exact birth details.",
    eyebrow: "House-fixed diamond layout",
    h1: "North Indian Birth Chart Calculator",
    intro:
      "Generate a Kundli in the North Indian diamond layout, where the twelve house positions stay fixed and the zodiac signs move according to the ascendant. The underlying planetary data remains the same when you switch to another regional drawing style.",
    calculatorHeading: "Create a North Indian Kundli",
    calculatorIntro:
      "Enter the birth record, choose the North Indian chart style, and use the sign numbers and house positions together when reading the diamond diagram.",
    trustItems: [
      "Fixed-house layout",
      "D1 and D9 diagrams",
      "Same data as other chart styles",
    ],
    methodologyHeading: "How to orient a North Indian chart",
    methodology: [
      "In the common North Indian format, houses occupy fixed positions in the diamond grid. The first house is the upper central diamond, and the remaining houses proceed counterclockwise. Sign numbers inside those spaces change with the ascendant.",
      "Because the layout is house-fixed, it is useful for quickly following house lords and aspects. Switching to South or East Indian display should not recalculate the planets; it only redraws the same chart data using a different regional convention.",
      "For example, if Taurus rises, the fixed first-house area contains sign 2, Gemini appears in the second house as sign 3, and so on around the chart. The numbers identify signs, while the geometry identifies houses. Reading those two layers separately prevents the common mistake of calling the sign number a house number.",
    ],
    features: [
      {
        title: "Diamond-style house map",
        description:
          "Read the first, fourth, seventh, and tenth houses on the central diamond axes with houses fixed in place.",
      },
      {
        title: "Sign numbers in context",
        description:
          "Identify the zodiac sign occupying each house from its number rather than assuming the boxes are fixed signs.",
      },
      {
        title: "Matching D1 and D9 style",
        description:
          "Compare natal and Navamsa charts without switching visual conventions between the two diagrams.",
      },
      {
        title: "Degree-table cross-check",
        description:
          "Confirm sign, house, exact degree, nakshatra, and retrograde status in the planet table when several abbreviations share one compartment.",
      },
    ],
    steps: [
      {
        title: "Calculate the chart",
        description:
          "Use the exact local birth time and birthplace to establish the ascendant and planetary longitudes.",
      },
      {
        title: "Find the first house",
        description:
          "Start at the upper central diamond and note the ascendant sign number displayed there.",
      },
      {
        title: "Move counterclockwise",
        description:
          "Follow the fixed house sequence, then use the planet table to confirm abbreviations and exact degrees.",
      },
      {
        title: "Compare without recalculating",
        description:
          "Switch chart style while keeping birth data and settings unchanged, then verify that the planet table remains the same.",
      },
    ],
    faqs: [
      {
        question: "Are houses fixed in a North Indian chart?",
        answer:
          "Yes. In the common North Indian diamond layout, house positions are fixed and the sign numbers change according to the ascendant.",
      },
      {
        question: "What do the numbers in a North Indian Kundli mean?",
        answer:
          "They usually identify zodiac signs from Aries as 1 through Pisces as 12. They are not house numbers, because the houses are already fixed by position.",
      },
      {
        question: "Does changing chart style change my Kundli?",
        answer:
          "No. North, South, and East Indian styles are visual layouts. With the same birth data and settings, the underlying signs, houses, degrees, and planets should remain the same.",
      },
      {
        question: "Where are the Kendra houses in a North Indian chart?",
        answer:
          "The 1st, 4th, 7th, and 10th houses form the central diamond axes in the common fixed-house layout. Start with the upper central first house and use the displayed house labels rather than sign numbers to follow the sequence.",
      },
      {
        question: "If sign number 7 appears in the first house, what does it mean?",
        answer:
          "Sign number 7 represents Libra, so Libra is the ascendant sign in that example. The compartment remains the first house because North Indian house positions are fixed.",
      },
    ],
    related: [
      {
        href: "/south-indian-birth-chart-calculator",
        label: "South Indian chart",
        description: "View the same calculation in a fixed-sign rectangular layout.",
      },
      {
        href: "/east-indian-birth-chart-calculator",
        label: "East Indian chart",
        description: "Learn the square-diamond regional chart convention.",
      },
      {
        href: "/vedic-birth-chart-calculator",
        label: "Full Vedic birth chart",
        description: "Open planetary tables, dashas, yogas, and strength views.",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "North Indian D1 and D9",
        description: "Compare Rashi and Navamsa in the same fixed-house diamond convention.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "North Indian chart" },
    ],
    disclaimer:
      "The North Indian diagram is a regional way to display a Jyotish chart. Astrological interpretation is cultural and non-scientific, and is offered for study and entertainment.",
  },

  "/south-indian-birth-chart-calculator": {
    route: "/south-indian-birth-chart-calculator",
    kind: "tool",
    locale: "en-US",
    metaTitle: "South Indian Birth Chart Calculator – Free Kundli",
    metaDescription:
      "Create a free South Indian fixed-sign birth chart with ascendant, planets, exact degrees, and D9 Navamsa from birth details.",
    eyebrow: "Fixed-sign rectangular layout",
    h1: "South Indian Birth Chart Calculator",
    intro:
      "Generate a Kundli in the South Indian rectangular layout, where each zodiac sign keeps a fixed position around the chart. The ascendant marker identifies which sign becomes the first house, and the houses are then counted from that point.",
    calculatorHeading: "Create a South Indian birth chart",
    calculatorIntro:
      "Enter the birth date, exact local time, and place, then choose the South Indian style. Use the ascendant marker before counting houses from the fixed signs.",
    trustItems: [
      "Fixed-sign layout",
      "Ascendant clearly marked",
      "D1 and D9 in one style",
    ],
    methodologyHeading: "How to read the fixed-sign layout",
    methodology: [
      "In the common South Indian format, Aries through Pisces occupy fixed boxes. The zodiac order does not move from chart to chart. Instead, an ascendant label or marker shows which fixed sign is the first house, and the remaining houses follow clockwise through the signs.",
      "This format makes sign-based comparison quick because a given sign is always in the same visual location. Changing to a North or East Indian display should only change the drawing convention, not the calculated ascendant, signs, houses, or planetary degrees.",
      "If Gemini rises, the fixed Gemini box is house 1, Cancer is house 2, Taurus is house 12, and the rest follow the zodiac order. The boxes do not rotate to put the ascendant at the top. This is why the ascendant marker must be found before a South Indian chart is read house by house.",
    ],
    features: [
      {
        title: "Permanent sign positions",
        description:
          "Learn one visual zodiac map and find Aries through Pisces in the same boxes on every chart.",
      },
      {
        title: "Visible ascendant marker",
        description:
          "Identify the first house from the marked rising sign before counting houses through the fixed-sign grid.",
      },
      {
        title: "Consistent divisional charts",
        description:
          "Display D1 and D9 in the same South Indian convention while their ascendants and placements change independently.",
      },
      {
        title: "House labels over fixed signs",
        description:
          "Use the rendered house number and ascendant highlight inside each permanent sign box instead of memorizing a house position from another chart style.",
      },
    ],
    steps: [
      {
        title: "Generate accurate positions",
        description:
          "Use the recorded local birth time and correct birthplace so the ascendant and house mapping are reliable.",
      },
      {
        title: "Locate the ascendant sign",
        description:
          "Find the box marked as the ascendant; that fixed sign is the first house for this chart.",
      },
      {
        title: "Count through the zodiac",
        description:
          "Move clockwise from the ascendant and use the planet table to verify exact degrees and abbreviations.",
      },
      {
        title: "Check D1 and D9 separately",
        description:
          "Find the ascendant marker again in Navamsa; D9 uses the same fixed sign map but can have a different first house and planet distribution.",
      },
    ],
    faqs: [
      {
        question: "Are signs fixed in a South Indian chart?",
        answer:
          "Yes. The common South Indian layout keeps all twelve zodiac signs in fixed positions. The ascendant marker determines which sign is the first house.",
      },
      {
        question: "How do I find the first house?",
        answer:
          "Look for the ascendant or Lagna marker in one of the fixed sign boxes. That sign is house one, and the remaining houses are counted in zodiac order.",
      },
      {
        question: "Is a South Indian chart calculated differently?",
        answer:
          "No. It is a different display convention. When birth data and settings match, the astronomical positions should be identical to North and East Indian versions.",
      },
      {
        question: "Which direction do houses run in a South Indian chart?",
        answer:
          "After locating the ascendant in its fixed sign box, count houses forward in zodiac order, which moves clockwise around the common South Indian grid. Use the visible labels if you are comparing a regional variant.",
      },
      {
        question: "Why did the highlighted ascendant box move in D9?",
        answer:
          "D1 and D9 are different calculated charts. The zodiac boxes stay fixed in the South Indian layout, but the Navamsa ascendant can occupy a different sign, so its house-one highlight moves to that sign's permanent box.",
      },
    ],
    related: [
      {
        href: "/north-indian-birth-chart-calculator",
        label: "North Indian chart",
        description: "Compare the fixed-house diamond layout.",
      },
      {
        href: "/east-indian-birth-chart-calculator",
        label: "East Indian chart",
        description: "Explore the East Indian square-diamond convention.",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "Navamsa D9 calculator",
        description: "Study the D9 divisional chart in the selected layout.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Chart style or calculation difference?",
        description: "Use the degree table to separate a harmless layout change from a changed birth input or setting.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "South Indian chart" },
    ],
    disclaimer:
      "The South Indian diagram is a regional way to display a Jyotish chart. Astrological interpretation is cultural and non-scientific, and is offered for study and entertainment.",
  },

  "/east-indian-birth-chart-calculator": {
    route: "/east-indian-birth-chart-calculator",
    kind: "tool",
    locale: "en-US",
    metaTitle: "East Indian Birth Chart Calculator – Free Kundli",
    metaDescription:
      "Create a free East Indian square-diamond birth chart with ascendant, houses, planets, and D9 Navamsa from exact birth details.",
    eyebrow: "Eastern square-diamond layout",
    h1: "East Indian Birth Chart Calculator",
    intro:
      "Generate a Kundli in an East Indian square-diamond layout used across parts of eastern India. The diagram organizes signs and houses differently from the more familiar North and South Indian formats while preserving the same calculated planetary positions.",
    calculatorHeading: "Create an East Indian Kundli",
    calculatorIntro:
      "Enter accurate birth details, choose the East Indian style, and use the ascendant and sign labels as your orientation points. Confirm unfamiliar abbreviations in the planet table.",
    trustItems: [
      "Square-diamond layout",
      "Ascendant and signs labeled",
      "Same astronomical chart data",
    ],
    methodologyHeading: "Reading the East Indian chart convention",
    methodology: [
      "East Indian chart traditions use a square framework with internal diamond or triangular divisions. Exact visual conventions can vary regionally, so the displayed sign labels and ascendant should be treated as the authoritative orientation rather than relying on a memorized North Indian house position.",
      "The chart renderer changes the arrangement of the diagram, not the ephemeris calculation. Use the accompanying planetary table to cross-check each sign, house, degree, and nakshatra while becoming familiar with the layout.",
      "This renderer writes the house number together with the occupying sign in each East Indian compartment. Begin at the cell labelled house 1, then follow the numbered houses rather than guessing from the triangle or diamond shape. That approach remains reliable when a Bengali, Odia, or other eastern reference uses a slightly different regional drawing convention.",
    ],
    features: [
      {
        title: "Regional square-diamond chart",
        description:
          "View the natal chart in an eastern Indian visual tradition instead of forcing it into another regional format.",
      },
      {
        title: "Labels for orientation",
        description:
          "Use the ascendant and sign labels to navigate the diagram even when the layout is new to you.",
      },
      {
        title: "Planet table cross-check",
        description:
          "Confirm every glyph or abbreviation against exact sign, house, degree, and nakshatra data.",
      },
      {
        title: "Explicit house and sign labels",
        description:
          "Orient the square from the rendered house number and sign glyph instead of transferring fixed positions from North or South Indian charts.",
      },
    ],
    steps: [
      {
        title: "Calculate from birth data",
        description:
          "Establish the ascendant and planetary positions from the exact local time and birthplace.",
      },
      {
        title: "Find the chart orientation",
        description:
          "Locate the ascendant and sign labels before inferring a house from a shape or position.",
      },
      {
        title: "Verify in the table",
        description:
          "Use the planet table to confirm placements while learning the selected East Indian convention.",
      },
      {
        title: "Test a style switch",
        description:
          "Redraw the same result in another regional style and confirm that sign, house, and degree rows do not change with the geometry.",
      },
    ],
    faqs: [
      {
        question: "What is an East Indian birth chart?",
        answer:
          "It is a regional Jyotish diagram that uses a square with internal diamond or triangular divisions. Variants are associated with eastern Indian chart traditions.",
      },
      {
        question: "Why does the East Indian layout look different?",
        answer:
          "Regional chart conventions arrange signs and houses in different shapes and fixed positions. The labels and ascendant show how to orient the specific rendering.",
      },
      {
        question: "Will planets change when I switch chart style?",
        answer:
          "No. A style switch should redraw the same calculation. If positions change, check whether a calculation setting or birth input changed at the same time.",
      },
      {
        question: "Is every East Indian or Bengali chart arranged exactly the same way?",
        answer:
          "No. Eastern Indian chart traditions share square, diamond, and triangular forms, but regional and software conventions can differ. Use the displayed house numbers, sign labels, and ascendant rather than assuming one memorized arrangement applies everywhere.",
      },
      {
        question: "How do I check an unfamiliar planet abbreviation in this chart?",
        answer:
          "Match the abbreviation or glyph to the accompanying planet table, which gives the full planet name, sign, house, degree, and nakshatra. The table is the safer reference when multiple bodies occupy a small compartment.",
      },
    ],
    related: [
      {
        href: "/north-indian-birth-chart-calculator",
        label: "North Indian chart",
        description: "Compare the common fixed-house diamond diagram.",
      },
      {
        href: "/south-indian-birth-chart-calculator",
        label: "South Indian chart",
        description: "Compare the fixed-sign rectangular diagram.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Why charts differ",
        description: "Separate harmless layout changes from real setting differences.",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "East Indian Navamsa view",
        description: "Compare D1 and D9 while keeping the same labelled square-diamond convention.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "East Indian chart" },
    ],
    disclaimer:
      "The East Indian diagram is a regional way to display a Jyotish chart. Astrological interpretation is cultural and non-scientific, and is offered for study and entertainment.",
  },

  "/learn/why-kundli-calculators-differ": {
    route: "/learn/why-kundli-calculators-differ",
    kind: "guide",
    locale: "en-US",
    metaTitle: "Why Kundli Calculators Give Different Results",
    metaDescription:
      "Learn how birth time, timezone, coordinates, ayanamsha, house system, nodes, ephemeris, and chart style can make Kundli results look different.",
    eyebrow: "Calculation settings guide",
    h1: "Why Kundli Calculators Give Different Results",
    intro:
      "Two Kundli websites can start with the same birth details and still show a different ascendant, house, nakshatra, dasha date, or chart drawing. Some differences are visual; others come from an input or calculation convention that should be checked before deciding one chart is wrong.",
    trustItems: [
      "Input checklist",
      "Setting-by-setting comparison",
      "Visual differences separated from calculations",
    ],
    methodologyHeading: "Compare the inputs before the interpretation",
    methodology: [
      "First compare the raw birth record: calendar date, local clock time, AM or PM, birthplace, timezone, and daylight-saving treatment. A wrong offset can move every planetary longitude's displayed time context and can shift the ascendant or Moon enough to affect houses, nakshatras, divisional charts, and dashas.",
      "Next compare the calculation settings. Ayanamsha controls the sidereal offset; Lahiri, Raman, and Krishnamurti values are not identical. House systems can place a planet in different houses even when its zodiac degree matches. Mean and true lunar nodes also produce different Rahu and Ketu degrees.",
      "Finally separate drawing style from data. North, South, and East Indian diagrams arrange the same signs and houses differently. If the degree table matches, a chart can look unfamiliar without being mathematically different. When dates differ by a small amount, also check ephemeris precision, rounding, sunrise conventions, and how software defines a period boundary.",
      "Boundary cases deserve an interval test rather than a quick verdict. A US birth near a daylight-saving clock change may have an ambiguous civil time; a planet close to a sidereal sign or 3°20′ Navamsa boundary can switch categories under another ayanamsha; and a rounded birth time can move the ascendant. Recalculate the plausible input range and record which outputs remain stable.",
    ],
    features: [
      {
        title: "Birth record audit",
        description:
          "Check local time, AM or PM, place, timezone, daylight saving, and calendar date before changing advanced settings.",
      },
      {
        title: "Convention comparison",
        description:
          "Put ayanamsha, house system, node type, and ephemeris choices side by side rather than comparing screenshots alone.",
      },
      {
        title: "Data-first verification",
        description:
          "Compare ascendant and planetary degrees in a table before deciding that two regional chart drawings disagree.",
      },
      {
        title: "Boundary-case testing",
        description:
          "Test the documented range for an approximate time or ambiguous DST record and separate stable placements from results that cross a sign, house, nakshatra, or varga boundary.",
      },
    ],
    steps: [
      {
        title: "Match the birth input exactly",
        description:
          "Use the same date, clock time, birthplace coordinates, timezone, and daylight-saving rule on both calculators.",
      },
      {
        title: "Match the calculation settings",
        description:
          "Select the same ayanamsha, house system, and mean or true node option before comparing outputs.",
      },
      {
        title: "Compare degrees, then derived results",
        description:
          "Check the ascendant, Sun, Moon, and planet longitudes before investigating D9, nakshatra, dasha, yoga, or strength differences.",
      },
      {
        title: "Record the software context",
        description:
          "Save the settings, calculation date, and product version when a repeatable discrepancy matters for research or consultation notes.",
      },
    ],
    faqs: [
      {
        question: "Which ayanamsha is correct for a Kundli?",
        answer:
          "There is no single setting used by every Jyotish lineage. Lahiri is widely used, while Raman and Krishnamurti are established alternatives. Use the convention appropriate to your method and label it when sharing a chart.",
      },
      {
        question: "Can two charts have the same planet signs but different houses?",
        answer:
          "Yes. Different house systems can assign a planet to different houses while preserving its zodiac longitude. A small birth-time or coordinate difference can also move house cusps or the ascendant.",
      },
      {
        question: "Do North and South Indian charts calculate different planets?",
        answer:
          "No. They are visual conventions. With identical birth data and settings, the planetary degrees are the same even though signs and houses appear in different places on the page.",
      },
      {
        question: "Why are my Vimshottari dasha dates slightly different?",
        answer:
          "Check the Moon's exact sidereal longitude, ayanamsha, timezone, ephemeris precision, and the software's period-boundary convention. The starting balance is sensitive to the Moon's progress through its birth nakshatra.",
      },
      {
        question: "Can daylight saving time change the ascendant?",
        answer:
          "Yes. If one calculator applies the wrong historical daylight-saving offset, the underlying UTC birth moment can differ by an hour, which is enough to move the ascendant substantially. Select a named timezone for the birthplace and investigate records that fall inside a repeated or skipped clock hour.",
      },
      {
        question: "Why does a tropical chart disagree with a sidereal Kundli?",
        answer:
          "They use different zodiac reference points. A sidereal Kundli subtracts the selected ayanamsha, while a tropical chart anchors the zodiac to the equinoxes. Compare zodiac type before treating different sign labels as a calculation error.",
      },
      {
        question: "Can five minutes of birth-time difference matter?",
        answer:
          "Sometimes. It may make little difference when the ascendant and divisional boundaries are far away, but it can change an ascendant, house placement, or D9 position near a boundary. Test both ends of the plausible time range instead of assuming a universal five-minute rule.",
      },
    ],
    related: [
      {
        href: "/vedic-birth-chart-calculator",
        label: "Vedic birth chart calculator",
        description: "Run a chart with visible ayanamsha and display options.",
      },
      {
        href: "/north-indian-birth-chart-calculator",
        label: "North Indian chart guide",
        description: "Learn the fixed-house diamond layout.",
      },
      {
        href: "/south-indian-birth-chart-calculator",
        label: "South Indian chart guide",
        description: "Learn the fixed-sign rectangular layout.",
      },
      {
        href: "/navamsa-d9-calculator",
        label: "Test a Navamsa difference",
        description: "Compare the exact D1 degree, ayanamsha, and birth-time range behind a disputed D9 placement.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Why Kundli calculators differ" },
    ],
    disclaimer:
      "This guide explains calculation conventions; it does not establish astrology as a scientific method. Use astrology content for cultural study, personal reflection, and entertainment.",
  },
} satisfies Record<SeoRoute, SeoPageConfig>;

export function getSeoPageContent(route: SeoRoute): SeoPageConfig {
  return SEO_PAGE_CONTENT[route];
}
