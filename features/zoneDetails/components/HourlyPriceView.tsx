import { IGetZonePriceOutput } from "../types";

import HourlyPricesChart from "./HourlyPricesChart";
interface IProps {
  data: IGetZonePriceOutput;
}

const HourlyPriceView = ({ data }: IProps) => {
  return (
    <div className="m-10 flex flex-col justify-center">
      <HourlyPricesChart data={data} />
    </div>
  );
};

export default HourlyPriceView;
