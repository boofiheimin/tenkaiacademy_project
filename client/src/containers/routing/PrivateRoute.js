import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ isLogin, ...rest }) => {
  if (isLogin) {
    return <Route {...rest} />;
  }
  return <Navigate to="/cms/login" />;
};

export default PrivateRoute;
