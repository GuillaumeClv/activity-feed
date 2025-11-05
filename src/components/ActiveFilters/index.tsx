import { X } from "lucide-react";
import { useFilters } from "../../context";
import { useActiveFilters } from "./utils";
import type { FilterState } from "../../types";

export const ActiveFilters = () => {
  const { removeFilter, clearFilters } = useFilters();
  const activeFilters = useActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="active-filters">
      {activeFilters.map((filter) => (
        <div key={filter.key} className="filter-badge">
          <span className="filter-badge-label">
            {filter.label}: {filter.value}
          </span>

          <button
            className="filter-badge-remove"
            onClick={() => removeFilter(filter.key as keyof FilterState)}
            aria-label={`Remove ${filter.label} filter`}
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <button className="clear-all-button" onClick={clearFilters}>
        Clear all
      </button>
    </div>
  );
};
