import { useFilters } from "../../context";
import { STATUS_OPTIONS } from "./utils";

export const StatusFilterComponent = () => {
  const { filters, setStatusFilter } = useFilters();

  return (
    <div className="status-filter">
      <label className="filter-label">Status</label>

      <div className="status-chips">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`chip ${
              filters.status === option.value ? "active" : ""
            }`}
            onClick={() => setStatusFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
