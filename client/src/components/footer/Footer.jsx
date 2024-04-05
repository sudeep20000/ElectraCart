import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      {window.screen.width >= 320 &&
        window.screen.width <= 425 &&
        window.location.pathname === "/authenticate" && (
          <footer className={styles.mobile_footer}>
            <p className={styles.footer}>Musicart | All rights reserved</p>
          </footer>
        )}
      <footer>
        <p className={styles.footer}>Musicart | All rights reserved</p>
      </footer>
    </>
  );
};

export default Footer;
