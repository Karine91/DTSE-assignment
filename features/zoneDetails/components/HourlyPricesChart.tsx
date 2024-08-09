import * as d3 from "d3";
import { useRef, useEffect } from "react";

import { ChartProps, ChartData } from "../types";

const width = 840;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 60;
const marginLeft = 40;

const showCirclesThreshold = 40;
const textXAxisFormatThreshold = 30;

const HourlyPricesChart = ({ data, dataUnit }: ChartProps) => {
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d: ChartData) => d.date) as [number, number])
    .nice()
    .range([marginLeft, width - marginRight]);

  const min = d3.min(data, (d) => d.price) as number;
  const max = d3.max(data, (d) => d.price) as number;

  const y = d3
    .scaleLinear()
    .domain([min, max])
    .range([height - marginBottom, marginTop]);

  useEffect(() => {
    let gySelection: d3.Selection<SVGGElement, ChartData, any, any>;
    let gxSelection: d3.Selection<SVGGElement, ChartData, any, any>;

    if (gx.current) {
      gxSelection = d3.select(gx.current);
      gxSelection.call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

      if (data.length > textXAxisFormatThreshold) {
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
            .text(`↑ Price (${dataUnit})`)
        );
    }

    return () => {
      if (gxSelection) gxSelection.selectAll("*").remove();
      if (gySelection) gySelection.selectAll("*").remove();
    };
  }, [x, y, dataUnit]);

  const areaBuilder = d3
    .area<ChartData>()
    .x((d) => x(d.date))
    .y0(y(min))
    .y1((d) => y(d.price));

  const lineBuilder = d3
    .line<ChartData>()
    .x((d) => x(d.date))
    .y((d) => y(d.price));

  const allCircles =
    data.length > showCirclesThreshold
      ? null
      : data.map((item, ind) => {
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
      <svg
        className="max-w-full"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          d={areaBuilder(data) as string}
          className="area text-sky-200 fill-current"
        />

        <path
          d={lineBuilder(data) as string}
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
