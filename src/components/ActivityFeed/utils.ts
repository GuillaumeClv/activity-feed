import { useMemo, useEffect, useRef } from "react";
import type { ActivityEvent, FilterState } from "../../types";

export const ITEMS_PER_PAGE = 15 as const;

export const useFilterChange = (
  filters: FilterState,
  onFilterChange: () => void
) => {
  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    const hasFilterChanged = (
      Object.keys(filters) as Array<keyof FilterState>
    ).some((key) => prevFiltersRef.current[key] !== filters[key]);

    if (hasFilterChanged) {
      onFilterChange();
      prevFiltersRef.current = filters;
    }
  }, [filters, onFilterChange]);
};

export const usePagination = (items: ActivityEvent[], currentPage: number) => {
  return useMemo(() => {
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return {
      totalPages,
      paginatedItems,
    };
  }, [items, currentPage]);
};

export const useFilteredAndSortedActivities = (
  activitiesData: ActivityEvent[],
  filters: FilterState
) =>
  useMemo(() => {
    const now = new Date();
    let startDate: Date | null = null;

    if (filters.datePreset !== "ALL") {
      switch (filters.datePreset) {
        case "LAST_HOUR":
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case "LAST_24H":
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "LAST_7D":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "LAST_30D":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }
    }

    const searchLower = filters.searchText?.toLowerCase() || "";

    const filtered = activitiesData.filter((activity) => {
      if (filters.status !== "ALL" && activity.status !== filters.status) {
        return false;
      }

      if (startDate) {
        const activityDate = new Date(activity.updatedAt || activity.createdAt);

        if (
          isNaN(activityDate.getTime()) ||
          activityDate < startDate ||
          activityDate > now
        ) {
          return false;
        }
      }

      if (
        filters.activityType &&
        filters.activityType.trim() &&
        activity.type !== filters.activityType
      ) {
        return false;
      }

      if (
        searchLower &&
        !activity.description.toLowerCase().includes(searchLower) &&
        !activity.subject.toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    });
  }, [filters, activitiesData]);
