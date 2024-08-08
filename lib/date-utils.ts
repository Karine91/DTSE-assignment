import { startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";

export const transformDateRangeValues = (dateRange?: DateRange) => {
  const startDate = dateRange?.from || startOfDay(new Date());
  const endDate = dateRange?.to || new Date();
  return { start: startDate, end: endDate };
};
