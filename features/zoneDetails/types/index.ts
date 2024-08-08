export interface IGetZonePriceOutput {
  license_info: string;
  unix_seconds: number[];
  price: number[];
  unit: string;
  deprecated: boolean;
}

export interface ChartData {
  date: number;
  price: number;
}

export type ChartProps = {
  data: ChartData[];
  dataUnit: string;
};
