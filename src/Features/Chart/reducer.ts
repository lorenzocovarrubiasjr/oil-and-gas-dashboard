import { createSlice, PayloadAction } from 'redux-starter-kit';
import { any } from 'prop-types';

const initialState = {
        //get DATA FROM GRAPH QL 
        measurements: {
          oilTemp: [{
            metric: "test",
            at: "",
            value: "test",
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
        NightDayMode: false
};

export type ApiErrorAction = {
    error: string;
  };

export type dataForMeasurements = {
    newMeasurement: {
      metric: string; 
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
      chartDataReceived: (state, action: PayloadAction<dataForMeasurements>) => {
        const lastKnownMeasurement = action.payload;
        if (lastKnownMeasurement.newMeasurement.metric === "oilTemp"){
          state.measurements.oilTemp = [...state.measurements.oilTemp, lastKnownMeasurement];
          if (state.measurements.oilTemp.length > 1384000) {
            state.measurements.oilTemp.shift();
          }
        }
        if (lastKnownMeasurement.newMeasurement.metric === "injValveOpen"){
          state.measurements.injValveOpen = [...state.measurements.injValveOpen, lastKnownMeasurement];
        }
        if (lastKnownMeasurement.newMeasurement.metric === "tubingPressure"){
          state.measurements.tubingPressure = [...state.measurements.tubingPressure, lastKnownMeasurement];
        }
        if (lastKnownMeasurement.newMeasurement.metric === "flareTemp"){
          state.measurements.flareTemp = [...state.measurements.flareTemp, lastKnownMeasurement];
        }
        if (lastKnownMeasurement.newMeasurement.metric === "casingPressure"){
          state.measurements.casingPressure = [...state.measurements.casingPressure, lastKnownMeasurement];
        }
        if (lastKnownMeasurement.newMeasurement.metric === "waterTemp"){
          state.measurements.waterTemp = [...state.measurements.waterTemp, lastKnownMeasurement];
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