import { startOfDay, isBefore, endOfDay, isSameDay, isEqual } from "date-fns";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
export const dateFormat = "dd/MM/yyyy";

export const transformDateRangeValues = (dateRange?: DateRange) => {
  const startDate = dateRange?.from
    ? startOfDay(dateRange.from)
    : startOfDay(new Date());
  const endDate = dateRange?.to
    ? (isBefore(dateRange.to, new Date()) &&
        isSameDay(dateRange.to, new Date())) ||
      isEqual(dateRange.to, new Date())
      ? new Date()
      : endOfDay(dateRange.to)
    : new Date();

  return { start: startDate, end: endDate };
};

export const getFormattedDaysRange = (
  dateRange: DateRange | undefined,
  formatPattern: string = dateFormat
) => {
  const { start, end } = transformDateRangeValues(dateRange);

  return `${format(start, formatPattern)} - ${format(end, formatPattern)}`;
};
