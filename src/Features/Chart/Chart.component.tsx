import React, { useEffect } from 'react';
import './Chart.styles.scss';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
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
    const dispatch = useDispatch();
    
    const [result] = useSubscription({
      query: subscription,
    });
    
    const { data, error } = result;
    
    useEffect(() => {
        
        if (error) {
          dispatch(actions.chartApiErrorReceived({ error: error.message }));
          return;
        }
        if (!data) return;
        const getLastKnownMeasurement  = data;
        dispatch(actions.chartDataReceived(getLastKnownMeasurement));
    }, [dispatch, data, error]);
    
    return (
      <div className="chart-graph">
          <ChartGraphWithZoom />
      </div>
      
    )
};
