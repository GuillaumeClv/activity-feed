import type { ActivityEvent } from "../../types";
import activitiesData from "../../data.json";

export const activityTypes = [
  ...new Set(
    (activitiesData as ActivityEvent[]).map((activity) => activity.type)
  ),
].sort();
