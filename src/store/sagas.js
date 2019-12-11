import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import chartSaga from '../Features/Chart/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(chartSaga);
}
