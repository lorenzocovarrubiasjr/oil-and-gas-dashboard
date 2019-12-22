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

const getToggler = (state: IState) => {
	const { toggler } = state.chart;
	return toggler;
}  

const NightDay = (state: IState) => {
    const { NightDayMode }  = state.chart;
    return NightDayMode
  }
 
const ChartGraphWithZoom = () => {
	const metric_toggle = useSelector(getToggler);
	const measurements = useSelector(getMeasurements);
	const daynightmode = useSelector(NightDay);

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
		if (metric_toggle.oilTemp === true) {
			metrics.push(oilTemp);
		}
		if (metric_toggle.injValveOpen === true) {
			metrics.push(injValveOpen);
		}
		if (metric_toggle.tubingPressure === true) {
			metrics.push(tubingPressure);
		}
		if (metric_toggle.flareTemp === true) {
			metrics.push(flareTemp);
		}
		if (metric_toggle.casingPressure === true) {
			metrics.push(casingPressure);
		}
		if (metric_toggle.waterTemp === true) {
			metrics.push(waterTemp);
		}

		for (let metric of metrics) {
			if (metric.length > 1) {
				metric.shift() 
			} 
		}
		for (let metric of metrics){
			let metricName: any = metric[0][0].metric;
			let metricUnit: any = metric[0].unit;
			let metricIndex: number = 0;
			if (metricUnit === "PSI"){
				metricIndex = 1
			}
			if (metricUnit === "%"){
				metricIndex = 2
			}
			let metric_data_point: any[] = [];
			for (let newMeasurement of metric[0]){
				if (newMeasurement.at !== ""){
					metric_data_point.push({
						x: new Date(newMeasurement.at), 
						y: newMeasurement.value})
				}
			};
			data.push({
				type: "line",
				name: metricName,
				showInLegend: true,
				highlightEnabled: true,
				xValueFormatString: "DDDD MMM YYYY hh:mm:ss TT",
				axisYindex: 1,
				dataPoints: metric_data_point,
			})
		}
		return data;
	}

	let data_points = createDataPoints(measurements)

    const options = {
		theme: (daynightmode ? "dark1": "light1"), // "light1", "dark1", "dark2"
		animationEnabled: true,
		zoomEnabled: true,
		height: 650,
		
		axisY: [{
			title: "F",
			titleFontSize: 16,
			includeZero: false,
			suffix: "F",
			labelFontSize: 14,

		},
		{
			title: "PSI",
			titleFontSize: 16,
			includeZero: false,
			lineColor: "#369EAD",
			tickColor: "#369EAD",
			labelFontColor: "#369EAD",
			titleFontColor: "#369EAD",
			suffix: "PSI",
			labelFontSize: 14,

		},
		{
			title: "%",
			titleFontSize: 16,
			includeZero: false,
			lineColor: "#7F6084",
			tickColor: "#7F6084",
			labelFontColor: "#7F6084",
			titleFontColor: "#7F6084",
			suffix: "%",
			labelFontSize: 14,

		}],
		axisX: {
			title: "Time",
			valueFormatString: "hh:mm:ss TT",
			labelFontSize: 14,
			crosshair: {
				enabled: true
			}
		},
		toolTip: {
			shared: true,
			borderThickness: 2,
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "top",
			fontSize: 18,
		},
		data: data_points
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