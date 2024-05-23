import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const [formDataSignIn, setFormDataSignIn] = useState({
    emailOrUsername: "",
    password: "",
  });
  const handleChangeSignIn = (e: any) => {
    const { name, value } = e.target;
    setFormDataSignIn((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmitSignIn = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://e-commerce-backend-iub1.onrender.com/api/users/login", {
        email: formDataSignIn.emailOrUsername,
        password: formDataSignIn.password,
      })
      .then((response: any) => {
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          dispatch(authActions.login());
        } else {
          setLoading(false);
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch((error: any) => {
        console.error("Login failed:", error);
        setLoading(false);
        alert("An error occurred during login. Please try again later.");
      });
  };

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    axios
      .post("https://e-commerce-backend-iub1.onrender.com/api/users/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Registered successfully!");
          setLoading(false);
          localStorage.setItem("userEmail", formData.email);
          localStorage.setItem("userPassword", formData.password);
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

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.container} ${
          isSignUp ? styles["right-panel-active"] : ""
        }`}
      >
        <div
          className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
        >
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" style={{ marginBottom: 30 }}>
              Sign Up
            </button>
            <button
              onClick={() => {
                setIsSignUp(false);
              }}
            >
              Use Account
            </button>
            {loading ? <div className={styles.loading}>loading</div> : ""}
          </form>
        </div>
        <div
          className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
        >
          <form onSubmit={handleSubmitSignIn}>
            <h1>Sign in</h1>

            <input
              type="email"
              placeholder="Email"
              name="emailOrUsername"
              value={formDataSignIn.emailOrUsername}
              onChange={handleChangeSignIn}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formDataSignIn.password}
              onChange={handleChangeSignIn}
              required
            />
            <button type="submit" style={{ marginBottom: 30 }}>
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              Create Account
            </button>
            {loading ? <div className={styles.loading}>loading</div> : ""}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
