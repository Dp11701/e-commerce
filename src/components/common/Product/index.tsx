import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import styles from "./style.module.css";
// import { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";

interface CartItem {
  _id: number;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
  cover: string;
}

interface ProductCartProps {
  _id: number;
  cover: string;
  name: string;
  price: number;
}

const ProductCart: React.FC<ProductCartProps> = ({
  _id,
  cover,
  name,
  price,
}) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    const item: CartItem = {
      _id,
      name,
      price,
      cover,
      quantity: 1,
      totalPrice: price,
    };
    dispatch(cartActions.addToCart(item));
  };

  return (
    <div className={`${styles.box} ${styles.boxItems}`} id="product">
      <div className="img">
        <Link to={`/product/${_id}`}>
          <img src={cover} alt="cover" />
        </Link>
      </div>
      <div className={styles.details}>
        <h3>${price}</h3>
        <p>{name}</p>
        <button onClick={addToCart}>
          <AiOutlinePlusCircle />
        </button>
      </div>
    </div>
  );
};

const Product: React.FC = () => {
  // const [select, setSelect] = useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setSelect(event.target.value);
  // };

  const [products, setProducts] = useState<ProductCartProps[]>([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-backend-iub1.onrender.com/api/products")
      .then((response) => {
        // const sortedProducts = [...response.data];
        // if (select === "10") {
        //   sortedProducts.sort((a, b) => b.price - a.price); // Sort high to low
        // } else if (select === "20") {
        //   sortedProducts.sort((a, b) => a.price - b.price); // Sort low to high
        // }
        setProducts(response.data);
      });
  }, []);
  // Filter products based on the search term
  // const filteredProducts = products.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <section className={styles.product}>
      {/* <div className={styles.productNavBar}>
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
            <MenuItem value="10">High to Low</MenuItem>
            <MenuItem value="20">Low to High</MenuItem>
          </Select>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Enter the product..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </div> */}
      <div className="container grid3">
        {products.map((item) => (
          <ProductCart
            key={item._id}
            _id={item._id}
            cover={item.cover}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Product;
