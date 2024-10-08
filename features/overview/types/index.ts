export type TName = { [key in "en" | "de" | "fr" | "it"]: string };

export interface IDayPriceAverageDataItem {
  name: TName[] | TName;
  currency: string;
  unit: string;
  color: string;
  visible: string;
  date: number;
  xAxisValues: string[];
  data: number[];
}

export type TDayPriceAverageData = IDayPriceAverageDataItem[];
export type TGetRegionsProps = { search?: string; page: number };
export interface IRegionsData {
  price: number;
  unit: string;
  name: string;
  zoneCode: string;
  index: number;
}
