import type { StatusFilter } from "../../types";

export const STATUS_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "COMPLETED", label: "Success" },
  { value: "FAILED", label: "Failed" },
  { value: "IN_PROGRESS", label: "In Progress" },
] as const satisfies { value: StatusFilter; label: string }[];
