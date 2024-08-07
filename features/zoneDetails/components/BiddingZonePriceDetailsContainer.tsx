"use client";

import { notFound } from "next/navigation";

import { Tabs } from "@/components/ui/tabs/Tabs";

import { useZonePrice } from "../api/getZonePrice";

import CurrentPriceView from "./CurrentPriceView";

const headersList = [
  { value: "current", children: "Current Prices" },
  { value: "average", children: "Low, high, average data" },
];

export const BiddingZonePriceDetailsContainer = ({
  zoneCode,
}: {
  zoneCode: string;
}) => {
  const { data, isLoading } = useZonePrice({ bzn: zoneCode });
  if (!data && !isLoading) {
    notFound();
  }

  if (isLoading) {
    return "Loading...";
  }

  if (!data) return;
  return (
    <div className="flex-grow">
      <Tabs headersList={headersList}>
        <CurrentPriceView data={data} />
        <div>Average</div>
      </Tabs>
    </div>
  );
};
