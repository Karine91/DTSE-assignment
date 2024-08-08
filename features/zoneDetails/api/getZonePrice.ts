import { useQuery, QueryClient } from "@tanstack/react-query";

import { client } from "@/lib/api-client";
import { transformDateRangeValues } from "@/lib/date-utils";
import { TValidationError } from "@/types";

import { IGetZonePriceOutput } from "../types";

type TGetZonePriceInput = {
  bzn: string;
  start?: Date;
  end?: Date;
};

export async function getZonePrice(input: TGetZonePriceInput) {
  const params: Partial<Record<keyof TGetZonePriceInput, string>> = {
    bzn: input.bzn,
  };

  const { start, end } = transformDateRangeValues({
    from: input.start,
    to: input.end,
  });
  params.start = start.toISOString();
  params.end = end.toISOString();

  // Had to use route handler due to CORS error
  const res = await client(`/${input.bzn}/api`, {
    getParams: params,
    fullPath: true,
  });

  if (res.success) {
    return res.data;
  } else {
    throw new Error(res.error);
  }
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
