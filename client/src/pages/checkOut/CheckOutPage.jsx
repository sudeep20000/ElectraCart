import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckOut from "../../components/checkOut/CheckOut";

const CheckOutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) navigate("/authenticate");
  }, [navigate]);
  return <CheckOut />;
};

export default CheckOutPage;
