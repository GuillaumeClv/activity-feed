import type { Status } from "../../types";

const STATUS_CLASS_MAP = {
  COMPLETED: "status-success",
  FAILED: "status-failed",
  IN_PROGRESS: "status-progress",
} as const;

export const getStatusClass = (status: Status) => {
  return STATUS_CLASS_MAP[status as keyof typeof STATUS_CLASS_MAP] || "";
};

const STATUS_LABEL_MAP = {
  COMPLETED: "Success",
  FAILED: "Failed",
  IN_PROGRESS: "In Progress",
} as const;

export const getStatusLabel = (status: Status) => {
  return STATUS_LABEL_MAP[status as keyof typeof STATUS_LABEL_MAP] || status;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
