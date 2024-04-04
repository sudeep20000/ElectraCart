import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Images from "../../images/Images";
import Header from "../header/Header";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import BASE_URL from "../../service/helper";
import Loader from "../loader/Loader";
import styles from "./Invoice.module.css";

const Invoice = () => {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [tabOpen, setTabOpen] = useState("selectedItem");
  const [ind, setInd] = useState(null);
  const [selectedInd, setSelectedInd] = useState(0);
  const [loading, setLoading] = useState(true);
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
        const { data } = await axios.get(`${BASE_URL}/verified/cartItems`, {
          headers,
        });
        setCartItems(data.cartItem);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCartItem();
  }, []);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));

    if (!details) return;
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    const fetchInvoiceData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/verified/invoice`, {
          headers,
        });
        setLoading(false);
        setInvoiceData(data.invoiceData);
        console.log(data.invoiceData);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchInvoiceData();
  }, [invoiceData.length]);

  const handelTokenPresent = (isPresent) => {
    setIsTokenPresent(isPresent);
  };

  const handelBackToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handelChangeTabAndSetIndValue = (i) => {
    setInd(i);
    setTabOpen("default");
  };

  const handelBackToInvoice = (e) => {
    e.preventDefault();
    setTabOpen("selectedItem");
  };

  const handelSelectedItem = (ind) => {
    setSelectedInd(ind);
  };

  return (
    <div className={styles.invoice_main}>
      <div className={styles.logo}>
        <img src={Images.image1} alt="icon" />
        <span>Musicart</span>
      </div>

      <Header
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={"selectedItem"}
      />
      <NavBar
        isTokenPresent={isTokenPresent}
        onSetToken={handelTokenPresent}
        tabOpen={"selectedItem"}
        cartItems={cartItems}
      />

      {tabOpen === "selectedItem" ? (
        <div className={styles.main}>
          <button
            className={styles.back_btn}
            onClick={(e) => handelBackToHome(e)}
          >
            {window.screen.width >= 320 && window.screen.width <= 425 ? (
              <img src={Images.image9} alt="backicon" />
            ) : (
              "Back to Home"
            )}
          </button>

          <div className={styles.sec_name}>
            <span className={styles.invoice_img_container}>
              <img
                src={Images.image4}
                alt="invoice"
                className={styles.invoice_img}
              />
            </span>
            <span className={styles.title}>My Invoices</span>
          </div>

          {loading ? (
            <div className={styles.loader_container}>
              <Loader />
            </div>
          ) : (
            <div className={styles.invoice_container}>
              {invoiceData.length > 0 ? (
                <>
                  {invoiceData.map((obj, i) => (
                    <div key={i} className={styles.main_card}>
                      <div className={styles.list_card}>
                        <div className={styles.left}>
                          <img src={Images.image4} alt="invoice" />
                          <div className={styles.user_info}>
                            <p className={styles.userName}>{obj.name}</p>
                            <p className={styles.address}>{obj.address}</p>
                          </div>
                        </div>

                        <span
                          className={styles.view_invoice}
                          onClick={() => handelChangeTabAndSetIndValue(i)}
                        >
                          View Invoice
                        </span>
                      </div>

                      <div className={styles.horizontal_divider}></div>
                    </div>
                  ))}
                </>
              ) : (
                <span className={styles.empty_invoice}>
                  <img src={Images.image6} alt="no invoice pic" />
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.different_main}>
          <button
            className={styles.back_btn}
            onClick={(e) => handelBackToInvoice(e)}
          >
            {window.screen.width >= 320 && window.screen.width <= 425 ? (
              <img src={Images.image9} alt="backicon" />
            ) : (
              "Back to Invoice"
            )}
          </button>

          <div className={styles.individual_sec_name}>
            <span className={styles.title}>Invoice</span>
          </div>

          <div className={styles.invoice_main_conatiner}>
            <div className={styles.user}>
              <div className={styles.address}>
                <p className={styles.address_title}>1. Delivery address</p>
                <div className={styles.user_info_individual}>
                  <p className={styles.username}>{invoiceData[ind]?.name}</p>
                  <div className={styles.textarea_container}>
                    <textarea
                      rows={3}
                      cols={55}
                      value={invoiceData[ind].address}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.horizontal_div}></div>

              <div className={styles.payment_mode}>
                <p className={styles.payment_title}>2. Payment method</p>
                <div className={styles.select_container}>
                  <select
                    className={styles.payment_method}
                    value={invoiceData[ind].paymentMethod}
                    disabled
                  >
                    <option value="" hidden>
                      Mode of payment
                    </option>
                    <option value="Pay on Delivery">Pay on Delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>

              <div className={styles.horizontal_div}></div>

              <div className={styles.reviews}>
                <p className={styles.review_title}>
                  3. Review items and delivery
                </p>
                <div className={styles.review_container}>
                  <div className={styles.product_img_container}>
                    {invoiceData[ind].uniqueCartItems.map((item, i) => (
                      <div
                        key={i}
                        className={styles.img_container}
                        onClick={() => handelSelectedItem(i)}
                      >
                        <img src={item.image} alt={item.brand} />
                      </div>
                    ))}
                  </div>

                  <div className={styles.description}>
                    <p className={styles.product_name}>
                      {invoiceData[ind].uniqueCartItems[selectedInd]?.brand}{" "}
                      {invoiceData[ind].uniqueCartItems[selectedInd]?.model}
                    </p>
                    <p className={styles.product_color}>
                      Color :{" "}
                      {invoiceData[ind].uniqueCartItems[selectedInd]?.color}
                    </p>
                    <p className={styles.delivery_title}>
                      Estimated delivery :
                    </p>
                    <p className={styles.date}>
                      {invoiceData[ind].estimatedDate} - FREE Standard Delivery
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.horizontal_div}></div>
            </div>

            <div className={styles.final_place_order}>
              <div className={styles.orderSummary}>
                <p className={styles.orderSummary_title}>Order Summary</p>
                <div className={styles.delivery_details}>
                  <p className={styles.item}>
                    <span>Items :</span>
                    <span>₹{invoiceData[ind].totalMRP.toFixed(2)}</span>
                  </p>
                  <p className={styles.item}>
                    <span>Delivery :</span>
                    <span>₹ {invoiceData[ind].extraCharges.toFixed(2)}</span>
                  </p>
                </div>

                <div className={styles.horizontal_div}></div>
              </div>

              <div className={styles.total_order}>
                <span className={styles.heading}>Order Total :</span>
                <span className={styles.totalPrice}>
                  ₹
                  {(
                    invoiceData[ind].totalMRP + invoiceData[ind].extraCharges
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Invoice;
