import { createSlice, PayloadAction } from 'redux-starter-kit';
import { any } from 'prop-types';

const initialState = {
        //get DATA FROM GRAPH QL 
        measurements: {
          oilTemp: [{
            metric: "",
            at: "",
            value: "",
            unit: ""
          }],
          injValveOpen: [{
            metric: "test",
            at: "",
            value: "test",
            unit: ""
          }],
          tubingPressure: [{
            metric: "test",
            at: "",
            value: "test",
            unit: ""
          }],
          flareTemp: [{
            metric: "test",
            at: "",
            value: "test",
            unit: ""
          }],
          casingPressure: [{
            metric: "test",
            at: "",
            value: "test",
            unit: ""
          }],
          waterTemp: [{
            metric: "test",
            at: "",
            value: "test",
            unit: ""
          }]
        },
        toggler: {
          oilTemp: true,
          injValveOpen: true, 
          tubingPressure: true,
          flareTemp: true,
          casingPressure: true, 
          waterTemp: true
        },
        toggle: false,
        NightDayMode: false,
        latestOilTempM: {metric: "", value: "", unit: "", at:""},
        latestinjValveOpenM: {metric: "", value: "", unit: "", at:""},
        latesttubingPressureM: {metric: "", value: "", unit: "", at:""},
        latestflareTempM: {metric: "", value: "", unit: "", at:""},
        latestcasingPressureM: {metric: "", value: "", unit: "", at:""},
        latestwaterTempM: {metric: "", value: "", unit: "", at:""}
};

export type ApiErrorAction = {
    error: string;
  };

export type dataForMeasurements = {
    initialMeasurements: {
      metric: string, 
      measurements: string,
    }[];
    getMultipleMeasurements: {
      metric: string, 
      measurements: {
        metric: string, 
        at: string, 
        value: string, 
        unit: string,
      }[],
    }[];
    newMeasurement: {
      metric: string, 
      at: string, 
      value: string, 
      unit: string,
    };
    metric: string; 
    at: string; 
    value: string; 
    unit: string;
    injValveOpen: object;
    oilTemp: object;
    tubingPressure: object;
    flareTemp: object;
    casingPressure:object;
    waterTemp: object
  };

  export type metricSelect = {
    metric: string;
    toggler: any;
  }

  const slice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
      initialDataReceived: (state, action: PayloadAction<dataForMeasurements>) => {
        const initialMeasurements = action.payload.getMultipleMeasurements;
        for (let metric of initialMeasurements) {
          if (metric.metric === "oilTemp"){
            state.measurements.oilTemp = [...metric.measurements]
          }
          if (metric.metric === "injValveOpen"){
            state.measurements.injValveOpen = [...metric.measurements]
          }
          if (metric.metric === "tubingPressure"){
            state.measurements.tubingPressure = [...metric.measurements]
          }
          if (metric.metric === "flareTemp"){
            state.measurements.flareTemp = [...metric.measurements]
          }
          if (metric.metric === "casingPressure"){
            state.measurements.casingPressure = [...metric.measurements]
          }
          if (metric.metric === "waterTemp"){
            state.measurements.waterTemp = [...metric.measurements]
          }

        }
      },
      chartDataReceived: (state, action: PayloadAction<dataForMeasurements>) => {
        const lastKnownMeasurement = action.payload.newMeasurement;
        if (lastKnownMeasurement.metric === "oilTemp"){
          state.measurements.oilTemp = [...state.measurements.oilTemp, lastKnownMeasurement];
          state.latestOilTempM = lastKnownMeasurement;
          if (state.measurements.oilTemp.length > 1384000) {
            state.measurements.oilTemp.shift();
          }
        }
        if (lastKnownMeasurement.metric === "injValveOpen"){
          state.measurements.injValveOpen = [...state.measurements.injValveOpen, lastKnownMeasurement];
          state.latestinjValveOpenM = lastKnownMeasurement;
          if (state.measurements.injValveOpen.length > 1384000) {
            state.measurements.injValveOpen.shift();
          }
        }
        if (lastKnownMeasurement.metric === "tubingPressure"){
          state.measurements.tubingPressure = [...state.measurements.tubingPressure, lastKnownMeasurement];
          state.latesttubingPressureM = lastKnownMeasurement;
          if (state.measurements.tubingPressure.length > 1384000) {
            state.measurements.tubingPressure.shift();
          }
        }
        if (lastKnownMeasurement.metric === "flareTemp"){
          state.measurements.flareTemp = [...state.measurements.flareTemp, lastKnownMeasurement];
          state.latestflareTempM = lastKnownMeasurement;
          if (state.measurements.flareTemp.length > 1384000) {
            state.measurements.flareTemp.shift();
          }
        }
        if (lastKnownMeasurement.metric === "casingPressure"){
          state.measurements.casingPressure = [...state.measurements.casingPressure, lastKnownMeasurement];
          state.latestcasingPressureM = lastKnownMeasurement;
          if (state.measurements.casingPressure.length > 1384000) {
            state.measurements.casingPressure.shift();
          }
        }
        if (lastKnownMeasurement.metric === "waterTemp"){
          state.measurements.waterTemp = [...state.measurements.waterTemp, lastKnownMeasurement];
          state.latestwaterTempM = lastKnownMeasurement;
          if (state.measurements.waterTemp.length > 1384000) {
            state.measurements.waterTemp.shift();
          }
        }
      },
      toggleHidden: (state) => {
        state.toggle = !state.toggle;
      },
      NightDayModeToggle: (state) => {
        state.NightDayMode = !state.NightDayMode;
      },
      selectOilTemp: (state, action: PayloadAction<metricSelect>) => {
        const newStatus = !state.toggler.oilTemp;
        state.toggler = {...state.toggler, oilTemp: newStatus};
      },
      selectInjValveOpen: (state, action: PayloadAction<metricSelect>) => {
        const newStatus = !state.toggler.injValveOpen;
        state.toggler = {...state.toggler, injValveOpen: newStatus};
      },
      selectTubingPressure: (state, action: PayloadAction<metricSelect>) => {
        const newStatus = !state.toggler.tubingPressure;
        state.toggler = {...state.toggler, tubingPressure: newStatus};
      },
      selectFlareTemp: (state, action: PayloadAction<metricSelect>) => {
        const newStatus = !state.toggler.flareTemp;
        state.toggler = {...state.toggler, flareTemp: newStatus};
      },
      selectCasingPressure: (state, action: PayloadAction<metricSelect>) => {
        const newStatus = !state.toggler.casingPressure;
        state.toggler = {...state.toggler, casingPressure: newStatus};
      },
      selectWaterTemp: (state, action: PayloadAction<metricSelect>) => {
        const newStatus = !state.toggler.waterTemp;
        state.toggler = {...state.toggler, waterTemp: newStatus};
      },
      chartApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state
      }
  //    setTime: (state, action: PayloadAction<updateTime>) => {
  //      const current_date = action.payload;
  //      state.dates = current_date;
  //    }
      
  });

  export const reducer = slice.reducer;
  export const actions = slice.actions;