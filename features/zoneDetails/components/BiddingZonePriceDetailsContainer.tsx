"use client";

import { notFound } from "next/navigation";

import { useZonePrice } from "../api/getZonePrice";

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
  return <div>BiddingZonePriceDetailsContainer</div>;
};
