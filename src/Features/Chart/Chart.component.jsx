import React from 'react';
import './Chart.styles.scss';
import { Line } from 'react-chartjs-2';



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
      let values = []
      for (let measurement of measurements){
        values.push(measurement["value"])
      }
      return values;
    }

    const chartDates = getDates(measurements);
    const chartValues = getValues(measurements);

    const dateFormat = (x) => {
      let d = new Date(x);
      return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }

    let readable_chart_dates = [];
    for (let date of chartDates){
      readable_chart_dates.push(dateFormat(date))
    }

    const data = {
        labels: readable_chart_dates,
        datasets: [{
          label: measurements[0].metric,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartValues
        }]
    }

  return (
    <>
    <Line
      data={data}
      width={66}
      height={20}
      options={{ maintainAspectRatio: false }}
    />
    {<path d="M 10 10 L 20 20 z"/>}
    </>
  )
}


export default Chart;