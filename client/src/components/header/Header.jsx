import { useNavigate } from "react-router-dom";
import { TbPhoneCall } from "react-icons/tb";
import styles from "./Header.module.css";

const Header = ({ isTokenPresent, onSetToken, tabOpen }) => {
  const navigate = useNavigate();

  const handelLogin = () => {
    navigate("/authenticate");
    localStorage.setItem("page", "login");
  };

  const handelSignUp = () => {
    navigate("/authenticate");
    localStorage.setItem("page", "register");
  };

  const handelLogout = () => {
    localStorage.removeItem("details");
    const pathname = window.location.pathname;
    if (pathname === "/View_Cart" || pathname === "/Checkout")
      navigate("/authenticate");
    onSetToken(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.phone}>
        <TbPhoneCall size={23} />
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
        <>
          {tabOpen === "seletedItem" ? (
            <p className={styles.logout} onClick={handelLogout}>
              Logout
            </p>
          ) : (
            <p className={styles.adjust}></p>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
