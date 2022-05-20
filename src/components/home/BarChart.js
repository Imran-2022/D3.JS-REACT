import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
const BarChart = () => {
    const svgHeight = 200;
    const svgWidth = 400;
    const paddingBottom = 38;
    const initialData = [35, 5, 15, 60, 20, 40, 10, 75, 60, 32];
    const randomData = [...Array(10)].map(element => (Math.random() * 125)); //
    const [dataSet, setData] = useState(initialData);
    const svgRef = useRef();
    useEffect(() => {
        const maxValue = Math.max(...initialData);
        // setting up svg container
        const w = 400;
        const h = svgHeight - maxValue + paddingBottom;
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '75');

        //setting the scaling
        const xScale = d3.scaleBand()
            .domain(dataSet.map((val, i) => {
                return i
            }))
            .range([0, w])
            .padding(0.5);
        const yScale = d3.scaleLinear()
            .domain([0, h])
            .range([h, 0]);

        // setting the axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(dataSet.length)
        const yAxis = d3.axisLeft(yScale)
            .ticks(5);
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0,${h})`)
        svg.append('g')
            .call(yAxis);

        // setting the svg data
        svg.selectAll('.bar')
            .data(dataSet)
            .join('rect')
            .attr('class', 'bar')
            .attr('transform', 'scale(1, -1)')//flip the bar upside down to fix wron animation start
            .attr('x', (value, index) => xScale(index))
            .attr('y', -svgHeight + paddingBottom)
            .attr('width', xScale.bandwidth()) // bandwidth equals to the width of one band
            .transition()//transition will animate attribute called after it
            .attr('height', value => svgHeight - yScale(value) - paddingBottom);
    }, [dataSet, initialData, randomData])
    return (
        <div className='app'>
            <Link to="/">Back to Home</Link>
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
        </div>
    );
};

export default BarChart;