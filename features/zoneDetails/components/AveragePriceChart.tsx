import * as d3 from "d3";
import { format } from "date-fns";
import chunk from "lodash.chunk";
import { useRef, useEffect } from "react";

import { dateFormat } from "@/lib/date-utils";

import { IGetZonePriceOutput } from "../types";
import { getCombinedDataForCharts, type Data } from "../utils";

interface IProps {
  data: IGetZonePriceOutput;
}

const width = 928;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 60;
const marginLeft = 40;

const transformData = (data: IGetZonePriceOutput) => {
  const combinedData = getCombinedDataForCharts(data);
  return chunk(combinedData, 24).map((item) => {
    const averagePrice =
      item.reduce((acc, cur) => acc + cur.price, 0) / item.length;
    return {
      date: format(new Date(item[0].date), dateFormat),
      price: Math.round(averagePrice * 100) / 100,
    };
  });
};

const AveragePriceHistogramChart = ({ data }: IProps) => {
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);
  const dataSource = transformData(data);

  const x = d3
    .scaleBand()
    .domain(
      d3.groupSort(
        dataSource,
        ([d]) => d.price,
        (d) => d.date
      )
    )
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(dataSource, (d) => d.price) as number])
    .range([height - marginBottom, marginTop]);

  useEffect(() => {
    if (gx.current) {
      const gxElement = d3.select(gx.current);
      gxElement.call(d3.axisBottom(x).tickSizeOuter(0));
      if (dataSource.length > 8) {
        gxElement
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");
      }
    }
    if (gy.current) {
      d3.select(gy.current)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove());
    }
  }, [x, y]);

  return (
    <div className="m-10">
      <svg
        className="max-w-full"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g className="fill-sky-600">
          {dataSource.map((item, i) => {
            return (
              <rect
                key={i}
                x={x(item.date)}
                y={y(item.price)}
                height={y(0) - y(item.price)}
                width={x.bandwidth()}
              />
            );
          })}
        </g>
        <g ref={gx} transform={`translate(0, ${height - marginBottom})`}></g>
        <g ref={gy} transform={`translate(${marginLeft},0)`}>
          <text x={-marginLeft} y={10} fill="currentColor" textAnchor="start">
            ↑ Price ({data.unit})
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AveragePriceHistogramChart;
