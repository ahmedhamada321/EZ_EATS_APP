import React from "react";
import { Navigate } from "react-router-dom";
import Parse from "parse";

const PrivateRoute = ({ component: Component }) => {
  return Parse.User.current() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
