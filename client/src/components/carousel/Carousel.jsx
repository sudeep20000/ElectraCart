import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div>
        <ul style={{ display: "flex", justifyContent: "center" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => <CustomDot />,
  };

  return (
    <Slider {...settings}>
      {images.map((img, i) => (
        <div key={i} className={styles.image}>
          <img src={img} alt="products" />
        </div>
      ))}
    </Slider>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles["custom-arrow"]} ${styles["custom-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles["custom-arrow"]} ${styles["custom-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const CustomDot = (props) => {
  return (
    <li>
      <button {...props} className={styles["custom-dot"]}></button>
    </li>
  );
};

export default Carousel;
