import { createContext } from "react";
import type { FilterContextType } from "../types";

export const filterContext = createContext<FilterContextType | null>(null);
