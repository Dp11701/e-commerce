import React, { useState } from "react";
import styles from "./style.module.css";
import back from "../../assets/images/my-account.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    axios
      .post("https://e-commerce-backend-iub1.onrender.com/api/users/login", {
        email: formData.emailOrUsername,
        password: formData.password,
      })
      .then((response: any) => {
        if (response.status === 200) {
          // Save credentials to localStorage or app state
          localStorage.setItem("accessToken", response.data.accessToken);
          dispatch(authActions.login());
        } else {
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch((error: any) => {
        console.error("Login failed:", error);
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
            <span>Email</span>
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
