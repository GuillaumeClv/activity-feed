import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useFilters } from "../../context";

export const SearchInput = () => {
  const { filters, setSearchText } = useFilters();
  const [searchValue, setSearchValue] = useState(filters.searchText);

  useEffect(() => {
    setSearchValue(filters.searchText);
  }, [filters.searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, setSearchText]);

  return (
    <div className="search-input">
      <Search size={18} className="search-icon" />

      <input
        type="text"
        placeholder="Search by description or resource..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search-field"
      />
    </div>
  );
};
