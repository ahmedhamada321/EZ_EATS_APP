import React from "react";
import "./App.css";
import { initializeParse } from "@parse/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Order from "./Order";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

const PARSE_APPLICATION_ID = "Q69SnbEjASwhOV2cfV9Ac6AabaHQRGCIsZmpRBTV";
const PARSE_LIVE_QUERY_URL = "https://ezeatsapp.b4a.io/";
const PARSE_JAVASCRIPT_KEY = "DBjCRNJv6fkFRz5wv59hmivbbRLNa4gtrDqY0KUD";

initializeParse(
  PARSE_LIVE_QUERY_URL,
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<PrivateRoute component={Order} />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
