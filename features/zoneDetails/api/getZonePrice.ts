import { useQuery, QueryClient } from "@tanstack/react-query";

import { client } from "@/lib/api-client";
import { TValidationError } from "@/types";

interface IGetZonePriceOutput {
  license_info: string;
  unix_seconds: number[];
  price: number[];
  unit: string;
  deprecated: boolean;
}

type TGetZonePriceInput = {
  bzn: string;
  start?: string;
  end?: string;
};

export function getZonePrice(input: TGetZonePriceInput) {
  return client("price", { getParams: input });
}

export function useZonePrice(input: TGetZonePriceInput) {
  return useQuery<IGetZonePriceOutput, TValidationError>({
    queryKey: ["zonePrice", input],
    queryFn: () => getZonePrice(input),
  });
}

export async function prefetchZonePrice(input: TGetZonePriceInput) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["zonePrice", input],
    queryFn: () => getZonePrice(input),
  });

  return queryClient;
}
