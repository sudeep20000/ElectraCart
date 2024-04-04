import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../header/Header";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import BASE_URL from "../../service/helper";
import styles from "./CheckOut.module.css";
import Images from "../../images/Images";

const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CheckOut = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [countsObj, setCountsObj] = useState({});
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedInd, setSelectedInd] = useState(0);
  const [estimatedDate, setEstimatedData] = useState("");
  const [error, setError] = useState(false);

  const totalMRP = cartItems.reduce((total, item) => {
    const quantity = countsObj[item.model];
    return item.price * quantity + total;
  }, 0);
  const deliveryCharge = totalMRP * (1 / 50);
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    if (details.token) {
      setIsTokenPresent(true);
      setUserName(details.userName);
    }
  }, [cartItems.length, navigate]);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;

    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    const fetchAllCartItem = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/verified/filteredCartItems`,
          { headers }
        );
        const { countsObj, uniqueArray } = data.duplicatesCount;
        setCartItems(uniqueArray);
        setCountsObj(countsObj);
        setEstimatedData(daysArray[Math.floor(Math.random() * 7)]);
        console.log(data.duplicatesCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCartItem();
  }, []);

  const handelTokenPresent = (isPresent) => {
    setIsTokenPresent(isPresent);
  };

  const handelBackToCart = (e) => {
    e.preventDefault();
    navigate("/View_Cart");
  };

  const handelSelectedItem = (ind) => {
    setSelectedInd(ind);
  };

  const handelSetAddress = (e) => {
    setAddress(e.target.value);
  };

  const handelSetPayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handelPlaceOrder = async (e) => {
    e.preventDefault();
    const details = JSON.parse(localStorage.getItem("details"));

    if (!details) return;
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    if (address.length === 0 || paymentMethod.length === 0) {
      setError(true);
      toast.error("plz provide address or payment mode.", {
        position: "top-center",
      });
    } else {
      try {
        toast.loading("Please wait", {
          position: "top-center",
        });
        const { data } = await axios.post(
          `${BASE_URL}/verified/addInvoiceData`,
          {
            name: userName,
            address,
            paymentMethod,
            totalMRP,
            extraCharges: deliveryCharge,
            estimatedDate,
            uniqueCartItems: cartItems,
          },
          { headers }
        );
        console.log(data.invoice);
        localStorage.setItem("placed", "true");
        navigate("/success");
      } catch (error) {
        console.log(error);
        toast.error(error, {
          position: "top-center",
        });
      }
    }
  };

  const errColor = {
    border: "1px solid red",
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.logo}>
        <img src={Images.image1} alt="icon" />
        <span>Musicart</span>
      </div>

      <Header
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={"seletedItem"}
      />
      <NavBar
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={"seletedItem"}
        cartItems={cartItems}
      />

      <div className={styles.main}>
        <button
          className={styles.back_btn}
          onClick={(e) => handelBackToCart(e)}
        >
          {window.screen.width >= 320 && window.screen.width <= 425 ? (
            <img src={Images.image9} alt="backicon" />
          ) : (
            "Back to Cart"
          )}
        </button>

        <div className={styles.sec_name}>
          <span className={styles.title}>Checkout</span>
        </div>

        <div className={styles.checkout_main_conatiner}>
          <div className={styles.user}>
            <div className={styles.address}>
              <p className={styles.address_title}>1. Delivery address</p>
              <div className={styles.user_info}>
                <p className={styles.username}>{userName}</p>
                <div className={styles.textarea_container}>
                  <textarea
                    rows={3}
                    cols={37}
                    placeholder="Enter your address..."
                    value={address}
                    onChange={(e) => handelSetAddress(e)}
                    style={error && address.length === 0 ? errColor : null}
                  />
                  {error && address.length === 0 && (
                    <p className={styles.error}>*Required Field</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.horizontal_divider}></div>

            <div className={styles.pyment_mode}>
              <p className={styles.payment_title}>2. Payment method</p>
              <div className={styles.select_container}>
                <select
                  className={styles.payment_method}
                  value={paymentMethod}
                  onChange={(e) => handelSetPayment(e)}
                  style={error && address.length === 0 ? errColor : null}
                >
                  <option value="">Mode of payment</option>
                  <option value="Pay on Delivery">Pay on Delivery</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                </select>
                {error && paymentMethod.length === 0 && (
                  <p className={styles.error}>*Required Field</p>
                )}
              </div>
            </div>

            <div className={styles.horizontal_divider}></div>

            <div className={styles.reviews}>
              <p className={styles.review_title}>
                3. Review items and delivery
              </p>
              <div className={styles.review_container}>
                <div className={styles.product_img_container}>
                  {cartItems?.map((item, i) => (
                    <div
                      key={i}
                      className={styles.img_container}
                      onClick={() => handelSelectedItem(i)}
                    >
                      <img src={item.images[0]} alt={item.brand} />
                    </div>
                  ))}
                </div>

                <div className={styles.description}>
                  <p className={styles.product_name}>
                    {cartItems[selectedInd]?.brand}{" "}
                    {cartItems[selectedInd]?.model}
                  </p>
                  <p className={styles.product_color}>
                    Colour : {cartItems[selectedInd]?.color}
                  </p>
                  <p className={styles.delivery_title}>Estimated delivery :</p>
                  <p className={styles.date}>
                    {estimatedDate} - FREE Standard Delivery
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.horizontal_divider}></div>

            <div className={styles.mini_placeorder}>
              <button onClick={(e) => handelPlaceOrder(e)}>
                Place your order
              </button>
              <div className={styles.total_amount}>
                <p className={styles.total}>
                  Order Total : ₹{totalMRP.toFixed(2)}
                </p>
                <p className={styles.term_condition}>
                  By palcing your order, you agree to Musicart privacy notice
                  and conditions of use.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.final_place_order}>
            <div className={styles.first}>
              <button
                onClick={(e) => handelPlaceOrder(e)}
                className={styles.final_palce_btn}
              >
                Place your order
              </button>
              <p className={styles.final_term}>
                By palcing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
              <div className={styles.horizontal_divider}></div>
            </div>

            <div className={styles.orderSummary}>
              <p className={styles.orderSummary_title}>Order Summary</p>
              <div className={styles.delivery_details}>
                <p className={styles.item}>
                  <span>Items :</span>
                  <span>₹{totalMRP.toFixed(2)}</span>
                </p>
                <p className={styles.item}>
                  <span>Delivery :</span>
                  <span>₹ {deliveryCharge.toFixed(2)}</span>
                </p>
              </div>
              <div className={styles.horizontal_divider}></div>
            </div>

            <div className={styles.total_order}>
              <span className={styles.heading}>Order Total :</span>
              <span className={styles.totalPrice}>
                ₹{(totalMRP + deliveryCharge).toFixed(2)}
              </span>
            </div>

            <button
              onClick={(e) => handelPlaceOrder(e)}
              className={styles.final_palce}
            >
              Place your order
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default CheckOut;
