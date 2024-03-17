import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Loader from "../loader/Loader";

const LoginForm = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const errColor = {
    border: "1px solid red",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.phone || !user.email || !user.password) {
      setError(true);
      toast.error("all fields required", {
        position: "top-center",
      });
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(`localhost:3000/auth/register`, user);
        setLoading(false);
        localStorage.setItem("token", data.token);
        // navigate("/dashboard");
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg, {
          position: "top-center",
        });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.form_name}>Create Account</p>
      <div className={styles.name}>
        <label htmlFor="name" className={styles.label}>
          Your name
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={error && user.name.length === 0 ? errColor : null}
        />
        {error && user.email.length === 0 && (
          <p className={styles.error}>*required field</p>
        )}
      </div>

      <div className={styles.name}>
        <label htmlFor="email" className={styles.label}>
          Mobile number
        </label>
        <input
          type="phone"
          id="phone"
          className={styles.input}
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          style={error && user.email.length === 0 ? errColor : null}
        />
        {error && user.email.length === 0 && (
          <p className={styles.error}>*required field</p>
        )}
      </div>

      <div className={styles.name}>
        <label htmlFor="email" className={styles.label}>
          Email id
        </label>
        <input
          type="email"
          id="email"
          className={styles.input}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={error && user.email.length === 0 ? errColor : null}
        />
        {error && user.email.length === 0 && (
          <p className={styles.error}>*required field</p>
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
        {error && user.email.length === 0 && (
          <p className={styles.error}>*required field</p>
        )}
      </div>

      <p className={styles.policy}>
        By enrolling your mobile number, you consent to receive automated
        security notification via text message from Musicart. Message and data
        rates may apply
      </p>

      <div className={styles.btn}>
        <button type="submit" className={styles.continue_btn}>
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

export default LoginForm;
