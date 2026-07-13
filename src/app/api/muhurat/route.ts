import { NextRequest, NextResponse } from "next/server";
import { freeAstroFetch } from "../freeastro";

const API_BASE = process.env.FREEASTRO_API_BASE ?? "https://api.freeastroapi.com";
const MAX_RANGE_DAYS = 31;

const purposes = [
  "general_work",
  "vehicle_purchase",
  "property_purchase",
  "griha_pravesh",
  "namkaran",
  "mundan",
] as const;

type MuhuratPurpose = (typeof purposes)[number];

type MuhuratPayload = {
  purpose?: MuhuratPurpose;
  start_date?: string;
  end_date?: string;
  city?: string;
  lat?: number;
  lng?: number;
  tz_str?: string;
  ayanamsha?: string;
  limit?: number;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.FREEASTRO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Set FREEASTRO_API_KEY in .env.local before searching Muhurat windows." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as MuhuratPayload | null;
  const validationError = validateMuhurat(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }
  if (!body?.purpose || !body.start_date || !body.end_date || !body.city) {
    return NextResponse.json({ error: "Missing Muhurat search details." }, { status: 400 });
  }

  const payload = {
    purpose: body.purpose,
    start_date: body.start_date,
    end_date: body.end_date,
    city: body.city.trim(),
    lat: body.lat,
    lng: body.lng,
    tz_str: body.tz_str?.trim() || "AUTO",
    ayanamsha: body.ayanamsha ?? "lahiri",
    language: "en",
    limit: body.limit ?? 10,
  };

  try {
    const response = await freeAstroFetch(new URL("/api/v2/vedic/muhurat/search", API_BASE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }, 45_000);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: readableError(data) || `Muhurat search failed with status ${response.status}.` },
        { status: response.status },
      );
    }

    return NextResponse.json({
      ...data,
      input: {
        city: payload.city,
        lat: payload.lat,
        lng: payload.lng,
        timezone: payload.tz_str,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "FreeAstro Muhurat search failed." },
      { status: 502 },
    );
  }
}

function validateMuhurat(body: MuhuratPayload | null) {
  if (!body) return "Missing Muhurat search payload.";
  if (!body.purpose || !purposes.includes(body.purpose)) return "Choose a supported Muhurat purpose.";
  if (!isDateInput(body.start_date)) return "Start date must use YYYY-MM-DD.";
  if (!isDateInput(body.end_date)) return "End date must use YYYY-MM-DD.";

  const start = Date.parse(`${body.start_date}T00:00:00Z`);
  const end = Date.parse(`${body.end_date}T00:00:00Z`);
  const dayCount = Math.floor((end - start) / 86_400_000) + 1;
  if (dayCount < 1) return "End date must be on or after the start date.";
  if (dayCount > MAX_RANGE_DAYS) return `Muhurat searches are limited to ${MAX_RANGE_DAYS} days.`;

  if (!body.city?.trim()) return "Select a city for the Muhurat search.";
  if (typeof body.lat !== "number" || Number.isNaN(body.lat) || body.lat < -90 || body.lat > 90) {
    return "Latitude must be between -90 and 90.";
  }
  if (typeof body.lng !== "number" || Number.isNaN(body.lng) || body.lng < -180 || body.lng > 180) {
    return "Longitude must be between -180 and 180.";
  }

  const limit = body.limit ?? 10;
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) return "Result limit must be between 1 and 50.";
  return "";
}

function isDateInput(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function readableError(value: unknown) {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  return String(record.error ?? record.message ?? record.detail ?? "");
}
