"use client";

import { NoData } from "@/components/ui/NoData";
import { useState } from "react";

import { Tabs } from "@/components/ui/tabs/Tabs";

import { useZonePrice } from "../api/getZonePrice";

import CurrentPriceView from "./CurrentPriceView";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import type { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/form/label";

const headersList = [
  { value: "current", children: "Current Prices" },
  { value: "average", children: "Low, high, average data" },
];

export const BiddingZonePriceDetailsContainer = ({
  zoneCode,
}: {
  zoneCode: string;
}) => {
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date() });

  const { data, isLoading } = useZonePrice({
    bzn: zoneCode,
    start: date?.from,
    end: date?.to,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="w-4/5 flex-grow">
      <div className="flex justify-end items-center mb-5 gap-2">
        <Label>Select date: </Label>
        <DatePickerWithRange dateRange={date} setDateRange={setDate} />
      </div>
      {data ? (
        <Tabs headersList={headersList}>
          <CurrentPriceView data={data} date={date} />
          <div>Average</div>
        </Tabs>
      ) : (
        <NoData message="No data available for selected period or zone. Please select another date." />
      )}
    </div>
  );
};
