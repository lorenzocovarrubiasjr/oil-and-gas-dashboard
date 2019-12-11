import React from 'react';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const getMeasurements = (state: IState) => {
    const { measurements }  = state.chart;
    return measurements
  }

  
 
const ChartGraphWithZoom = () => {

	const measurements = useSelector(getMeasurements);

	let measurements_per_graph = 25;

	const dateFormat = (x: any) => {
	  let d = new Date(x);
      return d.toLocaleTimeString();
	}

    function createDataPoints(measurements:any) {
		const data: any = [];
		const oilTemp: any[] = [];
		const injValveOpen: any[] = [];
		const tubingPressure: any[] = [];
		const flareTemp: any[] = [];
		const casingPressure: any[] = [];
		const waterTemp: any[] = [];
		for (let [key, value] of Object.entries(measurements)) {
			switch (key) {
				case "oilTemp":
					oilTemp.push(value);
					break;
				case "injValveOpen":
					injValveOpen.push(value);
					break;
				case "tubingPressure":
					tubingPressure.push(value);
					break;
				case "flareTemp":
					flareTemp.push(value);
					break;
				case "casingPressure":
					casingPressure.push(value);
					break;
				case "waterTemp":
					waterTemp.push(value);
					break;
			}
		}
		const metrics: any = [] 
		metrics.push(oilTemp, injValveOpen, tubingPressure, flareTemp, casingPressure, waterTemp)
		for (let metric of metrics) {
			if (metric.length > 1) {
				metric.shift() 
			} 
		}
		for (let metric of metrics){
			let metricName: any = (metric[0].length > 1) ? metric[0][1].newMeasurement.metric : metric[0][0].metric;
			let metricUnit: any = (metric[0].length > 1 ? metric[0][1].newMeasurement.unit : metric[0].unit)
			let metric_data_point: any[] = [];
			for (let newMeasurement of metric[0]){
				if (newMeasurement.at !== ""){
					metric_data_point.push({
						
						x: newMeasurement.newMeasurement.at, 
						y: newMeasurement.newMeasurement.value})
				}
			};
			data.push({
				type: "line",
				name: metricName,
				showInLegend: true,
				xValueFormatString: "hh:mm:ss TT",
				yValueFormatString: metricUnit,
				dataPoints: metric_data_point,
			})
		}
		return data;
	}

	let data_points = createDataPoints(measurements)

    const options = {
		theme: "light2", // "light1", "dark1", "dark2"
		animationEnabled: true,
		zoomEnabled: true,
		
		axisY: {
			includeZero: false
		},
		axisX: {
			title: "Dates",
			//valueFormatString: "hh:mm:ss TT"
		},
		data: data_points
		// [{
		// 	name: "oilTemp",
		// 	showInLegend: true,
		// 	type: "line",
		// 	xValueFormatString: "hh:mm:ss TT",
		// 	yValueFormatString: "F",
		// 	dataPoints:
			
			// [
			// 	{ x: "2:40:44 PM", y: 243.6 },
			// 	{ x: "2:40:47 PM", y: 243.6 },
			// 	{ x: "2:40:50 PM", y: 233.53},
			// 	{ x: "2:40:55 PM", y: 232.89},
			// 	{ x: "2:40:58 PM", y: 228.81},
			// 	{ x: "2:41:00 PM", y: 236.66},
			// 	{ x: "2:41:04 PM", y: 244.18}​​,]
		//}]
	}

		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
};

 
export default ChartGraphWithZoom;                              