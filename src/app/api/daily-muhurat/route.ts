import { NextRequest, NextResponse } from "next/server";
import { freeAstroFetch } from "../freeastro";

const API_BASE = process.env.FREEASTRO_API_BASE ?? "https://api.freeastroapi.com";

const topics = [
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

type DailyMuhuratTopic = (typeof topics)[number];

type DailyMuhuratInput = {
  question: DailyMuhuratTopic;
  date: string;
  time: string;
  city: string;
  lat: number;
  lng: number;
  tz_str: string;
  ayanamsha: string;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.FREEASTRO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Set FREEASTRO_API_KEY in .env.local before loading daily Muhurat." },
      { status: 500 },
    );
  }

  const rawBody: unknown = await request.json().catch(() => null);
  const parsed = parseDailyMuhuratInput(rawBody);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const response = await freeAstroFetch(new URL("/api/v2/vedic/qa", API_BASE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        ...parsed.input,
        language: "en",
      }),
      cache: "no-store",
    }, 18_000);
    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: readableError(data) || `Daily Muhurat request failed with status ${response.status}.` },
        { status: response.status },
      );
    }
    if (data === null) {
      return NextResponse.json(
        { error: "FreeAstro daily Muhurat returned an invalid response." },
        { status: 502 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: networkError(error, "FreeAstro daily Muhurat request failed.") },
      { status: 502 },
    );
  }
}

function parseDailyMuhuratInput(value: unknown): { input: DailyMuhuratInput } | { error: string } {
  if (!isRecord(value)) return { error: "Missing daily Muhurat request payload." };

  if (!isTopic(value.question)) return { error: "Choose a supported daily Muhurat topic." };
  if (!isDateInput(value.date)) return { error: "Date must use YYYY-MM-DD." };
  if (!isTimeInput(value.time)) return { error: "Time must use HH:MM in 24-hour time." };
  if (!isTrimmedString(value.city, 200)) return { error: "City is required." };
  if (!isCoordinate(value.lat, -90, 90)) return { error: "Latitude must be between -90 and 90." };
  if (!isCoordinate(value.lng, -180, 180)) return { error: "Longitude must be between -180 and 180." };

  const tzString = optionalTrimmedString(value.tz_str, "AUTO", 100);
  if (!tzString) return { error: "Timezone must be a non-empty string." };
  const ayanamsha = optionalTrimmedString(value.ayanamsha, "lahiri", 50);
  if (!ayanamsha) return { error: "Ayanamsha must be a non-empty string." };

  return {
    input: {
      question: value.question,
      date: value.date,
      time: value.time,
      city: value.city.trim(),
      lat: value.lat,
      lng: value.lng,
      tz_str: tzString,
      ayanamsha,
    },
  };
}

function isTopic(value: unknown): value is DailyMuhuratTopic {
  return typeof value === "string" && topics.some((topic) => topic === value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDateInput(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isTimeInput(value: unknown): value is string {
  return typeof value === "string" && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
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
    return "FreeAstro daily Muhurat request timed out.";
  }
  return fallback;
}
