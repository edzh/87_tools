import React, { useState, useEffect } from 'react';
import {
  fetchTimesheetsByDates,
  fetchTimestampsByTimesheet,
  fetchTimestampsByDateRange
} from './analyticsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { format, addWeeks } from 'date-fns';
import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3';

export default function Chart() {
  const [timestampData, setTimestampData] = useState();
  const dispatch = useDispatch();
  const timesheets = useSelector(state => state.analytics.timesheets);
  const timestamps = useSelector(state => state.analytics.timestamps);
  const inTimesheetsIds = timesheets.allIds.filter(
    id => timesheets.byId[id].io === 'in'
  );

  const [startDate, setStartDate] = useState(
    format(addWeeks(Date.now(), -1), 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState(format(Date.now(), 'yyyy-MM-dd'));

  useEffect(() => {
    dispatch(fetchTimesheetsByDates(startDate, endDate));
    dispatch(fetchTimestampsByDateRange(startDate, endDate));
    // timesheets.allIds.length &&
    //   dispatch(fetchTimestampsByTimesheet(inTimesheetsIds));
  }, [startDate, endDate]);

  useEffect(() => {
    timesheets.allIds && timestamps.allIds && drawChart(inTimesheetsIds);
  }, [timesheets.allIds, timestamps.allIds]);

  const filterTimestampsByTimesheet = timesheetId =>
    timestamps.allIds.filter(
      id => timestamps.byId[id].timesheet === timesheetId
    );

  const drawChart = data => {
    const svg = select('svg');
    svg.selectAll('*').remove();
    const w = +svg.attr('width');
    const h = +svg.attr('height');
    const padding = 30;

    const xScale = scaleLinear()
      .domain([0, inTimesheetsIds.length])
      .range([padding, w - padding]);

    const yScale = scaleLinear()
      .domain([0, max(data, d => filterTimestampsByTimesheet(d).length)])
      .range([h - padding, padding]);

    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("fill", "#4299e1")
    //   .attr("cx", (d, i) => xScale(i))
    //   .attr("cy", (d) => yScale(filterTimestampsByTimesheet(d).length))
    //   .attr("r", 3)
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', '#4299e1')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(filterTimestampsByTimesheet(d).length))
      .attr(
        'height',
        d => h - padding - yScale(filterTimestampsByTimesheet(d).length)
      )
      .attr('width', w / inTimesheetsIds.length - 3);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svg
      .append('g')
      .attr('transform', `translate(0, ${h - padding})`)
      .call(xAxis);
    svg
      .append('g')
      .attr('transform', `translate(${padding}, 0)`)
      .call(yAxis);
  };

  return (
    <div>
      <input
        className="border rounded p-2"
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <input
        className="border rounded p-2"
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <svg height="400" width="600"></svg>;
    </div>
  );
}
