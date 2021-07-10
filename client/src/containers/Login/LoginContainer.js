import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/AuthActions";

import LoginForm from "../../components/LoginForm/LoginForm";

const LoginRoute = () => {
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return <LoginForm onFormSubmit={handleSubmit} onFormChange={handleChange} />;
};

export default LoginRoute;
