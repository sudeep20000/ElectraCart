import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginAndRegisterPage from "./pages/logInAndRegister/LoginAndRegisterPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authenticate" element={<LoginAndRegisterPage />} />
    </Routes>
  );
};

export default App;
