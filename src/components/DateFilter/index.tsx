import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFilters } from "../../context";
import type { DatePreset } from "../../types";
import { DATE_PRESETS } from "./utils";
import { useClickOutside } from "../../hooks/useClickOutside";

export const DateFilterComponent = () => {
  const { filters, setDatePreset } = useFilters();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const handlePresetChange = (preset: DatePreset) => {
    setDatePreset(preset);
    setIsOpen(false);
  };

  const getDisplayLabel = () => {
    const preset = DATE_PRESETS.find((p) => p.value === filters.datePreset);
    return preset?.label;
  };

  return (
    <div className="date-filter">
      <label className="filter-label">Date</label>

      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          {getDisplayLabel()}
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                className={`dropdown-item ${
                  filters.datePreset === preset.value ? "active" : null
                }`}
                onClick={() => handlePresetChange(preset.value)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
