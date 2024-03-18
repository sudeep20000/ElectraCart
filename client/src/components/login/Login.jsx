import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Loader from "../loader/Loader";

const Login = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState({ logInID: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const errColor = {
    border: "1px solid red",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.logInID || !user.password) {
      setError(true);
      toast.error("all fields required", {
        position: "top-right",
      });
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `http://localhost:5000/auth/login`,
          user
        );
        localStorage.setItem("token", data.token);
        setLoading(false);
        // navigate("/dashboard");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.msg, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.form_name}>Sign in</p>

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
        By continuing, you agree to Musicart privacy notice and conditions of
        use
      </p>
      <ToastContainer />
    </form>
  );
};

export default Login;
