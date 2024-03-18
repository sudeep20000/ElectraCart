import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.main_div}>
      <Header />
      <div className={styles.main}></div>
      <Footer />
    </div>
  );
};

export default Home;
