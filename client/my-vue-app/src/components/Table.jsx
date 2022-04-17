import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Actions/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Table() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
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
        console.log("fetching success", res.data);
        //setCitiesData(res.data);
        dispatch(getData(res.data));
        setResData(res.data);
      });
  }, []);
  // useEffect(() => {
  //   setResData(CityData);
  // }, [sort]);
  let data = useSelector((state) => state.cityReducer.cities);
  function sortPopulation() {
    data = data.sort((a, b) => a.number - b.number);
    console.log(data);
    setResData([...data]);
    //setSort(!sort);
    // dispatch(getData(data));
  }
  function eachFlat(i) {
    navigate(`/flat/${i}`);
  }
  function searchTerm(val) {
    // let arr = useSelector((state) => state.cityReducer.cities);
    // console.log("arrrrrr", arr);
    // let res = arr.filter((ele) => ele.block.includes(val));
    axios
      .get(`https://flatsunit6.herokuapp.com/flat/search?s=${val}`, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
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
        <input
          type="search"
          onChange={(e) => {
            setTerm(e.target.value);
            searchTerm(e.target.value);
          }}
        />
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
      <table className="table w-75 m-auto">
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
                  <td>
                    {ele.residents.map((ele) => (
                      <>
                        <td>{ele.name}</td>
                      </>
                    ))}
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
