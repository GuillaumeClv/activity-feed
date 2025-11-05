import type { DatePreset } from "../../types";

export const DATE_PRESETS = [
  { value: "ALL", label: "All time" },
  { value: "LAST_HOUR", label: "Last hour" },
  { value: "LAST_24H", label: "Last 24h" },
  { value: "LAST_7D", label: "Last 7 days" },
  { value: "LAST_30D", label: "Last 30 days" },
] as const satisfies { value: DatePreset; label: string }[];
