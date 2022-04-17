import React, { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

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
      .post("https://flatsunit6.herokuapp.com/user/register", data)
      .then((res) => {
        console.log(res);
        if (res.status === false) {
          return alert("enter correct deatils");
        }

        setTimeout(() => {
          navigate("/login");
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
        <h1>Register</h1>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign IN
        </button>
      </div>
      <form
        style={{ color: "white" }}
        className="row g-3 w-50 m-auto p-4 border border-success bg-secondary bg-gradient"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            {...register("username", { required: true })}
            required
          />
        </div>
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
        <div className="col-12">
          <label for="inputAddress" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputAddress"
            placeholder="Password"
            {...register("password", { required: true })}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          {adding ? <p>Creating a Account...</p> : ""}
        </div>
      </form>
    </div>
  );
}

export default Register;
