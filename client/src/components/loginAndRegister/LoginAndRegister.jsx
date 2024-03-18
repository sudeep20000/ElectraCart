import { useEffect, useState } from "react";
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

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.logo}>Musicart</div>
        <div className={styles.outer_div}>
          <div className={styles.inner_div}>
            <div className={styles.form_container}>
              {tab === "register" ? <Register /> : <Login />}
            </div>
          </div>
          {tab === "login" && (
            <div className={styles.para}>
              <div className={styles.empty}></div>
              <p>New to Musicart?</p>
              <div className={styles.empty}></div>
            </div>
          )}
          {tab === "register" ? (
            <div className={styles.sign_in_msg}>
              <p>Already have an account</p>
              <p className={styles.sign_in} onClick={() => setTab("login")}>
                Sign in
              </p>
            </div>
          ) : (
            <button
              onClick={() => setTab("register")}
              className={styles.goto_register}
            >
              Create your Musicart account
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginAndRegister;
