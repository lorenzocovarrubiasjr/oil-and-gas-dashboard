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
      return d;
    }

    function createDataPoints(measurements:any) {
		const data: any = [];
		const oilTemp = [];
		const injValveOpen = [];
		const tubingPressure = [];
		const flareTemp = [];
		const casingPressure = [];
		const waterTemp = [];
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
		const metrics = [] 
		metrics.push(oilTemp, injValveOpen, tubingPressure, flareTemp, casingPressure, waterTemp)
		for (let metric of metrics){
			console.log("This is metric: ", metric)
			let metricName = (metric[1] ? metric[1].metric : metric[0].metric);
			let metricUnit = (metric[1] ? metric[1].unit : metric[0].unit)
			data.push({
				type: "line",
				name: metricName,
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: metricUnit,
				dataPoints: 0,
			})
		}
		return data;
	}
	
	console.log("createDataPoints: ", createDataPoints(measurements))

    const options = {
		theme: "light2", // "light1", "dark1", "dark2"
		animationEnabled: true,
		zoomEnabled: true,
		title: {
			text: "Try Zooming and Panning"
		},
		axisY: {
			includeZero: false
		},
		axisX: {
			title: "Dates",
			valueFormatString: "hh:mm:ss TT"
		},
		data: [{
			type: "line",
			fillOpacity: 0,
			dataPoints: createDataPoints(measurements)
		}]
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