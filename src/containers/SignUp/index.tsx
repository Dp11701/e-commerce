import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import back from "../../assets/images/my-account.jpg";
import axios from "axios";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Call the API for user registration
    axios
      .post("https://e-commerce-backend-iub1.onrender.com/api/users/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Registered successfully!");
          navigate("/");
        } else {
          setLoading(false);
          alert("Registration failed. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setLoading(false);
        alert("An error occurred during registration. Please try again later.");
      });
  };

  const handleLoginButton = () => {
    navigate("/");
  };

  return (
    <>
      <section className={styles.register}>
        <div className="container">
          <div className={styles.backImg}>
            <img src={back} alt="" />
            <div className={styles.text}>
              <h3>Register</h3>
              <h1>My Account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Email address</span>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span>Username * </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <span>Password * </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span>Confirm Password * </span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.signUpButton}>
              {loading ? (
                <div className={styles.typewriter}>
                  <div className={styles.slide}>
                    <i></i>
                  </div>
                  <div className={styles.paper}></div>
                  <div className={styles.keyboard}></div>
                </div>
              ) : (
                "Register"
              )}
            </button>
            <button
              type="button"
              className={styles.loginButton}
              onClick={handleLoginButton}
            >
              Do you already have an account? Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
