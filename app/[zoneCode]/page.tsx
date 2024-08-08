import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

import { biddingZones } from "@/features/overview";
import {
  BiddingZonePriceDetailsContainer,
  prefetchZonePrice,
} from "@/features/zoneDetails";

type Props = {
  params: { zoneCode: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const zoneCode = params.zoneCode as keyof typeof biddingZones;

  const title = biddingZones[zoneCode];
  return {
    title: `Details page for bidding zone: ${title}`,
  };
}

export default async function ZoneDetailsPage({
  params,
}: {
  params: { zoneCode: string };
}) {
  const queryClient = await prefetchZonePrice({
    bzn: params.zoneCode,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BiddingZonePriceDetailsContainer zoneCode={params.zoneCode} />
    </HydrationBoundary>
  );
}
