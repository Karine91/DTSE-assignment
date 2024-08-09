"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { getFormattedDaysRange } from "@/lib/date-utils";
import { Label } from "@/components/ui/form/label";
import { Tabs } from "@/components/ui/tabs/Tabs";

import { useZonePrice } from "../api/getZonePrice";

import AveragePriceChart from "./AveragePriceChart";
import HourlyPricesChart from "./HourlyPricesChart";
import BackButton from "@/components/ui/BackButton";
import { getCombinedDataForCharts } from "../utils";
import Loader from "@/components/ui/Loader";

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
    <div className="flex-grow w-full">
      <BackButton className="mb-5" variant={"secondary"} backUrl="/" />
      <div className="flex flex-col md:flex-row md:justify-end md:items-center max-w-full mb-5 gap-2">
        <Label>Select date: </Label>
        <DatePickerWithRange
          disabled={{ after: new Date() }}
          dateRange={date}
          setDateRange={setDate}
        />
      </div>
      <h2 className="text-md md:text-xl my-4 ">
        Electricity prices: {getFormattedDaysRange(date, dateFormat)}
      </h2>
      {chartData ? (
        <Tabs
          value={tabView}
          onValueChange={(value) => setTabView(value)}
          headersList={headersList}
          tabsContentWrapperClass="lg:m-10 m-2 empty:m-0 flex flex-col justify-center"
        >
          <HourlyPricesChart data={chartData} dataUnit={data.unit} />
          <AveragePriceChart data={chartData} dataUnit={data.unit} />
        </Tabs>
      ) : isLoading ? (
        <Loader className="h-96" size="large" thickness="bold" />
      ) : null}
    </div>
  );
};
