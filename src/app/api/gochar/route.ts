import { NextRequest, NextResponse } from "next/server";
import { freeAstroFetch } from "../freeastro";

const API_BASE = process.env.FREEASTRO_API_BASE ?? "https://api.freeastroapi.com";
const MAX_RANGE_DAYS = 31;

const supportedTransitPlanets = ["saturn", "jupiter", "rahu", "ketu", "moon"] as const;
const defaultTransitPlanets = ["saturn", "jupiter", "rahu", "ketu"] as const;

type TransitPlanet = (typeof supportedTransitPlanets)[number];

type GocharInput = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  city: string;
  lat: number;
  lng: number;
  tz_str: string;
  ayanamsha: string;
  range_start: string;
  range_end: string;
  transit_planets: TransitPlanet[];
  include_dasha_overlay: boolean;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.FREEASTRO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Set FREEASTRO_API_KEY in .env.local before calculating Gochar." },
      { status: 500 },
    );
  }

  const rawBody: unknown = await request.json().catch(() => null);
  const parsed = parseGocharInput(rawBody);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const payload = {
    ...parsed.input,
    house_system: "whole_sign",
    node_type: "mean",
    transit_hour: 12,
    transit_minute: 0,
    transit_tz_str: parsed.input.tz_str,
  };

  try {
    const response = await freeAstroFetch(new URL("/api/v2/vedic/gochar/timeline", API_BASE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }, 45_000);
    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: readableError(data) || `Gochar request failed with status ${response.status}.` },
        { status: response.status },
      );
    }
    if (data === null) {
      return NextResponse.json(
        { error: "FreeAstro Gochar returned an invalid response." },
        { status: 502 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: networkError(error, "FreeAstro Gochar request failed.") },
      { status: 502 },
    );
  }
}

function parseGocharInput(value: unknown): { input: GocharInput } | { error: string } {
  if (!isRecord(value)) return { error: "Missing Gochar request payload." };

  if (!isIntegerInRange(value.year, 1000, 9999)) return { error: "Birth year must use four digits." };
  if (!isIntegerInRange(value.month, 1, 12)) return { error: "Birth month must be between 1 and 12." };
  if (!isIntegerInRange(value.day, 1, 31)) return { error: "Birth day must be between 1 and 31." };
  if (!isCalendarDate(value.year, value.month, value.day)) return { error: "Birth date is not a valid calendar date." };
  if (!isIntegerInRange(value.hour, 0, 23)) return { error: "Birth hour must be between 0 and 23." };
  if (!isIntegerInRange(value.minute, 0, 59)) return { error: "Birth minute must be between 0 and 59." };

  const second = value.second === undefined ? 0 : value.second;
  if (!isIntegerInRange(second, 0, 59)) return { error: "Birth second must be between 0 and 59." };
  if (!isTrimmedString(value.city, 200)) return { error: "Birth city is required." };
  if (!isCoordinate(value.lat, -90, 90)) return { error: "Latitude must be between -90 and 90." };
  if (!isCoordinate(value.lng, -180, 180)) return { error: "Longitude must be between -180 and 180." };

  const tzString = optionalTrimmedString(value.tz_str, "AUTO", 100);
  if (!tzString) return { error: "Timezone must be a non-empty string." };
  const ayanamsha = optionalTrimmedString(value.ayanamsha, "lahiri", 50);
  if (!ayanamsha) return { error: "Ayanamsha must be a non-empty string." };

  if (!isDateInput(value.range_start)) return { error: "Range start must use YYYY-MM-DD." };
  if (!isDateInput(value.range_end)) return { error: "Range end must use YYYY-MM-DD." };
  const start = Date.parse(`${value.range_start}T00:00:00Z`);
  const end = Date.parse(`${value.range_end}T00:00:00Z`);
  const dayCount = Math.floor((end - start) / 86_400_000) + 1;
  if (dayCount < 1) return { error: "Range end must be on or after range start." };
  if (dayCount > MAX_RANGE_DAYS) {
    return { error: `Gochar ranges are limited to ${MAX_RANGE_DAYS} days.` };
  }

  const transitPlanets = value.transit_planets === undefined
    ? [...defaultTransitPlanets]
    : value.transit_planets;
  if (!isTransitPlanetList(transitPlanets)) {
    return { error: "Choose one or more supported transit planets." };
  }

  const includeDashaOverlay = value.include_dasha_overlay ?? true;
  if (typeof includeDashaOverlay !== "boolean") {
    return { error: "Dasha overlay must be true or false." };
  }

  return {
    input: {
      year: value.year,
      month: value.month,
      day: value.day,
      hour: value.hour,
      minute: value.minute,
      second,
      city: value.city.trim(),
      lat: value.lat,
      lng: value.lng,
      tz_str: tzString,
      ayanamsha,
      range_start: value.range_start,
      range_end: value.range_end,
      transit_planets: [...new Set(transitPlanets)],
      include_dasha_overlay: includeDashaOverlay,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIntegerInRange(value: unknown, minimum: number, maximum: number): value is number {
  return Number.isInteger(value) && (value as number) >= minimum && (value as number) <= maximum;
}

function isCalendarDate(year: number, month: number, day: number) {
  const value = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return isDateInput(value);
}

function isDateInput(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isTrimmedString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
}

function optionalTrimmedString(value: unknown, fallback: string, maxLength: number) {
  if (value === undefined) return fallback;
  return isTrimmedString(value, maxLength) ? value.trim() : "";
}

function isCoordinate(value: unknown, minimum: number, maximum: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum;
}

function isTransitPlanetList(value: unknown): value is TransitPlanet[] {
  return Array.isArray(value)
    && value.length > 0
    && value.length <= supportedTransitPlanets.length
    && value.every(
      (planet) => typeof planet === "string" && supportedTransitPlanets.some((supported) => supported === planet),
    );
}

function readableError(value: unknown): string {
  if (typeof value === "string") return value.trim().slice(0, 500);
  if (Array.isArray(value)) {
    return value.map(readableError).filter(Boolean).join("; ").slice(0, 500);
  }
  if (!isRecord(value)) return "";

  for (const key of ["error", "message", "detail", "msg"]) {
    const message = readableError(value[key]);
    if (message) return message;
  }
  return "";
}

function networkError(error: unknown, fallback: string) {
  if (error instanceof Error && error.name === "TimeoutError") {
    return "FreeAstro Gochar request timed out.";
  }
  return fallback;
}
