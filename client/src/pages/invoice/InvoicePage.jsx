import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Invoice from "../../components/invoice/Invoice";

const InvoicePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) navigate("/");
  }, [navigate]);
  return <Invoice />;
};

export default InvoicePage;
