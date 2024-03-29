import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiBag } from "react-icons/pi";
import Header from "../header/Header";
import NavBar from "../navbar/NavBar";
import styles from "./Cart.module.css";
import Footer from "../footer/Footer";

const Cart = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [index, setIndex] = useState(null);
  const totalMRP = cartItems?.reduce((total, item) => {
    const quantity = itemCount[item.model];
    return item.price * quantity + total;
  }, 0);
  const convenienceFee = totalMRP ? totalMRP * (1 / 50) : 0;
  const totalItems = (itemCountObj) => {
    let values = Object.values(itemCountObj);
    let totalItem = values.reduce((sum, val) => sum + val, 0);
    return new Array(totalItem);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    if (details.token) setIsTokenPresent(true);
  }, []);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));

    if (!details) return;
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    const fetchAllCartItem = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/verified/filteredCartItems`,
          { headers }
        );
        const { countsObj, uniqueArray } = data.duplicatesCount;
        setCartItems(uniqueArray);
        setItemCount(countsObj);
        console.log(data.duplicatesCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCartItem();
  }, []);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));

    if (!details || !selectedItem) return;
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    const editProductQuantity = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/verified/editProductQuantity`,
          {
            productName: selectedItem,
            countObj: itemCount,
            productObj: cartItems[index],
          },
          { headers }
        );
        setSelectedItem("");
        toast.success(`${data.productName}'s quantity has updated`, {
          position: "top-center",
        });
        console.log(data.productName);
      } catch (error) {
        console.log(error);
        setSelectedItem("");
        toast.error(error.response.data.msg, {
          position: "top-center",
        });
      }
    };
    editProductQuantity();
  }, [cartItems, index, itemCount, selectedItem]);

  const handelTokenPresent = (isPresent) => {
    setIsTokenPresent(isPresent);
  };

  const handelBackToProduct = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const calcTotalPratItem = (modelName, price) => {
    let quantity = itemCount[modelName];
    return quantity * price;
  };

  const handleChangeOption = (e, index, modelName) => {
    setItemCount({ ...itemCount, [modelName]: Number(e.target.value) });
    setIndex(index);
    setSelectedItem(modelName);
  };

  const gotoCheckOut = (e) => {
    e.preventDefault();
    navigate("/Checkout");
  };

  return (
    <div className={styles.cart_div}>
      <Header
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={"selectedItem"}
      />
      <NavBar
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={"selectedItem"}
        cartItems={itemCount ? totalItems(itemCount) : []}
      />

      <div className={styles.main}>
        <button
          className={styles.back_btn}
          onClick={(e) => handelBackToProduct(e)}
        >
          Back to products
        </button>

        <div className={styles.sec_name}>
          <span className={styles.icon_container}>
            <PiBag size={35} />
          </span>
          <span className={styles.title}>My Cart</span>
        </div>

        {cartItems.length > 0 && (
          <div className={styles.main_cart_info}>
            <div className={styles.cart_info}>
              <div className={styles.horizontal_divider}></div>
              <div className={styles.product_info}>
                {cartItems.map((item, i) => (
                  <div className={styles.details} key={i}>
                    <div className={styles.img_container}>
                      <img src={item.images[0]} alt={item.model} />
                    </div>
                    <div className={styles.product_brand}>
                      <span className={styles.product_name}>
                        {item.brand} {item.model}
                      </span>
                      <span className={styles.color}>Color : {item.color}</span>
                      <span className={styles.availability}>
                        {item.available ? "in Stock" : "out of Stock"}
                      </span>
                    </div>
                    <div className={styles.price}>
                      <span className={styles.price_title}>Price</span>
                      <span className={styles.amount}>₹{item.price}</span>
                    </div>
                    <div className={styles.quantity}>
                      <span>Quantity</span>
                      <select
                        value={itemCount[item.model]}
                        onChange={(e) => handleChangeOption(e, i, item.model)}
                      >
                        {Array.from({ length: 8 }, (_, i) => i + 1).map(
                          (num, i) => (
                            <option value={num} key={i}>
                              {num}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className={styles.total}>
                      <span>Total</span>
                      <span>
                        ₹
                        {itemCount
                          ? calcTotalPratItem(item.model, item.price)
                          : 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.horizontal_divider}></div>
              <div className={styles.count_sec}>
                <p>{cartItems.length} item</p>
                <p>₹{totalMRP.toFixed(2)}</p>
              </div>
            </div>

            <div className={styles.vertical_divider}></div>

            <div className={styles.price_details}>
              <div className={styles.discount_sec}>
                <p className={styles.sec_title}>PRICE DETAILS</p>
                <div className={styles.amountCal}>
                  <p>
                    <span>Total MRP</span>
                    <span>₹{totalMRP.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>Discount on MRP</span>
                    <span>₹0</span>
                  </p>
                  <p>
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <div className={styles.place_order}>
                <div className={styles.total_amount}>
                  <p>Total Amount</p>
                  <span>₹{totalMRP + convenienceFee}</span>
                </div>
                <button
                  className={styles.place_order_btn}
                  onClick={(e) => gotoCheckOut(e)}
                >
                  PALCE ORDER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Cart;

// toast.error(error.response.data.msg, {
//   position: "top-center",
// });
