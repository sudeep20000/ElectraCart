import { Route, Routes } from "react-router-dom";
import LoginAndRegisterPage from "./pages/logInAndRegister/LoginAndRegisterPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAndRegisterPage />} />
    </Routes>
  );
};

export default App;
