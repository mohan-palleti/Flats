import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  function addPage(str) {
    if (str === "count") {
      navigate("/add-country");
    } else {
      navigate("/add-city");
    }
    if (str === "home") {
      navigate("/");
    }
  }
  return (
    <div className="navbar">
      <div className="left d-flex justify-content-around p-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            addPage("home");
          }}
        >
          Home
        </button>
        <h1 className="m-2">Apartments</h1>
      </div>
      <div className="right d-flex  justify-content-evenly p-2">
        <button
          className="btn btn btn-success m-2"
          onClick={() => {
            addPage("count");
          }}
        >
          ADD Flats
        </button>
        <button
          className="btn btn btn-success m-2"
          onClick={() => {
            addPage("city");
          }}
        >
          ADD Residents
        </button>
      </div>
    </div>
  );
}

export default Navbar;
