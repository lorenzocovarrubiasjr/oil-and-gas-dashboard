import React, { useEffect } from 'react';
import './Chart.styles.scss';
import { Line } from 'react-chartjs-2';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery, defaultExchanges, subscriptionExchange } from 'urql';
import CircularProgress from '@material-ui/core/CircularProgress';
import { actions } from './reducer';

//Set's up client ==> GraphQL
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  //exchanges: [
  //  ...defaultExchanges,
  //  subscriptionExchange({
  //    forwardSubscription,
  //  })
  //]
});
//Query for my client (GraphQL)
const query = `
  query($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
      metric
      at
      value
      unit
    }
  }
`;
//Gets Measurements from State 
const getMeasurements = (state: IState) => {
  const { measurements }  = state.chart;
  return measurements
}

//const getDates = (state: IState)=> {
//  const { dates } = state.chart;
//  return dates
//}
//Sets up Component with Provider/client
export default () => {
  return (
    <Provider value={client}>
      <Chart />
    </Provider>
  )
};
//Creating Chart component
const Chart = () => {
    //set input for GraphQL query
    const variables = {
      metricName: "oilTemp"
      //after: load_epoch - 2000,
      //before: load_epoch
    }
    //setting measurements from state 
    const measurements = useSelector(getMeasurements);
    console.log("MMMMM: ", measurements)
    console.log("Measurements before getDates: ", measurements)
    function getDates(measurements: any){
      let start_time = measurements[0].at 
      let end_time = measurements[measurements.length-1].at
      let total_time = end_time - start_time
      let step_size = Math.floor(total_time / 6)
      console.log("step size: ", step_size)
      let ticks_in_range = [start_time, (start_time += step_size),(start_time += step_size),(start_time += step_size), end_time]
      console.log("Ticks for range: ", ticks_in_range)
      return ticks_in_range
    };
    //extracting measurement values for Chart format
    function getValues(measurements: any){
      let values = []
      for (let measurement of measurements){
        values.push(measurement["value"])
      }
      return values;
    }
    // setting up props for Line Chart 
    const chartDates =  getDates(measurements);
    const chartValues = getValues(measurements);
    console.log("ChartValues: ", chartValues)

    const dateFormat = (x: any) => {
      let d = new Date(x);
      return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }

    let readable_chart_dates = [];
    for (let date of chartDates){
      readable_chart_dates.push(dateFormat(date))
    }
    //Data for Line Chart props
    const data_for_chart_design = {
        labels: readable_chart_dates,
        datasets: [{
          label: measurements[measurements.length-1].metric,
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
    //useQuery gets result from GraphQL
    const [result] = useQuery({
      query,
      variables,
    });
    //setting variables from  useQuery results
    const { fetching, data, error } = result;
    console.log("This is RESULT: ", result)
    //setting dispatch in const; dispatches an action, this is the only way to trigger a change state
    const dispatch = useDispatch();
    //Similar to componentDidMount && componentDidUpdate
    //runs after every render
    useEffect(() => {
        //if result error returns true
        if (error) {
          dispatch(actions.chartApiErrorReceived({ error: error.message }));
          return;
        }
        //if result returns no data
        if (!data) return;
        //else set new data in const and pass to dispatch action
        const { getLastKnownMeasurement } = data;
        console.log("data right before: ", data)
        console.log("This is updatedMeasurements before dispatch: ", getLastKnownMeasurement)
        dispatch(actions.chartDataReceived(getLastKnownMeasurement));
    }, [dispatch, data, error]);
    //if result fetching is true 
    if (fetching) return <CircularProgress />;
    
    // Return Line Chart component with props
    return (
        <Line
          data={data_for_chart_design}
          width={66}
          height={20}
          options={{ maintainAspectRatio: false }}
        />
    )
};