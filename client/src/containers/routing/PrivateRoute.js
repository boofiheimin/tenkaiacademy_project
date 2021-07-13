import Proptypes from "prop-types";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ isLogin, ...rest }) => {
  if (isLogin) {
    return <Route {...rest} />;
  }
  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  isLogin: Proptypes.string,
};

PrivateRoute.defaultProps = {
  isLogin: null,
};

export default PrivateRoute;
