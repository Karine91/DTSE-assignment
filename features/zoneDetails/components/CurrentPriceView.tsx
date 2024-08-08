import CurrentPriceChart from "./CurrentPricesChart";

import { IGetZonePriceOutput } from "../types";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { getFormattedRange, dateFormat } from "@/components/ui/dateRangePicker";
interface IProps {
  data: IGetZonePriceOutput;
  date: DateRange | undefined;
}

const CurrentPriceView = ({ data, date }: IProps) => {
  return (
    <div className="m-10 flex flex-col justify-center">
      <h2>
        Electricity prices:{" "}
        {getFormattedRange(date) || format(new Date(), dateFormat)}
      </h2>
      <CurrentPriceChart data={data} />
    </div>
  );
};

export default CurrentPriceView;
