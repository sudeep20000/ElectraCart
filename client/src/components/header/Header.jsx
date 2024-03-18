import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isPresent = localStorage.getItem("token");
    if (isPresent) setIsTokenPresent(true);
  }, []);

  const handelLogin = () => {
    navigate("/authenticate");
    localStorage.setItem("page", "login");
  };

  const handelSignUp = () => {
    navigate("/authenticate");
    localStorage.setItem("page", "register");
  };

  const handelLogout = () => {
    setIsTokenPresent(false);
    localStorage.removeItem("token");
  };

  return (
    <div className={styles.header}>
      <div className={styles.phone}>
        <p className={styles.phone_num}>912121131313</p>
      </div>

      <div className={styles.offer_sec}>
        <p className={styles.offer}>Get 50% off on selected items</p>
        <div className={styles.empty}></div>
        <p className={styles.shop}>Shop Now</p>
      </div>

      {!isTokenPresent ? (
        <div className={styles.btn_sec}>
          <p className={styles.login_btn} onClick={handelLogin}>
            Login
          </p>
          <div className={styles.empty}></div>
          <p className={styles.signup_btn} onClick={handelSignUp}>
            Signup
          </p>
        </div>
      ) : (
        <p className={styles.logout} onClick={handelLogout}>
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
