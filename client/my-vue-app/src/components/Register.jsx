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
    // axios.post("", data).then((res) => {
    //   setAdding(true);
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    // });
    console.log(data);
  };

  return (
    <div>
      <div className="d-flex justify-content-around p-2">
        <h1>Register</h1>
        <button className="btn btn-warning">Sign IN</button>
      </div>
      <form
        className="row g-3 w-50 m-auto p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-md-6">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            {...register("country", { required: true })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            placeholder="City"
            {...register("city", { required: true })}
            required
          />
        </div>
        <div className="col-12">
          <label for="inputAddress" className="form-label">
            Population
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Population"
            {...register("population", { required: true })}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
          {adding ? <p>Creating a Account...</p> : ""}
        </div>
      </form>
    </div>
  );
}

export default Register;
