import React from 'react';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line } from 'recharts';

//const getMeasurements = (state: IState) => {
//    const { measurements }  = state.chart;
//    return measurements
//  }

//const ChartGraph = () => {
//    const measurements = useSelector(getMeasurements);

//    return(
//    <LineChart 
//        width={400} 
//        height={400} 
//        data={measurements}>
//        <Line type='monotone' dataKey='value' stroke='#8884d8' />
//    </LineChart>
//    );
//};

//export default ChartGraph;