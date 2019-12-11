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

//Set up subscription connection
const subscriptionClient = new SubscriptionClient(
  'ws://react.eogresources.com/graphql', {});

//Set's up client ==> GraphQL
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
//Query for my client (GraphQL)
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
//Creating Chart component
const Chart = () => {
    //useQuery gets result from GraphQL
    const [result] = useSubscription({
      query: subscription,
    });
    //setting variables from  useQuery results
    const { fetching, data, error } = result;
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
        const getLastKnownMeasurement  = data;
        dispatch(actions.chartDataReceived(getLastKnownMeasurement));
    }, [dispatch, data, error]);
    //if result fetching is true 
    //if (fetching) return <CircularProgress />;
    
    // Return Line Chart component with props
    return (
      <div className="chart-graph">
          <ChartGraphWithZoom />
      </div>
      
    )
};
