import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface DataType {
    date: string;
    Conversions: number;
    Impressions: number;
}

const LineChart = ({ Data, data_type }: { Data: number[]; data_type: string }) => {
  // Element References
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // D3 Code

    // Data
    const dataset = Data;
    console.log(dataset);

    // Accessors
    const parseDate = d3.timeParse("%Y%m%d");
    let xAccessor: (type: DataType) => Date;
    let yAccessor: (type: DataType) => number;
    // variable accessor depending on datatype
    switch (data_type) {
      case "campaign_conversions":
        xAccessor = (d: DataType) => parseDate(d.date) ?? new Date();
        yAccessor = (d: DataType) => d.Conversions;
        break;
      case "campaign_impressions":
        xAccessor = (d: DataType) => parseDate(d.date) ?? new Date();
        yAccessor = (d: DataType) => d.Impressions;
        break;
      default:
      // n/a
    }

    // Dimensions
    let dimensions: any = {
      width: 1000,
      height: 500,
      margins: 50,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // Selections
    const svg = d3
      .select(svgRef.current)
      .classed("line-chart-svg", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    const container = svg
      .append("g")
      .classed("container", true)
      .attr(
        "transform",
        `translate(${dimensions.margins}, ${dimensions.margins})`
      );

    const tooltip = d3.select(tooltipRef.current);
    const tooltipDot = container
      .append("circle")
      .classed("tool-tip-dot", true)
      .attr("r", 5)
      .attr("fill", "#fc8781")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .style("pointer-events", "none");

    // Scales
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, yAccessor)])
      .range([dimensions.containerHeight, 0])
      .nice();
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, xAccessor))
      .range([0, dimensions.containerWidth]);

    // Line Generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    // Draw Line
    container
      .append("path")
      .datum(dataset)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#30475e")
      .attr("stroke-width", 2);

    // Axis
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);

    container.append("g").classed("yAxis", true).call(yAxis);

    const xAxis = d3.axisBottom(xScale);

    container
      .append("g")
      .classed("xAxis", true)
      .style("transform", `translateY(${dimensions.containerHeight}px)`)
      .call(xAxis);

    // Tooltip
    container
      .append("rect")
      .classed("mouse-tracker", true)
      .attr("width", dimensions.containerWidth)
      .attr("height", dimensions.containerHeight)
      .style("opacity", 0)
      .on("touchmouse mousemove", function (event) {
        const mousePos = d3.pointer(event, this);

        // x coordinate stored in mousePos index 0
        const date = xScale.invert(mousePos[0]);

        // Custom Bisector - left, center, right
        const dateBisector = d3.bisector(xAccessor).center;

        const bisectionIndex = dateBisector(dataset, date);
        //console.log(bisectionIndex);
        // math.max prevents negative index reference error
        const hoveredIndexData = dataset[Math.max(0, bisectionIndex)];

        // Update Image
        tooltipDot
          .style("opacity", 1)
          .attr("cx", xScale(xAccessor(hoveredIndexData)))
          .attr("cy", yScale(yAccessor(hoveredIndexData)))
          .raise();

        tooltip
          .style("display", "block")
          .style("top", `${yScale(yAccessor(hoveredIndexData)) - 50}px`)
          .style("left", `${xScale(xAccessor(hoveredIndexData))}px`);

        tooltip.select(".data").text(`${yAccessor(hoveredIndexData)}`);

        const dateFormatter = d3.timeFormat("%B %-d, %Y");

        tooltip
          .select(".date")
          .text(`${dateFormatter(xAccessor(hoveredIndexData))}`);
      })
      .on("mouseleave", function () {
        tooltipDot.style("opacity", 0);
        tooltip.style("display", "none");
      });
  }, [Data, data_type]); // redraw chart if data changes

  return (
    <div className="line-chart">
      <svg ref={svgRef} />
      <div ref={tooltipRef} className="lc-tooltip">
        <div className="data"></div>
        <div className="date"></div>
      </div>
    </div>
  );
};

export default LineChart;
