import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut_action } from "../Actions/actions";
function Navbar() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  function addPage(str) {
    if (str === "flat") {
      navigate("/add-flat");
    } else {
      navigate("/add-res");
    }
    if (str === "home") {
      navigate("/");
    }
    if (str === "logout") {
      dispatch(LogOut_action(null));
      navigate("/login");
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
            addPage("flat");
          }}
        >
          ADD Flats
        </button>
        <button
          className="btn btn btn-success m-2"
          onClick={() => {
            addPage("res");
          }}
        >
          ADD Residents
        </button>
        <button
          className="btn btn btn-success m-2"
          onClick={() => {
            addPage("logout");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
