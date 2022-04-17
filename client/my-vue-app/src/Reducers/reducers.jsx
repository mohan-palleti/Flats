import { combineReducers } from "redux";

const initialData = {
  cities: [],
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const cityReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        cities: action.payload,
      };
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.setItem("user", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cityReducer,
});

export default rootReducer;
