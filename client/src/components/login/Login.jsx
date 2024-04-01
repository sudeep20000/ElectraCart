import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import BASE_URL from "../../service/helper";
import styles from "./Login.module.css";

const Login = ({ handelSetTab }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ logInID: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const errColor = {
    border: "1px solid red",
  };

  const handelClickSetTab = (e) => {
    e.preventDefault();
    handelSetTab("register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.logInID || !user.password) {
      setError(true);
      toast.error("All fields required", {
        position: "top-right",
      });
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/login`, user);
        localStorage.removeItem("page");
        localStorage.setItem("details", JSON.stringify(data));
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.msg, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className={styles.outer_div}>
      {window.screen.width >= 320 && window.screen.width <= 425 && (
        <p className={styles.welcome}>Welcome</p>
      )}
      <div className={styles.inner_div}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {window.screen.width >= 320 && window.screen.width <= 425 ? (
              <div className={styles.query_container}>
                <p className={styles.sign_in}>Sign in.</p>
                <p className={styles.query}>Already a customer?</p>
              </div>
            ) : (
              <p className={styles.form_name}>Sign in</p>
            )}

            <div className={styles.name}>
              <label htmlFor="logInID" className={styles.label}>
                Enter your email or mobile number
              </label>
              <input
                type="text"
                id="logInID"
                className={styles.input}
                value={user.logInID}
                onChange={(e) => setUser({ ...user, logInID: e.target.value })}
                style={error && user.logInID.length === 0 ? errColor : null}
              />
              {error && user.logInID.length === 0 && (
                <p className={styles.error}>*Required Field</p>
              )}
            </div>

            <div className={styles.name}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={error && user.password.length === 0 ? errColor : null}
              />
              {error && user.password.length === 0 && (
                <p className={styles.error}>*Required Field</p>
              )}
            </div>

            <div className={styles.btn}>
              <button type="submit" className={styles.continue}>
                {loading ? <Loader /> : "Continue"}
              </button>
            </div>

            <p className={styles.term_condition}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use
            </p>
            <ToastContainer />
          </form>
        </div>
      </div>
      <div className={styles.para}>
        <div className={styles.empty}></div>
        <p>New to Musicart?</p>
        <div className={styles.empty}></div>
      </div>
      <button
        onClick={(e) => handelClickSetTab(e)}
        className={styles.goto_register}
      >
        Create your Musicart account
      </button>
    </div>
  );
};

export default Login;
