import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../images/Images";
import NavBar from "../navbar/NavBar";
import styles from "./Success.module.css";
import Footer from "../footer/Footer";

const Success = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    if (details.token) {
      setIsTokenPresent(true);
    }
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
        cartItems={[]}
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
