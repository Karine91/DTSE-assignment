import { startOfDay, isBefore, endOfDay, isSameDay } from "date-fns";
import type { DateRange } from "react-day-picker";

export const dateFormat = "dd/MM/yyyy";

export const transformDateRangeValues = (dateRange?: DateRange) => {
  const startDate = dateRange?.from || startOfDay(new Date());
  const endDate = dateRange?.to
    ? isBefore(dateRange.to, new Date()) && isSameDay(dateRange.to, new Date())
      ? new Date()
      : endOfDay(dateRange.to)
    : new Date();

  return { start: startDate, end: endDate };
};
