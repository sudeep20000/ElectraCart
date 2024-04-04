import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { TbLogin2 } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import Images from "../../images/Images";
import styles from "./NavBar.module.css";

const NavBar = ({
  isTokenPresent,
  onSetToken,
  tabOpen,
  cartItems,
  selectedItem,
}) => {
  const [userName, setUserName] = useState("");
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const itemLength = cartItems.length || 0;

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) return;
    if (details && details.userName) setUserName(details.userName);
  }, []);

  useEffect(() => {
    const getPathName = () => {
      const pathname = window.location.pathname;
      setPath(pathname);
    };
    getPathName();
  }, []);

  const getInitials = (username) => {
    const nameParts = username.split(" ");
    const initials = nameParts.map((part) => part[0].toUpperCase());
    return initials.join("");
  };

  const handelLogout = () => {
    localStorage.removeItem("details");
    const pathname = window.location.pathname;
    if (
      pathname === "/View_Cart" ||
      pathname === "/Checkout" ||
      pathname === "/Invoice"
    )
      navigate("/authenticate");
    onSetToken(false);
  };

  const handelUserInfoClick = () => {
    setOpenUserDetails((prev) => !prev);
  };

  const handelOpenCart = () => {
    navigate("/View_Cart");
  };

  const decodePath = (path) => {
    let modifiedPath = "";
    if (path.length === 1 && tabOpen === "default") return modifiedPath;
    if (path.length === 1 && tabOpen === "selectedItem")
      return `/${selectedItem.brand} ${selectedItem.model}`;

    if (path.length > 1) modifiedPath = path.split("_").join(" ");
    return modifiedPath;
  };

  const handelGoInvoice = () => {
    navigate("/Invoice");
  };

  return (
    <>
      {path === "/success" &&
      window.screen.width >= 320 &&
      window.screen.width <= 425 ? null : (
        <div className={styles.nav_container}>
          <div className={styles.navbar}>
            <div className={styles.logo_container}>
              <div className={styles.logo_title}>
                <img src={Images.image1} alt="logo" />
                <p className={styles.title}>Musicart</p>
              </div>
              {path !== "/success" && (
                <>
                  <p className={styles.path}>Home {decodePath(path)}</p>
                  {isTokenPresent && tabOpen === "default" && (
                    <span className={styles.invoice} onClick={handelGoInvoice}>
                      Invoice
                    </span>
                  )}
                </>
              )}
            </div>
            {isTokenPresent && path !== "/Checkout" && path !== "/success" && (
              <div className={styles.user_details}>
                <div className={styles.cart} onClick={handelOpenCart}>
                  <div className={styles.cart_icon}>
                    <MdOutlineShoppingCart size={24} color="white" />
                  </div>
                  <p className={styles.item_count}>
                    <span>View Cart</span> <span>{itemLength}</span>
                  </p>
                </div>
                {tabOpen === "default" && (
                  <div
                    className={styles.user_info}
                    onClick={handelUserInfoClick}
                  >
                    {userName && getInitials(userName)}
                  </div>
                )}
                {openUserDetails && (
                  <div className={styles.dropdown_div}>
                    <div className={styles.user_name}>{userName}</div>
                    <div className={styles.separator}></div>
                    <div className={styles.logout} onClick={handelLogout}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.mobile_navbar}>
            <div className={styles.home_icon} onClick={() => navigate("/")}>
              <span className={styles.icon}>
                <GoHome size={30} />
              </span>
              <span className={styles.icon_title}>Home</span>
            </div>

            <div className={styles.cart_icon} onClick={handelOpenCart}>
              <span className={styles.icon}>
                <MdAddShoppingCart size={30} />
                <span className={styles.cart_count}>{itemLength}</span>
              </span>
              <span className={styles.icon_title}>Cart</span>
            </div>

            {isTokenPresent && (
              <div className={styles.invoice_icon} onClick={handelGoInvoice}>
                <span className={styles.icon}>
                  <LiaFileInvoiceSolid size={30} />
                </span>
                <span className={styles.icon_title}>Invoice</span>
              </div>
            )}

            {isTokenPresent ? (
              <div className={styles.login_icon} onClick={handelLogout}>
                <span className={styles.icon}>
                  <BiLogOut size={30} />
                </span>
                <span className={styles.icon_title}>Logout</span>
              </div>
            ) : (
              <div
                className={styles.logout_icon}
                onClick={() => navigate("/authenticate")}
              >
                <span className={styles.icon}>
                  <TbLogin2 size={30} />
                </span>
                <span className={styles.icon_title}>Login</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
