"use client";

import {
  CalendarDays,
  Clock3,
  LoaderCircle,
  MapPin,
  Search,
} from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useId, useState } from "react";

export type DailyLocationToolMode = "panchang" | "muhurat";
export type DailyLocationToolLocale = "en" | "hi";

export type DailyLocationToolProps = {
  mode: DailyLocationToolMode;
  locale: DailyLocationToolLocale;
};

type CityResult = {
  name: string;
  country: string;
  state: string | null;
  district: string | null;
  lat: number;
  lng: number;
  timezone: string;
};

const MUHURAT_QUESTIONS = [
  "abhijit muhurat",
  "rahu kaal",
  "brahma muhurat",
  "do ghati muhurat",
  "hora",
  "chaughadia",
  "gowri panchangam",
  "panchak",
  "bhadra",
] as const;

type MuhuratQuestion = (typeof MUHURAT_QUESTIONS)[number];

type SubmittedInput = {
  date: string;
  time: string;
  city: string;
  lat: number;
  lng: number;
  timezone: string;
  question?: MuhuratQuestion;
};

type ToolResult = {
  mode: DailyLocationToolMode;
  data: Record<string, unknown>;
  input: SubmittedInput;
};

const COPY = {
  en: {
    legendPanchang: "Daily Panchang details",
    legendMuhurat: "Daily Muhurat lookup",
    introPanchang:
      "Choose a local date, time, and verified city. Times in the result use the selected city’s timezone.",
    introMuhurat:
      "Choose a supported topic and a verified city to see the periods for that local date and time.",
    date: "Date",
    time: "Local time",
    topic: "Muhurat topic",
    location: "Location",
    searchCity: "Start typing a city",
    searchHint: "Enter at least two characters, then choose a verified city.",
    searching: "Searching for cities",
    selectedLocation: "Selected location",
    coordinates: "Coordinates",
    timezone: "Timezone",
    calculatePanchang: "Show Panchang",
    calculateMuhurat: "Show Muhurat",
    calculatingPanchang: "Calculating Panchang…",
    calculatingMuhurat: "Looking up Muhurat…",
    citySearchFailed: "City search could not be completed.",
    selectCity: "Choose a city from the search results before continuing.",
    requestFailed: "The calculation could not be completed.",
    results: "Results",
    weekday: "Weekday",
    lunarMonth: "Lunar month",
    sunrise: "Sunrise",
    sunset: "Sunset",
    rahuKalam: "Rahu Kalam",
    tithi: "Tithi",
    nakshatra: "Nakshatra",
    yoga: "Yoga",
    karana: "Karana",
    karanas: "Karanas",
    transitions: "Transitions and karanas",
    element: "Element",
    activeValue: "Value",
    transitionTime: "Ends at",
    number: "Number",
    paksha: "Paksha",
    pada: "Pada",
    lord: "Lord",
    requestTimePanchang: "Panchang at the requested time",
    requestTime: "Requested local time",
    sunSign: "Sun sign",
    moonSign: "Moon sign",
    degree: "Degree",
    vikramSamvat: "Vikram Samvat",
    amanta: "Amanta",
    purnimanta: "Purnimanta",
    answer: "Lookup summary",
    primaryPeriod: "Primary period",
    currentPeriod: "Period active at the requested time",
    noPrimaryPeriod: "This lookup does not return one primary period.",
    noCurrentPeriod: "No period is active at the requested time.",
    sections: "Grouped periods",
    periods: "All returned periods",
    panchangContext: "Panchang context",
    name: "Name",
    periodTime: "Local period",
    quality: "Quality",
    section: "Section",
    duration: "Duration",
    minutes: "minutes",
    warnings: "Notes and warnings",
    noData: "No value returned",
    noPeriods: "No periods were returned for this selection.",
  },
  hi: {
    legendPanchang: "दैनिक पंचांग विवरण",
    legendMuhurat: "दैनिक मुहूर्त जानकारी",
    introPanchang:
      "स्थानीय तिथि, समय और सत्यापित शहर चुनें। परिणाम में सभी समय चुने गए शहर के समय क्षेत्र के अनुसार होंगे।",
    introMuhurat:
      "स्थानीय तिथि और समय के मुहूर्त देखने के लिए विषय और सत्यापित शहर चुनें।",
    date: "तिथि",
    time: "स्थानीय समय",
    topic: "मुहूर्त विषय",
    location: "स्थान",
    searchCity: "शहर का नाम लिखना शुरू करें",
    searchHint: "कम से कम दो अक्षर लिखें, फिर सत्यापित शहर चुनें।",
    searching: "शहर खोजे जा रहे हैं",
    selectedLocation: "चुना गया स्थान",
    coordinates: "निर्देशांक",
    timezone: "समय क्षेत्र",
    calculatePanchang: "पंचांग देखें",
    calculateMuhurat: "मुहूर्त देखें",
    calculatingPanchang: "पंचांग की गणना हो रही है…",
    calculatingMuhurat: "मुहूर्त देखा जा रहा है…",
    citySearchFailed: "शहर की खोज पूरी नहीं हो सकी।",
    selectCity: "आगे बढ़ने से पहले खोज परिणामों में से कोई शहर चुनें।",
    requestFailed: "गणना पूरी नहीं हो सकी।",
    results: "परिणाम",
    weekday: "वार",
    lunarMonth: "चंद्र मास",
    sunrise: "सूर्योदय",
    sunset: "सूर्यास्त",
    rahuKalam: "राहु काल",
    tithi: "तिथि",
    nakshatra: "नक्षत्र",
    yoga: "योग",
    karana: "करण",
    karanas: "करण",
    transitions: "परिवर्तन समय और करण",
    element: "अंग",
    activeValue: "मान",
    transitionTime: "समाप्ति समय",
    number: "संख्या",
    paksha: "पक्ष",
    pada: "पाद",
    lord: "स्वामी",
    requestTimePanchang: "अनुरोधित समय का पंचांग",
    requestTime: "अनुरोधित स्थानीय समय",
    sunSign: "सूर्य राशि",
    moonSign: "चंद्र राशि",
    degree: "अंश",
    vikramSamvat: "विक्रम संवत",
    amanta: "अमान्त",
    purnimanta: "पूर्णिमान्त",
    answer: "संक्षिप्त उत्तर",
    primaryPeriod: "मुख्य अवधि",
    currentPeriod: "अनुरोधित समय में चल रही अवधि",
    noPrimaryPeriod: "इस जानकारी में कोई एक मुख्य अवधि नहीं है।",
    noCurrentPeriod: "अनुरोधित समय में कोई अवधि सक्रिय नहीं है।",
    sections: "समूह के अनुसार अवधियाँ",
    periods: "सभी प्राप्त अवधियाँ",
    panchangContext: "पंचांग संदर्भ",
    name: "नाम",
    periodTime: "स्थानीय अवधि",
    quality: "गुणवत्ता",
    section: "समूह",
    duration: "अवधि",
    minutes: "मिनट",
    warnings: "सूचनाएँ और सावधानियाँ",
    noData: "कोई मान प्राप्त नहीं हुआ",
    noPeriods: "इस चयन के लिए कोई अवधि प्राप्त नहीं हुई।",
  },
} as const;

const MUHURAT_LABELS: Record<
  MuhuratQuestion,
  Record<DailyLocationToolLocale, string>
> = {
  "abhijit muhurat": { en: "Abhijit Muhurat", hi: "अभिजीत मुहूर्त" },
  "rahu kaal": { en: "Rahu Kaal", hi: "राहु काल" },
  "brahma muhurat": { en: "Brahma Muhurat", hi: "ब्रह्म मुहूर्त" },
  "do ghati muhurat": { en: "Do Ghati Muhurat", hi: "दो घटी मुहूर्त" },
  hora: { en: "Hora", hi: "होरा" },
  chaughadia: { en: "Chaughadia", hi: "चौघड़िया" },
  "gowri panchangam": { en: "Gowri Panchangam", hi: "गौरी पंचांगम" },
  panchak: { en: "Panchak", hi: "पंचक" },
  bhadra: { en: "Bhadra", hi: "भद्रा" },
};

export default function DailyLocationTool({
  mode,
  locale,
}: DailyLocationToolProps) {
  const copy = COPY[locale];
  const dateId = useId();
  const timeId = useId();
  const topicId = useId();
  const cityId = useId();
  const cityListId = useId();
  const cityHintId = useId();
  const cityStatusId = useId();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [question, setQuestion] =
    useState<MuhuratQuestion>("abhijit muhurat");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [activeCityIndex, setActiveCityIndex] = useState(-1);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<ToolResult | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const now = new Date();
      setDate((current) => current || dateInputValue(now));
      setTime((current) => current || timeInputValue(now));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const query = cityQuery.trim();
    if (
      query.length < 2 ||
      (selectedCity !== null && selectedCity.name === query)
    ) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setCityLoading(true);
      setCityError("");

      try {
        const response = await fetch(
          `/api/geo/search?q=${encodeURIComponent(query)}&limit=8`,
          { signal: controller.signal },
        );
        const payload: unknown = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(readError(payload) || copy.citySearchFailed);
        }

        const cities = parseCityResults(payload);
        setCityResults(cities);
        setActiveCityIndex(cities.length > 0 ? 0 : -1);
      } catch (error) {
        if (!controller.signal.aborted) {
          setCityResults([]);
          setActiveCityIndex(-1);
          setCityError(
            error instanceof Error ? error.message : copy.citySearchFailed,
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCityLoading(false);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [cityQuery, copy.citySearchFailed, selectedCity]);

  function selectCity(city: CityResult) {
    setSelectedCity(city);
    setCityQuery(city.name);
    setCityResults([]);
    setActiveCityIndex(-1);
    setCityLoading(false);
    setCityError("");
    setSubmitError("");
  }

  function handleCityKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (cityResults.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveCityIndex((current) =>
        current >= cityResults.length - 1 ? 0 : current + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveCityIndex((current) =>
        current <= 0 ? cityResults.length - 1 : current - 1,
      );
      return;
    }

    if (event.key === "Enter" && activeCityIndex >= 0) {
      event.preventDefault();
      const city = cityResults[activeCityIndex];
      if (city) selectCity(city);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setCityResults([]);
      setActiveCityIndex(-1);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!selectedCity) {
      setSubmitError(copy.selectCity);
      return;
    }

    const input: SubmittedInput = {
      date,
      time,
      city: selectedCity.name,
      lat: selectedCity.lat,
      lng: selectedCity.lng,
      timezone: selectedCity.timezone,
      ...(mode === "muhurat" ? { question } : {}),
    };
    const commonPayload = {
      date,
      time,
      city: selectedCity.name,
      lat: selectedCity.lat,
      lng: selectedCity.lng,
      tz_str: selectedCity.timezone,
      ayanamsha: "lahiri" as const,
    };
    const endpoint =
      mode === "panchang" ? "/api/panchang-today" : "/api/daily-muhurat";
    const body =
      mode === "panchang"
        ? commonPayload
        : { ...commonPayload, question };

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload: unknown = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(readError(payload) || copy.requestFailed);
      }

      setResult({ mode, data: unwrapPayload(payload, mode), input });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : copy.requestFailed,
      );
    } finally {
      setLoading(false);
    }
  }

  const visibleResult = result?.mode === mode ? result : null;
  const cityStatus = cityLoading
    ? copy.searching
    : cityError || (selectedCity ? copy.selectedLocation : "");

  return (
    <div className="bg-[#fffdf7]">
      <form onSubmit={submit} className="p-4 sm:p-6">
        <fieldset disabled={loading} className="min-w-0">
          <legend className="font-serif text-2xl font-bold text-[#4e1010]">
            {mode === "panchang"
              ? copy.legendPanchang
              : copy.legendMuhurat}
          </legend>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
            {mode === "panchang" ? copy.introPanchang : copy.introMuhurat}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label htmlFor={dateId} className="block">
              <span className="field-label">{copy.date}</span>
              <div className="relative">
                <CalendarDays
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  size={16}
                />
                <input
                  id={dateId}
                  type="date"
                  className="field-input field-input-with-icon"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>
            </label>

            <label htmlFor={timeId} className="block">
              <span className="field-label">{copy.time}</span>
              <div className="relative">
                <Clock3
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  size={16}
                />
                <input
                  id={timeId}
                  type="time"
                  className="field-input field-input-with-icon"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  required
                />
              </div>
            </label>
          </div>

          {mode === "muhurat" ? (
            <label htmlFor={topicId} className="mt-4 block">
              <span className="field-label">{copy.topic}</span>
              <select
                id={topicId}
                className="field-input field-select"
                value={question}
                onChange={(event) =>
                  setQuestion(event.target.value as MuhuratQuestion)
                }
              >
                {MUHURAT_QUESTIONS.map((value) => (
                  <option key={value} value={value}>
                    {MUHURAT_LABELS[value][locale]}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="relative mt-4">
            <label htmlFor={cityId} className="block">
              <span className="field-label">{copy.location}</span>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  size={16}
                />
                <input
                  id={cityId}
                  type="search"
                  className="field-input field-input-with-icon pr-10"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={cityResults.length > 0}
                  aria-controls={cityListId}
                  aria-activedescendant={
                    activeCityIndex >= 0
                      ? `${cityListId}-option-${activeCityIndex}`
                      : undefined
                  }
                  aria-describedby={`${cityHintId} ${cityStatusId}`}
                  autoComplete="off"
                  placeholder={copy.searchCity}
                  value={cityQuery}
                  onChange={(event) => {
                    const value = event.target.value;
                    setCityQuery(value);
                    setSelectedCity(null);
                    setCityResults([]);
                    setActiveCityIndex(-1);
                    if (value.trim().length < 2) setCityLoading(false);
                    setCityError("");
                  }}
                  onKeyDown={handleCityKeyDown}
                  required
                />
                {cityLoading ? (
                  <LoaderCircle
                    aria-hidden="true"
                    className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#8d1f1f]"
                    size={16}
                  />
                ) : null}
              </div>
            </label>

            <p id={cityHintId} className="mt-2 text-xs leading-5 text-stone-500">
              {copy.searchHint}
            </p>
            <span id={cityStatusId} className="sr-only" aria-live="polite">
              {cityStatus}
            </span>

            {cityResults.length > 0 ? (
              <div
                id={cityListId}
                role="listbox"
                aria-label={copy.location}
                className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded border border-[#d8bd72] bg-white shadow-lg"
              >
                {cityResults.map((city, index) => (
                  <button
                    id={`${cityListId}-option-${index}`}
                    key={`${city.name}-${city.lat}-${city.lng}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeCityIndex}
                    className={`flex w-full items-start gap-3 border-b border-stone-100 px-3 py-2 text-left last:border-b-0 hover:bg-[#fff3cf] focus:bg-[#fff3cf] focus:outline-none ${
                      index === activeCityIndex ? "bg-[#fff8e5]" : "bg-white"
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveCityIndex(index)}
                    onClick={() => selectCity(city)}
                  >
                    <MapPin
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-[#8d1f1f]"
                      size={16}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-stone-900">
                        {city.name}
                        {city.district ? `, ${city.district}` : ""}
                      </span>
                      <span className="block text-xs leading-5 text-stone-600">
                        {[city.state, city.country, city.timezone]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            {cityError ? (
              <p role="alert" className="mt-2 text-sm text-[#a53b21]">
                {cityError}
              </p>
            ) : null}

            {selectedCity ? (
              <dl className="mt-4 grid gap-3 border-l-4 border-[#b27619] bg-[#fff8e5] p-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-bold text-stone-500">
                    {copy.selectedLocation}
                  </dt>
                  <dd className="mt-1 font-bold text-stone-900">
                    {selectedCity.name}, {selectedCity.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-stone-500">
                    {copy.coordinates}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-stone-700">
                    {selectedCity.lat.toFixed(4)}, {selectedCity.lng.toFixed(4)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-stone-500">
                    {copy.timezone}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-stone-700">
                    {selectedCity.timezone}
                  </dd>
                </div>
              </dl>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-amber-200 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#681414] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#8d1f1f] focus:outline-none focus:ring-4 focus:ring-[#8d1f1f]/20 disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="animate-spin"
                  size={18}
                />
              ) : null}
              {loading
                ? mode === "panchang"
                  ? copy.calculatingPanchang
                  : copy.calculatingMuhurat
                : mode === "panchang"
                  ? copy.calculatePanchang
                  : copy.calculateMuhurat}
            </button>

            {submitError ? (
              <p role="alert" className="text-sm font-medium text-[#a53b21]">
                {submitError}
              </p>
            ) : null}
          </div>
        </fieldset>
      </form>

      <div aria-live="polite" aria-busy={loading}>
        {visibleResult ? (
          mode === "panchang" ? (
            <PanchangResult result={visibleResult} locale={locale} />
          ) : (
            <MuhuratResult result={visibleResult} locale={locale} />
          )
        ) : null}
      </div>
    </div>
  );
}

function PanchangResult({
  result,
  locale,
}: {
  result: ToolResult;
  locale: DailyLocationToolLocale;
}) {
  const copy = COPY[locale];
  const data = result.data;
  const weekday = asRecord(data.weekday);
  const lunarMonth = asRecord(data.lunar_month);
  const tithi = asRecord(data.tithi);
  const nakshatra = asRecord(data.nakshatra);
  const yoga = asRecord(data.yoga);
  const karanas = recordArray(data.karanas);
  const rahuKalam = asRecord(data.rahu_kalam);
  const requestTimePanchang = asRecord(data.request_time_panchang);
  const metadata = asRecord(data.metadata);
  const requestLocalTime = textValue(
    metadata?.request_local_time,
    `${result.input.date}T${result.input.time}`,
  );
  const lunarMonthDetail = [
    lunarMonth?.amanta === true
      ? copy.amanta
      : lunarMonth?.amanta === false
        ? copy.purnimanta
        : "",
    lunarMonth?.vikram_samvat !== undefined
      ? `${copy.vikramSamvat} ${displayValue(lunarMonth.vikram_samvat, copy.noData)}`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const transitions = [
    { label: copy.tithi, value: tithi },
    { label: copy.nakshatra, value: nakshatra },
    { label: copy.yoga, value: yoga },
    ...karanas.map((karana, index) => ({
      label: `${copy.karana} ${index + 1}`,
      value: karana,
    })),
  ];

  return (
    <section className="border-t border-[#d8bd72] bg-white" aria-label={copy.results}>
      <ResultHeader result={result} locale={locale} />

      <dl className="grid border-b border-amber-200 sm:grid-cols-2 lg:grid-cols-5">
        <ResultMetric
          label={copy.weekday}
          value={displayValue(weekday?.name ?? data.weekday, copy.noData)}
        />
        <ResultMetric
          label={copy.lunarMonth}
          value={displayValue(lunarMonth?.name, copy.noData)}
          detail={lunarMonthDetail}
        />
        <ResultMetric
          label={copy.sunrise}
          value={displayValue(data.sunrise, copy.noData)}
        />
        <ResultMetric
          label={copy.sunset}
          value={displayValue(data.sunset, copy.noData)}
        />
        <ResultMetric
          label={copy.rahuKalam}
          value={timeRange(rahuKalam, copy.noData)}
        />
      </dl>

      <div className="grid border-b border-amber-200 lg:grid-cols-3">
        <PanchangElement label={copy.tithi} value={tithi} locale={locale} />
        <PanchangElement
          label={copy.nakshatra}
          value={nakshatra}
          locale={locale}
        />
        <PanchangElement label={copy.yoga} value={yoga} locale={locale} />
      </div>

      <section className="border-b border-amber-200 p-4 sm:p-6">
        <h3 className="font-serif text-xl font-bold text-[#4e1010]">
          {copy.transitions}
        </h3>
        <div className="mt-4 overflow-x-auto border-y border-amber-200">
          <table className="data-table min-w-[36rem]">
            <thead>
              <tr>
                <th scope="col">{copy.element}</th>
                <th scope="col">{copy.activeValue}</th>
                <th scope="col">{copy.number}</th>
                <th scope="col">{copy.transitionTime}</th>
              </tr>
            </thead>
            <tbody>
              {transitions.map(({ label, value }, index) => (
                <tr key={`${label}-${index}`}>
                  <th scope="row" className="text-left font-bold text-[#681414]">
                    {label}
                  </th>
                  <td>{displayValue(value?.name, copy.noData)}</td>
                  <td>{displayValue(value?.number, copy.noData)}</td>
                  <td>
                    <TransitionTime value={value} fallback={copy.noData} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl font-bold text-[#4e1010]">
            {copy.requestTimePanchang}
          </h3>
          <p className="font-mono text-xs text-stone-500">
            {copy.requestTime}: {requestLocalTime}
          </p>
        </div>
        <div className="mt-4 grid border-y border-amber-200 sm:grid-cols-2 lg:grid-cols-3">
          <RequestTimeItem
            label={copy.tithi}
            value={asRecord(requestTimePanchang?.tithi)}
            locale={locale}
          />
          <RequestTimeItem
            label={copy.nakshatra}
            value={asRecord(requestTimePanchang?.nakshatra)}
            locale={locale}
          />
          <RequestTimeItem
            label={copy.yoga}
            value={asRecord(requestTimePanchang?.yoga)}
            locale={locale}
          />
          <RequestTimeItem
            label={copy.karana}
            value={asRecord(requestTimePanchang?.karana)}
            locale={locale}
          />
          <RequestTimeItem
            label={copy.sunSign}
            value={asRecord(requestTimePanchang?.sun_sign)}
            locale={locale}
          />
          <RequestTimeItem
            label={copy.moonSign}
            value={asRecord(requestTimePanchang?.moon_sign)}
            locale={locale}
          />
        </div>
      </section>
    </section>
  );
}

function MuhuratResult({
  result,
  locale,
}: {
  result: ToolResult;
  locale: DailyLocationToolLocale;
}) {
  const copy = COPY[locale];
  const data = result.data;
  const period = asRecord(data.period);
  const currentPeriod = asRecord(data.current_period);
  const sections = asRecord(data.sections);
  const periods = recordArray(data.periods);
  const panchangContext = asRecord(data.panchang_context);
  const warnings = stringArray(data.warnings);
  const hasPeriodField = Object.prototype.hasOwnProperty.call(data, "period");
  const hasCurrentPeriodField = Object.prototype.hasOwnProperty.call(
    data,
    "current_period",
  );

  return (
    <section className="border-t border-[#d8bd72] bg-white" aria-label={copy.results}>
      <ResultHeader result={result} locale={locale} />

      {data.answer !== undefined ? (
        <section className="border-b border-amber-200 p-4 sm:p-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-stone-500">
            {copy.answer}
          </h3>
          <p className="mt-2 max-w-4xl text-base leading-7 text-stone-800">
            {displayValue(data.answer, copy.noData)}
          </p>
        </section>
      ) : null}

      {period || hasPeriodField ? (
        period ? (
          <PeriodDetail
            title={copy.primaryPeriod}
            period={period}
            locale={locale}
          />
        ) : (
          <ResultNotice text={copy.noPrimaryPeriod} />
        )
      ) : null}

      {currentPeriod || hasCurrentPeriodField ? (
        currentPeriod ? (
          <PeriodDetail
            title={copy.currentPeriod}
            period={currentPeriod}
            locale={locale}
            emphasized
          />
        ) : (
          <ResultNotice text={copy.noCurrentPeriod} />
        )
      ) : null}

      {sections ? (
        <section className="border-b border-amber-200 p-4 sm:p-6">
          <h3 className="font-serif text-xl font-bold text-[#4e1010]">
            {copy.sections}
          </h3>
          <div className="mt-4 divide-y divide-amber-200 border-y border-amber-200">
            {Object.entries(sections).map(([sectionName, value]) => {
              const sectionPeriods = periodsFromSection(value);
              return (
                <section key={sectionName} className="py-4">
                  <h4 className="px-3 text-sm font-bold text-[#681414]">
                    {sectionName}
                  </h4>
                  {sectionPeriods.length > 0 ? (
                    <div className="mt-3 overflow-x-auto">
                      <PeriodTable
                        periods={sectionPeriods}
                        locale={locale}
                        currentPeriodId={textValue(currentPeriod?.id)}
                      />
                    </div>
                  ) : (
                    <KeyValueList value={value} fallback={copy.noData} />
                  )}
                </section>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="border-b border-amber-200 p-4 sm:p-6">
        <h3 className="font-serif text-xl font-bold text-[#4e1010]">
          {copy.panchangContext}
        </h3>
        {panchangContext ? (
          <dl className="mt-4 grid border-y border-amber-200 sm:grid-cols-2 lg:grid-cols-4">
            <ResultMetric
              label={copy.sunrise}
              value={displayValue(panchangContext.sunrise, copy.noData)}
            />
            <ResultMetric
              label={copy.sunset}
              value={displayValue(panchangContext.sunset, copy.noData)}
            />
            <ResultMetric
              label={copy.weekday}
              value={displayValue(
                asRecord(panchangContext.weekday)?.name ??
                  panchangContext.weekday,
                copy.noData,
              )}
            />
            <ResultMetric
              label={copy.rahuKalam}
              value={timeRange(
                asRecord(panchangContext.rahu_kalam),
                copy.noData,
              )}
            />
          </dl>
        ) : (
          <p className="mt-3 text-sm text-stone-600">{copy.noData}</p>
        )}
      </section>

      <section className="border-b border-amber-200 p-4 sm:p-6">
        <details open={periods.length <= 12}>
          <summary className="cursor-pointer font-serif text-xl font-bold text-[#4e1010] focus:outline-none focus:ring-4 focus:ring-[#8d1f1f]/20">
            {copy.periods} ({periods.length})
          </summary>
          {periods.length > 0 ? (
            <div className="mt-4 overflow-x-auto border-y border-amber-200">
              <PeriodTable
                periods={periods}
                locale={locale}
                currentPeriodId={textValue(currentPeriod?.id)}
              />
            </div>
          ) : (
            <p className="mt-3 text-sm text-stone-600">{copy.noPeriods}</p>
          )}
        </details>
      </section>

      {warnings.length > 0 ? (
        <section className="border-l-4 border-[#a53b21] bg-[#fff4ed] p-4 sm:p-6">
          <h3 className="font-bold text-[#8a2a13]">{copy.warnings}</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[#6f2918]">
            {warnings.map((warning, index) => (
              <li key={`${warning}-${index}`}>{warning}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}

function ResultHeader({
  result,
  locale,
}: {
  result: ToolResult;
  locale: DailyLocationToolLocale;
}) {
  const copy = COPY[locale];
  const title =
    result.mode === "panchang"
      ? copy.legendPanchang
      : MUHURAT_LABELS[result.input.question ?? "abhijit muhurat"][locale];

  return (
    <header className="border-b border-amber-200 bg-[#fff8e5] p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-[#a15e12]">
        {copy.results}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-bold text-[#4e1010]">
        {title}
      </h2>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
        <span className="inline-flex items-center gap-2">
          <CalendarDays aria-hidden="true" size={16} />
          {result.input.date} · {result.input.time}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin aria-hidden="true" size={16} />
          {result.input.city} · {result.input.timezone}
        </span>
      </div>
    </header>
  );
}

function ResultMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="border-b border-amber-200 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <dt className="text-xs font-bold text-stone-500">{label}</dt>
      <dd className="mt-2 font-bold text-stone-900">{value}</dd>
      {detail ? (
        <dd className="mt-1 text-xs leading-5 text-stone-500">{detail}</dd>
      ) : null}
    </div>
  );
}

function PanchangElement({
  label,
  value,
  locale,
}: {
  label: string;
  value: Record<string, unknown> | null;
  locale: DailyLocationToolLocale;
}) {
  const copy = COPY[locale];
  const details = value
    ? [
        value.number !== undefined
          ? `${copy.number} ${displayValue(value.number, copy.noData)}`
          : "",
        value.paksha !== undefined
          ? `${copy.paksha} ${displayValue(value.paksha, copy.noData)}`
          : "",
        value.pada !== undefined
          ? `${copy.pada} ${displayValue(value.pada, copy.noData)}`
          : "",
        value.lord !== undefined
          ? `${copy.lord} ${displayValue(value.lord, copy.noData)}`
          : "",
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <section className="border-b border-amber-200 p-4 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-6">
      <h3 className="text-xs font-bold uppercase tracking-wide text-stone-500">
        {label}
      </h3>
      <p className="mt-2 text-xl font-bold text-[#681414]">
        {displayValue(value?.name, copy.noData)}
      </p>
      {details ? (
        <p className="mt-2 text-xs leading-5 text-stone-600">{details}</p>
      ) : null}
    </section>
  );
}

function RequestTimeItem({
  label,
  value,
  locale,
}: {
  label: string;
  value: Record<string, unknown> | null;
  locale: DailyLocationToolLocale;
}) {
  const copy = COPY[locale];
  const details = value
    ? [
        value.number !== undefined
          ? `${copy.number} ${displayValue(value.number, copy.noData)}`
          : "",
        value.paksha !== undefined
          ? `${copy.paksha} ${displayValue(value.paksha, copy.noData)}`
          : "",
        value.pada !== undefined
          ? `${copy.pada} ${displayValue(value.pada, copy.noData)}`
          : "",
        value.lord !== undefined
          ? `${copy.lord} ${displayValue(value.lord, copy.noData)}`
          : "",
        value.degree !== undefined
          ? `${copy.degree} ${displayValue(value.degree, copy.noData)}°`
          : "",
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <div className="border-b border-amber-200 p-4 last:border-b-0 sm:border-r sm:[&:nth-child(even)]:border-r-0 lg:[&:nth-child(even)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
      <h4 className="text-xs font-bold text-stone-500">{label}</h4>
      <p className="mt-2 font-bold text-stone-900">
        {displayValue(value?.name, copy.noData)}
      </p>
      {details ? (
        <p className="mt-1 text-xs leading-5 text-stone-500">{details}</p>
      ) : null}
    </div>
  );
}

function PeriodDetail({
  title,
  period,
  locale,
  emphasized = false,
}: {
  title: string;
  period: Record<string, unknown>;
  locale: DailyLocationToolLocale;
  emphasized?: boolean;
}) {
  const copy = COPY[locale];
  const extras = periodExtraEntries(period);

  return (
    <section
      className={`border-b border-amber-200 p-4 sm:p-6 ${
        emphasized ? "border-l-4 border-l-[#b27619] bg-[#fff8e5]" : ""
      }`}
    >
      <h3 className="font-serif text-xl font-bold text-[#4e1010]">{title}</h3>
      <dl className="mt-4 grid border-y border-amber-200 sm:grid-cols-2 lg:grid-cols-5">
        <ResultMetric
          label={copy.name}
          value={displayValue(period.name ?? period.id, copy.noData)}
        />
        <ResultMetric
          label={copy.periodTime}
          value={periodRange(period, copy.noData)}
        />
        <ResultMetric
          label={copy.quality}
          value={displayValue(period.quality, copy.noData)}
        />
        <ResultMetric
          label={copy.section}
          value={displayValue(period.section, copy.noData)}
        />
        <ResultMetric
          label={copy.duration}
          value={durationValue(period.duration_minutes, locale, copy.noData)}
        />
      </dl>
      {extras.length > 0 ? (
        <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map(([key, value]) => (
            <div key={key} className="border-t border-amber-200 pt-3">
              <dt className="font-mono text-xs text-stone-500">{key}</dt>
              <dd className="mt-1 text-sm text-stone-800">
                {displayValue(value, copy.noData)}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

function PeriodTable({
  periods,
  locale,
  currentPeriodId,
}: {
  periods: Record<string, unknown>[];
  locale: DailyLocationToolLocale;
  currentPeriodId?: string;
}) {
  const copy = COPY[locale];

  return (
    <table className="data-table min-w-[42rem]">
      <thead>
        <tr>
          <th scope="col">{copy.name}</th>
          <th scope="col">{copy.periodTime}</th>
          <th scope="col">{copy.quality}</th>
          <th scope="col">{copy.section}</th>
          <th scope="col">{copy.duration}</th>
        </tr>
      </thead>
      <tbody>
        {periods.map((period, index) => {
          const isCurrent =
            currentPeriodId !== undefined &&
            textValue(period.id) === currentPeriodId;
          return (
            <tr
              key={`${textValue(period.id, period.name) ?? "period"}-${index}`}
              className={isCurrent ? "bg-[#fff8e5]" : undefined}
            >
              <th scope="row" className="text-left font-bold text-[#681414]">
                {displayValue(period.name ?? period.id, copy.noData)}
              </th>
              <td>{periodRange(period, copy.noData)}</td>
              <td>{displayValue(period.quality, copy.noData)}</td>
              <td>{displayValue(period.section, copy.noData)}</td>
              <td>
                {durationValue(period.duration_minutes, locale, copy.noData)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ResultNotice({ text }: { text: string }) {
  return (
    <p className="border-b border-l-4 border-amber-300 border-b-amber-200 bg-[#fffaf0] p-4 text-sm text-stone-600 sm:px-6">
      {text}
    </p>
  );
}

function TransitionTime({
  value,
  fallback,
}: {
  value: Record<string, unknown> | null;
  fallback: string;
}) {
  const time = textValue(value?.ends_at);
  const iso = textValue(value?.ends_at_iso);

  if (!time && !iso) return fallback;
  return (
    <span>
      {time ?? iso}
      {time && iso ? (
        <span className="ml-2 font-mono text-xs text-stone-500">{iso}</span>
      ) : null}
    </span>
  );
}

function KeyValueList({ value, fallback }: { value: unknown; fallback: string }) {
  const record = asRecord(value);
  if (!record) {
    return <p className="mt-2 px-3 text-sm text-stone-600">{displayValue(value, fallback)}</p>;
  }

  return (
    <dl className="mt-3 grid gap-x-6 gap-y-3 px-3 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(record).map(([key, item]) => (
        <div key={key} className="border-t border-amber-200 pt-3">
          <dt className="font-mono text-xs text-stone-500">{key}</dt>
          <dd className="mt-1 text-sm text-stone-800">
            {displayValue(item, fallback)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function dateInputValue(date: Date) {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function timeInputValue(date: Date) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

function parseCityResults(payload: unknown) {
  const results = asRecord(payload)?.results;
  if (!Array.isArray(results)) return [];

  return results.flatMap<CityResult>((value) => {
    const city = asRecord(value);
    if (!city) return [];

    const name = textValue(city.name);
    const lat = finiteNumber(city.lat);
    const lng = finiteNumber(city.lng);
    if (!name || lat === null || lng === null) return [];

    return [
      {
        name,
        country: textValue(city.country) ?? "",
        state: textValue(city.state) ?? null,
        district: textValue(city.district) ?? null,
        lat,
        lng,
        timezone: textValue(city.timezone) ?? "AUTO",
      },
    ];
  });
}

function unwrapPayload(payload: unknown, mode: DailyLocationToolMode) {
  const root = asRecord(payload) ?? {};
  const nestedData = asRecord(root.data);
  const merged = nestedData ? { ...root, ...nestedData } : root;
  const nestedPanchang = mode === "panchang" ? asRecord(merged.panchang) : null;

  return nestedPanchang && merged.weekday === undefined
    ? { ...merged, ...nestedPanchang }
    : merged;
}

function readError(value: unknown) {
  const record = asRecord(value);
  return textValue(record?.error, record?.message, record?.detail) ?? "";
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function recordArray(value: unknown) {
  return Array.isArray(value)
    ? value.flatMap<Record<string, unknown>>((item) => {
        const record = asRecord(item);
        return record ? [record] : [];
      })
    : [];
}

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.flatMap<string>((item) =>
        typeof item === "string" ? [item] : [],
      )
    : [];
}

function finiteNumber(value: unknown) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function textValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return undefined;
}

function displayValue(value: unknown, fallback: string): string {
  if (typeof value === "string") return value || fallback;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (value === null || value === undefined) return fallback;
  if (Array.isArray(value)) {
    return value.map((item) => displayValue(item, fallback)).join(", ");
  }
  const record = asRecord(value);
  if (record?.name !== undefined) return displayValue(record.name, fallback);
  return JSON.stringify(value) ?? fallback;
}

function timeRange(
  value: Record<string, unknown> | null,
  fallback: string,
) {
  if (!value) return fallback;
  const start = textValue(value.start, value.start_time);
  const end = textValue(value.end, value.end_time);
  return start && end ? `${start} – ${end}` : start ?? end ?? fallback;
}

function periodRange(period: Record<string, unknown>, fallback: string) {
  const start = textValue(period.start_time, period.start);
  const end = textValue(period.end_time, period.end);
  return start && end ? `${start} – ${end}` : start ?? end ?? fallback;
}

function durationValue(
  value: unknown,
  locale: DailyLocationToolLocale,
  fallback: string,
) {
  const duration = finiteNumber(value);
  if (duration === null) return fallback;
  return `${new Intl.NumberFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    maximumFractionDigits: 2,
  }).format(duration)} ${COPY[locale].minutes}`;
}

function periodsFromSection(value: unknown) {
  if (Array.isArray(value)) return recordArray(value);
  const record = asRecord(value);
  if (!record) return [];
  const nestedPeriods = recordArray(record.periods);
  if (nestedPeriods.length > 0) return nestedPeriods;

  return Object.values(record).flatMap<Record<string, unknown>>((item) => {
    const period = asRecord(item);
    return period && (period.start !== undefined || period.start_time !== undefined)
      ? [period]
      : [];
  });
}

function periodExtraEntries(period: Record<string, unknown>) {
  const displayedKeys = new Set([
    "id",
    "name",
    "section",
    "start",
    "end",
    "start_time",
    "end_time",
    "quality",
    "duration_minutes",
  ]);

  return Object.entries(period).filter(
    ([key, value]) =>
      !displayedKeys.has(key) &&
      (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"),
  );
}
