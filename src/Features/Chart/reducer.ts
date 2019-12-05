import { createSlice, PayloadAction } from 'redux-starter-kit';

const initialState = {
        //get DATA FROM GRAPH QL 
        measurements: [
          {
          metric: "",
          at: 0,
          value: 0,
          unit: ""
        }
      ]
};

export type ApiErrorAction = {
    error: string;
  };

export type dataForMeasurements = {
    lastKnownMeasurement: any;
    metric: string; 
    at: number; 
    value: number; 
    unit: string;
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
        state.measurements = [...state.measurements, lastKnownMeasurement];
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