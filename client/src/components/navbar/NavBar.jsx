import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import Images from "../../images/Images";
import styles from "./NavBar.module.css";

const NavBar = ({ isTokenPresent, onSetToken, tabOpen, cartItems }) => {
  const [userName, setUserName] = useState("");
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const itemLength = cartItems.length;

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
    if (path.length === 1) return modifiedPath;
    if (path.length > 1) {
      modifiedPath = path.split("_").join(" ");
    }
    return modifiedPath;
  };

  return (
    <div className={styles.nav_container}>
      <div className={styles.navbar}>
        <div className={styles.logo_container}>
          <div className={styles.logo_title}>
            <img src={Images.image1} alt="logo" />
            <p className={styles.title}>Musicart</p>
          </div>
          <p className={styles.path}>Home {decodePath(path)}</p>
          {isTokenPresent && tabOpen === "default" && (
            <p className={styles.invoice}>Invoice</p>
          )}
        </div>
        {isTokenPresent && (
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
              <div className={styles.user_info} onClick={handelUserInfoClick}>
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
    </div>
  );
};

export default NavBar;
