import React, { useEffect } from 'react';
import './Chart.styles.scss';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChartGraphWithZoom from '../../components/ChartGraph-zoom/chartgraph-zoom.component';
import ControllerSelect from '../../components/Contoller-Select/Controller-Select.component';
import ControllerIcon from '../../components/Controller-Icon/Controller-Icon.component';
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
          <ControllerIcon />
          <ControllerSelect />
        </div>
        <Chart />
      </div>
      
    </Provider>
  )
};

const Chart = () => {
    const [result] = useSubscription({
      query: subscription,
    });
    
    const { fetching, data, error } = result;
    const dispatch = useDispatch();
    
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
