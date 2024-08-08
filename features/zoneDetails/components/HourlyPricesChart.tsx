import * as d3 from "d3";
import { useRef, useEffect } from "react";

import { IGetZonePriceOutput } from "../types";
import { getCombinedDataForCharts, type Data } from "../utils";

interface IProps {
  data: IGetZonePriceOutput;
}

const width = 840;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 60;
const marginLeft = 40;

const showCirclesThreshold = 40;

const HourlyPricesChart = ({ data }: IProps) => {
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const combinedData = getCombinedDataForCharts(data);

  const x = d3
    .scaleTime()
    .domain(d3.extent(combinedData, (d: Data) => d.date) as [number, number])
    .nice()
    .range([marginLeft, width - marginRight]);

  const min = d3.min(combinedData, (d) => d.price) as number;
  const max = d3.max(combinedData, (d) => d.price) as number;

  const y = d3
    .scaleLinear()
    .domain([min, max])
    .range([height - marginBottom, marginTop]);

  useEffect(() => {
    let gySelection: d3.Selection<SVGGElement, Data, any, any>;
    let gxSelection: d3.Selection<SVGGElement, Data, any, any>;

    if (gx.current) {
      gxSelection = d3.select(gx.current);
      gxSelection.call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

      if (combinedData.length > 30) {
        gxSelection
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");
      }
    }

    if (gy.current) {
      gySelection = d3.select(gy.current);
      gySelection
        .call(d3.axisLeft(y).ticks(height / 40))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(`Daily price (${data.unit})`)
        );
    }

    return () => {
      if (gxSelection) gxSelection.selectAll("*").remove();
      if (gySelection) gySelection.selectAll("*").remove();
    };
  }, [x, y, data.unit]);

  const areaBuilder = d3
    .area<Data>()
    .x((d) => x(d.date))
    .y0(y(min))
    .y1((d) => y(d.price));

  const lineBuilder = d3
    .line<Data>()
    .x((d) => x(d.date))
    .y((d) => y(d.price));

  const allCircles =
    combinedData.length > showCirclesThreshold
      ? null
      : combinedData.map((item, ind) => {
          return (
            <circle
              key={ind}
              cx={x(item.date)}
              cy={y(item.price)}
              r={4}
              className="fill-sky-950"
            />
          );
        });

  return (
    <div className="m-10">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={areaBuilder(combinedData) as string}
          className="area text-sky-200 fill-current"
        />

        <path
          d={lineBuilder(combinedData) as string}
          className="line stroke-sky-700 fill-none stroke-width-4"
        />
        {allCircles}

        <g ref={gx} transform={`translate(0, ${height - marginBottom})`} />

        <g ref={gy} transform={`translate(${marginLeft}, 0)`} />
      </svg>
    </div>
  );
};

export default HourlyPricesChart;
