import React, { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Login_action } from "../Actions/actions";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adding, setAdding] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setAdding(true);
    axios
      .post("https://flatsunit6.herokuapp.com/user/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === false) {
          return alert("enter correct deatils");
        }
        dispatch(Login_action(res.data));
        console.log(res.data);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        alert("Enter Correct Details");
      });
    //console.log(data);
  };

  return (
    <div>
      <div className="d-flex justify-content-around p-2 w-50 m-auto">
        <h1>Login</h1>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up
        </button>
      </div>
      <form
        style={{ color: "white" }}
        className="row g-3 w-50 m-auto p-4 border border-success bg-secondary bg-gradient"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="abc@ac.com"
              {...register("email", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: true })}
              required
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {adding ? <p>Logging In...</p> : ""}
        </div>
      </form>
    </div>
  );
}

export default Login;
