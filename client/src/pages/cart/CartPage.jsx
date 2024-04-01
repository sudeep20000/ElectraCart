import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../../components/cart/Cart";

const CartPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) navigate("/");
  }, [navigate]);

  return <Cart />;
};

export default CartPage;
