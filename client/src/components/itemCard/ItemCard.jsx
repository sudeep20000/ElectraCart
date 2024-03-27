import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ItemCard.module.css";

const ItemCard = ({
  product,
  activeLayout,
  isTokenPresent,
  handelSeletedItem,
  handleComponentMount,
}) => {
  const handelAddToCart = async (e) => {
    e.stopPropagation();

    const {
      about,
      available,
      brand,
      color,
      features,
      images,
      model,
      price,
      rating,
      reviews,
      type,
    } = product;

    const details = JSON.parse(localStorage.getItem("details"));
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/verified/addItem`,
        {
          about,
          available,
          brand,
          color,
          features,
          images,
          model,
          price,
          rating,
          reviews,
          type,
        },
        { headers }
      );
      handleComponentMount();
      console.log(`${data.itemName} added to cart`);
      toast.success(`${data.itemName} added to cart`, {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-center",
      });
    }
  };

  const setSeletedItem = () => {
    if (activeLayout === "list") return;
    handelSeletedItem(product, "selectedItem");
  };

  const handelClickDetails = (e) => {
    e.preventDefault();
    handelSeletedItem(product, "selectedItem");
  };

  const convertIntoPara = ([...arr]) => {
    return arr.join(", ");
  };

  return (
    <div
      className={`${activeLayout === "grid" ? styles.card : styles.list}`}
      onClick={setSeletedItem}
    >
      <div className={styles.image}>
        <img src={product.images[0]} alt={product.model} />
        {isTokenPresent && (
          <div className={styles.add_cart} onClick={(e) => handelAddToCart(e)}>
            <MdAddShoppingCart color="green" size={24} />
          </div>
        )}
      </div>

      <div
        className={`${
          activeLayout === "grid" ? styles.grid_info : styles.list_info
        }`}
      >
        <p
          className={`${
            activeLayout === "grid"
              ? styles.grid_model_name
              : styles.list_model_name
          }`}
        >
          {product.brand} {product.model}
        </p>
        <p className={styles.price}>Price - ₹ {product.price}</p>
        <p className={styles.type}>
          {product.color} | {product.type} headphone
        </p>
        {activeLayout === "list" && (
          <p className={styles.details}>{convertIntoPara(product.features)}</p>
        )}
        {activeLayout === "list" && (
          <button className={styles.details_btn} onClick={handelClickDetails}>
            Details
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ItemCard;
