import React from "react";
import { order } from "../../../assets/data/data";
import styles from "./style.module.css";

interface Item {
  id: number;
  title: string;
  desc: string;
}

export const Order: React.FC = () => {
  return (
    <>
      <section className={styles.order}>
        <div className="container grid boxItems">
          {order.map((item: Item) => (
            <div className={`${styles.box} flexCenter`} key={item.id}>
              <div className={styles.num}>
                <h1>{item.id}</h1>
              </div>
              <div className="text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
