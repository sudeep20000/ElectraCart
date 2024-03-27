import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginAndRegisterPage from "./pages/logInAndRegister/LoginAndRegisterPage";
import CartPage from "./pages/cart/CartPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authenticate" element={<LoginAndRegisterPage />} />
      <Route path="/View_Cart" element={<CartPage />} />
    </Routes>
  );
};

export default App;
