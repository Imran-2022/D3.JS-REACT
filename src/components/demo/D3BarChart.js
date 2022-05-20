import React,{ useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
const D3BarChart = () => {

    const [data]=useState([200,250,60,150,100,175]);
    const svgRef=useRef();
    useEffect(()=>{

        // setting up svg container
        const w=400;
        const h=300;
        const svg=d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top','75');

        //setting the scaling
        const xScale=d3.scaleBand()
            .domain(data.map((val,i)=>{
                return i
            }))
            .range([0,w])
            .padding(0.5);
        const yScale=d3.scaleLinear()
            .domain([0,h])
            .range([h,0]);

        // setting the axes
        const xAxis=d3.axisBottom(xScale)
            .ticks(data.length)
        const yAxis=d3.axisLeft(yScale)
            .ticks(5);
        svg.append('g')
            .call(xAxis)
            .attr('transform',`translate(0,${h})`)
        svg.append('g')
            .call(yAxis);

        // setting the svg data
        svg.selectAll('.bar')
            .data(data)
            .join('rect')
                .attr('x',(v,i)=>xScale(i))
                .attr('y',yScale)
                .attr('width',xScale.bandwidth())
                .attr('height',val=>h-yScale(val))
        },[data])

    return (
        <div className='app'>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default D3BarChart;