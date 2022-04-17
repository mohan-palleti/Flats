import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Actions/actions";
function Buttons() {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.cityReducer.cities);
  function sortPopulation() {
    data = data.sort((a, b) => a.population - b.population);
    console.log(data);
    dispatch(getData(data));
  }
  return (
    <div>
      <select
        name="country_filter"
        className="form-select w-25 m-auto"
        id="country_filter"
      >
        <option value="">Filter By Country</option>
        <option value="india">india</option>
        <option value="srilanka">SriLanka</option>
        <option value="pakistan">Pakistan</option>
        <option value="bagladesh">Bangladesh</option>
        <option value="nepal">Nepal</option>
      </select>
      <button
        className="btn btn-secondary m-2"
        onClick={() => {
          sortPopulation();
        }}
      >
        Sort By Population
      </button>
    </div>
  );
}

export default Buttons;
