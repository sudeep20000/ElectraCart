import { Route, Routes } from "react-router-dom";
import LoginAndRegisterPage from "./pages/logInAndRegister/LoginAndRegisterPage";
import HomePage from "./pages/home/HomePage";
import InvoicePage from "./pages/invoice/InvoicePage";
import CartPage from "./pages/cart/CartPage";
import CheckOutPage from "./pages/checkOut/CheckOutPage";
import SuccessPage from "./pages/success/SuccessPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authenticate" element={<LoginAndRegisterPage />} />
      <Route path="/Invoice" element={<InvoicePage />} />
      <Route path="/View_Cart" element={<CartPage />} />
      <Route path="/Checkout" element={<CheckOutPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
};

export default App;
