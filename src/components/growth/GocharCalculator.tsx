"use client";

import { LoaderCircle, Search } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useId, useState } from "react";

const DAY_IN_MS = 86_400_000;
const MAX_RANGE_DAYS = 31;

const planetOptions = [
  { value: "saturn", label: "Saturn" },
  { value: "jupiter", label: "Jupiter" },
  { value: "rahu", label: "Rahu" },
  { value: "ketu", label: "Ketu" },
  { value: "moon", label: "Moon" },
] as const;

type TransitPlanet = (typeof planetOptions)[number]["value"];

type CityResult = {
  name: string;
  country: string;
  state: string | null;
  district: string | null;
  lat: number;
  lng: number;
  timezone: string;
};

type GocharResult = {
  meta: Record<string, unknown>;
  input: Record<string, unknown>;
  windows: Record<string, unknown>[];
};

type ChronologicalWindow = {
  originalIndex: number;
  window: Record<string, unknown>;
};

const defaultTransitPlanets: TransitPlanet[] = [
  "saturn",
  "jupiter",
  "rahu",
  "ketu",
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  month: "short",
  timeZone: "UTC",
  timeZoneName: "short",
  year: "numeric",
});

export default function GocharCalculator() {
  const birthDateId = useId();
  const birthTimeId = useId();
  const cityInputId = useId();
  const cityListId = useId();
  const cityHelpId = useId();
  const rangeStartId = useId();
  const rangeEndId = useId();
  const resultHeadingId = useId();

  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [city, setCity] = useState<CityResult | null>(null);
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState("");
  const [lastCitySearch, setLastCitySearch] = useState("");
  const [cityListOpen, setCityListOpen] = useState(false);
  const [activeCityIndex, setActiveCityIndex] = useState(-1);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [transitPlanets, setTransitPlanets] = useState<TransitPlanet[]>(
    defaultTransitPlanets,
  );
  const [includeDashaOverlay, setIncludeDashaOverlay] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<GocharResult | null>(null);

  const selectedCityLabel = city ? cityDisplayName(city) : "";
  const maxRangeEnd = addDaysToDateInput(rangeStart, MAX_RANGE_DAYS - 1);
  const chronologicalWindows = result
    ? result.windows
        .map((window, originalIndex) => ({ originalIndex, window }))
        .sort(compareWindows)
    : [];

  useEffect(() => {
    const query = cityQuery.trim();
    if (query.length < 2 || (city && query === selectedCityLabel)) return;

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
          throw new Error(readError(payload) || "City search could not be completed.");
        }

        const cities = readCities(payload);
        setCityResults(cities);
        setLastCitySearch(query);
        setActiveCityIndex(cities.length > 0 ? 0 : -1);
        setCityListOpen(cities.length > 0);
      } catch (error) {
        if (!controller.signal.aborted) {
          setCityResults([]);
          setActiveCityIndex(-1);
          setCityListOpen(false);
          setCityError(
            error instanceof Error ? error.message : "City search could not be completed.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setCityLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [city, cityQuery, selectedCityLabel]);

  function selectCity(nextCity: CityResult) {
    setCity(nextCity);
    setCityQuery(cityDisplayName(nextCity));
    setCityResults([]);
    setCityListOpen(false);
    setActiveCityIndex(-1);
    setCityError("");
    setCityLoading(false);
  }

  function handleCityKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setCityListOpen(false);
      setActiveCityIndex(-1);
      return;
    }

    if (cityResults.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCityListOpen(true);
      setActiveCityIndex((current) =>
        current < cityResults.length - 1 ? current + 1 : 0,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCityListOpen(true);
      setActiveCityIndex((current) =>
        current > 0 ? current - 1 : cityResults.length - 1,
      );
    } else if (event.key === "Enter" && cityListOpen && activeCityIndex >= 0) {
      event.preventDefault();
      selectCity(cityResults[activeCityIndex]);
    }
  }

  function updateRangeStart(nextStart: string) {
    setRangeStart(nextStart);
    setSubmitError("");

    if (!nextStart) return;
    const nextMaximum = addDaysToDateInput(nextStart, MAX_RANGE_DAYS - 1);
    if (!rangeEnd || rangeEnd < nextStart || (nextMaximum && rangeEnd > nextMaximum)) {
      setRangeEnd(nextStart);
    }
  }

  function togglePlanet(planet: TransitPlanet, checked: boolean) {
    setTransitPlanets((current) =>
      planetOptions
        .filter(({ value }) =>
          value === planet ? checked : current.includes(value),
        )
        .map(({ value }) => value),
    );
    setSubmitError("");
  }

  async function submitGochar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const birth = parseBirthInput(birthDate, birthTime);
    if (!birth) {
      setSubmitError("Enter a valid birth date and time.");
      return;
    }
    if (!city) {
      setSubmitError("Select a city from the verified search results.");
      return;
    }

    const dayCount = inclusiveDayCount(rangeStart, rangeEnd);
    if (dayCount === null || dayCount < 1) {
      setSubmitError("The end date must be on or after the start date.");
      return;
    }
    if (dayCount > MAX_RANGE_DAYS) {
      setSubmitError(`Choose a timeline of ${MAX_RANGE_DAYS} days or fewer.`);
      return;
    }
    if (transitPlanets.length === 0) {
      setSubmitError("Select at least one transit planet.");
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/gochar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: birth.year,
          month: birth.month,
          day: birth.day,
          hour: birth.hour,
          minute: birth.minute,
          city: city.name,
          lat: city.lat,
          lng: city.lng,
          tz_str: city.timezone,
          ayanamsha: "lahiri",
          range_start: rangeStart,
          range_end: rangeEnd,
          transit_planets: transitPlanets,
          include_dasha_overlay: includeDashaOverlay,
        }),
      });
      const payload: unknown = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(readError(payload) || "The Gochar timeline could not be calculated.");
      }

      const nextResult = readGocharResult(payload);
      if (!nextResult) {
        throw new Error("The Gochar service returned an unreadable response.");
      }
      setResult(nextResult);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "The Gochar timeline could not be calculated.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)]">
      <form
        className="self-start rounded border border-[#e1c878] bg-white"
        onSubmit={submitGochar}
      >
        <div className="border-b border-[#f0dfae] p-4">
          <h2 className="text-lg font-semibold text-[#681414]">Calculate Gochar</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Use verified birth coordinates to build a chronological Vedic transit timeline.
          </p>
        </div>

        <div className="space-y-6 p-4">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-[#681414]">
              Birth details
            </legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label htmlFor={birthDateId}>
                <span className="field-label">Birth date</span>
                <input
                  id={birthDateId}
                  className="field-input"
                  type="date"
                  autoComplete="bday"
                  value={birthDate}
                  onChange={(event) => {
                    setBirthDate(event.target.value);
                    setSubmitError("");
                  }}
                  required
                />
              </label>
              <label htmlFor={birthTimeId}>
                <span className="field-label">Birth time</span>
                <input
                  id={birthTimeId}
                  className="field-input"
                  type="time"
                  autoComplete="off"
                  value={birthTime}
                  onChange={(event) => {
                    setBirthTime(event.target.value);
                    setSubmitError("");
                  }}
                  required
                />
              </label>
            </div>

            <div
              className="relative mt-3"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setCityListOpen(false);
                  setActiveCityIndex(-1);
                }
              }}
            >
              <label className="field-label" htmlFor={cityInputId}>
                Birth city
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  size={16}
                />
                <input
                  id={cityInputId}
                  className="field-input field-input-with-icon pr-10"
                  type="text"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-controls={cityListId}
                  aria-expanded={cityListOpen && cityResults.length > 0}
                  aria-activedescendant={
                    cityListOpen && activeCityIndex >= 0
                      ? `${cityListId}-${activeCityIndex}`
                      : undefined
                  }
                  aria-describedby={cityHelpId}
                  autoComplete="off"
                  placeholder="Search city or locality"
                  value={cityQuery}
                  onChange={(event) => {
                    const nextQuery = event.target.value;
                    setCityQuery(nextQuery);
                    setCity(null);
                    setCityError("");
                    setLastCitySearch("");
                    setSubmitError("");
                    setActiveCityIndex(-1);
                    setCityListOpen(nextQuery.trim().length >= 2);
                    if (nextQuery.trim().length < 2) {
                      setCityResults([]);
                      setCityLoading(false);
                    }
                  }}
                  onFocus={() => setCityListOpen(cityResults.length > 0)}
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

              {cityListOpen && cityResults.length > 0 ? (
                <div
                  id={cityListId}
                  role="listbox"
                  aria-label="Matching birth cities"
                  className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded border border-[#d8bd72] bg-white shadow-lg"
                >
                  {cityResults.map((option, index) => (
                    <button
                      id={`${cityListId}-${index}`}
                      key={`${option.name}-${option.state ?? ""}-${option.country}-${option.lat}-${option.lng}`}
                      type="button"
                      role="option"
                      aria-selected={activeCityIndex === index}
                      className={`block w-full border-b border-[#f0dfae] px-3 py-3 text-left last:border-b-0 ${
                        activeCityIndex === index
                          ? "bg-[#fff3cf]"
                          : "bg-white hover:bg-[#fffaf0]"
                      }`}
                      onClick={() => selectCity(option)}
                      onMouseEnter={() => setActiveCityIndex(index)}
                    >
                      <span className="block text-sm font-semibold text-stone-900">
                        {option.name}
                      </span>
                      <span className="mt-1 block text-xs text-stone-600">
                        {[option.district, option.state, option.country]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}

              <p id={cityHelpId} className="mt-2 text-xs leading-5 text-stone-600">
                {city
                  ? `${city.name}, ${city.country} · ${city.timezone}`
                  : "Type at least two characters, then select a verified result."}
              </p>
              <p className="sr-only" role="status" aria-live="polite">
                {cityLoading ? "Searching for cities." : ""}
              </p>
              {cityError ? (
                <p role="alert" className="mt-2 text-xs leading-5 text-[#a53b21]">
                  {cityError}
                </p>
              ) : null}
              {!cityLoading &&
              !cityError &&
              cityQuery.trim().length >= 2 &&
              lastCitySearch === cityQuery.trim() &&
              cityResults.length === 0 &&
              !city ? (
                <p role="status" className="mt-2 text-xs leading-5 text-stone-600">
                  No matching cities found. Try a nearby city or a broader spelling.
                </p>
              ) : null}
            </div>
          </fieldset>

          <fieldset className="border-t border-[#f0dfae] pt-5">
            <legend className="mb-3 text-sm font-semibold text-[#681414]">
              Timeline range
            </legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label htmlFor={rangeStartId}>
                <span className="field-label">Start date</span>
                <input
                  id={rangeStartId}
                  className="field-input"
                  type="date"
                  value={rangeStart}
                  onChange={(event) => updateRangeStart(event.target.value)}
                  required
                />
              </label>
              <label htmlFor={rangeEndId}>
                <span className="field-label">End date</span>
                <input
                  id={rangeEndId}
                  className="field-input"
                  type="date"
                  min={rangeStart || undefined}
                  max={maxRangeEnd || undefined}
                  value={rangeEnd}
                  onChange={(event) => {
                    setRangeEnd(event.target.value);
                    setSubmitError("");
                  }}
                  required
                />
              </label>
            </div>
            <p className="mt-2 text-xs leading-5 text-stone-600">
              Up to {MAX_RANGE_DAYS} days, including the start and end dates.
            </p>
          </fieldset>

          <fieldset className="border-t border-[#f0dfae] pt-5">
            <legend className="mb-3 text-sm font-semibold text-[#681414]">
              Transit planets
            </legend>
            <div className="grid grid-cols-2 border-l border-t border-[#e1c878] sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {planetOptions.map(({ value, label }) => (
                <label
                  key={value}
                  className="flex min-h-11 cursor-pointer items-center gap-2 border-b border-r border-[#e1c878] bg-[#fffdf7] px-3 py-2 text-sm text-stone-800 hover:bg-[#fffaf0]"
                >
                  <input
                    type="checkbox"
                    className="size-4 accent-[#8d1f1f]"
                    checked={transitPlanets.includes(value)}
                    onChange={(event) => togglePlanet(value, event.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3 border-t border-[#f0dfae] pt-5">
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-[#8d1f1f]"
              checked={includeDashaOverlay}
              onChange={(event) => {
                setIncludeDashaOverlay(event.target.checked);
                setSubmitError("");
              }}
            />
            <span>
              <span className="block text-sm font-semibold text-stone-900">
                Include Vimshottari dasha overlay
              </span>
              <span className="mt-1 block text-xs leading-5 text-stone-600">
                Include transit windows tied to the active dasha stack.
              </span>
            </span>
          </label>
        </div>

        <div className="border-t border-[#f0dfae] p-4">
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#711818] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#681414] disabled:cursor-not-allowed disabled:bg-stone-400"
            disabled={submitting}
          >
            {submitting ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
            ) : null}
            {submitting ? "Calculating timeline…" : "Calculate Gochar timeline"}
          </button>
          {submitError ? (
            <p role="alert" className="mt-3 text-sm leading-6 text-[#a53b21]">
              {submitError}
            </p>
          ) : null}
        </div>
      </form>

      <section
        className="min-w-0"
        aria-labelledby={resultHeadingId}
        aria-busy={submitting}
      >
        {submitting ? (
          <div className="grid min-h-80 place-items-center border-y border-[#e1c878] bg-white p-8 text-center">
            <div>
              <LoaderCircle
                aria-hidden="true"
                className="mx-auto animate-spin text-[#8d1f1f]"
                size={28}
              />
              <h2 id={resultHeadingId} className="mt-4 text-xl font-semibold text-[#681414]">
                Calculating your transit timeline
              </h2>
              <p role="status" className="mt-2 text-sm leading-6 text-stone-600">
                Checking the selected planets across each day in the range.
              </p>
            </div>
          </div>
        ) : result ? (
          <GocharResults
            result={result}
            chronologicalWindows={chronologicalWindows}
            headingId={resultHeadingId}
          />
        ) : (
          <div className="grid min-h-80 place-items-center border-y border-[#e1c878] bg-white p-8 text-center">
            <div className="max-w-lg">
              <h2 id={resultHeadingId} className="text-xl font-semibold text-[#681414]">
                Your Gochar timeline will appear here
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Enter a verified birth place, choose a date range, and select the planets you
                want to follow.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function GocharResults({
  result,
  chronologicalWindows,
  headingId,
}: {
  result: GocharResult;
  chronologicalWindows: ChronologicalWindow[];
  headingId: string;
}) {
  const metaItems = buildMetaItems(result.meta, result.windows.length);

  return (
    <div className="space-y-5">
      <div className="border-y border-[#e1c878] bg-white px-4 py-4 sm:px-6">
        <h2 id={headingId} className="text-xl font-semibold text-[#681414]">
          Gochar timeline
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600" role="status">
          {result.windows.length === 0
            ? "The calculation completed without matching transit windows."
            : `${result.windows.length} ${result.windows.length === 1 ? "window" : "windows"} returned in chronological order.`}
        </p>
      </div>

      {metaItems.length > 0 ? (
        <section className="rounded border border-[#e1c878] bg-[#fffdf7]">
          <h3 className="border-b border-[#f0dfae] px-4 py-3 text-sm font-semibold text-[#681414]">
            Calculation details
          </h3>
          <dl className="grid sm:grid-cols-2 xl:grid-cols-3">
            {metaItems.map((item) => (
              <div
                key={item.label}
                className="border-b border-[#f0dfae] px-4 py-3 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {item.label}
                </dt>
                <dd className="mt-1 break-words text-sm text-stone-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {chronologicalWindows.length > 0 ? (
        <ol className="divide-y divide-[#ecd89d] rounded border border-[#e1c878] bg-white">
          {chronologicalWindows.map(({ window: transitWindow, originalIndex }) => {
            const id = stringValue(transitWindow.id) || `window-${originalIndex}`;
            const startDate = windowDate(transitWindow.start_date, transitWindow.start_datetime);
            const endDate = windowDate(transitWindow.end_date, transitWindow.end_datetime);
            const evidence = isRecord(transitWindow.evidence)
              ? transitWindow.evidence
              : undefined;

            return (
              <li
                key={`${id}-${originalIndex}`}
                className="grid gap-4 p-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:p-5"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Date range
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#681414]">
                    {formatWindowDateRange(startDate, endDate)}
                  </p>
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-6 text-stone-950">
                    {stringValue(transitWindow.label) || "Untitled transit window"}
                  </h3>

                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-3 xl:grid-cols-6">
                    <WindowDetail label="Planet" value={transitWindow.transit_planet} />
                    <WindowDetail label="Reference" value={transitWindow.reference_point} />
                    <WindowDetail label="Category" value={transitWindow.category} />
                    <WindowDetail label="Kind" value={transitWindow.kind} />
                    <WindowDetail
                      label="Strength"
                      value={formatStrength(transitWindow.strength)}
                      humanize={false}
                    />
                    <WindowDetail
                      label="Priority"
                      value={numberOrString(transitWindow.priority)}
                      humanize={false}
                    />
                  </dl>

                  <div className="mt-4 border-l-2 border-[#d8bd72] pl-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Evidence summary
                    </p>
                    <p className="mt-1 text-sm leading-6 text-stone-700">
                      {summarizeEvidence(evidence)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="border-y border-[#e1c878] bg-white p-8 text-center">
          <h3 className="text-lg font-semibold text-[#681414]">No transit windows found</h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Try a different date range or add more transit planets to the filter.
          </p>
        </div>
      )}
    </div>
  );
}

function WindowDetail({
  label,
  value,
  humanize = true,
}: {
  label: string;
  value: unknown;
  humanize?: boolean;
}) {
  const text = numberOrString(value);
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</dt>
      <dd className="mt-1 break-words text-sm text-stone-800">
        {text ? (humanize ? humanizeIdentifier(text) : text) : "Not returned"}
      </dd>
    </div>
  );
}

function readCities(payload: unknown): CityResult[] {
  if (!isRecord(payload) || !Array.isArray(payload.results)) return [];

  return payload.results.flatMap((value) => {
    if (!isRecord(value)) return [];
    const name = stringValue(value.name);
    const country = stringValue(value.country);
    const timezone = stringValue(value.timezone);
    const lat = finiteNumber(value.lat);
    const lng = finiteNumber(value.lng);

    if (!name || !country || !timezone || lat === null || lng === null) return [];

    return [
      {
        name,
        country,
        timezone,
        lat,
        lng,
        state: nullableString(value.state),
        district: nullableString(value.district),
      },
    ];
  });
}

function readGocharResult(payload: unknown): GocharResult | null {
  if (!isRecord(payload) || !Array.isArray(payload.windows)) return null;

  return {
    meta: isRecord(payload.meta) ? payload.meta : {},
    input: isRecord(payload.input) ? payload.input : {},
    windows: payload.windows.filter(isRecord),
  };
}

function readError(payload: unknown) {
  if (!isRecord(payload)) return "";
  return (
    stringValue(payload.error) ||
    stringValue(payload.message) ||
    stringValue(payload.detail)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function nullableString(value: unknown) {
  const text = stringValue(value);
  return text || null;
}

function finiteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function numberOrString(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return stringValue(value);
}

function cityDisplayName(city: CityResult) {
  return [city.name, city.state, city.country].filter(Boolean).join(", ");
}

function parseBirthInput(date: string, time: string) {
  const dateParts = date.split("-").map(Number);
  const timeParts = time.split(":").map(Number);
  if (dateParts.length !== 3 || timeParts.length !== 2) return null;

  const [year, month, day] = dateParts;
  const [hour, minute] = timeParts;
  const dateEpoch = dateInputEpoch(date);

  if (
    dateEpoch === null ||
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  return { year, month, day, hour, minute };
}

function dateInputEpoch(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const epoch = Date.UTC(year, month - 1, day);
  const parsed = new Date(epoch);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return epoch;
}

function addDaysToDateInput(value: string, days: number) {
  const epoch = dateInputEpoch(value);
  if (epoch === null) return "";
  return new Date(epoch + days * DAY_IN_MS).toISOString().slice(0, 10);
}

function inclusiveDayCount(start: string, end: string) {
  const startEpoch = dateInputEpoch(start);
  const endEpoch = dateInputEpoch(end);
  if (startEpoch === null || endEpoch === null) return null;
  return Math.floor((endEpoch - startEpoch) / DAY_IN_MS) + 1;
}

function compareWindows(a: ChronologicalWindow, b: ChronologicalWindow) {
  const aKey =
    stringValue(a.window.start_datetime) || stringValue(a.window.start_date);
  const bKey =
    stringValue(b.window.start_datetime) || stringValue(b.window.start_date);
  return aKey.localeCompare(bKey) || a.originalIndex - b.originalIndex;
}

function windowDate(date: unknown, dateTime: unknown) {
  const dateValue = stringValue(date);
  if (dateValue) return dateValue;
  return stringValue(dateTime).slice(0, 10);
}

function formatDate(value: string) {
  const epoch = dateInputEpoch(value);
  return epoch === null ? value || "Date not returned" : dateFormatter.format(epoch);
}

function formatWindowDateRange(start: string, end: string) {
  if (!start && !end) return "Date not returned";
  if (!end || start === end) return formatDate(start || end);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function humanizeIdentifier(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatStrength(value: unknown) {
  const number = finiteNumber(value);
  if (number !== null) {
    if (number >= 0 && number <= 1) return `${Math.round(number * 100)}%`;
    return Number.isInteger(number) ? String(number) : number.toFixed(2);
  }
  return stringValue(value);
}

function summarizeEvidence(evidence?: Record<string, unknown>) {
  if (!evidence) return "No structured evidence was returned for this window.";

  const parts: string[] = [];
  const add = (value: string) => {
    if (value && !parts.includes(value)) parts.push(value);
  };
  const polarity = stringValue(evidence.polarity);
  const activationType = stringValue(evidence.activation_type);
  const relativeHouse = numberOrString(evidence.relative_house);
  const boundaryType = stringValue(evidence.boundary_type);
  const sourceKind = stringValue(evidence.source_kind);
  const aspect =
    stringValue(evidence.aspect_name) ||
    stringValue(evidence.aspect_type) ||
    stringValue(evidence.aspect);
  const fromSign = numberOrString(evidence.from_sign_id);
  const toSign = numberOrString(evidence.to_sign_id);
  const transitSign = numberOrString(evidence.transit_sign_id);
  const natalSign = numberOrString(evidence.natal_sign_id);

  if (polarity) add(`${humanizeIdentifier(polarity)} polarity`);
  if (activationType) add(humanizeIdentifier(activationType));
  if (aspect) add(humanizeIdentifier(aspect));
  if (relativeHouse) add(`Relative house ${relativeHouse}`);
  if (fromSign && toSign) add(`Sign ${fromSign} to sign ${toSign}`);
  if (transitSign) add(`Transit sign ${transitSign}`);
  if (natalSign) add(`Natal sign ${natalSign}`);
  if (boundaryType) add(`${humanizeIdentifier(boundaryType)} boundary`);
  if (sourceKind) add(`Source: ${humanizeIdentifier(sourceKind)}`);

  if (parts.length === 0) {
    for (const [key, value] of Object.entries(evidence)) {
      if (["system", "transit_planet", "reference", "reference_point"].includes(key)) {
        continue;
      }
      const text = numberOrString(value);
      if (text) add(`${humanizeIdentifier(key)}: ${humanizeIdentifier(text)}`);
      if (parts.length >= 4) break;
    }
  }

  return parts.length > 0
    ? `${parts.slice(0, 5).join(" · ")}.`
    : "Structured evidence was returned for this window.";
}

function buildMetaItems(meta: Record<string, unknown>, actualWindowCount: number) {
  const items: { label: string; value: string }[] = [];
  const rangeStart = stringValue(meta.range_start);
  const rangeEnd = stringValue(meta.range_end);
  const endpoint = stringValue(meta.endpoint);
  const version = stringValue(meta.version);
  const generatedAt = stringValue(meta.generated_at);

  if (rangeStart || rangeEnd) {
    items.push({
      label: "Timeline",
      value: formatWindowDateRange(rangeStart, rangeEnd),
    });
  }
  addMetaItem(items, "Days", meta.day_count);
  addMetaItem(
    items,
    "Windows",
    meta.generated_window_count ?? actualWindowCount,
  );
  addMetaItem(items, "Timezone", meta.timezone, false);
  if (endpoint || version) {
    items.push({
      label: "Engine",
      value: [endpoint && humanizeIdentifier(endpoint), version && version.toUpperCase()]
        .filter(Boolean)
        .join(" · "),
    });
  }
  addMetaItem(items, "Ruleset", meta.ruleset_version);
  addMetaItem(items, "Ayanamsha", meta.ayanamsha);
  addMetaItem(items, "House system", meta.house_system);
  addMetaItem(items, "Node type", meta.node_type);
  if (generatedAt) {
    const parsed = new Date(generatedAt);
    items.push({
      label: "Generated",
      value: Number.isNaN(parsed.getTime())
        ? generatedAt
        : dateTimeFormatter.format(parsed),
    });
  }

  return items;
}

function addMetaItem(
  items: { label: string; value: string }[],
  label: string,
  value: unknown,
  humanize = true,
) {
  const text = numberOrString(value);
  if (!text) return;
  items.push({ label, value: humanize ? humanizeIdentifier(text) : text });
}
