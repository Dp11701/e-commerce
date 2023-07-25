import React from "react";
import { useParams } from "react-router-dom";
import { product } from "../../../assets/data/data";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";

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
  desc: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: any }>();

  const productId = parseInt(id, 10);
  const selectedProduct: ProductCartProps | undefined = product.find(
    (item) => item.id === productId
  );

  const dispatch = useDispatch();
  const addToCart = () => {
    if (selectedProduct) {
      const item: CartItem = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        cover: selectedProduct.cover,
        quantity: 1,
        totalPrice: selectedProduct.price,
      };
      dispatch(cartActions.addToCart(item));
    }
  };

  if (!selectedProduct) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <Header />
      <section className={`${styles.detail} container`}>
        <img
          src={selectedProduct.cover}
          alt={selectedProduct.name}
          className={styles.img}
        />
        <div className={styles.info}>
          <h2>{selectedProduct.name}</h2>
          <p>{`Price: $${selectedProduct.price}`}</p>
          <h3>{selectedProduct.desc}</h3>
          <button className={styles.add} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
