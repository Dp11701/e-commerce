import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Account,
  DetailsPages,
  Product,
  ProductDetail,
} from "./pages";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const isLoggIn = useSelector((state: any) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/details" element={<DetailsPages />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:_id" element={<ProductDetail />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
