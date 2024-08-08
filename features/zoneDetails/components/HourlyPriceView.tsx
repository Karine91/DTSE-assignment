import type { ChartProps } from "../types";

import HourlyPricesChart from "./HourlyPricesChart";

const HourlyPriceView = ({ data, dataUnit }: ChartProps) => {
  return (
    <div className="m-10 flex flex-col justify-center">
      <HourlyPricesChart data={data} dataUnit={dataUnit} />
    </div>
  );
};

export default HourlyPriceView;
