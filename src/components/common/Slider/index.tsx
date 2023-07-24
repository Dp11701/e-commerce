import React from "react";
import styles from "./style.module.css";
import { slide } from "../../../assets/data/data";

interface SlideItem {
  image: string;
}

export const Slider: React.FC = () => {
  return (
    <>
      <div className={styles.slider}>
        <div className="container grid">
          {slide.map((item: SlideItem, i: number) => (
            <div className="box" key={i}>
              <div className="img">
                <img src={item.image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
