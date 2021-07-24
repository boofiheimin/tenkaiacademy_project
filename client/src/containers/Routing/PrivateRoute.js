import { Navigate, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  if (localStorage.getItem("authToken")) {
    return <Route {...props} />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
