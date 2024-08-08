import type { DateRange } from "react-day-picker";

import { IGetZonePriceOutput } from "../types";

import CurrentPriceChart from "./CurrentPricesChart";
interface IProps {
  data: IGetZonePriceOutput;
  date: DateRange | undefined;
}

const CurrentPriceView = ({ data, date }: IProps) => {
  return (
    <div className="m-10 flex flex-col justify-center">
      <CurrentPriceChart data={data} />
    </div>
  );
};

export default CurrentPriceView;
