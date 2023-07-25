import React from "react";
import { Slider } from "../../components/common/Slider";
import { Order } from "../../components/common/Order";
import { Category } from "../../components/common/Category";
import Product from "../../components/common/Product";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

export default function Home() {
  const navigate = useNavigate();
  const handleShowBtn = () => {
    navigate("/details");
  };
  return (
    <>
      <Header />
      <Slider />
      <Order />
      <Category />
      <div className={`${styles.product} container`}>
        <button type="button" className={styles.showBtn} onClick={handleShowBtn}>Show all</button>
        <Product />
      </div>
      <Footer />
    </>
  );
}
