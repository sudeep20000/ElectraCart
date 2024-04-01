import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Success from "../../components/success/Success";

const SuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    const placed = localStorage.getItem("placed");
    if (!details) navigate("/");
    if (!placed) navigate("/");
  }, [navigate]);
  return <Success />;
};

export default SuccessPage;
