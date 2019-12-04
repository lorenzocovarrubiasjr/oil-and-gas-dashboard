const INITIAL_STATE = {
        //get DATA FROM GRAPH QL 
        measurements: [
            {
              "metric": "oilTemp",
              "at": 1575364886383,
              "value": 154.18,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364887687,
              "value": 152.7,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364888989,
              "value": 147.34,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364890290,
              "value": 140.39,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364891594,
              "value": 146.09,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364892894,
              "value": 145.63,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364894195,
              "value": 151.7,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364895497,
              "value": 156.31,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364896804,
              "value": 148.17,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364898105,
              "value": 141.76,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364899407,
              "value": 144.73,
              "unit": "F"
            },
            {
              "metric": "oilTemp",
              "at": 1575364900707,
              "value": 144.99,
              "unit": "F"
            }
            ]
};

const chartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default chartReducer;