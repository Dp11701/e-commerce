import React from "react";
import image from "../../assets/images/input.png";
import styles from "./style.module.css";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";

const Account: React.FC = () => {
  return (
    <>
      <Header />
      <section className={styles.accountInfo}>
        <div className={`${styles.container} ${styles.boxItems}`}>
          <h1>Account Information</h1>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={`${styles.img} ${styles.flexCenter}`}>
                <input type="file" accept="image/*" src={image} alt="imgs" />
                <img src={image} alt="" className={styles["image-preview"]} />
              </div>
            </div>
            <div className={styles.right}>
              <label>Username</label>
              <input type="text" required />
              <label>Email</label>
              <input type="text" required />
              <label>Password *</label>
              <input type="text" required />
              <button className={styles.button}>Update</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Account;
