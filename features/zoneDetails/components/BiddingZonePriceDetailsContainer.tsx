"use client";

import { notFound } from "next/navigation";

import { Tabs } from "@/components/ui/tabs/Tabs";

import { useZonePrice } from "../api/getZonePrice";

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
  console.log(data);
  return (
    <div>
      <Tabs headersList={headersList}>
        <div>Current</div>
        <div>Average</div>
      </Tabs>
    </div>
  );
};
