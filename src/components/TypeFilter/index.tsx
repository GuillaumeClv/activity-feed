import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useFilters } from "../../context";
import { useClickOutside } from "../../hooks/useClickOutside";
import { activityTypes } from "./utils";

export const TypeFilter = () => {
  const { filters, setActivityType } = useFilters();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const handleTypeChange = (type: string) => {
    setActivityType(type);
    setIsOpen(false);
  };

  return (
    <div className="type-filter">
      <label className="filter-label">Type</label>

      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          {filters.activityType || "All types"}
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <button
              className={`dropdown-item ${
                !filters.activityType ? "active" : ""
              }`}
              onClick={() => handleTypeChange("")}
            >
              All types
            </button>

            {activityTypes.map((type) => (
              <button
                key={type}
                className={`dropdown-item ${
                  filters.activityType === type ? "active" : ""
                }`}
                onClick={() => handleTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
