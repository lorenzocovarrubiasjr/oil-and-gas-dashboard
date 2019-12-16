import React, { useEffect } from 'react';
import './Chart.styles.scss';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChartGraphWithZoom from '../../components/ChartGraph-zoom/chartgraph-zoom.component';
import SubHeader from '../../components/SubHeader/SubHeader.component';
import { actions } from './reducer';

const subscriptionClient = new SubscriptionClient(
  'ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
     forwardSubscription: operation => 
     subscriptionClient.request(operation)
   })
  ]
});

const query = `
query($input: MeasurementQuery) {
  getMultipleMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

const subscription = `
    subscription newMeasurement {
      newMeasurement{
        metric 
        at
        value
        unit 
      }
    }
`;

const getMeasurements = (state: IState) => {
  const { measurements }  = state.chart;
  return measurements
}

export default () => {
  return (
    <Provider value={client}>
      <div className="full-chart">
        <div className="chart-header">
          <SubHeader />
        </div>
        <Chart />
      </div>
      
    </Provider>
  )
};

const Chart = () => {
    // const time: number = Date.now();

    // function query_generate(metric: string, time: number){
    //   return `{
    //     metricName: ${metric},
    //     after: ${(time - 1800000)},
    //     before: ${time}
    //   }`
    // }

    // const metrics = ["oilTemp", "injValveOpen", "tubingPressure", "flareTemp", "casingPressure", "waterTemp"];

    // const first_queries: string[] = [];

    // for (let metric of metrics) {
    //   let metric_query = query_generate(metric, time);
    //   first_queries.push(metric_query);
    // }

    // console.log("These are first queries: ", first_queries)

    const dispatch = useDispatch();

    // for (let query of first_queries) {
    //   const [inital_result] = useQuery({
    //     query: query
    //   });

    //   const { fetching, data, error } = inital_result;

    //   useEffect(() => {
    //     if (error) {
    //       dispatch(actions.chartApiErrorReceived({ error: error.message }));
    //       return;
    //     };
    //     if (!data) return;
    //     const initial_measurements = data;
    //     dispatch(actions.chartDataReceived(initial_measurements));
    //   }, [dispatch, data, error]);
    //   if (fetching) return <CircularProgress />;
    // }

    const [result] = useSubscription({
      query: subscription,
    });
    
    const { fetching, data, error } = result;
    
    
    useEffect(() => {
        if (error) {
          dispatch(actions.chartApiErrorReceived({ error: error.message }));
          return;
        }
        if (!data) return;
        const getLastKnownMeasurement  = data;
        dispatch(actions.chartDataReceived(getLastKnownMeasurement));
    }, [dispatch, data, error]);
    //if (fetching) return <CircularProgress />;
    
    return (
      <div className="chart-graph">
          <ChartGraphWithZoom />
      </div>
      
    )
};
