// src/components/Login.js

import React, { useState } from "react";
import styles from "./style.module.css";
import back from "../../assets/images/my-account.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Gọi API đăng nhập
    axios
      .post("http://localhost:5001/api/users/login", {
        email: formData.emailOrUsername,
        password: formData.password,
      })
      .then((response: any) => {
        // Xử lý phản hồi thành công
        if (response.status === 200) {
          // Lưu thông tin đăng nhập vào localStorage hoặc state của ứng dụng (tuỳ thuộc vào thiết kế ứng dụng của bạn)
          localStorage.setItem("accessToken", response.data.accessToken);
          dispatch(authActions.login());
        } else {
          // Xử lý trường hợp đăng nhập không thành công
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch((error: any) => {
        // Xử lý phản hồi lỗi
        console.error("Đăng nhập thất bại:", error);
        alert("An error occurred during login. Please try again later.");
      });
  };

  const handleSignUpButton = () => {
    navigate("/signup");
  };

  return (
    <>
      <section className={styles.login}>
        <div className="container">
          <div className={styles.backImg}>
            <img src={back} alt="" />
            <div className={styles.text}>
              <h3>Login</h3>
              <h1>My Account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Email or Username</span>
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              required
            />
            <span>Password *</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="button">
              Log in
            </button>
            <button
              type="button"
              className={styles.signUpButton}
              onClick={handleSignUpButton}
            >
              SignUp?
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
