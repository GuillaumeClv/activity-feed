import { useContext } from "react";
import { filterContext } from "./filterContext";

export const useFilters = () => {
  const context = useContext(filterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
