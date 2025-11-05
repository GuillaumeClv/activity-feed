import { useMemo, useEffect, useRef } from "react";
import type { ActivityEvent, FilterState } from "../../types";

export const ITEMS_PER_PAGE = 15 as const;

export const useFilterChange = (
  filters: FilterState,
  onFilterChange: () => void
) => {
  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    const hasFilterChanged =
      prevFiltersRef.current.status !== filters.status ||
      prevFiltersRef.current.datePreset !== filters.datePreset ||
      prevFiltersRef.current.activityType !== filters.activityType ||
      prevFiltersRef.current.searchText !== filters.searchText;

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

export const useFilteredActivities = (
  activitiesData: ActivityEvent[],
  filters: FilterState
) =>
  useMemo(() => {
    const filterByStatus = (activities: ActivityEvent[]) =>
      filters.status === "ALL"
        ? activities
        : activities.filter((activity) => activity.status === filters.status);

    const filterByDatePreset = (activities: ActivityEvent[]) => {
      if (filters.datePreset === "ALL") {
        return activities;
      }

      const now = new Date();
      let startDate: Date | null = null;

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

      if (!startDate) {
        return activities;
      }

      return activities.filter((activity) => {
        const activityDate = new Date(activity.updatedAt || activity.createdAt);
        return activityDate >= startDate && activityDate <= now;
      });
    };

    const filterByActivityType = (activities: ActivityEvent[]) =>
      filters.activityType
        ? activities.filter(
            (activity) => activity.type === filters.activityType
          )
        : activities;

    const filterBySearchText = (activities: ActivityEvent[]) => {
      if (!filters.searchText) {
        return activities;
      }

      const searchLower = filters.searchText.toLowerCase();
      return activities.filter(
        (activity) =>
          activity.description.toLowerCase().includes(searchLower) ||
          activity.subject.toLowerCase().includes(searchLower)
      );
    };

    const sortByDate = (activities: ActivityEvent[]) =>
      [...activities].sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt).getTime();
        return dateB - dateA;
      });

    return sortByDate(
      filterBySearchText(
        filterByActivityType(filterByDatePreset(filterByStatus(activitiesData)))
      )
    );
  }, [filters, activitiesData]);
