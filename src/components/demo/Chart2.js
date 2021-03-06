import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
const D3BarChart = () => {

  const svgHeight = 200;
  const svgWidth = 400;
  const paddingLeft = 10;
  const paddingRight = 30;
  const paddingBottom = 20;
  const initialData = [35, 5, 15, 60, 20, 40, 10, 75, 60, 32];
  const randomData = [...Array(10)].map(element =>(Math.random() * 125)); //
  const [dataSet, setData] = useState(initialData);
  const svgRef = useRef();


  useEffect(() => {
    const maxValue = Math.max(...initialData);
    const highestYValue = svgHeight - maxValue + paddingBottom;
    const svg = d3.select(svgRef.current);
    // Scale band takes value specified in   
    // map arbitrary value to a range of linear values
    //Need to be explicit about what to map ex domain([0,1,2,3])
    // divide the values into equal bands
    const xScale = d3.scaleBand()
      .domain(dataSet.map((element, index) => index))
      .range([paddingLeft, svgWidth - paddingRight])
      .padding(.5); // Scalband() takes a padding to separate bands

    /**
      * adding ColorScale
     */
    const colorScale = d3.scaleLinear()
      .domain([30, (highestYValue / 2), highestYValue])
      .range(["#C5EDAC", "#F7A278", "orange"])
      .clamp(true); // forces values defined in the domain to remain thecolors


    const yScale = d3.scaleLinear()
      .domain([0, highestYValue])
      .range([svgHeight - paddingBottom, 0]);


    const xAxis = d3.axisBottom(xScale).ticks(dataSet.length);
    svg.select(".x-axis")
      .style('transform', ` translateY(${svgHeight - paddingBottom}px)`)
      .call(xAxis);

    const yAxis = d3.axisRight(yScale);
    svg.select(".y-axis")
      .call(yAxis)
      .attr('transform', `translate(0,300)`)
      
    svg.append('g')
      .call(yAxis);
    // Draw Bar
    svg.selectAll(".bar")
      .data(dataSet)
      .join('rect')
      .attr('class', 'bar')

      .attr('transform', 'scale(1, -1)')//flip the bar upside down to fix wron animation start
      .attr('x', (value, index) => xScale(index))
      .attr('y', -svgHeight + paddingBottom)
      .attr('width', xScale.bandwidth()) // bandwidth equals to the width of one band
      .transition()//transition will animate attribute called after it
      .attr('fill', colorScale)
      .attr('height', value => svgHeight - yScale(value) - paddingBottom);

  }, [dataSet, initialData, randomData]);

  return (
    <>
      <div className="button-container">
        <button onClick={() => setData(randomData)}>Random </button>
        <span>&nbsp;</span>
        <button onClick={() => setData(initialData.map(value => value))}>Reset </button>
      </div>
      <br />
      <svg width={svgWidth} height={svgHeight} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
};

export default D3BarChart;
