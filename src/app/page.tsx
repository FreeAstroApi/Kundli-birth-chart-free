"use client";

import {
  Activity,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Download,
  LoaderCircle,
  MapPin,
  Moon,
  Search,
  Settings2,
  Sparkles,
  Sun,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

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
  cityQuery: string;
  city: CityResult | null;
  ayanamsha: "lahiri" | "raman" | "krishnamurti";
  house_system: "whole_sign" | "equal" | "placidus";
  node_type: "mean" | "true";
};

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
  errors?: Record<string, string>;
};

const initialForm: BirthForm = {
  name: "Client",
  date: "1997-09-22",
  time: "23:25",
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
  ayanamsha: "lahiri",
  house_system: "whole_sign",
  node_type: "mean",
};

const signGlyphs = ["", "Ar", "Ta", "Ge", "Cn", "Le", "Vi", "Li", "Sc", "Sg", "Cp", "Aq", "Pi"];

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

export default function Home() {
  const [form, setForm] = useState<BirthForm>(initialForm);
  const [options, setOptions] = useState<ReportOptions>({
    dasha: true,
    yogas: true,
    strength: true,
    vargas: true,
    panchang: true,
  });
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityError, setCityError] = useState("");
  const [result, setResult] = useState<KundliResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
          throw new Error(payload.error ?? "City search failed");
        }
        setCityResults(payload.results ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setCityError(error instanceof Error ? error.message : "City search failed");
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
  }, [form.cityQuery, form.city?.name]);

  async function submitKundli(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!form.city) {
      setSubmitError("Select a city from search so the chart uses verified coordinates and timezone.");
      return;
    }

    const [year, month, day] = form.date.split("-").map(Number);
    const [hour, minute] = form.time.split(":").map(Number);

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
            city: form.city.name,
            lat: form.city.lat,
            lng: form.city.lng,
            tz_str: form.city.timezone,
            ayanamsha: form.ayanamsha,
            house_system: form.house_system,
            node_type: form.node_type,
          },
          options,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to calculate Kundli");
      }
      setResult(payload);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to calculate Kundli");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffaf0] text-stone-950">
      <header className="border-b border-[#e4c978] bg-[#8d1f1f] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded bg-[#f6c85f] text-[#681414]">
              <Sun size={24} strokeWidth={2.4} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f8dea0]">
                Jyotish Desk
              </p>
              <h1 className="text-2xl font-semibold tracking-normal">Kundli Birth Chart</h1>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-[#efd99d] bg-[#fff3cf]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-xl font-semibold text-[#681414]">
              Cast a client-ready Rashi chart with dasha, yogas, vargas, strength, and Panchang context.
            </h2>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-stone-700">
              The form resolves cities to latitude, longitude, and timezone before calculation. The API key stays in
              Next.js route handlers and never ships to the browser.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[390px_1fr]">
        <aside className="space-y-4">
          <form onSubmit={submitKundli} className="rounded border border-[#e1c878] bg-white shadow-sm">
            <div className="border-b border-[#f0dfae] px-4 py-3">
              <div className="flex items-center gap-2 text-[#681414]">
                <CalendarDays size={18} />
                <h2 className="font-semibold">Birth Details</h2>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <label className="block">
                <span className="field-label">Client name</span>
                <input
                  className="field-input"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Client name"
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="field-label">Date</span>
                  <input
                    className="field-input"
                    type="date"
                    value={form.date}
                    onChange={(event) => setForm({ ...form, date: event.target.value })}
                    required
                  />
                </label>
                <label className="block">
                  <span className="field-label">Time</span>
                  <input
                    className="field-input"
                    type="time"
                    value={form.time}
                    onChange={(event) => setForm({ ...form, time: event.target.value })}
                    required
                  />
                </label>
              </div>

              <div className="relative">
                <label className="block">
                  <span className="field-label">Birth place</span>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      size={17}
                    />
                    <input
                      className="field-input field-input-with-icon"
                      value={form.cityQuery}
                      onChange={(event) => {
                        const cityQuery = event.target.value;
                        if (cityQuery.trim().length < 2) {
                          setCityResults([]);
                          setCityError("");
                        }
                        setForm({ ...form, cityQuery, city: null });
                      }}
                      placeholder="Search city or locality"
                      required
                    />
                    {cityLoading ? (
                      <LoaderCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#a53b21]"
                        size={17}
                      />
                    ) : null}
                  </div>
                </label>

                {cityResults.length > 0 ? (
                  <div className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded border border-[#dbbf70] bg-white shadow-lg">
                    {cityResults.map((city) => (
                      <button
                        key={`${city.name}-${city.lat}-${city.lng}`}
                        type="button"
                        className="flex w-full items-start gap-3 border-b border-stone-100 px-3 py-2 text-left last:border-0 hover:bg-[#fff3cf]"
                        onClick={() => {
                          setForm({
                            ...form,
                            city,
                            cityQuery: city.name,
                          });
                          setCityResults([]);
                        }}
                      >
                        <MapPin className="mt-0.5 shrink-0 text-[#8d1f1f]" size={16} />
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

                {cityError ? <p className="mt-2 text-xs text-[#a53b21]">{cityError}</p> : null}
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

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="block">
                  <span className="field-label">Ayanamsha</span>
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
                  <span className="field-label">Houses</span>
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
                    <option value="whole_sign">Whole</option>
                    <option value="equal">Equal</option>
                    <option value="placidus">Placidus</option>
                  </select>
                </label>
                <label className="block">
                  <span className="field-label">Nodes</span>
                  <select
                    className="field-input field-select"
                    value={form.node_type}
                    onChange={(event) =>
                      setForm({ ...form, node_type: event.target.value as BirthForm["node_type"] })
                    }
                  >
                    <option value="mean">Mean</option>
                    <option value="true">True</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="border-t border-[#f0dfae] p-4">
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded bg-[#8d1f1f] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#711818] disabled:cursor-not-allowed disabled:bg-stone-400"
                disabled={submitting}
              >
                {submitting ? <LoaderCircle className="animate-spin" size={18} /> : null}
                Generate Kundli
              </button>
              {submitError ? <p className="mt-3 text-sm text-[#a53b21]">{submitError}</p> : null}
            </div>
          </form>

          <section className="rounded border border-[#e1c878] bg-white shadow-sm">
            <div className="border-b border-[#f0dfae] px-4 py-3">
              <div className="flex items-center gap-2 text-[#681414]">
                <Settings2 size={18} />
                <h2 className="font-semibold">Analysis Modules</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 p-4">
              {(Object.keys(options) as (keyof ReportOptions)[]).map((key) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between rounded border border-[#ecd89d] bg-[#fffaf0] px-3 py-2 text-sm"
                >
                  <span>{optionLabels[key]}</span>
                  <span className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={options[key]}
                      onChange={(event) => setOptions({ ...options, [key]: event.target.checked })}
                    />
                    <span className="h-5 w-9 rounded-full bg-stone-300 transition peer-checked:bg-[#a53b21]" />
                    <span className="absolute left-0.5 size-4 rounded-full bg-white transition peer-checked:translate-x-4" />
                  </span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        <section className="min-w-0 space-y-5">
          {result ? (
            <KundliDashboard result={result} />
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="grid min-h-[620px] place-items-center rounded border border-[#e1c878] bg-white p-8 text-center shadow-sm">
      <div className="max-w-lg">
        <div className="mx-auto flex size-16 items-center justify-center rounded bg-[#fff3cf] text-[#8d1f1f]">
          <Moon size={30} />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-[#681414]">Enter birth details to cast the Kundli.</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Results will appear as a consultation dashboard with a North Indian chart, planet table,
          active dasha stack, yoga highlights, strength metrics, divisional charts, and Panchang.
        </p>
      </div>
    </div>
  );
}

function KundliDashboard({ result }: { result: KundliResult }) {
  const planets = result.chart?.planets ?? [];
  const houses = result.chart?.houses ?? [];
  const asc = result.chart?.ascendant;
  const panchang = result.panchang ?? {};
  const errors = result.errors ?? {};

  return (
    <>
      <section className="min-w-0 rounded border border-[#e1c878] bg-white shadow-sm">
        <div className="grid gap-4 border-b border-[#f0dfae] p-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold text-[#681414]">{result.input.label}</h2>
              <span className="rounded bg-[#fff3cf] px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
                {asc?.sign ?? "Ascendant"} Lagna
              </span>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-600">
              <span className="inline-flex items-center gap-1">
                <MapPin size={15} /> {result.input.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={15} /> {result.input.timezone}
              </span>
              <span className="inline-flex items-center gap-1">
                <Compass size={15} /> {result.input.lat.toFixed(4)}, {result.input.lng.toFixed(4)}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded border border-[#caa24d] bg-[#fffaf0] px-4 text-sm font-semibold text-[#681414] hover:bg-[#fff3cf]"
          >
            <Download size={17} />
            Print
          </button>
        </div>

        <div className="grid items-start gap-5 p-4 xl:grid-cols-[390px_1fr]">
          <NorthIndianChart planets={planets} houses={houses} ascendantSign={asc?.sign_id} />

          <div className="self-start space-y-3">
            <div className="grid rounded border border-[#ecd89d] bg-[#fffdf7] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:grid-cols-2">
              <MetricCard label="Lagna" value={asc?.sign ?? "N/A"} detail={formatDegree(asc?.degree)} />
              <MetricCard
                label="Nakshatra"
                value={asc?.nakshatra?.name ?? "N/A"}
                detail={asc?.nakshatra?.pada ? `Pada ${asc.nakshatra.pada}` : "Ascendant"}
              />
              <MetricCard
                label="Sade Sati"
                value={result.chart?.sade_sati?.active ? "Active" : "Not active"}
                detail={result.chart?.sade_sati?.phase ?? result.chart?.sade_sati?.description ?? "Saturn context"}
              />
              <MetricCard
                label="Ruleset"
                value={String(result.chart?.metadata?.ayanamsha ?? "lahiri")}
                detail={humanize(String(result.chart?.metadata?.house_system ?? "whole_sign"))}
              />
            </div>
            <ChartContext planets={planets} metadata={result.chart?.metadata} />
          </div>
        </div>
      </section>

      {Object.keys(errors).length > 0 ? (
        <section className="rounded border border-[#d98f6b] bg-[#fff4ed] p-4 text-sm text-[#8a2a13]">
          <div className="font-semibold">Some modules did not return data</div>
          <div className="mt-2 grid gap-1">
            {Object.entries(errors).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-5 2xl:grid-cols-[1.2fr_0.8fr]">
        <DataPanel title="Graha Positions" icon={<Sun size={18} />}>
          <div className="overflow-x-auto">
            <table className="data-table min-w-[720px]">
              <thead>
                <tr>
                  <th>Graha</th>
                  <th>Sign</th>
                  <th>House</th>
                  <th>Degree</th>
                  <th>Nakshatra</th>
                  <th>Motion</th>
                </tr>
              </thead>
              <tbody>
                {planets.map((planet) => (
                  <tr key={planet.name}>
                    <td className="font-semibold text-stone-950">{planet.name}</td>
                    <td>{planet.sign ?? "N/A"}</td>
                    <td>{planet.house ?? "N/A"}</td>
                    <td>{formatDegree(planet.degree_in_sign ?? planet.absolute_degree)}</td>
                    <td>
                      {planet.nakshatra ?? "N/A"}
                      {planet.pada ? ` · Pada ${planet.pada}` : ""}
                    </td>
                    <td>{planet.is_retrograde ? "Retrograde" : "Direct"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataPanel>

        <DataPanel title="Panchang" icon={<CalendarDays size={18} />}>
          {result.panchang ? (
            <div className="grid gap-3">
              <InfoRow label="Weekday" value={objectPath(panchang, "weekday.name")} />
              <InfoRow label="Tithi" value={objectPath(panchang, "request_time_panchang.tithi.name") ?? objectPath(panchang, "tithi.name")} />
              <InfoRow label="Nakshatra" value={objectPath(panchang, "request_time_panchang.nakshatra.name") ?? objectPath(panchang, "nakshatra.name")} />
              <InfoRow label="Yoga" value={objectPath(panchang, "request_time_panchang.yoga.name") ?? objectPath(panchang, "yoga.name")} />
              <InfoRow label="Rahu Kalam" value={formatRahu(panchang)} />
              <InfoRow label="Sunrise" value={String(panchang.sunrise ?? "N/A")} />
            </div>
          ) : (
            <MutedMessage label="Panchang module is off." />
          )}
        </DataPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <DataPanel title="Active Dasha" icon={<Activity size={18} />}>
          <DashaView dasha={result.dasha} />
        </DataPanel>

        <DataPanel title="Yoga Highlights" icon={<Sparkles size={18} />}>
          <YogaView yogas={result.yogas} />
        </DataPanel>

        <DataPanel title="Strength" icon={<Activity size={18} />}>
          <StrengthView strength={result.strength} />
        </DataPanel>
      </div>

      <DataPanel title="Divisional Charts" icon={<Compass size={18} />}>
        <VargasView vargas={result.vargas} />
      </DataPanel>
    </>
  );
}

function NorthIndianChart({
  planets,
  houses,
  ascendantSign,
}: {
  planets: Planet[];
  houses: House[];
  ascendantSign?: number;
}) {
  const planetByHouse = new Map<number, Planet[]>();
  planets.forEach((planet) => {
    if (!planet.house) return;
    planetByHouse.set(planet.house, [...(planetByHouse.get(planet.house) ?? []), planet]);
  });

  const signByHouse = new Map<number, number | undefined>();
  houses.forEach((house) => signByHouse.set(house.house, house.sign_id));

  return (
    <div className="min-w-0 overflow-hidden rounded border border-[#d7b860] bg-[#fffaf0] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[#681414]">Rashi Chart</h3>
          <p className="text-xs text-stone-600">North Indian layout</p>
        </div>
        <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-[#8d1f1f]">
          D1
        </span>
      </div>
      <svg viewBox="0 0 100 100" role="img" aria-label="North Indian Kundli chart" className="aspect-square w-full max-w-full">
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
          return (
            <g key={house}>
              <text x={coord.x} y={coord.y - 4} textAnchor="middle" className="fill-[#8d1f1f] text-[3.2px] font-bold">
                {house}
                {sign ? ` · ${signGlyphs[sign]}` : ""}
              </text>
              <text x={coord.x} y={coord.y + 1.2} textAnchor="middle" className="fill-stone-950 text-[3px] font-semibold">
                {house === 1 ? "Asc" : ""}
                {house === 1 && housePlanets.length ? " · " : ""}
                {housePlanets.map((planet) => planetShort[planet.name] ?? planet.name.slice(0, 2)).join(" ")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="min-h-28 border-b border-r border-[#f0dfae] bg-[#fffaf0] p-4 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0">
      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-stone-500">{label}</div>
      <div className="mt-3 text-2xl font-semibold leading-7 text-[#681414]">{value}</div>
      <div className="mt-2 min-h-5 text-sm leading-5 text-stone-600">{detail}</div>
    </div>
  );
}

function ChartContext({
  planets,
  metadata,
}: {
  planets: Planet[];
  metadata?: Record<string, unknown>;
}) {
  const moon = planets.find((planet) => planet.name === "Moon");
  const sun = planets.find((planet) => planet.name === "Sun");
  const saturn = planets.find((planet) => planet.name === "Saturn");

  return (
    <div className="rounded border border-[#ecd89d] bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#681414]">
        <Moon size={16} />
        Chart Context
      </div>
      <div className="grid gap-2 text-sm">
        <InfoRow label="Moon" value={formatPlanetContext(moon)} />
        <InfoRow label="Sun" value={formatPlanetContext(sun)} />
        <InfoRow label="Saturn" value={saturn?.house ? `${saturn.sign}, house ${saturn.house}` : saturn?.sign} />
        <InfoRow label="Timezone" value={String(metadata?.timezone_used ?? "N/A")} />
      </div>
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
    <section className="min-w-0 rounded border border-[#e1c878] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#f0dfae] px-4 py-3 text-[#681414]">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function DashaView({ dasha }: { dasha?: Record<string, unknown> }) {
  if (!dasha) return <MutedMessage label="Dasha module is off." />;
  const active = arrayValue(dasha.active_periods);
  const timeline = arrayValue(dasha.timeline).slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {active.length ? (
          active.map((period, index) => (
            <div key={`${String(period.lord)}-${index}`} className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#681414]">{String(period.level ?? "Period")}</span>
                <span className="rounded bg-white px-2 py-1 text-xs text-stone-600">
                  {percent(period.progress_fraction)}
                </span>
              </div>
              <div className="mt-1 text-lg font-semibold">{String(period.lord ?? "N/A")}</div>
              <div className="mt-1 text-xs text-stone-600">
                {String(period.start ?? "N/A")} to {String(period.end ?? "N/A")}
              </div>
            </div>
          ))
        ) : (
          <MutedMessage label="No active dasha periods returned." />
        )}
      </div>

      {timeline.length ? (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-stone-800">Mahadasha timeline</h3>
          <div className="space-y-2">
            {timeline.map((period, index) => (
              <div key={`${String(period.lord)}-${index}`} className="flex items-center gap-2 text-sm">
                <ChevronRight className="text-[#a53b21]" size={15} />
                <span className="font-medium">{String(period.lord ?? "N/A")}</span>
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

function YogaView({ yogas }: { yogas?: Record<string, unknown> }) {
  if (!yogas) return <MutedMessage label="Yoga module is off." />;
  const rows = [
    ...arrayValue(yogas.active_yogas),
    ...arrayValue(yogas.yogas).filter((row) => row.active === true),
  ].slice(0, 6);

  if (!rows.length) {
    return <MutedMessage label="No active yogas were returned for this chart." />;
  }

  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div key={`${String(row.id ?? row.name)}-${index}`} className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 shrink-0 text-[#1b7f56]" size={16} />
            <div>
              <div className="font-semibold text-[#681414]">{String(row.name ?? "Yoga")}</div>
              <div className="mt-1 text-xs leading-5 text-stone-600">
                {[row.category, row.type, row.strength].filter(Boolean).map(String).join(" · ") || "Active combination"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StrengthView({ strength }: { strength?: Record<string, unknown> }) {
  if (!strength) return <MutedMessage label="Strength module is off." />;
  const shadbala = recordValue(strength.shadbala);
  const totals =
    recordValue(shadbala?.totals) ??
    recordValue(strength.shadbala_totals) ??
    recordValue(strength.total_shadbala);
  const entries = Object.entries(totals ?? {}).slice(0, 7);
  const sav = recordValue(strength.sarvashtakavarga) ?? recordValue(strength.ashtakavarga);

  return (
    <div className="space-y-4">
      {entries.length ? (
        <div className="space-y-2">
          {entries.map(([planet, value]) => (
            <div key={planet}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-semibold text-stone-800">{planet}</span>
                <span className="text-stone-600">{String(value)}</span>
              </div>
              <div className="h-2 rounded bg-[#f3e4bd]">
                <div
                  className="h-2 rounded bg-[#a53b21]"
                  style={{ width: `${Math.min(100, Math.max(12, Number(value) || 35))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MutedMessage label="Strength totals were not in the expected shape." />
      )}
      {sav ? (
        <div className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3 text-sm">
          <div className="font-semibold text-[#681414]">Ashtakavarga</div>
          <div className="mt-1 text-xs leading-5 text-stone-600">
            Sarvashtakavarga data returned. Open the JSON response in dev tools for full house contribution detail.
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VargasView({ vargas }: { vargas?: Record<string, unknown> }) {
  if (!vargas) return <MutedMessage label="Varga module is off." />;
  const charts = recordValue(vargas.vargas) ?? vargas;
  const entries = Object.entries(charts).filter(([, chart]) => typeof chart === "object" && chart !== null);

  if (!entries.length) return <MutedMessage label="No divisional charts returned." />;

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {entries.slice(0, 9).map(([key, chart]) => {
        const row = recordValue(chart) ?? {};
        const asc = recordValue(row.ascendant) ?? {};
        const planets = arrayValue(row.planets).slice(0, 5);
        return (
          <div key={key} className="rounded border border-[#ecd89d] bg-[#fffaf0] p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#681414]">{key}</div>
                <div className="text-xs text-stone-600">{String(row.name ?? "Divisional chart")}</div>
              </div>
              <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-stone-700">
                Asc {String(asc.sign ?? "N/A")}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {planets.map((planet, index) => (
                <span key={`${String(planet.name)}-${index}`} className="rounded bg-white px-2 py-1 text-xs text-stone-700">
                  {String(planet.name ?? "Graha")} {String(planet.sign ?? "")}
                </span>
              ))}
            </div>
          </div>
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

function formatDegree(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "N/A";
  return `${value.toFixed(2)} deg`;
}

function humanize(value: string) {
  return value.replaceAll("_", " ");
}

function percent(value: unknown) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "N/A";
  return `${Math.round(numeric * 100)}%`;
}

function formatRahu(value: Record<string, unknown>) {
  const rahu = recordValue(value.rahu_kalam);
  if (!rahu) return "N/A";
  return `${String(rahu.start ?? "N/A")} - ${String(rahu.end ?? "N/A")}`;
}

function formatPlanetContext(planet?: Planet) {
  if (!planet) return "N/A";
  const nakshatra = planet.nakshatra ? `, ${planet.nakshatra}` : "";
  const pada = planet.pada ? ` pada ${planet.pada}` : "";
  return `${planet.sign ?? "N/A"}${nakshatra}${pada}`;
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
