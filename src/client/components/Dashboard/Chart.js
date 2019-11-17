import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { format } from 'date-fns';
import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3';

export default function Chart() {
  const [timestampData, setTimestampData] = useState();

  console.log(timestampData);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTimestamps = await fetch(
        `${apiUrl}/api/timestamp/week/2019-09-16`
      )
        .then(response => response.json())
        .then(json => json.data);

      const timestampsByTimesheet = await fetchedTimestamps.reduce(
        (timesheets, timestamp) => {
          const timesheetDate = timestamp.timesheet.date;
          const io = timestamp.timesheet.io;

          timesheets[timesheetDate] = timesheets[timesheetDate] || {};
          timesheets[timesheetDate][io] =
            timesheets[timesheetDate][io] + 1 || 1;
          timesheets[timesheetDate].date = format(
            timestamp.timesheet.date,
            'MM-DD'
          );

          return timesheets;
        },
        {}
      );

      console.log(timestampsByTimesheet);

      setTimestampData(
        Object.keys(timestampsByTimesheet).map(key => {
          return timestampsByTimesheet[key];
        })
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    timestampData && drawChart(timestampData);
  }, [timestampData]);

  const drawChart = data => {
    const svg = select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = () => {
      const xValue = d => d.date;
      const yValue = d => d.in;
      const margin = { top: 20, right: 40, bottom: 20, left: 30 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])
        .padding(0.2);

      const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([0, innerHeight]);

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      g.append('g').call(
        axisLeft(
          scaleLinear()
            .domain([0, max(data, yValue)])
            .range([innerHeight, 0])
        )
      );
      g.append('g')
        .call(axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`);

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(xValue(d)))
        .attr('y', d => innerHeight - yScale(yValue(d)))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(yValue(d)));
    };

    render();
  };

  return <svg height="150" width="300"></svg>;
}
