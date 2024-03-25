import { TbStarHalfFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { ImStarEmpty } from "react-icons/im";
import styles from "./StarRating.module.css";

const StarRating = ({ rating }) => {
  const renderStar = (index) => {
    if (index < rating) {
      return <FaStar size={24} />;
    } else if (index - rating === 0.5) {
      return <TbStarHalfFilled size={24} />;
    } else {
      return <ImStarEmpty size={24} />;
    }
  };

  const stars = Array.from({ length: 5 }, (_, i) => renderStar(i + 1));

  return (
    <div className={styles.rating}>
      {stars.map((star, i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
};

export default StarRating;
