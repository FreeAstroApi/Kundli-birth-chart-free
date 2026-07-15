"use client";

import {
  Activity,
  Archive,
  CalendarDays,
  CalendarSearch,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Download,
  FileText,
  LoaderCircle,
  MapPin,
  Moon,
  Save,
  Search,
  Settings2,
  Sun,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useId, useState } from "react";

export type KundliWorkspaceMode = "birth" | "matching" | "muhurat" | "saved";
export type KundliWorkspaceLocale = "en" | "hi";
export type KundliWorkspaceMarket = "usa" | "india";
export type KundliWorkspaceStyle = "north" | "south" | "east";
export type KundliWorkspaceFocus =
  | "general"
  | "nakshatra"
  | "navamsa"
  | "dashamsa"
  | "dasha"
  | "ashtakavarga"
  | "shadbala"
  | "manglik";

export type KundliWorkspaceResultTab =
  | "chart"
  | "planets"
  | "nakshatra"
  | "dasha"
  | "yogas"
  | "vargas"
  | "panchang"
  | "navamsa"
  | "dashamsa"
  | "shadbala"
  | "ashtakavarga"
  | "manglik";

export type KundliWorkspaceProps = {
  initialMode?: KundliWorkspaceMode;
  initialTab?: KundliWorkspaceResultTab;
  initialStyle?: KundliWorkspaceStyle;
  locale?: KundliWorkspaceLocale;
  focus?: KundliWorkspaceFocus;
  market?: KundliWorkspaceMarket;
  showModeNavigation?: boolean;
};

type CityResult = {
  name: string;
  country: string;
  state: string | null;
  district: string | null;
  lat: number;
  lng: number;
  timezone: string;
  population?: number;
};

type BirthForm = {
  name: string;
  date: string;
  time: string;
  seconds: string;
  gender: "not_specified" | "female" | "male" | "other";
  cityQuery: string;
  city: CityResult | null;
  manualCoordinates: boolean;
  manualLat: string;
  manualLng: string;
  timezoneOverride: string;
  ayanamsha: "lahiri" | "raman" | "krishnamurti";
  house_system: "whole_sign" | "equal" | "placidus";
  node_type: "mean" | "true";
};

type ChartSettings = {
  style: KundliWorkspaceStyle;
  language: KundliWorkspaceLocale;
};

type VisualChart = {
  format: "svg";
  contentType?: string;
  chart_style?: "north_indian" | "south_indian" | "east_indian";
  divisions?: number[];
  svg?: string;
};

type Mode = KundliWorkspaceMode;
type ResultTab = KundliWorkspaceResultTab;

type ReportOptions = {
  dasha: boolean;
  yogas: boolean;
  strength: boolean;
  vargas: boolean;
  panchang: boolean;
};

type Planet = {
  name: string;
  sign?: string;
  sign_id?: number;
  house?: number;
  absolute_degree?: number;
  degree_in_sign?: number;
  is_retrograde?: boolean;
  nakshatra?: string;
  nakshatra_id?: number;
  pada?: number;
  nakshatra_lord?: string;
};

type House = {
  house: number;
  sign?: string;
  sign_id?: number;
  degree_cusp?: number | null;
};

type KundliResult = {
  input: {
    label: string;
    city: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  chart?: {
    ascendant?: {
      sign?: string;
      sign_id?: number;
      degree?: number;
      nakshatra?: {
        name?: string;
        pada?: number;
        lord?: string;
      };
    };
    planets?: Planet[];
    houses?: House[];
    sade_sati?: {
      active?: boolean;
      phase?: string | null;
      description?: string;
    };
    metadata?: Record<string, unknown>;
  };
  dasha?: Record<string, unknown>;
  yogas?: Record<string, unknown>;
  strength?: Record<string, unknown>;
  vargas?: Record<string, unknown>;
  panchang?: Record<string, unknown>;
  visualChart?: VisualChart;
  errors?: Record<string, string>;
};

type SavedChart = {
  id: string;
  label: string;
  birth: BirthForm;
  options: ReportOptions;
  settings: ChartSettings;
  result: KundliResult;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type MatchResult = {
  input?: {
    p1?: { label?: string; city?: string };
    p2?: { label?: string; city?: string };
    ayanamsha?: string;
  };
  match?: Record<string, unknown>;
};

type MuhuratPurpose =
  | "general_work"
  | "vehicle_purchase"
  | "property_purchase"
  | "griha_pravesh"
  | "namkaran"
  | "mundan";

type MuhuratForm = {
  purpose: MuhuratPurpose;
  startDate: string;
  endDate: string;
  cityQuery: string;
  city: CityResult | null;
  ayanamsha: BirthForm["ayanamsha"];
  limit: string;
};

type MuhuratWindow = {
  date?: string;
  start?: string;
  end?: string;
  duration_minutes?: number;
  score?: number;
  quality?: string;
  reasons?: string[];
  warnings?: string[];
  source_periods?: string[];
  criteria?: Record<string, unknown>;
};

type MuhuratResult = {
  input?: {
    city?: string;
    lat?: number;
    lng?: number;
    timezone?: string;
  };
  purpose?: MuhuratPurpose;
  range?: {
    start_date?: string;
    end_date?: string;
    day_count?: number;
  };
  best_windows?: MuhuratWindow[];
  metadata?: Record<string, unknown>;
};

const initialForm: BirthForm = {
  name: "Client",
  date: "1997-09-22",
  time: "23:25",
  seconds: "00",
  gender: "not_specified",
  cityQuery: "Mumbai",
  city: {
    name: "Mumbai",
    country: "IN",
    state: "Maharashtra",
    district: null,
    lat: 19.076,
    lng: 72.8777,
    timezone: "Asia/Kolkata",
    population: 12691836,
  },
  manualCoordinates: false,
  manualLat: "",
  manualLng: "",
  timezoneOverride: "",
  ayanamsha: "lahiri",
  house_system: "whole_sign",
  node_type: "mean",
};

const newYorkInitialForm: BirthForm = {
  ...initialForm,
  cityQuery: "New York",
  city: {
    name: "New York",
    country: "US",
    state: "New York",
    district: null,
    lat: 40.7128,
    lng: -74.006,
    timezone: "America/New_York",
    population: 8_258_035,
  },
};

function createInitialForm(market: KundliWorkspaceMarket, locale: KundliWorkspaceLocale): BirthForm {
  const source = market === "usa" ? newYorkInitialForm : initialForm;
  return {
    ...source,
    name: locale === "hi" ? "जातक" : "Client",
    city: source.city ? { ...source.city } : null,
  };
}

function createInitialMuhuratForm(market: KundliWorkspaceMarket): MuhuratForm {
  const birth = market === "usa" ? newYorkInitialForm : initialForm;
  return {
    purpose: "general_work",
    startDate: "",
    endDate: "",
    cityQuery: birth.cityQuery,
    city: birth.city ? { ...birth.city } : null,
    ayanamsha: "lahiri",
    limit: "8",
  };
}

const englishText = {
  birthChart: "Birth Chart",
  kundliMatching: "Kundli Matching",
  muhuratSearch: "Muhurat Search",
  savedClients: "Saved Clients",
  birthDetails: "Birth Details",
  clientName: "Client name",
  clientNamePlaceholder: "Client name",
  date: "Date",
  time: "Time",
  seconds: "Seconds",
  gender: "Gender",
  notSpecified: "Not specified",
  female: "Female",
  male: "Male",
  other: "Other",
  birthPlace: "Birth place",
  location: "Location",
  searchCity: "Search city or locality",
  manualCoordinates: "Manual coordinates / timezone",
  latitude: "Latitude",
  longitude: "Longitude",
  timezone: "Timezone",
  ayanamsha: "Ayanamsha",
  houses: "Houses",
  nodes: "Nodes",
  whole: "Whole",
  equal: "Equal",
  mean: "Mean",
  trueNode: "True",
  generateKundli: "Generate Kundli",
  selectVerifiedCity: "Select a city from search so the chart uses verified coordinates and timezone.",
  unableKundli: "Unable to calculate Kundli",
  citySearchFailed: "City search failed",
  analysisModules: "Analysis Modules",
  chartSettings: "Chart Settings",
  chartStyle: "Chart style",
  northIndian: "North Indian",
  southIndian: "South Indian",
  eastIndian: "East Indian",
  englishReport: "English report language",
  hindiReport: "Hindi interface language",
  emptyBirthTitle: "Enter birth details to cast the Kundli.",
  emptyBirthBody: "Results include the birth chart, planet table, Vimshottari Dasha, yogas, strengths, divisional charts, and Panchang.",
  person1: "Person 1",
  person2: "Person 2",
  calculateMatch: "Calculate Match",
  selectMatchingCities: "Select a verified city from search for both birth profiles.",
  unableMatch: "Unable to calculate match",
  matchEmptyTitle: "Enter two birth profiles to calculate matching.",
  matchEmptyBody: "Results include Ashtakoota score, Nadi, Bhakoot, Mangal compatibility, and a print-ready summary.",
  compatibilityReport: "Compatibility report",
  matchInterpretation: "Review individual koota scores and dosha notes before final judgment.",
  of: "of",
  ashtakootaScores: "Ashtakoota Scores",
  matchingDoshas: "Matching Doshas",
  noMatchDosha: "No dosha data returned for this match.",
  matchPdf: "Match PDF",
  saveMatchPdf: "Save matching report as PDF",
  purpose: "Purpose",
  startDate: "Start date",
  endDate: "End date",
  bestWindows: "Best windows",
  findMuhurat: "Find Muhurat Windows",
  selectMuhuratCity: "Select a city from search before finding Muhurat windows.",
  invalidDateRange: "Choose a valid start and end date.",
  endBeforeStart: "End date must be on or after the start date.",
  rangeTooLong: "Muhurat searches are limited to 31 days.",
  unableMuhurat: "Unable to search Muhurat windows",
  muhuratEmptyTitle: "Find auspicious Muhurat windows.",
  muhuratEmptyBody: "Select a purpose, location, and date range to see ranked public windows.",
  publicSearch: "Public search",
  selectedLocation: "Selected location",
  localTime: "Local time",
  window: "Window",
  windows: "Windows",
  noWindows: "No qualifying windows found.",
  noWindowsBody: "Try another purpose or a wider date range.",
  rank: "Rank",
  until: "Until",
  score: "Score",
  duration: "Duration",
  weekday: "Weekday",
  noCaution: "No caution overlap returned for this window.",
  generalWork: "General work",
  vehiclePurchase: "Vehicle purchase",
  propertyPurchase: "Property purchase",
  grihaPravesh: "Griha Pravesh",
  namkaran: "Namkaran",
  mundan: "Mundan",
  savedSearch: "Search saved charts",
  savedChart: "browser-saved chart",
  savedCharts: "browser-saved charts",
  noSaved: "No saved charts yet.",
  noSavedBody: "Generate a Kundli and save it to keep the chart in this browser.",
  openChart: "Open chart",
  chart: "Chart",
  planets: "Planets",
  dasha: "Dasha",
  yogas: "Yogas",
  vargas: "Vargas",
  panchang: "Panchang",
  navamsa: "D9 Navamsa",
  nakshatra: "Birth Nakshatra",
  dashamsa: "D10 Dashamsa",
  shadbala: "Shadbala",
  ashtakavarga: "Ashtakavarga",
  manglik: "Manglik Dosha",
  print: "Print",
  moduleErrors: "Some modules did not return data",
  navamsaTitle: "Navamsa (D9) Chart",
  navamsaMissing: "D9 Navamsa was not returned by the Vargas endpoint.",
  nakshatraTitle: "Moon Nakshatra and Pada",
  nakshatraMissing: "Moon Nakshatra data is unavailable for this chart.",
  dashamsaTitle: "Dashamsa (D10) Career Chart",
  dashamsaMissing: "D10 Dashamsa was not returned by the Vargas endpoint.",
  shadbalaTitle: "Shadbala Planetary Strength",
  shadbalaMissing: "Shadbala strength data is unavailable for this chart.",
  ashtakavargaTitle: "Sarvashtakavarga House Strength",
  ashtakavargaMissing: "Ashtakavarga data is unavailable for this chart.",
  manglikTitle: "Manglik Dosha Analysis",
  manglikNone: "No active Manglik or Mangal Dosha combination was returned for this chart.",
  manglikDetected: "Manglik or Mangal Dosha was detected in the returned calculation.",
  marsPlacement: "Mars placement",
  consultationNotes: "Consultation notes",
  privateNotes: "Private notes are saved only in this browser.",
  saveChart: "Save chart",
  exportJson: "Export JSON",
  savePdf: "Save as PDF",
  browserPrivacy: "Saved charts and notes remain private to this browser unless you export them.",
} as const;

const hindiText: Record<keyof typeof englishText, string> = {
  birthChart: "जन्म कुंडली",
  kundliMatching: "कुंडली मिलान",
  muhuratSearch: "मुहूर्त खोज",
  savedClients: "सहेजी गई कुंडलियाँ",
  birthDetails: "जन्म विवरण",
  clientName: "नाम",
  clientNamePlaceholder: "जातक का नाम",
  date: "जन्म तिथि",
  time: "जन्म समय",
  seconds: "सेकंड",
  gender: "लिंग",
  notSpecified: "नहीं बताया",
  female: "महिला",
  male: "पुरुष",
  other: "अन्य",
  birthPlace: "जन्म स्थान",
  location: "स्थान",
  searchCity: "शहर या स्थान खोजें",
  manualCoordinates: "अक्षांश, देशांतर या समय क्षेत्र स्वयं भरें",
  latitude: "अक्षांश",
  longitude: "देशांतर",
  timezone: "समय क्षेत्र",
  ayanamsha: "अयनांश",
  houses: "भाव पद्धति",
  nodes: "राहु-केतु गणना",
  whole: "पूर्ण राशि",
  equal: "समान भाव",
  mean: "मध्यम",
  trueNode: "वास्तविक",
  generateKundli: "कुंडली बनाएं",
  selectVerifiedCity: "सही निर्देशांक और समय क्षेत्र के लिए खोज सूची से शहर चुनें।",
  unableKundli: "कुंडली की गणना नहीं हो सकी",
  citySearchFailed: "शहर खोज नहीं हो सकी",
  analysisModules: "विश्लेषण विकल्प",
  chartSettings: "कुंडली सेटिंग",
  chartStyle: "कुंडली शैली",
  northIndian: "उत्तर भारतीय",
  southIndian: "दक्षिण भारतीय",
  eastIndian: "पूर्व भारतीय",
  englishReport: "अंग्रेज़ी रिपोर्ट भाषा",
  hindiReport: "हिंदी इंटरफ़ेस भाषा",
  emptyBirthTitle: "कुंडली बनाने के लिए जन्म विवरण भरें।",
  emptyBirthBody: "परिणाम में जन्म कुंडली, ग्रह तालिका, विंशोत्तरी दशा, योग, ग्रह बल, वर्ग कुंडलियाँ और पंचांग शामिल हैं।",
  person1: "व्यक्ति 1",
  person2: "व्यक्ति 2",
  calculateMatch: "कुंडली मिलान करें",
  selectMatchingCities: "दोनों जन्म विवरणों के लिए खोज सूची से सही शहर चुनें।",
  unableMatch: "कुंडली मिलान नहीं हो सका",
  matchEmptyTitle: "मिलान के लिए दोनों व्यक्तियों का जन्म विवरण भरें।",
  matchEmptyBody: "परिणाम में अष्टकूट गुण, नाड़ी, भकूट, मंगल अनुकूलता और प्रिंट करने योग्य सारांश शामिल हैं।",
  compatibilityReport: "अनुकूलता रिपोर्ट",
  matchInterpretation: "अंतिम निर्णय से पहले प्रत्येक कूट के अंक और दोष संबंधी टिप्पणियाँ देखें।",
  of: "में से",
  ashtakootaScores: "अष्टकूट गुण",
  matchingDoshas: "मिलान दोष",
  noMatchDosha: "इस मिलान के लिए दोष संबंधी डेटा नहीं मिला।",
  matchPdf: "मिलान PDF",
  saveMatchPdf: "मिलान रिपोर्ट PDF के रूप में सहेजें",
  purpose: "कार्य",
  startDate: "आरंभ तिथि",
  endDate: "अंतिम तिथि",
  bestWindows: "श्रेष्ठ मुहूर्त",
  findMuhurat: "मुहूर्त खोजें",
  selectMuhuratCity: "मुहूर्त खोजने से पहले सूची से शहर चुनें।",
  invalidDateRange: "सही आरंभ और अंतिम तिथि चुनें।",
  endBeforeStart: "अंतिम तिथि आरंभ तिथि के बाद या उसी दिन होनी चाहिए।",
  rangeTooLong: "मुहूर्त खोज अधिकतम 31 दिनों के लिए की जा सकती है।",
  unableMuhurat: "मुहूर्त नहीं खोजा जा सका",
  muhuratEmptyTitle: "शुभ मुहूर्त खोजें।",
  muhuratEmptyBody: "श्रेष्ठ सार्वजनिक मुहूर्त देखने के लिए कार्य, स्थान और तिथि अवधि चुनें।",
  publicSearch: "सार्वजनिक गणना",
  selectedLocation: "चुना गया स्थान",
  localTime: "स्थानीय समय",
  window: "मुहूर्त",
  windows: "मुहूर्त",
  noWindows: "उपयुक्त मुहूर्त नहीं मिला।",
  noWindowsBody: "दूसरा कार्य चुनें या तिथि अवधि बढ़ाएं।",
  rank: "क्रम",
  until: "तक",
  score: "अंक",
  duration: "अवधि",
  weekday: "वार",
  noCaution: "इस मुहूर्त में कोई सावधानी अवधि नहीं मिली।",
  generalWork: "सामान्य कार्य",
  vehiclePurchase: "वाहन खरीद",
  propertyPurchase: "संपत्ति खरीद",
  grihaPravesh: "गृह प्रवेश",
  namkaran: "नामकरण",
  mundan: "मुंडन",
  savedSearch: "सहेजी गई कुंडली खोजें",
  savedChart: "कुंडली ब्राउज़र में सहेजी गई",
  savedCharts: "कुंडलियाँ ब्राउज़र में सहेजी गईं",
  noSaved: "अभी कोई कुंडली सहेजी नहीं गई है।",
  noSavedBody: "कुंडली बनाकर सहेजें; वह इसी ब्राउज़र में उपलब्ध रहेगी।",
  openChart: "कुंडली खोलें",
  chart: "कुंडली",
  planets: "ग्रह",
  dasha: "दशा",
  yogas: "योग",
  vargas: "वर्ग कुंडली",
  panchang: "पंचांग",
  navamsa: "D9 नवांश",
  nakshatra: "जन्म नक्षत्र",
  dashamsa: "D10 दशमांश",
  shadbala: "षड्बल",
  ashtakavarga: "अष्टकवर्ग",
  manglik: "मांगलिक दोष",
  print: "प्रिंट करें",
  moduleErrors: "कुछ विश्लेषणों का डेटा नहीं मिला",
  navamsaTitle: "नवांश (D9) कुंडली",
  navamsaMissing: "वर्ग गणना में D9 नवांश डेटा नहीं मिला।",
  nakshatraTitle: "चंद्र नक्षत्र और पाद",
  nakshatraMissing: "इस कुंडली में चंद्र नक्षत्र का डेटा उपलब्ध नहीं है।",
  dashamsaTitle: "दशमांश (D10) कर्म कुंडली",
  dashamsaMissing: "वर्ग गणना में D10 दशमांश डेटा नहीं मिला।",
  shadbalaTitle: "षड्बल ग्रह शक्ति",
  shadbalaMissing: "इस कुंडली के लिए षड्बल डेटा उपलब्ध नहीं है।",
  ashtakavargaTitle: "सर्वाष्टकवर्ग भाव शक्ति",
  ashtakavargaMissing: "इस कुंडली के लिए अष्टकवर्ग डेटा उपलब्ध नहीं है।",
  manglikTitle: "मांगलिक दोष विश्लेषण",
  manglikNone: "इस कुंडली में सक्रिय मांगलिक या मंगल दोष नहीं मिला।",
  manglikDetected: "गणना में मांगलिक या मंगल दोष पाया गया है।",
  marsPlacement: "मंगल की स्थिति",
  consultationNotes: "परामर्श नोट्स",
  privateNotes: "निजी नोट्स केवल इसी ब्राउज़र में सहेजे जाते हैं।",
  saveChart: "कुंडली सहेजें",
  exportJson: "JSON निर्यात करें",
  savePdf: "PDF के रूप में सहेजें",
  browserPrivacy: "सहेजी गई कुंडलियाँ और नोट्स निर्यात किए बिना इसी ब्राउज़र तक सीमित रहते हैं।",
};

function t(locale: KundliWorkspaceLocale, key: keyof typeof englishText) {
  return locale === "hi" ? hindiText[key] : englishText[key];
}

function ui(locale: KundliWorkspaceLocale, english: string, hindi: string) {
  return locale === "hi" ? hindi : english;
}

const hindiPlanetNames: Record<string, string> = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "गुरु",
  Venus: "शुक्र",
  Saturn: "शनि",
  Rahu: "राहु",
  Ketu: "केतु",
  Uranus: "अरुण",
  Neptune: "वरुण",
  Pluto: "यम",
};

const hindiSignNames: Record<string, string> = {
  Aries: "मेष",
  Taurus: "वृषभ",
  Gemini: "मिथुन",
  Cancer: "कर्क",
  Leo: "सिंह",
  Virgo: "कन्या",
  Libra: "तुला",
  Scorpio: "वृश्चिक",
  Sagittarius: "धनु",
  Capricorn: "मकर",
  Aquarius: "कुंभ",
  Pisces: "मीन",
};

function planetUi(name: string | undefined, locale: KundliWorkspaceLocale) {
  if (!name) return "N/A";
  return locale === "hi" ? (hindiPlanetNames[name] ?? name) : name;
}

function signUi(name: string | undefined, locale: KundliWorkspaceLocale) {
  if (!name) return "N/A";
  return locale === "hi" ? (hindiSignNames[name] ?? name) : name;
}

const muhuratPurposes: { value: MuhuratPurpose; label: string }[] = [
  { value: "general_work", label: "General work" },
  { value: "vehicle_purchase", label: "Vehicle purchase" },
  { value: "property_purchase", label: "Property purchase" },
  { value: "griha_pravesh", label: "Griha Pravesh" },
  { value: "namkaran", label: "Namkaran" },
  { value: "mundan", label: "Mundan" },
];

const signGlyphs = ["", "Ar", "Ta", "Ge", "Cn", "Le", "Vi", "Li", "Sc", "Sg", "Cp", "Aq", "Pi"];
const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

const houseCoordinates: Record<number, { x: number; y: number }> = {
  1: { x: 50, y: 18 },
  2: { x: 30, y: 12 },
  3: { x: 15, y: 29 },
  4: { x: 30, y: 52 },
  5: { x: 15, y: 73 },
  6: { x: 30, y: 89 },
  7: { x: 50, y: 82 },
  8: { x: 70, y: 89 },
  9: { x: 85, y: 73 },
  10: { x: 70, y: 52 },
  11: { x: 85, y: 29 },
  12: { x: 70, y: 12 },
};

const optionLabels: Record<keyof ReportOptions, string> = {
  dasha: "Vimshottari",
  yogas: "Yogas",
  strength: "Strength",
  vargas: "Vargas",
  panchang: "Panchang",
};

const optionLabelsHi: Record<keyof ReportOptions, string> = {
  dasha: "विंशोत्तरी दशा",
  yogas: "योग और दोष",
  strength: "षड्बल और अष्टकवर्ग",
  vargas: "वर्ग कुंडलियाँ",
  panchang: "पंचांग",
};

function createInitialOptions(focus: KundliWorkspaceFocus): ReportOptions {
  if (focus === "general") {
    return { dasha: true, yogas: true, strength: true, vargas: true, panchang: true };
  }
  return {
    dasha: focus === "dasha" || focus === "nakshatra",
    yogas: focus === "manglik",
    strength: focus === "shadbala" || focus === "ashtakavarga",
    vargas: focus === "navamsa" || focus === "dashamsa",
    panchang: false,
  };
}

const planetShort: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

const baseResultTabs: ResultTab[] = [
  "chart",
  "planets",
  "dasha",
  "yogas",
  "vargas",
  "panchang",
];

const resultTabTextKeys: Record<ResultTab, keyof typeof englishText> = {
  chart: "chart",
  planets: "planets",
  nakshatra: "nakshatra",
  dasha: "dasha",
  yogas: "yogas",
  vargas: "vargas",
  panchang: "panchang",
  navamsa: "navamsa",
  dashamsa: "dashamsa",
  shadbala: "shadbala",
  ashtakavarga: "ashtakavarga",
  manglik: "manglik",
};

const focusResultTabs: Record<KundliWorkspaceFocus, ResultTab> = {
  general: "chart",
  nakshatra: "nakshatra",
  navamsa: "navamsa",
  dashamsa: "dashamsa",
  dasha: "dasha",
  ashtakavarga: "ashtakavarga",
  shadbala: "shadbala",
  manglik: "manglik",
};

function resultTabsFor(focus: KundliWorkspaceFocus, activeTab: ResultTab) {
  const specialistTabs: Record<KundliWorkspaceFocus, ResultTab[]> = {
    general: baseResultTabs,
    nakshatra: ["nakshatra", "chart", "planets", "dasha"],
    navamsa: ["navamsa", "chart", "planets", "vargas"],
    dashamsa: ["dashamsa", "chart", "planets", "vargas"],
    dasha: ["dasha", "chart", "planets"],
    ashtakavarga: ["ashtakavarga", "chart", "planets"],
    shadbala: ["shadbala", "chart", "planets"],
    manglik: ["manglik", "chart", "planets", "yogas"],
  };
  const tabs = [...specialistTabs[focus]];
  if (!tabs.includes(activeTab)) tabs.unshift(activeTab);
  return tabs;
}

const signLords: Record<string, string> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Mars",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
  Pisces: "Jupiter",
};

const chartDescriptions: Record<ChartSettings["style"], string> = {
  north: "North Indian diamond",
  south: "South Indian fixed signs",
  east: "East Indian square",
};

const chartDescriptionsHi: Record<ChartSettings["style"], string> = {
  north: "उत्तर भारतीय हीरा शैली",
  south: "दक्षिण भारतीय स्थिर राशि शैली",
  east: "पूर्वी भारतीय वर्ग शैली",
};

function chartDescription(
  style: ChartSettings["style"],
  locale: KundliWorkspaceLocale,
) {
  return locale === "hi" ? chartDescriptionsHi[style] : chartDescriptions[style];
}

const visualChartStyles: Record<ChartSettings["style"], VisualChart["chart_style"]> = {
  north: "north_indian",
  south: "south_indian",
  east: "east_indian",
};

const southSignCells: Record<number, { x: number; y: number }> = {
  12: { x: 0, y: 0 },
  1: { x: 25, y: 0 },
  2: { x: 50, y: 0 },
  3: { x: 75, y: 0 },
  11: { x: 0, y: 25 },
  4: { x: 75, y: 25 },
  10: { x: 0, y: 50 },
  5: { x: 75, y: 50 },
  9: { x: 0, y: 75 },
  8: { x: 25, y: 75 },
  7: { x: 50, y: 75 },
  6: { x: 75, y: 75 },
};

const eastHouseCoordinates: Record<number, { x: number; y: number }> = {
  1: { x: 50, y: 14 },
  2: { x: 24, y: 18 },
  3: { x: 15, y: 38 },
  4: { x: 25, y: 56 },
  5: { x: 15, y: 81 },
  6: { x: 31, y: 83 },
  7: { x: 50, y: 61 },
  8: { x: 69, y: 83 },
  9: { x: 85, y: 81 },
  10: { x: 75, y: 56 },
  11: { x: 85, y: 38 },
  12: { x: 76, y: 18 },
};

const eastHouseAnchors: Partial<Record<number, "start" | "middle" | "end">> = {
  6: "end",
  8: "start",
};

export default function KundliWorkspace({
  initialMode = "birth",
  initialTab,
  initialStyle = "north",
  locale = "en",
  focus = "general",
  market = "india",
  showModeNavigation = true,
}: KundliWorkspaceProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [activeTab, setActiveTab] = useState<ResultTab>(() => initialTab ?? focusResultTabs[focus]);
  const [settings, setSettings] = useState<ChartSettings>({ style: initialStyle, language: locale });
  const [form, setForm] = useState<BirthForm>(() => createInitialForm(market, locale));
  const [matchP1, setMatchP1] = useState<BirthForm>(() => ({
    ...createInitialForm(market, locale),
    name: t(locale, "person1"),
  }));
  const [matchP2, setMatchP2] = useState<BirthForm>(() => ({
    ...createInitialForm(market, locale),
    name: t(locale, "person2"),
    date: "1999-08-20",
    time: "14:15",
    ...(market === "india"
      ? {
          cityQuery: "Delhi",
          city: {
            name: "Delhi",
            country: "IN",
            state: "Delhi",
            district: null,
            lat: 28.6139,
            lng: 77.209,
            timezone: "Asia/Kolkata",
          },
        }
      : {}),
  }));
  const [options, setOptions] = useState<ReportOptions>(() => createInitialOptions(focus));
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState("");
  const [result, setResult] = useState<KundliResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [notes, setNotes] = useState("");
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [savedSearch, setSavedSearch] = useState("");
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [matching, setMatching] = useState(false);
  const [matchError, setMatchError] = useState("");
  const [muhuratForm, setMuhuratForm] = useState<MuhuratForm>(() => createInitialMuhuratForm(market));
  const [muhuratCityResults, setMuhuratCityResults] = useState<CityResult[]>([]);
  const [muhuratCityLoading, setMuhuratCityLoading] = useState(false);
  const [muhuratCityError, setMuhuratCityError] = useState("");
  const [muhuratResult, setMuhuratResult] = useState<MuhuratResult | null>(null);
  const [muhuratLoading, setMuhuratLoading] = useState(false);
  const [muhuratError, setMuhuratError] = useState("");

  useEffect(() => {
    loadSavedCharts().then(setSavedCharts).catch(() => setSavedCharts([]));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMuhuratForm((current) => {
        if (current.startDate && current.endDate) return current;
        const startDate = currentDateInputInTimeZone(
          current.city?.timezone ??
            (market === "usa" ? "America/New_York" : "Asia/Kolkata"),
        );
        return {
          ...current,
          startDate,
          endDate: addDaysToDateInput(startDate, 30),
        };
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [market]);

  useEffect(() => {
    const q = form.cityQuery.trim();
    if (q.length < 2 || form.city?.name === q) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setCityLoading(true);
      setCityError("");
      try {
        const response = await fetch(`/api/geo/search?q=${encodeURIComponent(q)}&limit=8`, {
          signal: controller.signal,
        });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error ?? t(locale, "citySearchFailed"));
        }
        setCityResults(payload.results ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setCityError(error instanceof Error ? error.message : t(locale, "citySearchFailed"));
        }
      } finally {
        if (!controller.signal.aborted) {
          setCityLoading(false);
        }
      }
    }, 280);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [form.cityQuery, form.city?.name, locale]);

  useEffect(() => {
    const q = muhuratForm.cityQuery.trim();
    if (q.length < 2 || muhuratForm.city?.name === q) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setMuhuratCityLoading(true);
      setMuhuratCityError("");
      try {
        const response = await fetch(`/api/geo/search?q=${encodeURIComponent(q)}&limit=8`, {
          signal: controller.signal,
        });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error ?? t(locale, "citySearchFailed"));
        }
        setMuhuratCityResults(payload.results ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setMuhuratCityError(error instanceof Error ? error.message : t(locale, "citySearchFailed"));
        }
      } finally {
        if (!controller.signal.aborted) {
          setMuhuratCityLoading(false);
        }
      }
    }, 280);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [locale, muhuratForm.cityQuery, muhuratForm.city?.name]);

  async function submitKundli(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!form.city) {
      setSubmitError(t(locale, "selectVerifiedCity"));
      return;
    }

    const [year, month, day] = form.date.split("-").map(Number);
    const [hour, minute] = form.time.split(":").map(Number);
    const lat = form.manualCoordinates && form.manualLat.trim() ? Number(form.manualLat) : form.city.lat;
    const lng = form.manualCoordinates && form.manualLng.trim() ? Number(form.manualLng) : form.city.lng;
    const timezone = form.timezoneOverride.trim() || form.city.timezone;

    setSubmitting(true);
    try {
      const response = await fetch("/api/kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birth: {
            label: form.name,
            year,
            month,
            day,
            hour,
            minute,
            second: Number(form.seconds) || 0,
            gender: form.gender,
            city: form.city.name,
            lat,
            lng,
            tz_str: timezone,
            ayanamsha: form.ayanamsha,
            house_system: form.house_system,
            node_type: form.node_type,
          },
          options,
          visual: {
            chart_style: visualChartStyles[settings.style],
          },
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? t(locale, "unableKundli"));
      }
      setResult(payload);
      setActiveTab(initialTab ?? focusResultTabs[focus]);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t(locale, "unableKundli"));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitMatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMatchError("");

    if (!matchP1.city || !matchP2.city) {
      setMatchError(t(locale, "selectMatchingCities"));
      return;
    }

    setMatching(true);
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          p1: birthPayload(matchP1),
          p2: birthPayload(matchP2),
          ayanamsha: form.ayanamsha,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? t(locale, "unableMatch"));
      }
      setMatchResult(payload);
    } catch (error) {
      setMatchError(error instanceof Error ? error.message : t(locale, "unableMatch"));
    } finally {
      setMatching(false);
    }
  }

  async function submitMuhurat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMuhuratError("");

    if (!muhuratForm.city) {
      setMuhuratError(t(locale, "selectMuhuratCity"));
      return;
    }

    const dayCount = dateRangeDayCount(muhuratForm.startDate, muhuratForm.endDate);
    if (!Number.isFinite(dayCount)) {
      setMuhuratError(t(locale, "invalidDateRange"));
      return;
    }
    if (dayCount < 1) {
      setMuhuratError(t(locale, "endBeforeStart"));
      return;
    }
    if (dayCount > 31) {
      setMuhuratError(t(locale, "rangeTooLong"));
      return;
    }

    setMuhuratLoading(true);
    try {
      const response = await fetch("/api/muhurat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose: muhuratForm.purpose,
          start_date: muhuratForm.startDate,
          end_date: muhuratForm.endDate,
          city: muhuratForm.city.name,
          lat: muhuratForm.city.lat,
          lng: muhuratForm.city.lng,
          tz_str: muhuratForm.city.timezone,
          ayanamsha: muhuratForm.ayanamsha,
          limit: Number(muhuratForm.limit),
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? t(locale, "unableMuhurat"));
      }
      setMuhuratResult(payload);
    } catch (error) {
      setMuhuratError(error instanceof Error ? error.message : t(locale, "unableMuhurat"));
    } finally {
      setMuhuratLoading(false);
    }
  }

  async function saveCurrentChart() {
    if (!result) return;
    const now = new Date().toISOString();
    const saved: SavedChart = {
      id: crypto.randomUUID(),
      label: result.input.label,
      birth: form,
      options,
      settings,
      result,
      notes,
      createdAt: now,
      updatedAt: now,
    };
    await putSavedChart(saved);
    setSavedCharts(await loadSavedCharts());
  }

  async function deleteSavedChart(id: string) {
    await removeSavedChart(id);
    setSavedCharts(await loadSavedCharts());
  }

  function loadSavedChart(chart: SavedChart) {
    setForm(chart.birth);
    setOptions(chart.options);
    setSettings(chart.settings);
    setResult(chart.result);
    setNotes(chart.notes);
    setMode("birth");
    setActiveTab(initialTab ?? focusResultTabs[focus]);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify({ form, options, settings, result, notes }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result?.input.label ?? "kundli"}-chart.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const workspaceRoutes = {
    birth: locale === "hi" ? "/hi/janam-kundli" : market === "usa" ? "/vedic-birth-chart-calculator" : "/kundli",
    matching: locale === "hi" ? "/hi/kundli-milan" : "/kundli-matching",
    muhurat: "/muhurat",
  } as const;
  const prioritizeResults =
    (mode === "birth" && Boolean(result)) ||
    (mode === "matching" && Boolean(matchResult)) ||
    (mode === "muhurat" && Boolean(muhuratResult));

  return (
    <div className="kundli-workspace bg-[#fffaf0] text-stone-950" lang={locale === "hi" ? "hi" : "en"}>
      {showModeNavigation ? (
        <nav aria-label={locale === "hi" ? "कुंडली उपकरण" : "Kundli tools"} className="border-b border-[#efd99d] bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3 sm:px-6">
            <ModeButton active={mode === "birth"} href={workspaceRoutes.birth} icon={<Sun size={16} />} label={t(locale, "birthChart")} />
            <ModeButton active={mode === "matching"} href={workspaceRoutes.matching} icon={<Users size={16} />} label={t(locale, "kundliMatching")} />
            <ModeButton active={mode === "muhurat"} href={workspaceRoutes.muhurat} icon={<CalendarSearch size={16} />} label={t(locale, "muhuratSearch")} />
            <ModeButton active={mode === "saved"} icon={<Archive size={16} />} label={t(locale, "savedClients")} onClick={() => setMode("saved")} />
          </div>
        </nav>
      ) : null}

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[392px_1fr]">
        <aside className={`space-y-4 ${prioritizeResults ? "order-2 lg:order-1" : ""}`}>
          {mode === "birth" ? (
          <form onSubmit={submitKundli} className="rounded border border-[#e1c878] bg-white">
            <div className="border-b border-[#f0dfae] px-4 py-3">
              <div className="flex items-center gap-2 text-[#681414]">
                <CalendarDays size={20} />
                <h2 className="font-semibold">{t(locale, "birthDetails")}</h2>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <label className="block">
                <span className="field-label">{t(locale, "clientName")}</span>
                <input
                  className="field-input"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder={t(locale, "clientNamePlaceholder")}
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="field-label">{t(locale, "date")}</span>
                  <input
                    className="field-input"
                    type="date"
                    value={form.date}
                    onChange={(event) => setForm({ ...form, date: event.target.value })}
                    required
                  />
                </label>
                <label className="block">
                  <span className="field-label">{t(locale, "time")}</span>
                  <input
                    className="field-input"
                    type="time"
                    value={form.time}
                    onChange={(event) => setForm({ ...form, time: event.target.value })}
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="field-label">{t(locale, "seconds")}</span>
                  <input
                    className="field-input"
                    type="number"
                    min="0"
                    max="59"
                    value={form.seconds}
                    onChange={(event) => setForm({ ...form, seconds: event.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="field-label">{t(locale, "gender")}</span>
                  <select
                    className="field-input field-select"
                    value={form.gender}
                    onChange={(event) => setForm({ ...form, gender: event.target.value as BirthForm["gender"] })}
                  >
                    <option value="not_specified">{t(locale, "notSpecified")}</option>
                    <option value="female">{t(locale, "female")}</option>
                    <option value="male">{t(locale, "male")}</option>
                    <option value="other">{t(locale, "other")}</option>
                  </select>
                </label>
              </div>

              <div className="relative">
                <label className="block">
                  <span className="field-label">{t(locale, "birthPlace")}</span>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      size={16}
                    />
                    <input
                      className="field-input field-input-with-icon"
                      role="combobox"
                      aria-autocomplete="list"
                      aria-expanded={cityResults.length > 0}
                      aria-controls="birth-city-results"
                      value={form.cityQuery}
                      onChange={(event) => {
                        const cityQuery = event.target.value;
                        if (cityQuery.trim().length < 2) {
                          setCityResults([]);
                          setCityError("");
                        }
                        setForm({ ...form, cityQuery, city: null });
                      }}
                      placeholder={t(locale, "searchCity")}
                      required
                    />
                    {cityLoading ? (
                      <LoaderCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#a53b21]"
                        size={16}
                      />
                    ) : null}
                  </div>
                </label>

                {cityResults.length > 0 ? (
                  <div id="birth-city-results" role="listbox" className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded border border-[#dbbf70] bg-white shadow-lg">
                    {cityResults.map((city) => (
                      <button
                        key={`${city.name}-${city.lat}-${city.lng}`}
                        type="button"
                        role="option"
                        aria-selected="false"
                        className="flex w-full items-start gap-3 border-b border-stone-100 px-3 py-2 text-left last:border-0 hover:bg-[#fff3cf]"
                        onClick={() => {
                          setForm({
                            ...form,
                            city,
                            cityQuery: city.name,
                            manualCoordinates: false,
                            manualLat: "",
                            manualLng: "",
                            timezoneOverride: "",
                          });
                          setCityResults([]);
                        }}
                      >
                        <MapPin className="mt-1 shrink-0 text-[#8d1f1f]" size={16} />
                        <span>
                          <span className="block text-sm font-medium text-stone-950">
                            {city.name}
                            {city.district ? `, ${city.district}` : ""}
                          </span>
                          <span className="block text-xs text-stone-600">
                            {[city.state, city.country, city.timezone].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}

                {cityError ? <p role="alert" className="mt-2 text-xs text-[#a53b21]">{cityError}</p> : null}
                {form.city ? (
                  <div className="mt-2 rounded border border-[#ead596] bg-[#fffaf0] px-3 py-2 text-xs text-stone-700">
                    <div className="font-medium text-stone-950">
                      {form.city.name}, {form.city.country}
                    </div>
                    <div>
                      {form.city.lat.toFixed(4)}, {form.city.lng.toFixed(4)} · {form.city.timezone}
                    </div>
                  </div>
                ) : null}
              </div>

              <label className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded border border-[#ecd89d] bg-[#fffaf0] px-3 py-2 text-sm">
                <span>{t(locale, "manualCoordinates")}</span>
                <span className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={form.manualCoordinates}
                    onChange={(event) => setForm({ ...form, manualCoordinates: event.target.checked })}
                  />
                  <span className="h-6 w-10 rounded-full bg-stone-300 transition peer-checked:bg-[#a53b21] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#681414]" />
                  <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition peer-checked:translate-x-4" />
                </span>
              </label>

              {form.manualCoordinates ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <label className="block">
                    <span className="field-label">{t(locale, "latitude")}</span>
                    <input
                      className="field-input"
                      type="number"
                      step="any"
                      min="-90"
                      max="90"
                      value={form.manualLat}
                      onChange={(event) => setForm({ ...form, manualLat: event.target.value })}
                      placeholder={form.city ? String(form.city.lat) : "28.6139"}
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">{t(locale, "longitude")}</span>
                    <input
                      className="field-input"
                      type="number"
                      step="any"
                      min="-180"
                      max="180"
                      value={form.manualLng}
                      onChange={(event) => setForm({ ...form, manualLng: event.target.value })}
                      placeholder={form.city ? String(form.city.lng) : "77.2090"}
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">{t(locale, "timezone")}</span>
                    <input
                      className="field-input"
                      value={form.timezoneOverride}
                      onChange={(event) => setForm({ ...form, timezoneOverride: event.target.value })}
                      placeholder={form.city?.timezone ?? "Asia/Kolkata"}
                    />
                  </label>
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <label className="block">
                  <span className="field-label">{t(locale, "ayanamsha")}</span>
                  <select
                    className="field-input field-select"
                    value={form.ayanamsha}
                    onChange={(event) =>
                      setForm({ ...form, ayanamsha: event.target.value as BirthForm["ayanamsha"] })
                    }
                  >
                    <option value="lahiri">Lahiri</option>
                    <option value="raman">Raman</option>
                    <option value="krishnamurti">KP</option>
                  </select>
                </label>
                <label className="block">
                  <span className="field-label">{t(locale, "houses")}</span>
                  <select
                    className="field-input field-select"
                    value={form.house_system}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        house_system: event.target.value as BirthForm["house_system"],
                      })
                    }
                  >
                    <option value="whole_sign">{t(locale, "whole")}</option>
                    <option value="equal">{t(locale, "equal")}</option>
                    <option value="placidus">Placidus</option>
                  </select>
                </label>
                <label className="block">
                  <span className="field-label">{t(locale, "nodes")}</span>
                  <select
                    className="field-input field-select"
                    value={form.node_type}
                    onChange={(event) =>
                      setForm({ ...form, node_type: event.target.value as BirthForm["node_type"] })
                    }
                  >
                    <option value="mean">{t(locale, "mean")}</option>
                    <option value="true">{t(locale, "trueNode")}</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="border-t border-[#f0dfae] p-4">
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white transition hover:bg-[#711818] disabled:cursor-not-allowed disabled:bg-stone-400"
                disabled={submitting}
              >
                {submitting ? <LoaderCircle className="animate-spin" size={20} /> : null}
                {t(locale, "generateKundli")}
              </button>
              {submitError ? <p role="alert" className="mt-3 text-sm text-[#a53b21]">{submitError}</p> : null}
            </div>
          </form>
          ) : null}

          {mode === "matching" ? (
            <MatchPanel
              p1={matchP1}
              p2={matchP2}
              setP1={setMatchP1}
              setP2={setMatchP2}
              ayanamsha={form.ayanamsha}
              setAyanamsha={(ayanamsha) => setForm({ ...form, ayanamsha })}
              onSubmit={submitMatch}
              loading={matching}
              error={matchError}
              locale={locale}
            />
          ) : null}

          {mode === "muhurat" ? (
            <MuhuratSearchPanel
              form={muhuratForm}
              setForm={setMuhuratForm}
              cityResults={muhuratCityResults}
              cityLoading={muhuratCityLoading}
              cityError={muhuratCityError}
              setCityResults={setMuhuratCityResults}
              setCityError={setMuhuratCityError}
              onSubmit={submitMuhurat}
              loading={muhuratLoading}
              error={muhuratError}
              locale={locale}
            />
          ) : null}

          {mode === "saved" ? (
            <SavedSearchPanel search={savedSearch} setSearch={setSavedSearch} count={savedCharts.length} locale={locale} />
          ) : null}

          {mode === "birth" ? (
          <section className="rounded border border-[#e1c878] bg-white">
            <div className="border-b border-[#f0dfae] px-4 py-3">
              <div className="flex items-center gap-2 text-[#681414]">
                <Settings2 size={20} />
                <h2 className="font-semibold">{t(locale, "analysisModules")}</h2>
              </div>
            </div>
            <div className="divide-y divide-[#ecd89d] px-4">
              {(Object.keys(options) as (keyof ReportOptions)[]).map((key) => (
                <label
                  key={key}
                  className="flex min-h-12 cursor-pointer items-center justify-between gap-4 py-3 text-sm"
                >
                  <span>{locale === "hi" ? optionLabelsHi[key] : optionLabels[key]}</span>
                  <span className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={options[key]}
                      onChange={(event) => setOptions({ ...options, [key]: event.target.checked })}
                    />
                    <span className="h-6 w-10 rounded-full bg-stone-300 transition peer-checked:bg-[#a53b21] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#681414]" />
                    <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition peer-checked:translate-x-4" />
                  </span>
                </label>
              ))}
            </div>
          </section>
          ) : null}

          {mode === "birth" ? (
            <ChartSettingsPanel settings={settings} setSettings={setSettings} locale={locale} />
          ) : null}
        </aside>

        <section className={`min-w-0 space-y-5 ${prioritizeResults ? "order-1 lg:order-2" : ""}`}>
          {mode === "birth" && result ? (
            <KundliDashboard
              result={result}
              settings={settings}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              notes={notes}
              setNotes={setNotes}
              onSave={saveCurrentChart}
              onExportJson={exportJson}
              locale={locale}
              focus={focus}
            />
          ) : null}
          {mode === "birth" && !result ? (
            <EmptyState locale={locale} focus={focus} />
          ) : null}
          {mode === "matching" ? <MatchingDashboard result={matchResult} locale={locale} /> : null}
          {mode === "muhurat" && muhuratResult ? <MuhuratDashboard result={muhuratResult} locale={locale} /> : null}
          {mode === "muhurat" && !muhuratResult ? <MuhuratEmptyState locale={locale} /> : null}
          {mode === "saved" ? (
            <SavedClientsView
              charts={savedCharts}
              search={savedSearch}
              onLoad={loadSavedChart}
              onDelete={deleteSavedChart}
              locale={locale}
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}

function EmptyState({
  locale,
  focus = "general",
}: {
  locale: KundliWorkspaceLocale;
  focus?: KundliWorkspaceFocus;
}) {
  const focusLabel = t(locale, resultTabTextKeys[focusResultTabs[focus]]);
  const title = focus === "general"
    ? t(locale, "emptyBirthTitle")
    : locale === "hi"
      ? `${focusLabel} की गणना के लिए जन्म विवरण भरें।`
      : `Enter birth details to calculate ${focusLabel}.`;
  return (
    <div className="grid min-h-80 place-items-center border-y border-[#e1c878] bg-white p-8 text-center">
      <div className="max-w-lg">
        <h2 className="text-2xl font-semibold text-[#681414]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          {t(locale, "emptyBirthBody")}
        </p>
      </div>
    </div>
  );
}

function MuhuratEmptyState({ locale }: { locale: KundliWorkspaceLocale }) {
  return (
    <div className="grid min-h-80 place-items-center border-y border-[#e1c878] bg-white p-8 text-center">
      <div className="max-w-lg">
        <h2 className="text-2xl font-semibold text-[#681414]">{t(locale, "muhuratEmptyTitle")}</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          {t(locale, "muhuratEmptyBody")}
        </p>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  icon,
  label,
  onClick,
  href,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const className = `inline-flex min-h-11 items-center gap-2 rounded border px-3 py-2 text-sm font-semibold ${
    active
      ? "border-[#8d1f1f] bg-[#8d1f1f] text-white"
      : "border-[#d8bd72] bg-[#fffaf0] text-[#681414] hover:bg-[#fff3cf]"
  }`;
  const content = (
    <>
      {icon}
      {label}
    </>
  );

  if (href) {
    return (
      <Link aria-current={active ? "page" : undefined} href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function ChartSettingsPanel({
  settings,
  setSettings,
  locale,
}: {
  settings: ChartSettings;
  setSettings: (settings: ChartSettings) => void;
  locale: KundliWorkspaceLocale;
}) {
  return (
    <section className="rounded border border-[#e1c878] bg-white">
      <div className="border-b border-[#f0dfae] px-4 py-3">
        <div className="flex items-center gap-2 text-[#681414]">
          <Compass size={20} />
          <h2 className="font-semibold">{t(locale, "chartSettings")}</h2>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <label className="block">
          <span className="field-label">{t(locale, "chartStyle")}</span>
          <select
            className="field-input field-select"
            value={settings.style}
            onChange={(event) => setSettings({ ...settings, style: event.target.value as ChartSettings["style"] })}
          >
            <option value="north">{t(locale, "northIndian")}</option>
            <option value="south">{t(locale, "southIndian")}</option>
            <option value="east">{t(locale, "eastIndian")}</option>
          </select>
        </label>
        <div className="rounded border border-[#ecd89d] bg-[#fffaf0] px-3 py-2 text-xs text-stone-600">
          {locale === "hi" ? t(locale, "hindiReport") : t(locale, "englishReport")} · {chartDescription(settings.style, locale)}
        </div>
      </div>
    </section>
  );
}

function MatchPanel({
  p1,
  p2,
  setP1,
  setP2,
  ayanamsha,
  setAyanamsha,
  onSubmit,
  loading,
  error,
  locale,
}: {
  p1: BirthForm;
  p2: BirthForm;
  setP1: (form: BirthForm) => void;
  setP2: (form: BirthForm) => void;
  ayanamsha: BirthForm["ayanamsha"];
  setAyanamsha: (ayanamsha: BirthForm["ayanamsha"]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
  locale: KundliWorkspaceLocale;
}) {
  return (
    <form onSubmit={onSubmit} className="rounded border border-[#e1c878] bg-white">
      <div className="border-b border-[#f0dfae] px-4 py-3">
        <div className="flex items-center gap-2 text-[#681414]">
          <Users size={20} />
          <h2 className="font-semibold">{t(locale, "kundliMatching")}</h2>
        </div>
      </div>
      <div className="space-y-4 p-4">
        <MiniBirthFields label={t(locale, "person1")} form={p1} setForm={setP1} locale={locale} />
        <MiniBirthFields label={t(locale, "person2")} form={p2} setForm={setP2} locale={locale} />
        <label className="block">
          <span className="field-label">{t(locale, "ayanamsha")}</span>
          <select
            className="field-input field-select"
            value={ayanamsha}
            onChange={(event) =>
              setAyanamsha(event.target.value as BirthForm["ayanamsha"])
            }
          >
            <option value="lahiri">Lahiri</option>
            <option value="raman">Raman</option>
            <option value="krishnamurti">KP</option>
          </select>
        </label>
      </div>
      <div className="border-t border-[#f0dfae] p-4">
        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white disabled:bg-stone-400"
        >
          {loading ? <LoaderCircle className="animate-spin" size={20} /> : null}
          {t(locale, "calculateMatch")}
        </button>
        {error ? <p role="alert" className="mt-3 text-sm text-[#a53b21]">{error}</p> : null}
      </div>
    </form>
  );
}

function MuhuratSearchPanel({
  form,
  setForm,
  cityResults,
  cityLoading,
  cityError,
  setCityResults,
  setCityError,
  onSubmit,
  loading,
  error,
  locale,
}: {
  form: MuhuratForm;
  setForm: (form: MuhuratForm) => void;
  cityResults: CityResult[];
  cityLoading: boolean;
  cityError: string;
  setCityResults: (results: CityResult[]) => void;
  setCityError: (error: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
  locale: KundliWorkspaceLocale;
}) {
  const maxEndDate = form.startDate ? addDaysToDateInput(form.startDate, 30) : undefined;

  return (
    <form onSubmit={onSubmit} className="rounded border border-[#e1c878] bg-white">
      <div className="border-b border-[#f0dfae] px-4 py-3">
        <div className="flex items-center gap-2 text-[#681414]">
          <CalendarSearch size={20} />
          <h2 className="font-semibold">{t(locale, "muhuratSearch")}</h2>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <label className="block">
          <span className="field-label">{t(locale, "purpose")}</span>
          <select
            className="field-input field-select"
            value={form.purpose}
            onChange={(event) => setForm({ ...form, purpose: event.target.value as MuhuratPurpose })}
          >
            {muhuratPurposes.map((purpose) => (
              <option key={purpose.value} value={purpose.value}>
                {muhuratPurposeUiLabel(purpose.value, locale)}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">{t(locale, "startDate")}</span>
            <input
              className="field-input"
              type="date"
              value={form.startDate}
              onChange={(event) => {
                const startDate = event.target.value;
                const maxEnd = addDaysToDateInput(startDate, 30);
                setForm({
                  ...form,
                  startDate,
                  endDate: form.endDate && form.endDate > maxEnd ? maxEnd : form.endDate,
                });
              }}
              required
            />
          </label>
          <label className="block">
            <span className="field-label">{t(locale, "endDate")}</span>
            <input
              className="field-input"
              type="date"
              min={form.startDate || undefined}
              max={maxEndDate}
              value={form.endDate}
              onChange={(event) => setForm({ ...form, endDate: event.target.value })}
              required
            />
          </label>
        </div>

        <div className="relative">
          <label className="block">
            <span className="field-label">{t(locale, "location")}</span>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={16}
              />
              <input
                className="field-input field-input-with-icon"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={cityResults.length > 0}
                aria-controls="muhurat-city-results"
                value={form.cityQuery}
                onChange={(event) => {
                  const cityQuery = event.target.value;
                  if (cityQuery.trim().length < 2) {
                    setCityResults([]);
                    setCityError("");
                  }
                  setForm({ ...form, cityQuery, city: null });
                }}
                placeholder={t(locale, "searchCity")}
                required
              />
              {cityLoading ? (
                <LoaderCircle
                  className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#a53b21]"
                  size={16}
                />
              ) : null}
            </div>
          </label>

          {cityResults.length > 0 ? (
            <div id="muhurat-city-results" role="listbox" className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded border border-[#dbbf70] bg-white shadow-lg">
              {cityResults.map((city) => (
                <button
                  key={`${city.name}-${city.lat}-${city.lng}`}
                  type="button"
                  role="option"
                  aria-selected="false"
                  className="flex w-full items-start gap-3 border-b border-stone-100 px-3 py-2 text-left last:border-0 hover:bg-[#fff3cf]"
                  onClick={() => {
                    setForm({ ...form, city, cityQuery: city.name });
                    setCityResults([]);
                  }}
                >
                  <MapPin className="mt-1 shrink-0 text-[#8d1f1f]" size={16} />
                  <span>
                    <span className="block text-sm font-medium text-stone-950">
                      {city.name}
                      {city.district ? `, ${city.district}` : ""}
                    </span>
                    <span className="block text-xs text-stone-600">
                      {[city.state, city.country, city.timezone].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {cityError ? <p role="alert" className="mt-2 text-xs text-[#a53b21]">{cityError}</p> : null}
          {form.city ? (
            <div className="mt-2 rounded border border-[#ead596] bg-[#fffaf0] px-3 py-2 text-xs text-stone-700">
              <div className="font-medium text-stone-950">
                {form.city.name}, {form.city.country}
              </div>
              <div>
                {form.city.lat.toFixed(4)}, {form.city.lng.toFixed(4)} · {form.city.timezone}
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">{t(locale, "ayanamsha")}</span>
            <select
              className="field-input field-select"
              value={form.ayanamsha}
              onChange={(event) => setForm({ ...form, ayanamsha: event.target.value as BirthForm["ayanamsha"] })}
            >
              <option value="lahiri">Lahiri</option>
              <option value="raman">Raman</option>
              <option value="krishnamurti">Krishnamurti</option>
            </select>
          </label>
          <label className="block">
            <span className="field-label">{t(locale, "bestWindows")}</span>
            <input
              className="field-input"
              type="number"
              min="1"
              max="50"
              value={form.limit}
              onChange={(event) => setForm({ ...form, limit: event.target.value })}
              required
            />
          </label>
        </div>
      </div>

      <div className="border-t border-[#f0dfae] p-4">
        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white transition hover:bg-[#711818] disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {loading ? <LoaderCircle className="animate-spin" size={20} /> : <CalendarSearch size={20} />}
          {t(locale, "findMuhurat")}
        </button>
        {error ? <p role="alert" className="mt-3 text-sm text-[#a53b21]">{error}</p> : null}
      </div>
    </form>
  );
}

function MiniBirthFields({
  label,
  form,
  setForm,
  locale,
}: {
  label: string;
  form: BirthForm;
  setForm: (form: BirthForm) => void;
  locale: KundliWorkspaceLocale;
}) {
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState("");
  const cityListId = useId();

  useEffect(() => {
    const query = form.cityQuery.trim();
    if (query.length < 2 || form.city?.name === query) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setCityLoading(true);
      setCityError("");
      try {
        const response = await fetch(
          `/api/geo/search?q=${encodeURIComponent(query)}&limit=8`,
          { signal: controller.signal },
        );
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error ?? t(locale, "citySearchFailed"));
        }
        setCityResults(payload.results ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setCityError(
            error instanceof Error ? error.message : t(locale, "citySearchFailed"),
          );
        }
      } finally {
        if (!controller.signal.aborted) setCityLoading(false);
      }
    }, 280);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [form.city?.name, form.cityQuery, locale]);

  return (
    <div className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
      <h3 className="mb-3 font-semibold text-[#681414]">{label}</h3>
      <div className="space-y-3">
        <input
          aria-label={`${label}: ${t(locale, "clientName")}`}
          className="field-input"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          <input
            aria-label={`${label}: ${t(locale, "date")}`}
            className="field-input"
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            required
          />
          <input
            aria-label={`${label}: ${t(locale, "time")}`}
            className="field-input"
            type="time"
            value={form.time}
            onChange={(event) => setForm({ ...form, time: event.target.value })}
            required
          />
        </div>

        <div className="relative">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={16}
            />
            <input
              aria-label={`${label}: ${t(locale, "birthPlace")}`}
              className="field-input field-input-with-icon"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={cityResults.length > 0}
              aria-controls={cityListId}
              value={form.cityQuery}
              onChange={(event) => {
                const cityQuery = event.target.value;
                if (cityQuery.trim().length < 2) {
                  setCityResults([]);
                  setCityError("");
                }
                setForm({
                  ...form,
                  cityQuery,
                  city: null,
                  manualCoordinates: false,
                  manualLat: "",
                  manualLng: "",
                  timezoneOverride: "",
                });
              }}
              placeholder={t(locale, "searchCity")}
              required
            />
            {cityLoading ? (
              <LoaderCircle
                aria-hidden="true"
                className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#a53b21]"
                size={16}
              />
            ) : null}
          </div>

          {cityResults.length > 0 ? (
            <div id={cityListId} role="listbox" className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded border border-[#dbbf70] bg-white shadow-lg">
              {cityResults.map((city) => (
                <button
                  key={`${city.name}-${city.lat}-${city.lng}`}
                  type="button"
                  role="option"
                  aria-selected="false"
                  className="flex w-full items-start gap-3 border-b border-stone-100 px-3 py-2 text-left last:border-0 hover:bg-[#fff3cf]"
                  onClick={() => {
                    setForm({
                      ...form,
                      city,
                      cityQuery: city.name,
                      manualCoordinates: false,
                      manualLat: "",
                      manualLng: "",
                      timezoneOverride: "",
                    });
                    setCityResults([]);
                    setCityError("");
                  }}
                >
                  <MapPin className="mt-1 shrink-0 text-[#8d1f1f]" size={16} />
                  <span>
                    <span className="block text-sm font-medium text-stone-950">
                      {city.name}
                      {city.district ? `, ${city.district}` : ""}
                    </span>
                    <span className="block text-xs text-stone-600">
                      {[city.state, city.country, city.timezone].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {cityError ? <p role="alert" className="mt-2 text-xs text-[#a53b21]">{cityError}</p> : null}
          {form.city ? (
            <div className="mt-2 rounded border border-[#ead596] bg-white px-3 py-2 text-xs text-stone-700">
              <div className="font-medium text-stone-950">
                {form.city.name}, {form.city.country}
              </div>
              <div>
                {form.city.lat.toFixed(4)}, {form.city.lng.toFixed(4)} · {form.city.timezone}
              </div>
            </div>
          ) : null}
        </div>

        <label className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded border border-[#ecd89d] bg-white px-3 py-2 text-sm">
          <span>{t(locale, "manualCoordinates")}</span>
          <span className="relative inline-flex items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={form.manualCoordinates}
              onChange={(event) =>
                setForm({ ...form, manualCoordinates: event.target.checked })
              }
            />
            <span className="h-6 w-10 rounded-full bg-stone-300 transition peer-checked:bg-[#a53b21] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#681414]" />
            <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition peer-checked:translate-x-4" />
          </span>
        </label>

        {form.manualCoordinates ? (
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <input
                aria-label={`${label}: ${t(locale, "latitude")}`}
                className="field-input"
                type="number"
                step="any"
                value={form.manualLat}
                onChange={(event) => setForm({ ...form, manualLat: event.target.value })}
                placeholder={form.city ? String(form.city.lat) : t(locale, "latitude")}
              />
              <input
                aria-label={`${label}: ${t(locale, "longitude")}`}
                className="field-input"
                type="number"
                step="any"
                value={form.manualLng}
                onChange={(event) => setForm({ ...form, manualLng: event.target.value })}
                placeholder={form.city ? String(form.city.lng) : t(locale, "longitude")}
              />
            </div>
            <input
              aria-label={`${label}: ${t(locale, "timezone")}`}
              className="field-input"
              value={form.timezoneOverride}
              onChange={(event) => setForm({ ...form, timezoneOverride: event.target.value })}
              placeholder={form.city?.timezone ?? t(locale, "timezone")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SavedSearchPanel({ search, setSearch, count, locale }: { search: string; setSearch: (value: string) => void; count: number; locale: KundliWorkspaceLocale }) {
  return (
    <section className="rounded border border-[#e1c878] bg-white">
      <div className="border-b border-[#f0dfae] px-4 py-3">
        <div className="flex items-center gap-2 text-[#681414]">
          <Archive size={20} />
          <h2 className="font-semibold">{t(locale, "savedClients")}</h2>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <input aria-label={t(locale, "savedSearch")} className="field-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t(locale, "savedSearch")} />
        <div className="rounded border border-[#ecd89d] bg-[#fffaf0] px-3 py-2 text-sm text-stone-600">
          {count} {t(locale, count === 1 ? "savedChart" : "savedCharts")}
        </div>
      </div>
    </section>
  );
}

function KundliDashboard({
  result,
  settings,
  activeTab,
  setActiveTab,
  notes,
  setNotes,
  onSave,
  onExportJson,
  locale,
  focus,
}: {
  result: KundliResult;
  settings: ChartSettings;
  activeTab: ResultTab;
  setActiveTab: (tab: ResultTab) => void;
  notes: string;
  setNotes: (notes: string) => void;
  onSave: () => void;
  onExportJson: () => void;
  locale: KundliWorkspaceLocale;
  focus: KundliWorkspaceFocus;
}) {
  const planets = result.chart?.planets ?? [];
  const houses = result.chart?.houses ?? [];
  const asc = result.chart?.ascendant;
  const panchang = result.panchang ?? {};
  const errors = result.errors ?? {};
  const d1Chart = { division: 1, name: "Rashi", ascendant: result.chart?.ascendant, planets, houses };
  const d9Chart = getVargaChart(result.vargas, "D9");
  const d10Chart = getVargaChart(result.vargas, "D10");
  const visibleTabs = resultTabsFor(focus, activeTab);

  return (
    <>
      <section className="min-w-0 rounded border border-[#e1c878] bg-white">
        <div className="grid gap-4 border-b border-[#f0dfae] p-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold text-[#681414]">{result.input.label}</h2>
              <span className="rounded bg-[#fff3cf] px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
                {signUi(asc?.sign, locale)} {ui(locale, "Lagna", "लग्न")}
              </span>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-600">
              <span className="inline-flex items-center gap-1">
                <MapPin size={16} /> {result.input.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={16} /> {result.input.timezone}
              </span>
              <span className="inline-flex items-center gap-1">
                <Compass size={16} /> {result.input.lat.toFixed(4)}, {result.input.lng.toFixed(4)}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#caa24d] bg-[#fffaf0] px-4 text-sm font-semibold text-[#681414] hover:bg-[#fff3cf]"
          >
            <Download size={16} />
            {t(locale, "print")}
          </button>
        </div>

        <div role="tablist" aria-label={t(locale, "birthChart")} className="flex flex-wrap gap-2 border-b border-[#f0dfae] px-4 py-3">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`min-h-11 rounded border px-3 py-2 text-sm font-semibold ${
                activeTab === tab
                  ? "border-[#8d1f1f] bg-[#8d1f1f] text-white"
                  : "border-[#d8bd72] bg-[#fffaf0] text-[#681414] hover:bg-[#fff3cf]"
              }`}
            >
              {t(locale, resultTabTextKeys[tab])}
            </button>
          ))}
        </div>
      </section>

      {Object.keys(errors).length > 0 ? (
        <section className="rounded border border-[#d98f6b] bg-[#fff4ed] p-4 text-sm text-[#8a2a13]">
          <div className="font-semibold">{t(locale, "moduleErrors")}</div>
          <div className="mt-2 grid gap-1">
            {Object.entries(errors).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "navamsa" ? (
        <DataPanel title={t(locale, "navamsaTitle")} icon={<Compass size={20} />}>
          {d9Chart ? (
            <div className="space-y-4">
              <ChartRenderer chart={d9Chart} settings={settings} title={t(locale, "navamsaTitle")} />
              <VargottamaSummary d1Planets={planets} d9Planets={d9Chart.planets} locale={locale} />
            </div>
          ) : (
            <MutedMessage label={t(locale, "navamsaMissing")} />
          )}
        </DataPanel>
      ) : null}

      {activeTab === "nakshatra" ? (
        <DataPanel title={t(locale, "nakshatraTitle")} icon={<Moon size={20} />}>
          <NakshatraView
            moon={planets.find((planet) => planet.name === "Moon")}
            dasha={result.dasha}
            locale={locale}
          />
        </DataPanel>
      ) : null}

      {activeTab === "dashamsa" ? (
        <DataPanel title={t(locale, "dashamsaTitle")} icon={<Compass size={20} />}>
          {d10Chart ? (
            <div className="grid gap-5">
              <ChartRenderer chart={d10Chart} settings={settings} title={t(locale, "dashamsaTitle")} />
              <VargaPlanetDetails planets={d10Chart.planets} houses={d10Chart.houses} locale={locale} />
            </div>
          ) : (
            <MutedMessage label={t(locale, "dashamsaMissing")} />
          )}
        </DataPanel>
      ) : null}

      {activeTab === "shadbala" ? (
        <DataPanel title={t(locale, "shadbalaTitle")} icon={<Activity size={20} />}>
          <ShadbalaView strength={result.strength} locale={locale} />
        </DataPanel>
      ) : null}

      {activeTab === "ashtakavarga" ? (
        <DataPanel title={t(locale, "ashtakavargaTitle")} icon={<Activity size={20} />}>
          <AshtakavargaView strength={result.strength} locale={locale} />
        </DataPanel>
      ) : null}

      {activeTab === "manglik" ? (
        <DataPanel title={t(locale, "manglikTitle")} icon={<Activity size={20} />}>
          <ManglikDoshaView result={result} locale={locale} />
        </DataPanel>
      ) : null}

      {activeTab === "chart" ? (
        <>
          {result.visualChart?.svg && result.visualChart.chart_style === visualChartStyles[settings.style] ? (
            <VisualChartPanel visualChart={result.visualChart} settings={settings} locale={locale} />
          ) : (
            <div className="grid items-start gap-5 xl:grid-cols-2">
              <ChartRenderer chart={d1Chart} settings={settings} title={ui(locale, "D1 Rashi", "D1 राशि कुंडली")} />
              {d9Chart ? (
                <ChartRenderer chart={d9Chart} settings={settings} title={ui(locale, "D9 Navamsha", "D9 नवांश कुंडली")} />
              ) : (
                <MutedMessage label={t(locale, "navamsaMissing")} />
              )}
            </div>
          )}
          <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
            <div className="grid rounded border border-[#ecd89d] bg-[#fffdf7] p-3 sm:grid-cols-2">
              <MetricCard label={ui(locale, "Lagna", "लग्न")} value={signUi(asc?.sign, locale)} detail={formatDegree(asc?.degree)} />
              <MetricCard label={ui(locale, "Nakshatra", "नक्षत्र")} value={asc?.nakshatra?.name ?? "N/A"} detail={asc?.nakshatra?.pada ? `${ui(locale, "Pada", "पाद")} ${asc.nakshatra.pada}` : ui(locale, "Ascendant", "लग्न")} />
              <MetricCard label={ui(locale, "Sade Sati", "साढ़ेसाती")} value={result.chart?.sade_sati?.active ? ui(locale, "Active", "सक्रिय") : ui(locale, "Not active", "सक्रिय नहीं")} detail={result.chart?.sade_sati?.phase ?? result.chart?.sade_sati?.description ?? ui(locale, "Saturn context", "शनि संदर्भ")} />
              <MetricCard label={ui(locale, "Ruleset", "गणना नियम")} value={String(result.chart?.metadata?.ayanamsha ?? "lahiri")} detail={humanize(String(result.chart?.metadata?.house_system ?? "whole_sign"))} />
            </div>
            <ChartContext planets={planets} metadata={result.chart?.metadata} locale={locale} />
          </div>
          <div className="grid gap-5 xl:grid-cols-3">
            <DataPanel title={ui(locale, "Strength", "ग्रह बल")} icon={<Activity size={20} />}>
              <StrengthView strength={result.strength} locale={locale} />
            </DataPanel>
            <DataPanel title={ui(locale, "Dasha Snapshot", "दशा सार")} icon={<Activity size={20} />}>
              <DashaView dasha={result.dasha} locale={locale} />
            </DataPanel>
            <DataPanel title={ui(locale, "Yoga Snapshot", "योग सार")} icon={<Activity size={20} />}>
              <YogaView yogas={result.yogas} locale={locale} />
            </DataPanel>
          </div>
          <DataPanel title={locale === "hi" ? "रिपोर्ट विकल्प" : "Report Actions"} icon={<FileText size={20} />}>
            <ReportActions
              notes={notes}
              setNotes={setNotes}
              onSave={onSave}
              onExportJson={onExportJson}
              locale={locale}
            />
          </DataPanel>
        </>
      ) : null}

      {activeTab === "planets" ? (
        <div className="grid gap-5">
          <DataPanel title={ui(locale, "Detailed Planetary Calculations", "विस्तृत ग्रह गणना")} icon={<Sun size={20} />}>
            <PlanetDetails planets={planets} houses={houses} locale={locale} />
          </DataPanel>
          <DataPanel title={ui(locale, "Bhava / Chalit Reference", "भाव / चलित संदर्भ")} icon={<Compass size={20} />}>
            <BhavaTable houses={houses} planets={planets} locale={locale} />
          </DataPanel>
        </div>
      ) : null}

      {activeTab === "panchang" ? (
        <DataPanel title={t(locale, "panchang")} icon={<CalendarDays size={20} />}>
          {result.panchang ? (
            <div className="grid gap-3">
              <InfoRow label={ui(locale, "Weekday", "वार")} value={objectPath(panchang, "weekday.name")} />
              <InfoRow label="Tithi" value={objectPath(panchang, "request_time_panchang.tithi.name") ?? objectPath(panchang, "tithi.name")} />
              <InfoRow label={ui(locale, "Nakshatra", "नक्षत्र")} value={objectPath(panchang, "request_time_panchang.nakshatra.name") ?? objectPath(panchang, "nakshatra.name")} />
              <InfoRow label={ui(locale, "Yoga", "योग")} value={objectPath(panchang, "request_time_panchang.yoga.name") ?? objectPath(panchang, "yoga.name")} />
              <InfoRow label={ui(locale, "Rahu Kalam", "राहु काल")} value={formatRahu(panchang)} />
              <InfoRow label={ui(locale, "Sunrise", "सूर्योदय")} value={String(panchang.sunrise ?? "N/A")} />
            </div>
          ) : (
            <MutedMessage label={ui(locale, "Panchang module is off.", "पंचांग मॉड्यूल बंद है।")} />
          )}
        </DataPanel>
      ) : null}

      {activeTab === "dasha" ? (
        <DataPanel title={ui(locale, "Active Dasha", "सक्रिय दशा")} icon={<Activity size={20} />}>
          <DashaView dasha={result.dasha} locale={locale} />
        </DataPanel>
      ) : null}

      {activeTab === "yogas" ? (
        <DataPanel title={ui(locale, "Yoga Highlights", "प्रमुख योग")} icon={<Activity size={20} />}>
          <YogaView yogas={result.yogas} locale={locale} />
        </DataPanel>
      ) : null}

      {activeTab === "vargas" ? (
        <DataPanel title={ui(locale, "Divisional Charts", "वर्ग कुंडलियाँ")} icon={<Compass size={20} />}>
          <VargasView vargas={result.vargas} settings={settings} locale={locale} />
        </DataPanel>
      ) : null}
    </>
  );
}

function getChartPlanetTokens(planets: Planet[], includeAscendant = false) {
  return [
    ...(includeAscendant ? ["Asc"] : []),
    ...planets.map((planet) => planetShort[planet.name] ?? planet.name.slice(0, 2)),
  ];
}

function splitChartPlanetLines(tokens: string[], maxTokensPerLine = 3) {
  if (!tokens.length) return [];
  const lines: string[] = [];
  for (let index = 0; index < tokens.length; index += maxTokensPerLine) {
    lines.push(tokens.slice(index, index + maxTokensPerLine).join(" "));
  }
  return lines;
}

function ChartHouseLabel({
  x,
  y,
  label,
  planetTokens,
  anchor = "middle",
  labelSize = 3.5,
  planetSize = 3.25,
  maxTokensPerLine = 3,
}: {
  x: number;
  y: number;
  label: string;
  planetTokens: string[];
  anchor?: "start" | "middle" | "end";
  labelSize?: number;
  planetSize?: number;
  maxTokensPerLine?: number;
}) {
  const planetLines = splitChartPlanetLines(planetTokens, maxTokensPerLine);
  const labelY = planetLines.length > 1 ? y - 4.8 : y - 3.4;
  const planetStartY = planetLines.length > 1 ? y - 0.4 : y + 2;

  return (
    <g className="pointer-events-none">
      <text
        x={x}
        y={labelY}
        textAnchor={anchor}
        dominantBaseline="middle"
        paintOrder="stroke"
        stroke="#fffdf7"
        strokeWidth="0.9"
        strokeLinejoin="round"
        className="fill-[#8d1f1f] font-bold"
        style={{ fontSize: labelSize }}
      >
        {label}
      </text>
      {planetLines.map((line, index) => (
        <text
          key={`${line}-${index}`}
          x={x}
          y={planetStartY + index * 3.5}
          textAnchor={anchor}
          dominantBaseline="middle"
          paintOrder="stroke"
          stroke="#fffdf7"
          strokeWidth="0.95"
          strokeLinejoin="round"
          className="fill-stone-950 font-semibold"
          style={{ fontSize: planetSize }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function NorthIndianChart({
  planets,
  houses,
  ascendantSign,
  title = "Rashi Chart",
  subtitle = "North Indian layout",
}: {
  planets: Planet[];
  houses: House[];
  ascendantSign?: number;
  title?: string;
  subtitle?: string;
}) {
  const planetByHouse = new Map<number, Planet[]>();
  planets.forEach((planet) => {
    if (!planet.house) return;
    planetByHouse.set(planet.house, [...(planetByHouse.get(planet.house) ?? []), planet]);
  });

  const signByHouse = new Map<number, number | undefined>();
  houses.forEach((house) => signByHouse.set(house.house, house.sign_id));

  return (
    <div className="min-w-0 overflow-x-auto rounded border border-[#d7b860] bg-[#fffaf0] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[#681414]">{title}</h3>
          <p className="text-xs text-stone-600">{subtitle}</p>
        </div>
        <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
          D1
        </span>
      </div>
      <svg viewBox="0 0 100 100" role="img" aria-label="North Indian Kundli chart" className="aspect-square w-full min-w-[384px] max-w-full">
        <rect x="1" y="1" width="98" height="98" fill="#fffdf7" stroke="#8d1f1f" strokeWidth="0.8" />
        <path
          d="M1 1 L99 99 M99 1 L1 99 M50 1 L99 50 L50 99 L1 50 Z"
          fill="none"
          stroke="#c08a2c"
          strokeWidth="0.7"
        />
        <path d="M1 1 L50 50 L99 1 M99 99 L50 50 L1 99" fill="none" stroke="#c08a2c" strokeWidth="0.55" />
        {Array.from({ length: 12 }, (_, index) => index + 1).map((house) => {
          const coord = houseCoordinates[house];
          const housePlanets = planetByHouse.get(house) ?? [];
          const sign = signByHouse.get(house) ?? (house === 1 ? ascendantSign : undefined);
          const label = `${house}${sign ? ` · ${signGlyphs[sign]}` : ""}`;
          return (
            <ChartHouseLabel
              key={house}
              x={coord.x}
              y={coord.y}
              label={label}
              planetTokens={getChartPlanetTokens(housePlanets, house === 1)}
            />
          );
        })}
      </svg>
    </div>
  );
}

function VisualChartPanel({
  visualChart,
  settings,
  locale,
}: {
  visualChart: VisualChart;
  settings: ChartSettings;
  locale: KundliWorkspaceLocale;
}) {
  const svg = visualChart.svg ?? "";
  const divisions = visualChart.divisions?.map((division) => `D${division}`).join(" + ") || "D1 + D9";

  return (
    <section className="rounded border border-[#d7b860] bg-[#fffaf0]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ecd89d] bg-[#fffdf7] px-4 py-3">
        <div>
          <h3 className="font-semibold text-[#681414]">{ui(locale, "FreeAstroAPI visual chart", "FreeAstroAPI दृश्य कुंडली")}</h3>
          <p className="text-xs text-stone-600">
            {divisions} · {chartDescription(settings.style, locale)}
          </p>
        </div>
        <span className="rounded bg-[#fff3cf] px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
          SVG
        </span>
      </div>
      <div className="overflow-x-auto bg-white p-3">
        <iframe
          title={`${divisions} ${chartDescription(settings.style, locale)} ${ui(locale, "Kundli visual chart", "दृश्य कुंडली")}`}
          srcDoc={svg}
          sandbox=""
          className="mx-auto aspect-[2/1] w-full min-w-[768px] max-w-[980px] border-0"
        />
      </div>
    </section>
  );
}

function ChartRenderer({
  chart,
  settings,
  title,
}: {
  chart: {
    division?: number;
    name?: string;
    ascendant?: { sign?: string; sign_id?: number } | undefined;
    planets?: Planet[];
    houses?: House[];
  };
  settings: ChartSettings;
  title: string;
}) {
  const planets = chart.planets ?? [];
  const houses = chart.houses ?? [];
  if (settings.style === "north") {
    return <NorthIndianChart planets={planets} houses={houses} ascendantSign={chart.ascendant?.sign_id} title={title} subtitle={settings.language === "hi" ? chartDescription(settings.style, "hi") : (chart.name ?? chartDescription(settings.style, "en"))} />;
  }
  if (settings.style === "south") {
    return <SouthIndianChart chart={chart} title={title} locale={settings.language} />;
  }
  return <EastIndianChart chart={chart} title={title} locale={settings.language} />;
}

function SouthIndianChart({
  chart,
  title,
  locale,
}: {
  chart: {
    division?: number;
    name?: string;
    ascendant?: { sign?: string; sign_id?: number } | undefined;
    planets?: Planet[];
    houses?: House[];
  };
  title: string;
  locale: KundliWorkspaceLocale;
}) {
  const planets = chart.planets ?? [];
  const ascSign = chart.ascendant?.sign_id;
  const signToHouse = new Map<number, number>();
  (chart.houses ?? []).forEach((house) => {
    if (house.sign_id) signToHouse.set(house.sign_id, house.house);
  });

  return (
    <div className="min-w-0 overflow-x-auto rounded border border-[#d7b860] bg-[#fffaf0] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[#681414]">{title}</h3>
          <p className="text-xs text-stone-600">{chartDescription("south", locale)}</p>
        </div>
        <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
          D{chart.division ?? 1}
        </span>
      </div>
      <svg viewBox="0 0 100 100" role="img" aria-label="South Indian Kundli chart" className="aspect-square w-full min-w-[384px] max-w-full">
        <rect x="1" y="1" width="98" height="98" fill="#fffdf7" stroke="#8d1f1f" strokeWidth="0.8" />
        {[25, 50, 75].map((value) => (
          <g key={`grid-${value}`}>
            <line x1={value} y1="1" x2={value} y2="99" stroke="#c08a2c" strokeWidth="0.45" />
            <line x1="1" y1={value} x2="99" y2={value} stroke="#c08a2c" strokeWidth="0.45" />
          </g>
        ))}
        <rect x="26" y="26" width="48" height="48" fill="#fffaf0" stroke="#c08a2c" strokeWidth="0.5" />
        <text x="50" y="47" textAnchor="middle" className="fill-[#681414] text-[4px] font-bold">
          {ui(locale, "South", "दक्षिण")}
        </text>
        <text x="50" y="53" textAnchor="middle" className="fill-stone-500 text-[2.8px]">
          {ui(locale, "Fixed signs", "स्थिर राशियाँ")}
        </text>
        {Object.entries(southSignCells).map(([signIdText, cell]) => {
          const signId = Number(signIdText);
          const house = signToHouse.get(signId);
          const signPlanets = planets.filter((planet) => planet.sign_id === signId);
          const isAsc = ascSign === signId;
          const label = `${house ? `${house} · ` : ""}${signGlyphs[signId]}`;
          return (
            <g key={signId}>
              <rect
                x={cell.x + 1}
                y={cell.y + 1}
                width="23"
                height="23"
                fill={isAsc ? "#fff3cf" : "#fffdf7"}
                stroke={isAsc ? "#8d1f1f" : "transparent"}
                strokeWidth="0.8"
              />
              <ChartHouseLabel
                x={cell.x + 12.5}
                y={cell.y + 11.3}
                label={label}
                planetTokens={getChartPlanetTokens(signPlanets, isAsc)}
                labelSize={3.25}
                planetSize={3}
                maxTokensPerLine={2}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function EastIndianChart({
  chart,
  title,
  locale,
}: {
  chart: {
    division?: number;
    name?: string;
    ascendant?: { sign?: string; sign_id?: number } | undefined;
    planets?: Planet[];
    houses?: House[];
  };
  title: string;
  locale: KundliWorkspaceLocale;
}) {
  const planets = chart.planets ?? [];
  const houses = chart.houses ?? [];
  const planetByHouse = new Map<number, Planet[]>();
  planets.forEach((planet) => {
    if (!planet.house) return;
    planetByHouse.set(planet.house, [...(planetByHouse.get(planet.house) ?? []), planet]);
  });
  const signByHouse = new Map<number, number | undefined>();
  houses.forEach((house) => signByHouse.set(house.house, house.sign_id));

  return (
    <div className="min-w-0 overflow-x-auto rounded border border-[#d7b860] bg-[#fffaf0] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[#681414]">{title}</h3>
          <p className="text-xs text-stone-600">{chartDescription("east", locale)}</p>
        </div>
        <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
          D{chart.division ?? 1}
        </span>
      </div>
      <svg viewBox="0 0 100 100" role="img" aria-label={ui(locale, "East Indian Kundli chart", "पूर्वी भारतीय कुंडली")} className="aspect-square w-full min-w-[384px] max-w-full">
        <rect x="1" y="1" width="98" height="98" fill="#fffdf7" stroke="#8d1f1f" strokeWidth="0.9" />
        <g stroke="#c08a2c" strokeWidth="0.44" opacity="0.82">
          <line x1="1" y1="33.33" x2="99" y2="33.33" />
          <line x1="1" y1="66.66" x2="99" y2="66.66" />
          <line x1="33.33" y1="1" x2="33.33" y2="99" />
          <line x1="66.66" y1="1" x2="66.66" y2="99" />
          <path d="M33.33 1 L66.66 33.33 L33.33 66.66 L1 33.33 Z" fill="none" />
          <path d="M66.66 1 L99 33.33 L66.66 66.66 L33.33 33.33 Z" fill="none" />
          <path d="M33.33 33.33 L66.66 66.66 L33.33 99 L1 66.66 Z" fill="none" />
          <path d="M66.66 33.33 L99 66.66 L66.66 99 L33.33 66.66 Z" fill="none" />
        </g>
        {Array.from({ length: 12 }, (_, index) => index + 1).map((house) => {
          const coord = eastHouseCoordinates[house];
          const housePlanets = planetByHouse.get(house) ?? [];
          const sign = signByHouse.get(house);
          const label = `${house}${sign ? ` · ${signGlyphs[sign]}` : ""}`;
          return (
            <ChartHouseLabel
              key={house}
              x={coord.x}
              y={coord.y}
              label={label}
              planetTokens={getChartPlanetTokens(housePlanets, house === 1)}
              anchor={eastHouseAnchors[house] ?? "middle"}
              labelSize={3.25}
              planetSize={3}
              maxTokensPerLine={2}
            />
          );
        })}
      </svg>
    </div>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="min-h-28 border-b border-r border-[#f0dfae] bg-[#fffaf0] p-4 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0">
      <div className="text-xs font-semibold text-stone-500">{label}</div>
      <div className="mt-3 text-2xl font-semibold leading-7 text-[#681414]">{value}</div>
      <div className="mt-2 min-h-5 text-sm leading-5 text-stone-600">{detail}</div>
    </div>
  );
}

function ChartContext({
  planets,
  metadata,
  locale,
}: {
  planets: Planet[];
  metadata?: Record<string, unknown>;
  locale: KundliWorkspaceLocale;
}) {
  const moon = planets.find((planet) => planet.name === "Moon");
  const sun = planets.find((planet) => planet.name === "Sun");
  const saturn = planets.find((planet) => planet.name === "Saturn");

  return (
    <div className="rounded border border-[#ecd89d] bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#681414]">
        <Moon size={16} />
        {ui(locale, "Chart Context", "कुंडली संदर्भ")}
      </div>
      <div className="grid gap-2 text-sm">
        <InfoRow label={planetUi("Moon", locale)} value={formatPlanetContext(moon, locale)} />
        <InfoRow label={planetUi("Sun", locale)} value={formatPlanetContext(sun, locale)} />
        <InfoRow label={planetUi("Saturn", locale)} value={saturn?.house ? `${signUi(saturn.sign, locale)}, ${ui(locale, "house", "भाव")} ${saturn.house}` : signUi(saturn?.sign, locale)} />
        <InfoRow label={ui(locale, "Timezone", "समय क्षेत्र")} value={String(metadata?.timezone_used ?? "N/A")} />
      </div>
    </div>
  );
}

function ReportActions({
  notes,
  setNotes,
  onSave,
  onExportJson,
  locale,
}: {
  notes: string;
  setNotes: (notes: string) => void;
  onSave: () => void;
  onExportJson: () => void;
  locale: KundliWorkspaceLocale;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto]">
      <label className="block">
        <span className="field-label">{t(locale, "consultationNotes")}</span>
        <textarea
          className="min-h-28 w-full rounded border border-[#d8bd72] bg-[#fffdf7] p-3 text-sm outline-none focus:border-[#8d1f1f]"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder={t(locale, "privateNotes")}
        />
      </label>
      <div className="grid content-start gap-2">
        <button type="button" onClick={onSave} className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white">
          <Save size={16} /> {t(locale, "saveChart")}
        </button>
        <button type="button" onClick={onExportJson} className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#caa24d] bg-[#fffaf0] px-4 text-sm font-semibold text-[#681414]">
          <Download size={16} /> {t(locale, "exportJson")}
        </button>
        <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#caa24d] bg-[#fffaf0] px-4 text-sm font-semibold text-[#681414]">
          <FileText size={16} /> {t(locale, "savePdf")}
        </button>
        <div className="max-w-72 rounded border border-[#ecd89d] bg-[#fffaf0] p-2 text-xs text-stone-600">
          {t(locale, "browserPrivacy")}
        </div>
      </div>
    </div>
  );
}

function PlanetDetails({ planets, houses, locale }: { planets: Planet[]; houses: House[]; locale: KundliWorkspaceLocale }) {
  return (
    <div className="overflow-x-auto">
      <table className="data-table min-w-[980px]">
        <thead>
          <tr>
            <th>{ui(locale, "Graha", "ग्रह")}</th>
            <th>{ui(locale, "Sign", "राशि")}</th>
            <th>DMS</th>
            <th>{ui(locale, "House", "भाव")}</th>
            <th>{ui(locale, "Rashi Lord", "राशि स्वामी")}</th>
            <th>{ui(locale, "Nakshatra Lord", "नक्षत्र स्वामी")}</th>
            <th>{ui(locale, "House Lord", "भाव स्वामी")}</th>
            <th>{ui(locale, "Motion", "गति")}</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => {
            const house = houses.find((item) => item.house === planet.house);
            return (
              <tr key={planet.name}>
                <td className="font-semibold text-stone-950">{planetUi(planet.name, locale)}</td>
                <td>{signUi(planet.sign, locale)}</td>
                <td>{formatDms(planet.degree_in_sign ?? planet.absolute_degree)}</td>
                <td>{planet.house ?? "N/A"}</td>
                <td>{planetUi(planet.sign ? signLords[planet.sign] : undefined, locale)}</td>
                <td>{planetUi(planet.nakshatra_lord, locale)}</td>
                <td>{planetUi(house?.sign ? signLords[house.sign] : undefined, locale)}</td>
                <td>{planet.is_retrograde ? ui(locale, "Retrograde", "वक्री") : ui(locale, "Direct", "मार्गी")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function VargaPlanetDetails({
  planets,
  houses,
  locale,
}: {
  planets: Planet[];
  houses: House[];
  locale: KundliWorkspaceLocale;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="data-table min-w-[40rem]">
        <thead>
          <tr>
            <th>{ui(locale, "Graha", "ग्रह")}</th>
            <th>{ui(locale, "Sign", "राशि")}</th>
            <th>{ui(locale, "House", "भाव")}</th>
            <th>{ui(locale, "Rashi Lord", "राशि स्वामी")}</th>
            <th>{ui(locale, "House Lord", "भाव स्वामी")}</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => {
            const house = houses.find((item) => item.house === planet.house);

            return (
              <tr key={planet.name}>
                <td className="font-semibold text-stone-950">
                  {planetUi(planet.name, locale)}
                </td>
                <td>{signUi(planet.sign, locale)}</td>
                <td>{planet.house ?? "N/A"}</td>
                <td>{planetUi(planet.sign ? signLords[planet.sign] : undefined, locale)}</td>
                <td>{planetUi(house?.sign ? signLords[house.sign] : undefined, locale)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function NakshatraView({
  moon,
  dasha,
  locale,
}: {
  moon?: Planet;
  dasha?: Record<string, unknown>;
  locale: KundliWorkspaceLocale;
}) {
  if (!moon?.nakshatra) {
    return <MutedMessage label={t(locale, "nakshatraMissing")} />;
  }

  const birthBalance = recordValue(dasha?.birth_balance);
  const dashaMoon = recordValue(dasha?.moon_nakshatra);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="border-y border-[#ecd89d] bg-[#fffdf7] py-1">
        <InfoRow label={ui(locale, "Janma Nakshatra", "जन्म नक्षत्र")} value={moon.nakshatra} />
        <InfoRow label={ui(locale, "Pada", "पाद")} value={moon.pada} />
        <InfoRow label={ui(locale, "Nakshatra lord", "नक्षत्र स्वामी")} value={planetUi(moon.nakshatra_lord, locale)} />
        <InfoRow label={ui(locale, "Moon sign", "चंद्र राशि")} value={signUi(moon.sign, locale)} />
        <InfoRow label={ui(locale, "Moon longitude in sign", "राशि में चंद्र अंश")} value={formatDms(moon.degree_in_sign)} />
        <InfoRow label={ui(locale, "Natal house", "जन्म भाव")} value={moon.house} />
      </div>

      <div className="border-y border-[#ecd89d] bg-white py-1">
        <InfoRow
          label={ui(locale, "Vimshottari birth lord", "जन्मकालीन विंशोत्तरी स्वामी")}
          value={birthBalance?.lord ?? dashaMoon?.lord ?? moon.nakshatra_lord}
        />
        <InfoRow label={ui(locale, "Birth balance end", "जन्म दशा शेष समाप्ति")} value={birthBalance?.end} />
        <InfoRow
          label={ui(locale, "Remaining years at birth", "जन्म पर शेष वर्ष")}
          value={birthBalance?.remaining_years}
        />
        <InfoRow
          label={ui(locale, "Remaining fraction", "शेष अनुपात")}
          value={birthBalance?.remaining_fraction === undefined ? undefined : percent(birthBalance.remaining_fraction)}
        />
        <p className="border-t border-[#f2e4bd] pt-3 text-sm leading-6 text-stone-600">
          {ui(
            locale,
            "The birth star follows the Moon's exact sidereal longitude. Check the returned timezone and ayanamsha before comparing another calculator, especially near a Nakshatra or Pada boundary.",
            "जन्म नक्षत्र चंद्रमा के सटीक निरयन अंश से निर्धारित होता है। किसी अन्य कैलकुलेटर से तुलना करते समय समय क्षेत्र और अयनांश अवश्य जाँचें, विशेषकर नक्षत्र या पाद की सीमा के पास।",
          )}
        </p>
      </div>
    </div>
  );
}

function BhavaTable({ houses, planets, locale }: { houses: House[]; planets: Planet[]; locale: KundliWorkspaceLocale }) {
  return (
    <div className="overflow-x-auto">
      <table className="data-table min-w-[720px]">
        <thead>
          <tr>
            <th>{ui(locale, "Bhava", "भाव")}</th>
            <th>{ui(locale, "Sign", "राशि")}</th>
            <th>{ui(locale, "Lord", "स्वामी")}</th>
            <th>{ui(locale, "Cusp", "भाव मध्य")}</th>
            <th>{ui(locale, "Occupants", "स्थित ग्रह")}</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house.house}>
              <td className="font-semibold text-stone-950">{house.house}</td>
              <td>{signUi(house.sign, locale)}</td>
              <td>{planetUi(house.sign ? signLords[house.sign] : undefined, locale)}</td>
              <td>{formatDegree(house.degree_cusp ?? undefined)}</td>
              <td>{planets.filter((planet) => planet.house === house.house).map((planet) => planetUi(planet.name, locale)).join(", ") || ui(locale, "None", "कोई नहीं")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ManglikDoshaView({
  result,
  locale,
}: {
  result: KundliResult;
  locale: KundliWorkspaceLocale;
}) {
  const yogaRows = [...arrayValue(result.yogas?.active_yogas), ...arrayValue(result.yogas?.yogas)];
  const manglikRows = yogaRows.filter((row) => {
    const searchable = [row.id, row.name, row.type, row.category]
      .filter(Boolean)
      .map(String)
      .join(" ")
      .toLowerCase();
    return searchable.includes("manglik") || searchable.includes("mangal dosha") || searchable.includes("kuja dosha");
  });
  const explicit =
    recordValue(result.yogas?.manglik_dosha) ??
    recordValue(result.yogas?.mangal_dosha) ??
    recordValue(result.yogas?.manglik);
  const mars = result.chart?.planets?.find((planet) => planet.name === "Mars");
  const returnedFlag = Boolean(
    explicit?.active ??
      explicit?.is_manglik ??
      explicit?.detected ??
      manglikRows.some((row) => row.active !== false),
  );
  const detected = returnedFlag;

  return (
    <div className="space-y-4">
      <div className={`rounded border p-4 ${detected ? "border-[#d98f6b] bg-[#fff4ed]" : "border-[#9bc5a4] bg-[#f3f8ef]"}`}>
        <div className={`font-semibold ${detected ? "text-[#8a2a13]" : "text-[#35542f]"}`}>
          {detected ? t(locale, "manglikDetected") : t(locale, "manglikNone")}
        </div>
        <p className="mt-2 text-sm leading-6 text-stone-700">
          {locale === "hi"
            ? "यह मुख्य संकेत लौटाए गए योग/दोष नियम और उसके साक्ष्य पर आधारित है। अलग परंपराओं में मांगलिक नियम भिन्न हो सकते हैं।"
            : "This headline follows the returned yoga/dosha rule and its evidence. Manglik rules can vary by lineage."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoRow
          label={t(locale, "marsPlacement")}
          value={mars ? `${mars.sign ?? "N/A"} · ${locale === "hi" ? "भाव" : "House"} ${mars.house ?? "N/A"}` : "N/A"}
        />
        <InfoRow
          label={locale === "hi" ? "लौटाया गया नियम परिणाम" : "Returned rule result"}
          value={detected
            ? t(locale, "manglikDetected")
            : t(locale, "manglikNone")}
        />
      </div>

      <div className="rounded border border-[#ecd89d] bg-[#fffdf7] p-4 text-sm leading-6 text-stone-700">
        <h3 className="font-semibold text-[#681414]">
          {ui(locale, "How to read this result", "इस परिणाम को कैसे पढ़ें")}
        </h3>
        <p className="mt-2">
          {locale === "hi"
            ? "एक सामान्य मांगलिक संदर्भ में मंगल को 1, 2, 4, 7, 8 या 12वें भाव में देखा जाता है। कुछ परंपराएं दूसरे भाव को शामिल नहीं करतीं, और गणना लग्न, चंद्र या शुक्र से दोहराई जा सकती है।"
            : "A common Manglik reference checks Mars in houses 1, 2, 4, 7, 8, or 12. Some traditions omit the second house, and the test may be repeated from the Ascendant, Moon, or Venus."}
        </p>
        <p className="mt-2 text-xs text-stone-600">
          {locale === "hi"
            ? "यह संदर्भ पैनल ऊपर लौटाए गए API नियम को बदलता या स्वतंत्र रूप से दोष घोषित नहीं करता। रद्दीकरण और दोनों कुंडलियों की तुलना भी अंतिम निर्णय को प्रभावित कर सकती है।"
            : "This reference panel does not override the returned API rule or independently declare a dosha. Cancellation rules and comparison with the other chart can also affect a final judgment."}
        </p>
      </div>

      {manglikRows.length ? (
        <div className="grid gap-2">
          {manglikRows.map((row, index) => (
            <div key={`${String(row.id ?? row.name ?? "manglik")}-${index}`} className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
              <div className="font-semibold text-[#681414]">{String(row.name ?? row.id ?? t(locale, "manglik"))}</div>
              <div className="mt-1 text-sm leading-6 text-stone-700">
                {String(row.description ?? row.interpretation ?? (row.active === false ? t(locale, "manglikNone") : t(locale, "manglikDetected")))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {explicit ? (
        <div className="grid gap-2">
          {Object.entries(explicit).slice(0, 8).map(([key, value]) => (
            <InfoRow key={key} label={humanize(key)} value={typeof value === "object" ? JSON.stringify(value) : value} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MuhuratDashboard({ result, locale }: { result: MuhuratResult; locale: KundliWorkspaceLocale }) {
  const windows = result.best_windows ?? [];
  const timezone = String(result.metadata?.timezone_used ?? result.input?.timezone ?? t(locale, "localTime"));

  return (
    <div className="space-y-5">
      <section className="rounded border border-[#e1c878] bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold text-[#681414]">
                {muhuratPurposeLabel(result.purpose, locale)} {locale === "hi" ? "मुहूर्त" : "Muhurat"}
              </h2>
              <span className="rounded bg-[#fff3cf] px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
                {t(locale, "publicSearch")}
              </span>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-600">
              <span className="inline-flex items-center gap-1">
                <MapPin size={16} /> {result.input?.city ?? t(locale, "selectedLocation")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={16} /> {timezone}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays size={16} /> {formatMuhuratRange(result.range, locale)}
              </span>
            </p>
          </div>
          <div className="min-w-24 rounded bg-[#8d1f1f] px-4 py-3 text-center text-white">
            <div className="text-3xl font-semibold">{windows.length}</div>
            <div className="text-xs font-semibold text-[#f8dea0]">
              {t(locale, windows.length === 1 ? "window" : "windows")}
            </div>
          </div>
        </div>
      </section>

      {windows.length ? (
        <div className="grid gap-4">
          {windows.map((window, index) => (
            <MuhuratWindowCard key={`${window.start ?? window.date ?? "window"}-${index}`} window={window} rank={index + 1} locale={locale} />
          ))}
        </div>
      ) : (
        <section className="rounded border border-[#e1c878] bg-white p-8 text-center">
          <h3 className="text-xl font-semibold text-[#681414]">{t(locale, "noWindows")}</h3>
          <p className="mt-2 text-sm text-stone-600">{t(locale, "noWindowsBody")}</p>
        </section>
      )}

      <section className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e1c878] px-1 pt-3 text-xs text-stone-600">
        <span>{humanize(String(result.metadata?.ruleset_version ?? "FreeAstro Muhurat V2"))}</span>
        <span>{String(result.metadata?.ayanamsha ?? "lahiri")} ayanamsha</span>
      </section>
    </div>
  );
}

function MuhuratWindowCard({ window, rank, locale }: { window: MuhuratWindow; rank: number; locale: KundliWorkspaceLocale }) {
  const criteria = window.criteria ?? {};
  const reasons = window.reasons ?? window.source_periods ?? [];
  const warnings = window.warnings ?? [];

  return (
    <article className="overflow-hidden rounded border border-[#e1c878] bg-white">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#f0dfae] bg-[#fffdf7] p-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#8d1f1f]">{t(locale, "rank")} {rank}</span>
            <span className="text-xs font-medium text-stone-500">{humanize(window.quality ?? "auspicious")}</span>
          </div>
          <h3 className="mt-1 text-lg font-semibold text-stone-950">
            {formatMuhuratDateTime(window.start, locale)}
          </h3>
          <p className="mt-1 text-sm text-stone-600">{t(locale, "until")} {formatMuhuratDateTime(window.end, locale)}</p>
        </div>
        <div className="min-w-20 rounded bg-[#fff3cf] px-3 py-2 text-center">
          <div className="text-2xl font-semibold text-[#8d1f1f]">{window.score ?? "N/A"}</div>
          <div className="text-xs font-semibold text-stone-600">{t(locale, "score")}</div>
        </div>
      </div>

      <dl className="grid border-b border-[#f0dfae] sm:grid-cols-2 xl:grid-cols-4">
        <MuhuratCriterion label={t(locale, "duration")} value={formatMuhuratDuration(window.duration_minutes, locale)} />
        <MuhuratCriterion label="Tithi" value={objectPath(criteria, "tithi.value")} />
        <MuhuratCriterion label="Nakshatra" value={objectPath(criteria, "nakshatra.value")} />
        <MuhuratCriterion label={t(locale, "weekday")} value={objectPath(criteria, "weekday.value")} />
      </dl>

      <div className="space-y-3 p-4">
        {reasons.length ? (
          <div className="flex flex-wrap gap-2">
            {reasons.map((reason) => (
              <span key={reason} className="rounded border border-[#dfc983] bg-[#fffaf0] px-2 py-1 text-xs font-medium text-stone-700">
                {reason}
              </span>
            ))}
          </div>
        ) : null}

        {warnings.length ? (
          <div className="border-l-4 border-[#a53b21] bg-[#fff4ed] px-3 py-2 text-sm text-[#8a2a13]">
            {warnings.join(" ")}
          </div>
        ) : (
          <div className="border-l-4 border-[#4f7a46] bg-[#f3f8ef] px-3 py-2 text-sm text-[#35542f]">
            {t(locale, "noCaution")}
          </div>
        )}
      </div>
    </article>
  );
}

function MuhuratCriterion({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="border-b border-[#f0dfae] px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <dt className="text-xs font-semibold text-stone-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-stone-800">{String(value ?? "N/A")}</dd>
    </div>
  );
}

function MatchingDashboard({ result, locale }: { result: MatchResult | null; locale: KundliWorkspaceLocale }) {
  if (!result?.match) {
    return (
      <div className="grid min-h-80 place-items-center border-y border-[#e1c878] bg-white p-8 text-center">
        <div className="max-w-lg">
          <h2 className="text-2xl font-semibold text-[#681414]">{t(locale, "matchEmptyTitle")}</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {t(locale, "matchEmptyBody")}
          </p>
        </div>
      </div>
    );
  }

  const match = result.match;
  const ashtakoota = recordValue(match.ashtakoota);
  const summary = recordValue(match.summary);
  const kootas = arrayValue(ashtakoota?.kootas);
  const legacyScores = recordValue(match.scores) ?? recordValue(match.details) ?? {};
  const doshas = recordValue(match.doshas);
  const recommendation = matchRecommendationUi(
    String(ashtakoota?.recommendation ?? match.recommendation ?? t(locale, "compatibilityReport")),
    locale,
  );
  const totalScore =
    summary?.total_score ?? ashtakoota?.score ?? match.total_score ?? "N/A";
  const maxScore =
    summary?.max_score ?? ashtakoota?.max_score ?? match.max_score ?? 36;
  const percentage = numberValue(ashtakoota?.percentage);
  return (
    <div className="space-y-5">
      <section className="rounded border border-[#e1c878] bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#681414]">
              {result.input?.p1?.label ?? t(locale, "person1")} + {result.input?.p2?.label ?? t(locale, "person2")}
            </h2>
            <p className="mt-1 text-sm text-stone-600">{String(recommendation)}</p>
          </div>
          <div className="rounded bg-[#fff3cf] px-4 py-3 text-center">
            <div className="text-3xl font-semibold text-[#8d1f1f]">{String(totalScore)}</div>
            <div className="text-xs font-semibold text-stone-600">{t(locale, "of")} {String(maxScore)}</div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-stone-700">
          {percentage !== null ? `${percentage.toFixed(1)}% · ` : ""}
          {String(match.interpretation ?? t(locale, "matchInterpretation"))}
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <DataPanel title={t(locale, "ashtakootaScores")} icon={<Users size={20} />}>
          <div className="grid gap-2">
            {kootas.length
              ? kootas.map((row, index) => {
                  const evidence = locale === "hi" ? "" : arrayValue(row.evidence)
                    .map((item) => String(item.message ?? ""))
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div
                      key={`${String(row.id ?? row.name)}-${index}`}
                      className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-semibold text-[#681414]">
                          {matchKootaUi(String(row.name ?? row.id ?? "Koota"), locale)}
                        </div>
                        <div className="whitespace-nowrap text-sm font-semibold text-stone-800">
                          {String(row.score ?? "N/A")} / {String(row.max_score ?? "N/A")}
                        </div>
                      </div>
                      <div className="mt-1 text-xs font-medium text-stone-500">
                        {matchStatusUi(String(row.status ?? "calculated"), locale)}
                      </div>
                      {evidence ? (
                        <p className="mt-2 text-xs leading-5 text-stone-600">{evidence}</p>
                      ) : null}
                    </div>
                  );
                })
              : Object.entries(legacyScores).map(([key, value]) => {
                  const row = recordValue(value) ?? {};
                  return (
                    <InfoRow
                      key={key}
                      label={humanize(key)}
                      value={`${String(row.score ?? "N/A")} / ${String(row.max ?? "N/A")}`}
                    />
                  );
                })}
          </div>
        </DataPanel>
        <DataPanel title={t(locale, "matchingDoshas")} icon={<Activity size={20} />}>
          {doshas ? (
            <div className="grid gap-3">
              {Object.entries(doshas).map(([key, value]) => (
                <MatchDoshaSummary key={key} name={key} value={value} locale={locale} />
              ))}
            </div>
          ) : (
            <MutedMessage label={t(locale, "noMatchDosha")} />
          )}
        </DataPanel>
      </div>

      <DataPanel title={t(locale, "matchPdf")} icon={<FileText size={20} />}>
        <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white">
          <FileText size={16} /> {t(locale, "saveMatchPdf")}
        </button>
      </DataPanel>
    </div>
  );
}

function MatchDoshaSummary({
  name,
  value,
  locale,
}: {
  name: string;
  value: unknown;
  locale: KundliWorkspaceLocale;
}) {
  const data = recordValue(value);
  if (!data) return <InfoRow label={humanize(name)} value={String(value)} />;

  const compatibility = recordValue(data.compatibility);
  const person1 = recordValue(data.person1);
  const person2 = recordValue(data.person2);
  const messages = locale === "hi"
    ? name === "manglik"
      ? [
          person1?.severity ? `व्यक्ति 1: ${matchManglikSeverityUi(String(person1.severity))}` : null,
          person2?.severity ? `व्यक्ति 2: ${matchManglikSeverityUi(String(person2.severity))}` : null,
          compatibility?.status
            ? `मंगल अनुकूलता: ${matchStatusUi(String(compatibility.status), locale)}`
            : null,
        ].filter(Boolean).map(String)
      : [
          typeof data.active === "boolean"
            ? data.active
              ? "दोष सक्रिय है; विस्तृत स्कोर की समीक्षा करें।"
              : "दोष सक्रिय नहीं है।"
            : null,
        ].filter(Boolean).map(String)
    : [
        data.message,
        compatibility?.message,
        person1?.message ?? person1?.severity,
        person2?.message ?? person2?.severity,
      ].filter(Boolean).map(String);
  const score =
    data.score !== undefined
      ? `${String(data.score)} / ${String(data.max_score ?? "N/A")}`
      : null;
  const active = data.active;
  const status =
    typeof active === "boolean"
      ? active
        ? locale === "hi"
          ? "सक्रिय"
          : "Active"
        : locale === "hi"
          ? "सक्रिय नहीं"
          : "Not active"
      : compatibility?.status
        ? humanize(String(compatibility.status))
        : null;
  const label = locale === "hi"
    ? ({ manglik: "मांगलिक दोष", nadi: "नाड़ी दोष", bhakoot: "भकूट दोष" }[name] ?? humanize(name))
    : humanize(name);

  return (
    <div className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold capitalize text-[#681414]">{label}</h3>
        <span className="text-xs font-semibold text-stone-500">
          {[status, score].filter(Boolean).join(" · ")}
        </span>
      </div>
      {messages.length ? (
        <div className="mt-2 space-y-1 text-xs leading-5 text-stone-600">
          {messages.map((message, index) => (
            <p key={`${message}-${index}`}>{message}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function matchRecommendationUi(value: string, locale: KundliWorkspaceLocale) {
  if (locale !== "hi") return value;
  const normalized = value.toLowerCase();
  if (normalized.includes("excellent")) return "उत्कृष्ट मिलान";
  if (normalized.includes("good")) return "अच्छा मिलान";
  if (normalized.includes("average")) return normalized.includes("below") ? "औसत से कम मिलान" : "औसत मिलान";
  if (normalized.includes("poor")) return "कमज़ोर मिलान";
  return value === englishText.compatibilityReport ? hindiText.compatibilityReport : value;
}

function matchKootaUi(value: string, locale: KundliWorkspaceLocale) {
  if (locale !== "hi") return value;
  return ({
    varna: "वर्ण",
    vashya: "वश्य",
    tara: "तारा",
    yoni: "योनि",
    "graha maitri": "ग्रह मैत्री",
    graha_maitri: "ग्रह मैत्री",
    gana: "गण",
    bhakoot: "भकूट",
    nadi: "नाड़ी",
  }[value.toLowerCase()] ?? value);
}

function matchStatusUi(value: string, locale: KundliWorkspaceLocale) {
  if (locale !== "hi") return humanize(value);
  return ({
    strong: "मजबूत",
    moderate: "मध्यम",
    weak: "कमज़ोर",
    dosha: "दोष",
    balanced: "संतुलित",
    calculated: "गणना पूर्ण",
  }[value.toLowerCase()] ?? humanize(value));
}

function matchManglikSeverityUi(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("low")) return "हल्का मंगल दोष";
  if (normalized.includes("moderate")) return "मध्यम मंगल दोष";
  if (normalized.includes("high") || normalized.includes("severe")) return "तीव्र मंगल दोष";
  if (normalized.includes("none") || normalized.includes("no mangal")) return "मंगल दोष नहीं";
  return value;
}

function SavedClientsView({
  charts,
  search,
  onLoad,
  onDelete,
  locale,
}: {
  charts: SavedChart[];
  search: string;
  onLoad: (chart: SavedChart) => void;
  onDelete: (id: string) => void;
  locale: KundliWorkspaceLocale;
}) {
  const filtered = charts.filter((chart) =>
    `${chart.label} ${chart.result.input.city} ${chart.notes}`.toLowerCase().includes(search.toLowerCase()),
  );
  if (!filtered.length) {
    return (
      <div className="grid min-h-80 place-items-center border-y border-[#e1c878] bg-white p-8 text-center">
        <div className="max-w-lg">
          <h2 className="text-2xl font-semibold text-[#681414]">{t(locale, "noSaved")}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{t(locale, "noSavedBody")}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {filtered.map((chart) => (
        <div key={chart.id} className="rounded border border-[#e1c878] bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-[#681414]">{chart.label}</h3>
              <p className="mt-1 text-sm text-stone-600">{chart.result.input.city} · {new Date(chart.updatedAt).toLocaleString()}</p>
            </div>
            <button aria-label={locale === "hi" ? `${chart.label} हटाएं` : `Delete ${chart.label}`} type="button" onClick={() => onDelete(chart.id)} className="grid size-11 place-items-center rounded border border-[#d8bd72] text-[#8d1f1f]">
              <Trash2 size={16} />
            </button>
          </div>
          {chart.notes ? <p className="mt-3 line-clamp-3 text-sm text-stone-700">{chart.notes}</p> : null}
          <button type="button" onClick={() => onLoad(chart)} className="mt-4 inline-flex h-11 items-center justify-center rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white">
            {t(locale, "openChart")}
          </button>
        </div>
      ))}
    </div>
  );
}

function DataPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 rounded border border-[#e1c878] bg-white">
      <div className="flex items-center gap-2 border-b border-[#f0dfae] px-4 py-3 text-[#681414]">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function VargottamaSummary({
  d1Planets,
  d9Planets,
  locale,
}: {
  d1Planets: Planet[];
  d9Planets: Planet[];
  locale: KundliWorkspaceLocale;
}) {
  if (!d1Planets.length || !d9Planets.length) {
    return <MutedMessage label={ui(locale, "D1 or D9 planet placements are unavailable for a Vargottama comparison.", "वर्गोत्तम तुलना के लिए D1 या D9 ग्रह स्थिति उपलब्ध नहीं है।")} />;
  }

  const matches = d1Planets.flatMap((d1Planet) => {
    const d9Planet = d9Planets.find(
      (candidate) => normalizedAstroLabel(candidate.name) === normalizedAstroLabel(d1Planet.name),
    );
    if (!d9Planet) return [];
    const sameSignId =
      typeof d1Planet.sign_id === "number" &&
      typeof d9Planet.sign_id === "number" &&
      d1Planet.sign_id === d9Planet.sign_id;
    const sameSignName =
      Boolean(d1Planet.sign && d9Planet.sign) &&
      normalizedAstroLabel(d1Planet.sign ?? "") === normalizedAstroLabel(d9Planet.sign ?? "");
    return sameSignId || sameSignName ? [{ d1Planet, d9Planet }] : [];
  });

  return (
    <section className="rounded border border-[#ecd89d] bg-[#fffdf7] p-4" aria-labelledby="vargottama-heading">
      <h3 id="vargottama-heading" className="font-semibold text-[#681414]">
        {ui(locale, "Vargottama comparison", "वर्गोत्तम तुलना")}
      </h3>
      <p className="mt-1 text-sm leading-6 text-stone-600">
        {locale === "hi"
          ? "यह सारांश लौटाई गई D1 और D9 राशियों की सीधी तुलना करता है। दोनों में एक ही राशि वाला ग्रह वर्गोत्तम के रूप में सूचीबद्ध है।"
          : "This summary directly compares the returned D1 and D9 signs. A planet is listed as Vargottama when it occupies the same sign in both charts."}
      </p>
      {matches.length ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {matches.map(({ d1Planet }) => (
            <div key={d1Planet.name} className="flex items-center justify-between gap-3 rounded border border-[#ead596] bg-white px-3 py-2 text-sm">
              <span className="font-semibold text-stone-800">{planetUi(d1Planet.name, locale)}</span>
              <span className="text-stone-600">{signUi(d1Planet.sign, locale)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded border border-[#ead596] bg-white px-3 py-2 text-sm text-stone-600">
          {ui(locale, "No same-sign D1/D9 planet placements were found in the returned data.", "लौटाए गए डेटा में D1 और D9 में समान राशि वाला कोई ग्रह नहीं मिला।")}
        </p>
      )}
    </section>
  );
}

function OptionalStrengthData({
  title,
  value,
  locale,
}: {
  title: string;
  value: unknown;
  locale: KundliWorkspaceLocale;
}) {
  const rows = strengthDataRows(value);
  if (!rows.length) return null;
  return (
    <section className="rounded border border-[#ecd89d] bg-[#fffdf7] p-3">
      <h3 className="font-semibold text-[#681414]">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-stone-600">
        {ui(locale, "Shown only when this optional module is present in the API response.", "यह केवल तभी दिखता है जब वैकल्पिक मॉड्यूल API उत्तर में मौजूद हो।")}
      </p>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {rows.map((row, index) => (
          <div key={`${row.label}-${index}`} className="rounded border border-[#ead596] bg-white px-3 py-2">
            <dt className="text-xs font-semibold text-stone-500">{humanize(row.label)}</dt>
            <dd className="mt-1 break-words text-sm font-medium text-stone-800">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function DashaView({ dasha, locale }: { dasha?: Record<string, unknown>; locale: KundliWorkspaceLocale }) {
  if (!dasha) return <MutedMessage label={ui(locale, "Dasha module is off.", "दशा मॉड्यूल बंद है।")} />;
  const active = arrayValue(dasha.active_periods);
  const timeline = arrayValue(dasha.timeline);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {active.length ? (
          active.map((period, index) => (
            <div key={`${String(period.lord)}-${index}`} className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#681414]">{String(period.level ?? ui(locale, "Period", "अवधि"))}</span>
                <span className="rounded bg-white px-2 py-1 text-xs text-stone-600">
                  {percent(period.progress_fraction)}
                </span>
              </div>
              <div className="mt-1 text-lg font-semibold">{planetUi(String(period.lord ?? ""), locale)}</div>
              <div className="mt-1 text-xs text-stone-600">
                {String(period.start ?? "N/A")} {ui(locale, "to", "से")} {String(period.end ?? "N/A")} {locale === "hi" ? "तक" : ""}
              </div>
            </div>
          ))
        ) : (
          <MutedMessage label={ui(locale, "No active dasha periods returned.", "कोई सक्रिय दशा अवधि नहीं मिली।")} />
        )}
      </div>

      {timeline.length ? (
        <div>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold text-stone-800">{ui(locale, "Complete Mahadasha timeline", "पूरा महादशा क्रम")}</h3>
            <span className="text-xs text-stone-500">
              {timeline.length} {ui(locale, timeline.length === 1 ? "period" : "periods", "अवधियां")}
            </span>
          </div>
          <div className="max-h-[28rem] space-y-2 overflow-y-auto pr-1" aria-label={ui(locale, "Complete Mahadasha timeline", "पूरा महादशा क्रम")}>
            {timeline.map((period, index) => (
              <div key={`${String(period.lord)}-${String(period.start)}-${index}`} className="flex items-center gap-2 rounded border border-transparent px-1 py-1 text-sm hover:border-[#ecd89d] hover:bg-[#fffaf0]">
                <ChevronRight className="text-[#a53b21]" size={16} />
                <span className="font-medium">{planetUi(String(period.lord ?? ""), locale)}</span>
                <span className="text-stone-500">
                  {String(period.start ?? "")} - {String(period.end ?? "")}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function YogaView({ yogas, locale }: { yogas?: Record<string, unknown>; locale: KundliWorkspaceLocale }) {
  if (!yogas) return <MutedMessage label={ui(locale, "Yoga module is off.", "योग मॉड्यूल बंद है।")} />;
  const rows = [
    ...arrayValue(yogas.active_yogas),
    ...arrayValue(yogas.yogas).filter((row) => row.active === true),
  ].slice(0, 6);

  if (!rows.length) {
    return <MutedMessage label={ui(locale, "No active yogas were returned for this chart.", "इस कुंडली में कोई सक्रिय योग नहीं मिला।")} />;
  }

  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div key={`${String(row.id ?? row.name)}-${index}`} className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
          <div className="flex items-start gap-2">
            <Check className="mt-1 shrink-0 text-[#1b7f56]" size={16} />
            <div>
              <div className="font-semibold text-[#681414]">{String(row.name ?? ui(locale, "Yoga", "योग"))}</div>
              <div className="mt-1 text-xs leading-5 text-stone-600">
                {[row.category, row.type, row.strength].filter(Boolean).map(String).join(" · ") || ui(locale, "Active combination", "सक्रिय योग")}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StrengthView({ strength, locale }: { strength?: Record<string, unknown>; locale: KundliWorkspaceLocale }) {
  if (!strength) return <MutedMessage label={ui(locale, "Strength module is off.", "ग्रह बल मॉड्यूल बंद है।")} />;
  return (
    <div className="space-y-4">
      <ShadbalaView strength={strength} locale={locale} />
      <AshtakavargaView strength={strength} locale={locale} />
    </div>
  );
}

function ShadbalaView({
  strength,
  locale,
}: {
  strength?: Record<string, unknown>;
  locale: KundliWorkspaceLocale;
}) {
  if (!strength) return <MutedMessage label={t(locale, "shadbalaMissing")} />;
  const shadbala = recordValue(strength.shadbala);
  const bhavabala = strength.bhavabala ?? strength.bhava_bala;
  const ishtaKashta = strength.ishta_kashta ?? strength.ishta_kashta_bala ?? strength.ishta_kashta_phala;
  const entries = Object.entries(shadbala ?? {})
    .map(([planet, value]) => ({ planet, metrics: recordValue(value) }))
    .filter((row): row is { planet: string; metrics: Record<string, unknown> } => Boolean(row.metrics))
    .slice(0, 7);

  if (!entries.length && !bhavabala && !ishtaKashta) return <MutedMessage label={t(locale, "shadbalaMissing")} />;

  return (
    <div className="space-y-3">
      {entries.map(({ planet, metrics }) => {
        const ratio = numberValue(metrics.ratio);
        const rupas = numberValue(metrics.shadbala_in_rupas);
        const returnedVirupas = numberValue(metrics.shadbala_in_virupas ?? metrics.virupas);
        const virupas = returnedVirupas ?? (rupas === null ? null : rupas * 60);
        const virupasAreDerived = returnedVirupas === null && rupas !== null;
        const minimum = numberValue(metrics.minimum_requirements);
        const status = strengthStatus(ratio);
        const width = ratio === null ? 18 : Math.min(100, Math.max(12, ratio * 72));
        const localizedStatus = locale === "hi"
          ? ({ Unknown: "अज्ञात", Strong: "मजबूत", Adequate: "पर्याप्त", "Needs attention": "ध्यान आवश्यक" }[status.label] ?? status.label)
          : status.label;
        const components = [
          ["Sthana", "स्थान", metrics.sthana_bala],
          ["Dig", "दिग", metrics.dig_bala],
          ["Kala", "काल", metrics.kala_bala],
          ["Cheshta", "चेष्टा", metrics.cheshta_bala],
          ["Naisargika", "नैसर्गिक", metrics.naisargika_bala],
          ["Drik", "दृक", metrics.drik_bala],
        ] as const;

        return (
          <div key={planet} className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-[#681414]">{planet}</div>
                <div className="mt-1 text-xs leading-5 text-stone-600">
                  {formatNumber(rupas)} {locale === "hi" ? "रूप" : "rupas"} / {locale === "hi" ? "न्यूनतम" : "min"} {formatNumber(minimum)}
                </div>
                <div className="text-xs leading-5 text-stone-500">
                  {formatNumber(virupas)} {locale === "hi" ? "विरूप" : "virupas"}
                  {virupasAreDerived
                    ? ui(locale, " (derived as rupas × 60)", " (रूप × 60 से निकाला गया)")
                    : ""}
                </div>
              </div>
              <span className={`rounded px-2 py-1 text-xs font-semibold ${status.className}`}>
                {localizedStatus}
              </span>
            </div>
            <div className="mb-1 flex justify-between text-xs text-stone-600">
              <span>{locale === "hi" ? "अनुपात" : "Ratio"}</span>
              <span className="font-semibold text-stone-800">{formatNumber(ratio)}</span>
            </div>
            <div className="h-2 rounded bg-[#f3e4bd]">
              <div className={`h-2 rounded ${status.barClassName}`} style={{ width: `${width}%` }} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {components.map(([labelEn, labelHi, value]) => (
                <div key={labelEn} className="rounded border border-[#ead596] bg-white px-2 py-2">
                  <dt className="text-xs font-semibold text-stone-500">
                    {locale === "hi" ? labelHi : `${labelEn} Bala`}
                  </dt>
                  <dd className="mt-1 font-semibold text-stone-800">
                    {formatNumber(numberValue(value))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
      {bhavabala ? (
        <OptionalStrengthData
          title={ui(locale, "Bhavabala returned by the calculation", "गणना से लौटाया गया भावबल")}
          value={bhavabala}
          locale={locale}
        />
      ) : null}
      {ishtaKashta ? (
        <OptionalStrengthData
          title={ui(locale, "Ishta and Kashta values returned by the calculation", "गणना से लौटे इष्ट और कष्ट मान")}
          value={ishtaKashta}
          locale={locale}
        />
      ) : null}
    </div>
  );
}

function AshtakavargaView({
  strength,
  locale,
}: {
  strength?: Record<string, unknown>;
  locale: KundliWorkspaceLocale;
}) {
  if (!strength) return <MutedMessage label={t(locale, "ashtakavargaMissing")} />;
  const ashtakavarga = recordValue(strength.ashtakavarga);
  const sav = numberArray(ashtakavarga?.sarvashtakavarga ?? strength.sarvashtakavarga);
  const bhinnashtakavarga = recordValue(ashtakavarga?.bhinnashtakavarga);
  const bavRows = Object.entries(bhinnashtakavarga ?? {})
    .map(([planet, values]) => ({ planet, values: numberArray(values) }))
    .filter((row) => row.values.length === 12);
  if (!sav.length && !bavRows.length) {
    return <MutedMessage label={t(locale, "ashtakavargaMissing")} />;
  }
  const strongest = sav.length ? strongestHouse(sav) : null;
  const weakest = sav.length ? weakestHouse(sav) : null;

  return (
    <div className="space-y-4 text-sm">
      {sav.length && strongest && weakest ? (
        <div className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-[#681414]">Sarvashtakavarga (SAV)</div>
              <div className="mt-1 text-xs text-stone-600">
                {locale === "hi"
                  ? `सबसे अधिक ${zodiacSigns[strongest.house - 1]}: ${strongest.value} · सबसे कम ${zodiacSigns[weakest.house - 1]}: ${weakest.value}`
                  : `Highest ${zodiacSigns[strongest.house - 1]}: ${strongest.value} · Lowest ${zodiacSigns[weakest.house - 1]}: ${weakest.value}`}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {sav.map((value, index) => (
              <div
                key={`sav-${index}`}
                className={`rounded border px-2 py-2 text-center text-xs ${
                  value === strongest.value
                    ? "border-[#1b7f56] bg-[#edf8f2] text-[#155f42]"
                    : value === weakest.value
                      ? "border-[#c77a45] bg-[#fff1e8] text-[#8a3d12]"
                      : "border-[#ead596] bg-white text-stone-700"
                }`}
              >
                <div className="font-semibold">{zodiacSigns[index]}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {bavRows.length ? (
        <div className="overflow-x-auto rounded border border-[#ecd89d] bg-white">
          <table className="data-table min-w-[900px]">
            <caption className="border-b border-[#f0dfae] bg-[#fffaf0] px-3 py-2 text-left font-semibold text-[#681414]">
              {locale === "hi" ? "भिन्नाष्टकवर्ग (BAV) ग्रह तालिका" : "Bhinnashtakavarga (BAV) by planet"}
            </caption>
            <thead>
              <tr>
                <th>{locale === "hi" ? "ग्रह" : "Planet"}</th>
                {zodiacSigns.map((sign) => <th key={sign}>{sign.slice(0, 3)}</th>)}
              </tr>
            </thead>
            <tbody>
              {bavRows.map(({ planet, values }) => (
                <tr key={planet}>
                  <td className="font-semibold text-stone-950">{planet}</td>
                  {values.map((value, index) => (
                    <td key={`${planet}-${zodiacSigns[index]}`} className="text-center">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function VargasView({ vargas, settings, locale }: { vargas?: Record<string, unknown>; settings: ChartSettings; locale: KundliWorkspaceLocale }) {
  if (!vargas) return <MutedMessage label={ui(locale, "Varga module is off.", "वर्ग कुंडली मॉड्यूल बंद है।")} />;
  const charts = recordValue(vargas.vargas) ?? vargas;
  const preferred = ["D1", "D9", "D10", "D7", "D12", "D30", "D60"];
  const entries = Object.entries(charts)
    .filter(([, chart]) => typeof chart === "object" && chart !== null)
    .sort(([a], [b]) => preferred.indexOf(a) - preferred.indexOf(b));

  if (!entries.length) return <MutedMessage label={ui(locale, "No divisional charts returned.", "कोई वर्ग कुंडली नहीं मिली।")} />;

  return (
    <div className="grid gap-5">
      {entries.filter(([key]) => preferred.includes(key)).map(([key, chart]) => {
        const row = recordValue(chart) ?? {};
        return (
          <ChartRenderer
            key={key}
            chart={{
              division: Number(row.division) || Number(key.replace("D", "")),
              name: String(row.name ?? ui(locale, "Divisional chart", "वर्ग कुंडली")),
              ascendant: recordValue(row.ascendant) as { sign?: string; sign_id?: number } | undefined,
              planets: arrayValue(row.planets) as Planet[],
              houses: arrayValue(row.houses) as House[],
            }}
            settings={settings}
            title={`${key} ${String(row.name ?? "")}`}
          />
        );
      })}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#f2e4bd] pb-2 text-sm last:border-0 last:pb-0">
      <span className="text-stone-500">{label}</span>
      <span className="text-right font-semibold text-stone-950">{String(value ?? "N/A")}</span>
    </div>
  );
}

function MutedMessage({ label }: { label: string }) {
  return <div className="rounded border border-dashed border-[#dbc075] bg-[#fffaf0] p-4 text-sm text-stone-600">{label}</div>;
}

function addDaysToDateInput(value: string, days: number) {
  const date = dateInputAsUtc(value);
  if (!date) return "";
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function dateRangeDayCount(start: string, end: string) {
  const startDate = dateInputAsUtc(start);
  const endDate = dateInputAsUtc(end);
  if (!startDate || !endDate) return Number.NaN;
  return Math.floor((endDate.getTime() - startDate.getTime()) / 86_400_000) + 1;
}

function dateInputAsUtc(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;
  return date;
}

function currentDateInputInTimeZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function muhuratPurposeUiLabel(purpose: MuhuratPurpose, locale: KundliWorkspaceLocale) {
  const keys: Record<MuhuratPurpose, keyof typeof englishText> = {
    general_work: "generalWork",
    vehicle_purchase: "vehiclePurchase",
    property_purchase: "propertyPurchase",
    griha_pravesh: "grihaPravesh",
    namkaran: "namkaran",
    mundan: "mundan",
  };
  return t(locale, keys[purpose]);
}

function muhuratPurposeLabel(purpose: MuhuratPurpose | undefined, locale: KundliWorkspaceLocale) {
  return purpose ? muhuratPurposeUiLabel(purpose, locale) : locale === "hi" ? "सार्वजनिक" : "Public";
}

function formatMuhuratRange(range: MuhuratResult["range"] | undefined, locale: KundliWorkspaceLocale) {
  if (!range?.start_date || !range.end_date) return locale === "hi" ? "चुनी गई तिथि अवधि" : "Selected date range";
  const days = range.day_count
    ? locale === "hi"
      ? ` · ${range.day_count} दिन`
      : ` · ${range.day_count} day${range.day_count === 1 ? "" : "s"}`
    : "";
  return `${formatDateInput(range.start_date, locale)} - ${formatDateInput(range.end_date, locale)}${days}`;
}

function formatDateInput(value: string, locale: KundliWorkspaceLocale = "en") {
  const date = dateInputAsUtc(value);
  return date
    ? date.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    : value;
}

function formatMuhuratDateTime(value: string | undefined, locale: KundliWorkspaceLocale = "en") {
  if (!value) return locale === "hi" ? "समय नहीं मिला" : "Time not returned";
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  if (!match) return value;
  const [, year, month, day, hourValue, minute] = match;
  const hour = Number(hourValue);
  const meridiem = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${formatDateInput(`${year}-${month}-${day}`, locale)} · ${displayHour}:${minute} ${meridiem}`;
}

function formatMuhuratDuration(value: number | undefined, locale: KundliWorkspaceLocale = "en") {
  if (typeof value !== "number" || Number.isNaN(value)) return "N/A";
  const totalMinutes = Math.round(value);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!hours) return `${minutes}${locale === "hi" ? " मिनट" : "m"}`;
  return locale === "hi" ? `${hours} घंटे ${minutes} मिनट` : `${hours}h ${minutes}m`;
}

function formatDegree(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "N/A";
  return `${value.toFixed(2)} deg`;
}

function humanize(value: string) {
  return value.replaceAll("_", " ");
}

function normalizedAstroLabel(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function strengthDataRows(value: unknown): Array<{ label: string; value: string }> {
  const record = recordValue(value);
  if (record) {
    return Object.entries(record)
      .slice(0, 24)
      .map(([label, rowValue]) => ({ label, value: readableStrengthValue(rowValue) }));
  }
  if (Array.isArray(value)) {
    return value.slice(0, 24).map((rowValue, index) => ({
      label: `item_${index + 1}`,
      value: readableStrengthValue(rowValue),
    }));
  }
  return value === undefined || value === null
    ? []
    : [{ label: "value", value: readableStrengthValue(value) }];
}

function readableStrengthValue(value: unknown) {
  if (typeof value === "number") return formatNumber(Number.isFinite(value) ? value : null);
  if (typeof value === "string" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    const primitives = value.filter((item) => ["string", "number", "boolean"].includes(typeof item));
    return primitives.length === value.length ? primitives.join(", ") : JSON.stringify(value);
  }
  if (value && typeof value === "object") {
    const summary = Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => ["string", "number", "boolean"].includes(typeof item))
      .slice(0, 8)
      .map(([key, item]) => `${humanize(key)}: ${String(item)}`)
      .join(" · ");
    return summary || JSON.stringify(value);
  }
  return "N/A";
}

function formatDms(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "N/A";
  const degrees = Math.floor(value);
  const minutesFloat = (value - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);
  return `${degrees}° ${minutes}' ${seconds}"`;
}

function getVargaChart(vargas: Record<string, unknown> | undefined, key: string) {
  const charts = recordValue(vargas?.vargas) ?? vargas;
  const row = recordValue(charts?.[key]);
  if (!row) return null;
  return {
    division: Number(row.division) || Number(key.replace("D", "")),
    name: String(row.name ?? key),
    ascendant: recordValue(row.ascendant) as { sign?: string; sign_id?: number } | undefined,
    planets: arrayValue(row.planets) as Planet[],
    houses: arrayValue(row.houses) as House[],
  };
}

function birthPayload(form: BirthForm) {
  const [year, month, day] = form.date.split("-").map(Number);
  const [hour, minute] = form.time.split(":").map(Number);
  const lat = form.manualCoordinates && form.manualLat.trim() ? Number(form.manualLat) : (form.city?.lat ?? Number(form.manualLat));
  const lng = form.manualCoordinates && form.manualLng.trim() ? Number(form.manualLng) : (form.city?.lng ?? Number(form.manualLng));
  return {
    label: form.name,
    year,
    month,
    day,
    hour,
    minute,
    second: Number(form.seconds) || 0,
    city: form.city?.name ?? form.cityQuery,
    lat,
    lng,
    tz_str: form.timezoneOverride.trim() || form.city?.timezone || "AUTO",
  };
}

async function savedDb() {
  const { openDB } = await import("idb");
  return openDB("kundli-chart-desk", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("charts")) {
        db.createObjectStore("charts", { keyPath: "id" });
      }
    },
  });
}

async function loadSavedCharts() {
  const db = await savedDb();
  const rows = await db.getAll("charts");
  return (rows as SavedChart[]).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

async function putSavedChart(chart: SavedChart) {
  const db = await savedDb();
  await db.put("charts", chart);
}

async function removeSavedChart(id: string) {
  const db = await savedDb();
  await db.delete("charts", id);
}

function percent(value: unknown) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "N/A";
  return `${Math.round(numeric * 100)}%`;
}

function numberValue(value: unknown) {
  if (value === null || value === undefined || value === "" || typeof value === "boolean") {
    return null;
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function numberArray(value: unknown) {
  return Array.isArray(value)
    ? value.map(numberValue).filter((item): item is number => item !== null)
    : [];
}

function formatNumber(value: number | null) {
  if (value === null) return "N/A";
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function strengthStatus(ratio: number | null) {
  if (ratio === null) {
    return {
      label: "Unknown",
      className: "bg-white text-stone-600",
      barClassName: "bg-stone-400",
    };
  }
  if (ratio >= 1.25) {
    return {
      label: "Strong",
      className: "bg-[#edf8f2] text-[#155f42]",
      barClassName: "bg-[#1b7f56]",
    };
  }
  if (ratio >= 1) {
    return {
      label: "Adequate",
      className: "bg-[#fff3cf] text-[#7a4b00]",
      barClassName: "bg-[#c08a2c]",
    };
  }
  return {
    label: "Needs attention",
    className: "bg-[#fff1e8] text-[#8a3d12]",
    barClassName: "bg-[#c77a45]",
  };
}

function strongestHouse(values: number[]) {
  return values.reduce(
    (best, value, index) => (value > best.value ? { house: index + 1, value } : best),
    { house: 1, value: values[0] ?? 0 },
  );
}

function weakestHouse(values: number[]) {
  return values.reduce(
    (best, value, index) => (value < best.value ? { house: index + 1, value } : best),
    { house: 1, value: values[0] ?? 0 },
  );
}

function formatRahu(value: Record<string, unknown>) {
  const rahu = recordValue(value.rahu_kalam);
  if (!rahu) return "N/A";
  return `${String(rahu.start ?? "N/A")} - ${String(rahu.end ?? "N/A")}`;
}

function formatPlanetContext(planet: Planet | undefined, locale: KundliWorkspaceLocale) {
  if (!planet) return "N/A";
  const nakshatra = planet.nakshatra ? `, ${planet.nakshatra}` : "";
  const pada = planet.pada ? ` ${ui(locale, "pada", "पाद")} ${planet.pada}` : "";
  return `${signUi(planet.sign, locale)}${nakshatra}${pada}`;
}

function objectPath(source: Record<string, unknown>, path: string) {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, source);
}

function arrayValue(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? (value.filter((item) => typeof item === "object" && item !== null) as Record<string, unknown>[]) : [];
}

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}
