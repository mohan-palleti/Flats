import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Register from "./components/register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Register />} />
    </Routes>
  );
}

export default App;
