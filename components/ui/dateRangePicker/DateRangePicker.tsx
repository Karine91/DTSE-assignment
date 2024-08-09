import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getFormattedDaysRange } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

interface IProps {
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;
  className?: string;
  rangeTextFormatFn?: (date: DateRange | undefined) => string;
}

export function DatePickerWithRange({
  className,
  dateRange,
  setDateRange,
  rangeTextFormatFn = getFormattedDaysRange,
  ...calendarProps
}: IProps & Omit<CalendarProps, "selected" | "onSelect" | "mode">) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {rangeTextFormatFn(dateRange) || <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
