import { useEffect } from "react";
import StarRating from "../../components/starRating/StarRating";
import styles from "./SelectedItem.module.css";

const SelecteItem = ({ item, handelSeletedItem }) => {
  useEffect(() => {}, []);

  const handelBackToProduct = (e) => {
    e.preventDefault();
    handelSeletedItem({}, "default");
  };

  return (
    <div className={styles.seletedItem_div}>
      <button className={styles.back_btn} onClick={handelBackToProduct}>
        Back to products
      </button>
      <p className={styles.description}>{item.about}</p>
      <div className={styles.main_container}>
        <div className={styles.product_images_container}>
          <div className={styles.main_img}>
            <img src={item.images[0]} alt={item.model} />
          </div>

          <div className={styles.secondary_imgs}>
            <div className={styles.inner_img}>
              <img src={item.images[1]} alt={item.model} />
            </div>
            <div className={styles.inner_img}>
              <img src={item.images[2]} alt={item.model} />
            </div>
            <div className={styles.inner_img}>
              <img src={item.images[3]} alt={item.model} />
            </div>
          </div>
        </div>

        <div className={styles.product_details}>
          <div className={styles.details_sec}>
            <p className={styles.product_name}>
              {item.brand} {item.model}
            </p>
            <div className={styles.rating}>
              <StarRating rating={item.rating} />
              <p className={styles.reviews}>
                ({item.reviews} Customer reviews)
              </p>
            </div>
            <p className={styles.price}>Price - ₹ {item.price}</p>
            <p className={styles.color}>
              {item.color} | {item.type} headphone
            </p>
            <div className={styles.about_container}>
              <p className={styles.about}>About this item</p>
              <ul className={styles.features_list}>
                {item.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <p className={styles.available}>
              <span>Available</span> -{" "}
              {item.available ? "In stock" : "Out of stock"}
            </p>
            <p className={styles.brand_name}>
              <span>Brand</span> - {item.brand}
            </p>
          </div>
          <div className={styles.btn_sec}>
            <button className={styles.addBtn}>Add to cart</button>
            <button className={styles.buyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelecteItem;
