import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { VscFeedback } from "react-icons/vsc";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import NavBar from "../navbar/NavBar";
import Offer from "../offer/Offer";
import SearchBar from "../searchbar/SearchBar";
import FilterSec from "../filter/FilterSec";
import SelecteItem from "../selectedItem/SelectedItem";
import Footer from "../footer/Footer";
import styles from "./Home.module.css";

const Home = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [isOpenForm, setIsOpenFrom] = useState(false);
  const [error, setError] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [tabOpen, setTabOpen] = useState("default");
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    if (details.token) setIsTokenPresent(true);
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:5000/v1/products`);
        setProducts(data.products);
        console.log(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsSuccess(false);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };
    const fetchAllCartItems = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/verified/cartItems`,
          { headers }
        );
        setCartItems(data.cartItem);
        console.log(data.cartItem);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCartItems();
  }, [mount]);

  const errColor = {
    border: "1px solid red",
  };

  const handelTokenPresent = (isPresent) => {
    setIsTokenPresent(isPresent);
  };

  const handelSeletedItem = (item, activeTab) => {
    setSelectedItem(item);
    setTabOpen(activeTab);
  };

  const handleComponentMount = () => {
    setMount((prev) => !prev);
  };

  const handelClickFeedBackTab = () => {
    setIsOpenFrom((prev) => !prev);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (!feedback.type || !feedback.text) {
      setError(true);
    } else {
      // setIsLoading(true);
      // try {
      //   const { data } = await axios.post(
      //     `http://localhost:5000/auth/login`,
      //     feedback
      //   );
      //   setIsLoading(false);
      // } catch (error) {
      //   setIsLoading(false);
      //   console.log(error);
      // }
    }
  };

  return (
    <div className={styles.home_div}>
      <Header
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={tabOpen}
      />
      <NavBar
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={tabOpen}
        cartItems={cartItems}
      />
      {tabOpen === "default" && (
        <div className={styles.main}>
          <Offer />
          <SearchBar />
          <FilterSec
            isLoading={isLoading}
            isSuccess={isSuccess}
            products={products}
            isTokenPresent={isTokenPresent}
            handelSeletedItem={handelSeletedItem}
            handleComponentMount={handleComponentMount}
          />
          {isTokenPresent && (
            <div
              className={styles.feedback_tab}
              onClick={handelClickFeedBackTab}
            >
              <VscFeedback size={24} />
            </div>
          )}
          {isOpenForm && (
            <form
              className={styles.feedback_form}
              onSubmit={(e) => handleSubmitFeedback(e)}
            >
              <div className={styles.feedback_type}>
                <label className={styles.label}>Type of feedback</label>
                <select
                  style={error && feedback.type.length === 0 ? errColor : null}
                >
                  <option value="" hidden>
                    Choose the type
                  </option>
                  <option value="Bugs">Bugs</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Query">Query</option>
                </select>
                {error && feedback.type.length === 0 && (
                  <p className={styles.error}>*Required Field</p>
                )}
              </div>

              <div className={styles.feedback_textarea}>
                <label htmlFor="textarea" className={styles.label}>
                  Feedback
                </label>
                <textarea
                  cols={25}
                  rows={8}
                  placeholder="Type your feedback"
                  style={error && feedback.text.length === 0 ? errColor : null}
                />
                {error && feedback.text.length === 0 && (
                  <p className={styles.error}>*Required Field</p>
                )}
              </div>

              <div className={styles.submit_btn_container}>
                <button type="submit" className={styles.submit_btn}>
                  {isLoading ? <Loader /> : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      {tabOpen === "selectedItem" && (
        <SelecteItem
          item={selectedItem}
          handelSeletedItem={handelSeletedItem}
          handleComponentMount={handleComponentMount}
        />
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Home;
