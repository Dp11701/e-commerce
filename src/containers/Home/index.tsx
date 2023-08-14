import React, { useState } from "react";
import { Slider } from "../../components/common/Slider";
import { Order } from "../../components/common/Order";
import { Category } from "../../components/common/Category";
import Product from "../../components/common/Product";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { Button, Typography, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Home() {
  const navigate = useNavigate();

  const [select, setSelect] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };
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
        <div className={styles.productNavBar}>
          <Typography className={styles.sortText}>Sorted by</Typography>
          <div className={styles.sortBtn}>
            <Button className={styles.subBtnItem}>Connection</Button>
            <Button className={styles.subBtnItem}>New</Button>
            <Button className={styles.subBtnItem}>Best seller</Button>
            <Select
              className={styles.selectItem}
              labelId="demo-select-small-label"
              id="select"
              value={select}
              label="Price"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>high to low</MenuItem>
              <MenuItem value={20}>low to high</MenuItem>
            </Select>
          </div>
          <Button className={styles.showBtn} onClick={handleShowBtn}>
            Show all
          </Button>
        </div>
        <Product />
      </div>
      <Footer />
    </>
  );
}
