import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
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
  desc: string;
}

const ProductDetail: React.FC = () => {
  const { _id } = useParams<{ _id: any }>();
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCartProps | null>(null);

  useEffect(() => {
    //call API get product id
    axios
      .get(`https://e-commerce-backend-iub1.onrender.com/api/products/${_id}`)
      .then((response) => {
        setSelectedProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [_id]);

  const dispatch = useDispatch();
  const addToCart = () => {
    if (selectedProduct) {
      const item: CartItem = {
        _id: selectedProduct._id,
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
