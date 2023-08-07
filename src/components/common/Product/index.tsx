import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import styles from "./style.module.css";
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
  const [products, setProducts] = useState<ProductCartProps[]>([]);
  useEffect(() => {
    axios.get("https://e-commerce-backend-iub1.onrender.com/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <section className={styles.product}>
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
