import { reducer as weatherReducer } from '../Features/Weather/reducer';
import chartReducer from '../Features/Chart/reducer.js';

export default {
  weather: weatherReducer,
  chart: chartReducer
};
