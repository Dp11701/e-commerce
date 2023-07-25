import React from "react";
import Product from "../../components/common/Product";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";

const DetailsPages: React.FC = () => {
  return (
    <>
      <Header />
      <Product/>
      <Footer />
    </>
  );
};

export default DetailsPages;
