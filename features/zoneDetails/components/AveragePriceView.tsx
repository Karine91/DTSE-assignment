import { ChartProps } from "../types";

import AveragePriceChart from "./AveragePriceChart";

const AveragePriceView = (props: ChartProps) => {
  return (
    <div className="m-10 flex flex-col justify-center">
      <AveragePriceChart {...props} />
    </div>
  );
};

export default AveragePriceView;
