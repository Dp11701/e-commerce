import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import { product } from "../../../assets/data/data";
import styles from "./style.module.css";

interface CartItem {
  id: number;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
  cover: string;
}

interface ProductCartProps {
  id: number;
  cover: string;
  name: string;
  price: number;
}

const ProductCart: React.FC<ProductCartProps> = ({
  id,
  cover,
  name,
  price,
}) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    const item: CartItem = {
      id,
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
        <Link to={`/product/${id}`}>
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
  return (
    <section className={styles.product}>
      <div className="container grid3">
        {product.map((item) => (
          <ProductCart
            key={item.id}
            id={item.id}
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
