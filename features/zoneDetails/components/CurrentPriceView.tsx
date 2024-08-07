import CurrentPriceChart from "./CurrentPricesChart";

import { IGetZonePriceOutput } from "../types";

interface IProps {
  data: IGetZonePriceOutput;
  startDate?: string;
  endDate?: string;
}

const CurrentPriceView = ({ data, startDate, endDate }: IProps) => {
  return (
    <div className="m-10 flex justify-center">
      <h2>Electricity prices: </h2>
      <CurrentPriceChart data={data} />
    </div>
  );
};

export default CurrentPriceView;
