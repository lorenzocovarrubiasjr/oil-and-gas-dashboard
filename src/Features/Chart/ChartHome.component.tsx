import React, { useEffect } from 'react';
import './Chart.styles.scss';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from './Chart.component';
import Hello from '../../components/Hello/Hello.component';
import { actions } from './reducer';

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
  });

  const time = Date.now();

  const input = [{
    metricName: "oilTemp",
    after: time - 1800000,
    before: time
    },
    {
    metricName: "injValveOpen",
    after: time - 1800000,
    before: time
    },
    {
    metricName: "waterTemp",
    after: time - 1800000,
    before: time
    },
    {
    metricName: "casingPressure",
    after: time - 1800000,
    before: time
    },
    {
    metricName: "flareTemp",
    after: time - 1800000,
    before: time
    },
    {
    metricName: "tubingPressure",
    after: time - 1800000,
    before: time
    }];
  
  const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(
      input:  $input
    ){
      metric
      measurements {
      metric
      at
      value
      unit
      }
    }
  }
  `;

export default () => {
    return (
      <Provider value={client}>
        <ChartHome />
      </Provider>
    );
  }

const ChartHome = () => {

  const [result] = useQuery({
    query: query,
    variables: {
      input,
  }});

  const { fetching, data, error } = result;
  const dispatch = useDispatch();

  useEffect(() => {
        
    if (error) {
      dispatch(actions.chartApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const initialMeasurements  = data;
    dispatch(actions.initialDataReceived(initialMeasurements));
}, [dispatch, data, error]);
    
    if (fetching) return <CircularProgress />;

    return (
        <div className="chart-graph">
            <Hello />
            <Chart />
        </div>
        
      )

};
