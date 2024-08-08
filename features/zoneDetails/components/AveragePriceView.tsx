import { IGetZonePriceOutput } from "../types";

import AveragePriceChart from "./AveragePriceChart";

interface IProps {
  data: IGetZonePriceOutput;
}

const AveragePriceView = ({ data }: IProps) => {
  return (
    <div>
      <AveragePriceChart data={data} />
    </div>
  );
};

export default AveragePriceView;
