import { useFilters } from "../../context";

const presetLabels = {
  LAST_HOUR: "Last hour",
  LAST_24H: "Last 24h",
  LAST_7D: "Last 7 days",
  LAST_30D: "Last 30 days",
} as const satisfies Record<string, string>;

export const useActiveFilters = () => {
  const { filters } = useFilters();
  const activeFilters: { key: string; label: string; value: string }[] = [];

  if (filters.status !== "ALL") {
    activeFilters.push({
      key: "status",
      label: "Status",
      value: filters.status,
    });
  }

  if (filters.datePreset !== "ALL") {
    activeFilters.push({
      key: "datePreset",
      label: "Date",
      value: presetLabels[filters.datePreset] || filters.datePreset,
    });
  }

  if (filters.activityType) {
    activeFilters.push({
      key: "activityType",
      label: "Type",
      value: filters.activityType,
    });
  }

  if (filters.searchText) {
    activeFilters.push({
      key: "searchText",
      label: "Search",
      value: filters.searchText,
    });
  }

  return activeFilters;
};
