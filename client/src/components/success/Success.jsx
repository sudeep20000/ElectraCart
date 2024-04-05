import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Images from "../../images/Images";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import BASE_URL from "../../service/helper";
import styles from "./Success.module.css";

const Success = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    if (details.token) {
      setIsTokenPresent(true);
    }
  }, []);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };
    const fetchAllCartItems = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/verified/cartItems`, {
          headers,
        });
        setCartItems(data.cartItem);
        console.log(data.cartItem);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCartItems();
  }, []);

  const handelGoHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handelTokenPresent = (isPresent) => {
    setIsTokenPresent(isPresent);
  };

  return (
    <div className={styles.success_main_div}>
      <div className={styles.logo}>
        <img src={Images.image1} alt="icon" />
        <span>Musicart</span>
      </div>

      <NavBar
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={"seletedItem"}
        cartItems={cartItems}
      />
      <div className={styles.main_div}>
        <div className={styles.inner_div}>
          <img src={Images.image3} alt="success" />
          <p className={styles.success_msg}>Order is placed successfully!</p>
          <p className={styles.result_msg}>
            You will be receiving a confirmation email with order details
          </p>
          <button
            className={styles.go_back_home}
            onClick={(e) => handelGoHome(e)}
          >
            Go back to Home page
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
