import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/streams");
  }, [navigate]);

  return <div>Landing</div>;
};

export default LandingRoute;
