import { createSlice, PayloadAction } from 'redux-starter-kit';
import { any } from 'prop-types';

const initialState = {
        //get DATA FROM GRAPH QL 
        measurements: {
          oilTemp: [{
            metric: "",
            at: "",
            value: "test",
            unit: ""
          }],
          injValveOpen: [{
            metric: "",
            at: "",
            value: "test",
            unit: ""
          }],
          tubingPressure: [{
            metric: "",
            at: "",
            value: "test",
            unit: ""
          }],
          flareTemp: [{
            metric: "",
            at: "",
            value: "test",
            unit: ""
          }],
          casingPressure: [{
            metric: "",
            at: "",
            value: "test",
            unit: ""
          }],
          waterTemp: [{
            metric: "",
            at: "",
            value: "test",
            unit: ""
          }]
        }
};

export type ApiErrorAction = {
    error: string;
  };

export type dataForMeasurements = {
    newMeasurement: any;
    metric: any; 
    at: any; 
    value: any; 
    unit: any;
    injValveOpen: any;
    oilTemp: any;
    tubingPressure: any;
    flareTemp: any;
    casingPressure: any;
    waterTemp: any
  };

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
      chartApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
      },
  //    setTime: (state, action: PayloadAction<updateTime>) => {
  //      const current_date = action.payload;
  //      state.dates = current_date;
  //    }
      
  });

  export const reducer = slice.reducer;
  export const actions = slice.actions;