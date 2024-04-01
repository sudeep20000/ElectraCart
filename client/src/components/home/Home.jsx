import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../header/Header";
import NavBar from "../navbar/NavBar";
import Offer from "../offer/Offer";
import SearchBar from "../searchbar/SearchBar";
import FilterSec from "../filter/FilterSec";
import SelecteItem from "../selectedItem/SelectedItem";
import Footer from "../footer/Footer";
import styles from "./Home.module.css";
import Images from "../../images/Images";

const Home = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredObj, setFilteredObj] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(null);
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
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get("http://localhost:5000/v1/products", {
          params: filteredObj,
        });
        setIsLoading(false);
        if (data.products.length > 0) setIsFound(true);
        else setIsFound(false);
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [filteredObj]);

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
    setFilteredObj({});
  };

  const handleComponentMount = () => {
    setMount((prev) => !prev);
  };

  const handelClickFeedBackTab = () => {
    setError(false);
    setIsOpenFrom((prev) => !prev);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    const details = JSON.parse(localStorage.getItem("details"));
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    setLoading(true);
    if (!feedback.type || !feedback.text) {
      setError(true);
      toast.error("All fields required", {
        position: "top-center",
      });
      setLoading(false);
    } else {
      try {
        await axios.post(
          `http://localhost:5000/verified/addFeedback`,
          feedback,
          { headers }
        );
        setFeedback({ type: "", text: "" });
        setError(false);
        setIsOpenFrom(false);
        setLoading(false);
        toast.success(`Thank you for your feeback`, {
          position: "top-center",
        });
      } catch (error) {
        toast.error(error, {
          position: "top-center",
        });
        setError(false);
        setLoading(false);
      }
    }
  };

  const handelChangeFeedbackType = (e) => {
    setFeedback({ ...feedback, type: e.target.value });
  };

  const handelChangeFeedback = (e) => {
    setFeedback({ ...feedback, text: e.target.value });
  };

  const handelSetFilterObj = (filterObj) => {
    setFilteredObj(filterObj);
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
        selectedItem={selectedItem}
      />
      {tabOpen === "default" && (
        <div className={styles.main}>
          <Offer />
          <SearchBar
            filteredObj={filteredObj}
            handelSetFilterObj={handelSetFilterObj}
          />
          <FilterSec
            isLoading={isLoading}
            products={products}
            filteredObj={filteredObj}
            isFound={isFound}
            handelSetFilterObj={handelSetFilterObj}
            isTokenPresent={isTokenPresent}
            handelSeletedItem={handelSeletedItem}
            handleComponentMount={handleComponentMount}
          />
          {isTokenPresent && (
            <div
              className={styles.feedback_tab}
              onClick={handelClickFeedBackTab}
            >
              <img src={Images.image7} alt="feedbackIcon" />
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
                  value={feedback.type}
                  onChange={(e) => handelChangeFeedbackType(e)}
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
                  value={feedback.text}
                  onChange={(e) => handelChangeFeedback(e)}
                  placeholder="Type your feedback"
                  style={error && feedback.text.length === 0 ? errColor : null}
                />
                {error && feedback.text.length === 0 && (
                  <p className={styles.error}>*Required Field</p>
                )}
              </div>

              <div className={styles.submit_btn_container}>
                <button type="submit" className={styles.submit_btn}>
                  {loading ? "..." : "Submit"}
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
