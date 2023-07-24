import React, { useState } from "react";
import styles from "./style.module.css";
import back from "../../assets/images/my-account.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to get the navigate function

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("user");
    if (storedUserData === null) {
      alert("User data not found. Please sign up first.");
      return;
    }

    const parsedUserData = JSON.parse(storedUserData);

    if (
      (formData.emailOrUsername === parsedUserData.email ||
        formData.emailOrUsername === parsedUserData.username) &&
      formData.password === parsedUserData.password
    ) {
      dispatch(authActions.login());
    } else {
      alert("Invalid credentials. Please try again.");
    }
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
