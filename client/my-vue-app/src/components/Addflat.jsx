import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Login_action } from "../Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

function AddFlat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resData, setResData] = useState([]);
  const [success, setSuccess] = useState(false);
  let toggle = [null, "Adding", "Done"];

  const [adding, setAdding] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // submit function----------------------------------------------------------
  const onSubmit = (data) => {
    console.log(data);
    setAdding(toggle[1]);
    axios
      .post("https://flatsunit6.herokuapp.com/resident", data, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        console.log(res);

        // dispatch(Login_action(res.data));
        setAdding(toggle[2]);
        setTimeout(() => {
          setAdding(toggle[0]);
        }, 1500);
        setSuccess(!success);
      })
      .catch((err) => {
        console.log(err);
        alert("Enter Correct Details");
      });
  };
  // delete function------------------------------------------------
  function deleteCity(i) {
    axios
      .delete(`https://flatsunit6.herokuapp.com/resident/${i}`, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        // dispatch(getData(res.data));
        // setSort(!sort);
        axios
          .get("https://flatsunit6.herokuapp.com/resident", {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
          .then((res) => {
            console.log("fetching success", res.data);
            //setCitiesData(res.data);
            dispatch(getData(res.data));
            setResData(res.data);
          });

        console.log(res);
      });
  }
  // useEffect--------------------------------------------------
  useEffect(() => {
    axios
      .get("https://flatsunit6.herokuapp.com/resident", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success]);
  return (
    <div>
      <Navbar />
      <h1>Add Flat</h1>
      <>
        <form
          style={{ color: "white" }}
          className="row g-3 w-50 m-auto p-4 border border-success bg-secondary bg-gradient"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                {...register("name", { required: true })}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input
                type="text"
                className="form-control"
                placeholder="age"
                {...register("age", { required: true })}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <input
                type="text"
                className="form-control"
                placeholder="Gender"
                {...register("gender", { required: true })}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
            {adding ? <p>...</p> : ""}
          </div>
        </form>
      </>
      <div>
        {/* <table className="table w-75 m-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {resData.map((ele) => (
              <>
                <tr key={ele.id}>
                  <th scope="row">{ele._id}</th>
                  <td>{ele.name}</td>
                  <td>{ele.age}</td>
                  <td>{ele.gender}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default AddFlat;
