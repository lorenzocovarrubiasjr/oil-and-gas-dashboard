import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import './Chart.styles.scss';



const Chart = () => {
    const measurements = [
    {
      "metric": "oilTemp",
      "at": 1575364886383,
      "value": 154.18,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364887687,
      "value": 152.7,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364888989,
      "value": 147.34,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364890290,
      "value": 140.39,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364891594,
      "value": 146.09,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364892894,
      "value": 145.63,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364894195,
      "value": 151.7,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364895497,
      "value": 156.31,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364896804,
      "value": 148.17,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364898105,
      "value": 141.76,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364899407,
      "value": 144.73,
      "unit": "F"
    },
    {
      "metric": "oilTemp",
      "at": 1575364900707,
      "value": 144.99,
      "unit": "F"
    }
    ];

    function getDates(measurements){
      let start_time = measurements[0].at 
      let end_time = measurements[measurements.length-1].at
      let total_time = end_time - start_time

      let step_size = total_time / 6 
      let ticks_in_range = []
      let tick_time = start_time
      while (tick_time <= end_time) {
        ticks_in_range.push(tick_time)
        tick_time += step_size
      }
      return ticks_in_range
    };

    function getValues(measurements){
      let lowest_value = 0;
      let highest_value = 100;
      let value_difference = highest_value - lowest_value;
      let step_size = value_difference / 10;
      let ticks_in_range = [];
      let counting_tick = lowest_value;
      while (counting_tick < highest_value){
        ticks_in_range.push(counting_tick)
        counting_tick += step_size;
      }
      return ticks_in_range
    }

    const chartDates = getDates(measurements);
    const chartValues = getValues(measurements);

    const dateFormat = (x) => {
      let d = new Date(x);
      return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }

  return (
    <VictoryChart domainPadding={15}>
        <VictoryAxis
          tickValues={chartDates}
          tickFormat={dateFormat}
          />
        <VictoryAxis
          dependentAxis
          tickValues={chartValues}
          tickFormat={chartValues} 
          />
       <VictoryLine data={measurements} x="at" y="value"/>
    </VictoryChart>
  )
}


export default Chart;