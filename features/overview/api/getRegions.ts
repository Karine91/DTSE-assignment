"use server";

import { TDayPriceAverageData, TName } from "../types";

import { biddingZones } from "./biddingZonesData";

const getRegionName = (name: TName[] | TName) => {
  if (Array.isArray(name)) {
    return name[0].en;
  }
  return name.en;
};

export interface IRegionsData {
  price: number;
  unit: string;
  name: string;
  zoneCode: string;
}

function transformResponseData(data: TDayPriceAverageData, search?: string) {
  const date = new Date().toLocaleDateString();
  const dataIndex = data[0].xAxisValues.findIndex((item) => item === date);

  return data
    .filter((item) => item.unit === "EUR/MWh")
    .map(({ unit, name, data }) => {
      const desc = getRegionName(name);
      const matches = desc.match(/Day Ahead Auction \((.+)\)/);

      if (matches) {
        const code = matches[1];
        if (code in biddingZones) {
          return {
            price: data[dataIndex],
            unit,
            name: biddingZones[code as keyof typeof biddingZones],
            zoneCode: code,
          };
        }
      }
    })
    .filter((item): item is IRegionsData => {
      const _search = search?.toLowerCase();
      return !!item
        ? _search
          ? item.name.toLowerCase().startsWith(_search) ||
            item.zoneCode.toLowerCase() === _search
          : true
        : false;
    })
    .sort((a, b) => a.price - b.price);
}

export type TGetRegionsProps = { search: string | undefined };

export async function getRegions({ search }: TGetRegionsProps) {
  const date = new Date();
  const year = date.getFullYear();

  const month = date.getMonth() + 1;

  // it is not the public api url from the provided api link but gives needed information
  const res = await fetch(
    `https://energy-charts.info/charts/price_average/data/all/day_month_euro_mwh_${year}_${
      month < 10 ? "0" + month : month
    }.json`
  );

  if (!res.ok) {
    throw new Error("Price average data for regions: Failed to fetch data");
  }

  const data = (await res.json()) as TDayPriceAverageData;
  return transformResponseData(data, search);
}
