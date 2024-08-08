"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { getFormattedDaysRange } from "@/components/ui/dateRangePicker";
import { Label } from "@/components/ui/form/label";
import { Tabs } from "@/components/ui/tabs/Tabs";

import { useZonePrice } from "../api/getZonePrice";

import CurrentPriceView from "./CurrentPriceView";

const headersList = [
  { value: "current", children: "Current Prices" },
  { value: "average", children: "Low, high, average data" },
];

const dateFormat = "dd/mm/yyyy HH:mm";

export const BiddingZonePriceDetailsContainer = ({
  zoneCode,
}: {
  zoneCode: string;
}) => {
  const [date, setDate] = useState<DateRange | undefined>();

  const { data, isLoading } = useZonePrice({
    bzn: zoneCode,
    start: date?.from,
    end: date?.to,
  });

  if (!data && !isLoading) {
    notFound();
  }

  return (
    <div className="w-4/5 flex-grow">
      <div className="flex justify-end items-center mb-5 gap-2">
        <Label>Select date: </Label>
        <DatePickerWithRange
          disabled={{ after: new Date() }}
          dateRange={date}
          setDateRange={setDate}
        />
      </div>
      <h2 className="text-xl my-4 ">
        Electricity prices: {getFormattedDaysRange(date, dateFormat)}
      </h2>
      {data ? (
        <Tabs headersList={headersList}>
          <CurrentPriceView data={data} date={date} />
          <div>Average</div>
        </Tabs>
      ) : isLoading ? (
        "Loading..."
      ) : null}
    </div>
  );
};
