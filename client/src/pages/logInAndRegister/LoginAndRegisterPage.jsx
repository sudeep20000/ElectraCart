import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginAndRegister from "../../components/loginAndRegister/LoginAndRegister";

const LoginAndRgister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (details) {
      navigate("/");
    }
  }, [navigate]);

  return <LoginAndRegister />;
};

export default LoginAndRgister;
