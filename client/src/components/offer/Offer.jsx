import Image from "../../images/Images";
import styles from "./Offer.module.css";

const Offer = () => {
  return (
    <div className={styles.offer}>
      <div className={styles.offer_heading}>
        <p>Grab upto 50% off on selected headphones</p>
      </div>
      <img src={Image.image2} alt="logo" />
    </div>
  );
};

export default Offer;
