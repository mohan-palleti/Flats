import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Actions/actions";
import axios from "axios";

function Table() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(false);
  const CityData = useSelector((state) => state.cityReducer.cities);
  //console.log(CityData);

  const [citiesData, setCitiesData] = useState(CityData);
  useEffect(() => {
    // axios.get("").then((res) => {
    //   console.log("fetching success", res.data);
    //   //setCitiesData(res.data);
    //   dispatch(getData(res.data));
    //   setCitiesData(res.data);
    // });
  }, []);
  useEffect(() => {
    setCitiesData(CityData);
  }, [sort]);
  let data = useSelector((state) => state.cityReducer.cities);
  function sortPopulation() {
    data = data.sort((a, b) => a.population - b.population);
    console.log(data);
    setSort(!sort);
    dispatch(getData(data));
  }

  function deleteCity(i) {
    axios.delete(`http://localhost:3004/cities/${i}`).then((res) => {
      // dispatch(getData(res.data));
      // setSort(!sort);
      axios.get("http://localhost:3004/cities").then((res) => {
        console.log("fetching success", res.data);
        //setCitiesData(res.data);
        dispatch(getData(res.data));
        setCitiesData(res.data);
      });

      console.log(res);
    });
  }

  return (
    <div>
      <div>
        <select
          name="country_filter"
          className="form-select w-25 m-auto"
          id="country_filter"
        >
          <option value="">Filter By Country</option>
          <option value="india">india</option>
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
          {/* {citiesData.map((ele) => (
            <>
              <tr key={ele.id}>
                <th scope="row">{ele.id}</th>
                <td>{ele.country}</td>
                <td>{ele.city}</td>
                <td>{ele.population}</td>
                <td>Edit</td>
                <td
                  onClick={() => {
                    deleteCity(ele.id);
                  }}
                >
                  Delete
                </td>
              </tr>
            </>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
