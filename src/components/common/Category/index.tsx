import React from "react";
import styles from "./style.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { category } from "../../../assets/data/data";
import Slider from "react-slick";

interface CategoryItem {
  id: number;
  cover: string;
  title: string;
}

interface SampleArrowProps {
  onClick: () => void;
}

function SampleNextArrow(props: SampleArrowProps) {
  const { onClick } = props;
  return (
    <div className={styles.controlBtn} onClick={onClick}>
      <button className={styles.next}>
        <MdNavigateNext className="icon" />
      </button>
    </div>
  );
}

function SamplePrevArrow(props: SampleArrowProps) {
  const { onClick } = props;
  return (
    <div className={styles.controlBtn} onClick={onClick}>
      <button className={styles.prev}>
        <GrFormPrevious className="icon" />
      </button>
    </div>
  );
}

export const Category: React.FC = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <>
      <section className={styles.category}>
        <div className="container">
          <Slider {...settings}>
            {category.map((item: CategoryItem) => (
              <div className="boxs" key={item.id}>
                <div className={`${styles.box} boxItems`}>
                  <img src={item.cover} alt="" />
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};
