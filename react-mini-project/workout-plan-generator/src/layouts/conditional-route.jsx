import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConditionalRoute = () => {
  let navigate = useNavigate();
  const newRegistration = false;
  useEffect(() => {
    if (newRegistration) {
      navigate("/landing-page", { replace: true });
    } else {
      navigate("/app", { replace: true });
    }
  }, []);
  return <h1>Loading...</h1>;
};
export default ConditionalRoute;
