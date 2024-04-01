import { useEffect, useState } from "react";
import Images from "../../images/Images";
import Login from "../login/Login";
import Register from "../register/Register";
import styles from "./LoginAndRegister.module.css";
import Footer from "../footer/Footer";

const LoginAndRegister = () => {
  const [tab, setTab] = useState("login");

  useEffect(() => {
    const pageName = localStorage.getItem("page");
    setTab(pageName);
  }, []);

  const handelSetTab = (value) => {
    setTab(value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.main_container}>
        <div className={styles.logo}>
          <img src={Images.image1} alt="icon" />
          <span>Musicart</span>
        </div>

        {tab === "register" ? (
          <Register handelSetTab={handelSetTab} />
        ) : (
          <Login handelSetTab={handelSetTab} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LoginAndRegister;
