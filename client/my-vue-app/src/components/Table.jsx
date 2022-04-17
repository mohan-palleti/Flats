import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Actions/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Table() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [term, setTerm] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState(false);
  const CityData = useSelector((state) => state.cityReducer.cities);
  //console.log(CityData);

  const [resData, setResData] = useState(CityData);
  useEffect(() => {
    axios
      .get("https://flatsunit6.herokuapp.com/flat", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        // console.log("fetching success", res.data);
        //setCitiesData(res.data);
        dispatch(getData(res.data));
        setResData(res.data);
      });
  }, []);

  let data = useSelector((state) => state.cityReducer.cities);
  function sortPopulation() {
    data = data.sort((a, b) => a.number - b.number);
    //console.log(data);
    setResData([...data]);
    //setSort(!sort);
    // dispatch(getData(data));
  }
  function eachFlat(i) {
    navigate(`/flat/${i}`);
  }
  // ----------------------------------debounce----------------------------------------------------------------------------------------------------
  function debounce(cb, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  let updateDebouce = debounce(searchTerm, 1000);
  function searchTerm(val) {
    if (val.length > 0) {
      axios
        .get(`https://flatsunit6.herokuapp.com/flat/search?s=${val}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        .then((res) => {
          console.log(res);
          setTerm(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <div className="d-flex">
        <select
          name="country_filter"
          className="form-select w-25 m-auto"
          id="country_filter"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">Filter By Type</option>
          <option value="owner">Owner</option>
          <option value="tenant">Tenant</option>
        </select>
        <div className="position-relative">
          <input
            type="search"
            className="input-group-text"
            placeholder="Search"
            onChange={(e) => {
              updateDebouce(e.target.value);
            }}
          />
          <div>
            {term ? (
              <>
                {term.map((ele) => (
                  <>
                    <div
                      key={ele._id}
                      className="p-3 mb-2 bg-light text-dark position-absolute border bg-light"
                      onClick={() => {
                        setTerm(null);
                        navigate(`/flat/${ele._id}`);
                      }}
                    >
                      <p>
                        {" "}
                        <b>Type-</b> {ele.type}
                      </p>
                      <p>
                        {" "}
                        <b>Number- </b> {ele.number}
                      </p>
                      <p>
                        {" "}
                        <b>Block- </b> {ele.block}
                      </p>
                      <p>click for more deatials</p>
                    </div>
                  </>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <button
          className="btn btn-secondary m-2"
          onClick={() => {
            sortPopulation();
          }}
        >
          Sort By Flat Number
        </button>
      </div>
      <div className="search"></div>
      <table className="table bg-light w-75 border m-auto">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Type</th>
            <th scope="col">Block</th>
            <th scope="col">Number </th>
            <th scope="col">Residents</th>
          </tr>
        </thead>
        <tbody>
          {resData
            .filter((ele) => ele.type.includes(filter))
            .map((ele, i) => (
              <>
                <tr
                  key={ele.id}
                  onClick={() => {
                    eachFlat(ele._id);
                  }}
                >
                  <th scope="row">{+(i + 1)}</th>
                  <td>{ele.type}</td>
                  <td>{ele.block}</td>
                  <td>{ele.number}</td>

                  {ele.residents.map((ele) => (
                    <>
                      <td>{ele.name}</td>
                    </>
                  ))}
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
