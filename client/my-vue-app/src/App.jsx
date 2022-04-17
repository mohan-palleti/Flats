import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Addflat from "./components/Addflat";
import AddResident from "./components/AddResident";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/register";

function App() {
  const [count, setCount] = useState(0);
  let user = useSelector((state) => state.cityReducer.user);
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-flat" element={<Addflat />} />
      <Route path="/add-res" element={<AddResident />} />
    </Routes>
  );
}

export default App;
