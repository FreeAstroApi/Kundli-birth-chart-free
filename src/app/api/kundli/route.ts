import { NextRequest, NextResponse } from "next/server";
import { freeAstroFetch } from "../freeastro";

const API_BASE = process.env.FREEASTRO_API_BASE ?? "https://api.freeastroapi.com";

type BirthPayload = {
  label?: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
  gender?: string;
  city: string;
  lat: number;
  lng: number;
  tz_str: string;
  ayanamsha?: string;
  house_system?: string;
  node_type?: string;
};

type OptionsPayload = {
  dasha?: boolean;
  yogas?: boolean;
  strength?: boolean;
  vargas?: boolean;
  panchang?: boolean;
};

type VisualPayload = {
  chart_style?: "north_indian" | "south_indian" | "east_indian";
};

type EndpointResult = {
  key: string;
  data?: unknown;
  error?: string;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.FREEASTRO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Set FREEASTRO_API_KEY in .env.local before calculating a Kundli." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const birth = body?.birth as BirthPayload | undefined;
  const options = (body?.options ?? {}) as OptionsPayload;
  const visual = (body?.visual ?? {}) as VisualPayload;

  const validationError = validateBirth(birth);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }
  if (!birth) {
    return NextResponse.json({ error: "Missing birth payload." }, { status: 400 });
  }

  const baseBirth = {
    year: birth.year,
    month: birth.month,
    day: birth.day,
    hour: birth.hour,
    minute: birth.minute,
    city: birth.city,
    lat: birth.lat,
    lng: birth.lng,
    tz_str: birth.tz_str || "AUTO",
    ayanamsha: birth.ayanamsha ?? "lahiri",
    house_system: birth.house_system ?? "whole_sign",
    node_type: birth.node_type ?? "mean",
  };

  const calls: (() => Promise<EndpointResult>)[] = [
    () => callFreeAstro("chart", "/api/v2/vedic/chart", baseBirth, apiKey),
    () =>
      callFreeAstroImage(
        "visualChart",
        "/api/v2/vedic/visual/chart",
        visualChartPayload(baseBirth, visual),
        apiKey,
      ),
  ];

  if (options.dasha) {
    calls.push(
      () => callFreeAstro(
        "dasha",
        "/api/v2/vedic/dasha",
        {
          ...baseBirth,
          levels: 3,
          reference_date: new Date().toISOString().slice(0, 10),
        },
        apiKey,
      ),
    );
  }

  if (options.yogas) {
    calls.push(() => callFreeAstro("yogas", "/api/v2/vedic/yogas", baseBirth, apiKey));
  }

  if (options.strength) {
    calls.push(() => callFreeAstro("strength", "/api/v2/vedic/strength", baseBirth, apiKey));
  }

  if (options.vargas) {
    calls.push(
      () => callFreeAstro(
        "vargas",
        "/api/v2/vedic/vargas",
        {
          ...baseBirth,
          divisions: [1, 2, 3, 7, 9, 10, 12, 30, 60],
        },
        apiKey,
      ),
    );
  }

  if (options.panchang) {
    calls.push(() => callFreeAstro("panchang", "/api/v2/vedic/panchang", baseBirth, apiKey));
  }

  const settled = await runFreeAstroCalls(calls);
  const response: Record<string, unknown> = {
    input: {
      label: birth.label?.trim() || "Client",
      city: birth.city,
      timezone: birth.tz_str,
      lat: birth.lat,
      lng: birth.lng,
    },
  };
  const errors: Record<string, string> = {};

  for (const item of settled) {
    if (item.error) {
      errors[item.key] = item.error;
    } else {
      response[item.key] = item.data;
    }
  }

  if (Object.keys(errors).length > 0) {
    response.errors = errors;
  }

  if (!response.chart) {
    return NextResponse.json(
      { error: errors.chart ?? "FreeAstro chart endpoint did not return a chart." },
      { status: 502 },
    );
  }

  return NextResponse.json(response);
}

function visualChartPayload(baseBirth: Record<string, unknown>, visual: VisualPayload) {
  return {
    ...baseBirth,
    divisions: [1, 9],
    chart_style: visual.chart_style ?? "north_indian",
    format: "svg",
    size: 700,
    theme_type: "light",
    body_types: ["ascendant", "classical_grahas", "nodes", "outer_planets"],
    ascendant_text_color: "#0B7285",
    display_settings: {
      ascendant: true,
      rahu: true,
      ketu: true,
      uranus: true,
      neptune: true,
      pluto: true,
      sign_labels: true,
    },
    custom_theme: {
      background: "#fffdf7",
      panel_background: "#fffaf0",
      panel_border: "#d7b860",
      grid: "#c08a2c",
      outer_line: "#8d1f1f",
      sign_text: "#681414",
      house_text: "#7a5b1d",
      body_text: "#1c1712",
      ascendant_text: "#0B7285",
      title_text: "#681414",
      subtitle_text: "#675b4a",
      badge_background: "#fff3cf",
    },
    chart_config: {
      body_font_size: 19,
      body_font_weight: "600",
      sign_font_size: 24,
      grid_line_width: 1.1,
      outer_line_width: 1.6,
      panel_padding: 18,
      columns: 2,
    },
  };
}

async function runFreeAstroCalls(calls: (() => Promise<EndpointResult>)[]) {
  const results: EndpointResult[] = [];
  for (const call of calls) {
    results.push(await call());
  }
  return results;
}

async function callFreeAstro(
  key: string,
  path: string,
  payload: Record<string, unknown>,
  apiKey: string,
): Promise<EndpointResult> {
  try {
    const response = await freeAstroFetch(new URL(path, API_BASE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }, 18_000);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        key,
        error: readableError(data) ?? `${key} endpoint failed with status ${response.status}.`,
      };
    }

    return { key, data };
  } catch (error) {
    return {
      key,
      error: error instanceof Error ? error.message : `${key} endpoint failed.`,
    };
  }
}

async function callFreeAstroImage(
  key: string,
  path: string,
  payload: Record<string, unknown>,
  apiKey: string,
): Promise<EndpointResult> {
  try {
    const response = await freeAstroFetch(new URL(path, API_BASE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }, 18_000);
    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.text();

    if (!response.ok) {
      const parsed = parseJson(body);
      return {
        key,
        error: readableError(parsed) || `${key} endpoint failed with status ${response.status}.`,
      };
    }

    return {
      key,
      data: {
        format: "svg",
        contentType,
        chart_style: payload.chart_style,
        divisions: payload.divisions,
        svg: body,
      },
    };
  } catch (error) {
    return {
      key,
      error: error instanceof Error ? error.message : `${key} endpoint failed.`,
    };
  }
}

function parseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function validateBirth(birth?: BirthPayload) {
  if (!birth) return "Missing birth payload.";

  const numericFields: (keyof BirthPayload)[] = ["year", "month", "day", "hour", "minute", "lat", "lng"];
  for (const field of numericFields) {
    if (typeof birth[field] !== "number" || Number.isNaN(birth[field])) {
      return `Invalid ${field}.`;
    }
  }

  if (!birth.city?.trim()) return "City is required.";
  if (birth.month < 1 || birth.month > 12) return "Month must be between 1 and 12.";
  if (birth.day < 1 || birth.day > 31) return "Day must be between 1 and 31.";
  if (birth.hour < 0 || birth.hour > 23) return "Hour must be between 0 and 23.";
  if (birth.minute < 0 || birth.minute > 59) return "Minute must be between 0 and 59.";
  if (birth.lat < -90 || birth.lat > 90) return "Latitude must be between -90 and 90.";
  if (birth.lng < -180 || birth.lng > 180) return "Longitude must be between -180 and 180.";

  return "";
}

function readableError(value: unknown) {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  return String(record.error ?? record.message ?? record.detail ?? "");
}
