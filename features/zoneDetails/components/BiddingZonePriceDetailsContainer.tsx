"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { getFormattedDaysRange } from "@/components/ui/dateRangePicker";
import { Label } from "@/components/ui/form/label";
import { Tabs } from "@/components/ui/tabs/Tabs";

import { useZonePrice } from "../api/getZonePrice";

import AveragePriceView from "./AveragePriceView";
import HourlyPriceView from "./HourlyPriceView";
import BackButton from "@/components/ui/BackButton";
import { getCombinedDataForCharts } from "../utils";

const TabView = {
  Hourly: "hourly",
  Average: "average",
};

const headersList = [
  { value: TabView.Hourly, children: "Hourly Prices" },
  { value: TabView.Average, children: "Day average prices" },
];

const dateFormat = "dd/MM/yyyy HH:mm";

export const BiddingZonePriceDetailsContainer = ({
  zoneCode,
}: {
  zoneCode: string;
}) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [tabView, setTabView] = useState(TabView.Hourly);

  const { data, isLoading } = useZonePrice({
    bzn: zoneCode,
    start: date?.from,
    end: date?.to,
  });

  if (!data && !isLoading) {
    notFound();
  }

  const chartData = data && getCombinedDataForCharts(data);

  return (
    <div className="w-4/5 flex-grow">
      <BackButton variant={"secondary"} backUrl="/" />
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
      {chartData ? (
        <Tabs
          value={tabView}
          onValueChange={(value) => setTabView(value)}
          headersList={headersList}
        >
          <HourlyPriceView data={chartData} dataUnit={data.unit} />
          <AveragePriceView data={chartData} dataUnit={data.unit} />
        </Tabs>
      ) : isLoading ? (
        "Loading..."
      ) : null}
    </div>
  );
};
