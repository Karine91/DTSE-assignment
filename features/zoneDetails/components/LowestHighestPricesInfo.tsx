import { getFormattedPrice } from "@/lib/format-price";

type Props = {
  max: number;
  min: number;
  dataUnit: string;
  title: string;
};

const LowestHighestPricesInfo = ({ max, min, dataUnit, title }: Props) => {
  const maxPrice = getFormattedPrice(max);
  const minPrice = getFormattedPrice(min);
  return (
    <div>
      <h3 className="font-medium my-3 text-base md:text-lg">{title}</h3>
      {maxPrice === minPrice ? (
        <span>
          {maxPrice} {dataUnit}
        </span>
      ) : (
        <ul>
          <li>
            Highest: {maxPrice} {dataUnit}
          </li>
          <li>
            Lowest: {minPrice} {dataUnit}
          </li>
        </ul>
      )}
    </div>
  );
};

export default LowestHighestPricesInfo;
