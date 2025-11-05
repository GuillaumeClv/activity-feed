export type StatusFilter = "ALL" | "COMPLETED" | "FAILED" | "IN_PROGRESS";

export type Status = Omit<StatusFilter, "ALL">;

export type ActivityEvent = {
  id: number;
  userId: number;
  user: {
    id: number;
    name: string;
  };
  projectId: number;
  websiteId: number;
  type: string;
  status: Status;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type DatePreset =
  | "ALL"
  | "LAST_HOUR"
  | "LAST_24H"
  | "LAST_7D"
  | "LAST_30D";

export type FilterState = {
  status: StatusFilter;
  datePreset: DatePreset;
  activityType: string;
  searchText: string;
};

export type FilterContextType = {
  filters: FilterState;
  setStatusFilter: (status: StatusFilter) => void;
  setDatePreset: (preset: DatePreset) => void;
  setActivityType: (type: string) => void;
  setSearchText: (text: string) => void;
  clearFilters: () => void;
  removeFilter: (filterKey: keyof FilterState) => void;
};
