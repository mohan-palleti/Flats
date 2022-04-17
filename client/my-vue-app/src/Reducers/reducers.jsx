import { combineReducers } from "redux";

const initialData = {
  cities: [],
};

const cityReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cityReducer,
});

export default rootReducer;
