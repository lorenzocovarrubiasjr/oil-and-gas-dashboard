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
        toggler: [{"oilTemp": {}}],
        toggle: false
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

  export type chartToggled = {
    toggle: boolean
  }

  export type chartMetricToggle = {
    injValveOpen: object;
    oilTemp: object;
    tubingPressure: object;
    flareTemp: object;
    casingPressure:object;
    waterTemp: object
  }

//export type updateTime = {
//    current_time: number;
//}

  const slice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
      chartDataReceived: (state, action: PayloadAction<dataForMeasurements>) => {
        const lastKnownMeasurement = action.payload;
        if (lastKnownMeasurement.newMeasurement.metric === "oilTemp"){
          state.measurements.oilTemp = [...state.measurements.oilTemp, lastKnownMeasurement];
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
      chartMetricToggler: (state, action: PayloadAction<chartMetricToggle>) => {
        const metrics_selected = action.payload;
        state.toggler = [...state.toggler, metrics_selected];
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