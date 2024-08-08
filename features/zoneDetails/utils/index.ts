import { IGetZonePriceOutput } from "../types";

export const getCombinedDataForCharts = (data: IGetZonePriceOutput) => {
  return data.unix_seconds.map((item, ind) => {
    return {
      date: item * 1000,
      price: data.price[ind],
    };
  });
};
