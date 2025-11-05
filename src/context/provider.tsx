import { useState } from "react";
import type { ReactNode } from "react";
import type { FilterState, StatusFilter, DatePreset } from "../types";
import { initialFilters } from "./constant";
import { filterContext } from "./filterContext";

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Reducers
  const setStatusFilter = (status: StatusFilter) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const setActivityType = (activityType: string) => {
    setFilters((prev) => ({ ...prev, activityType }));
  };

  const setSearchText = (searchText: string) => {
    setFilters((prev) => ({ ...prev, searchText }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const removeFilter = (filterKey: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: initialFilters[filterKey],
    }));
  };

  const setDatePreset = (datePreset: DatePreset) => {
    setFilters((prev) => ({
      ...prev,
      datePreset,
    }));
  };

  return (
    <filterContext.Provider
      value={{
        filters,
        setStatusFilter,
        setDatePreset,
        setActivityType,
        setSearchText,
        clearFilters,
        removeFilter,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};
