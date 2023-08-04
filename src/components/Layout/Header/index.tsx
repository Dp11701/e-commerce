import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { GrHelp } from "react-icons/gr";
import { BiLogOut, BiShoppingBag } from "react-icons/bi";
import { ReactComponent as Medicine } from "../../../assets/images/Medicine.svg";
import { cartActions } from "../../../store/cartSlice";
import { authActions } from "../../../store/authSlice";
import styles from "./style.module.css";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const closeCard = () => {
    setCardOpen(false);
  };

  const closeProfile = () => {
    setProfileOpen(false);
  };

  const quantity = useSelector((state: any) => state.cart.totalQuantity);
  const cartItems = useSelector((state: any) => state.cart.itemsList);

  let total = 0;
  const itemsLists = useSelector((state: any) => state.cart.itemsList);
  itemsLists.forEach((item: any) => {
    total += item.totalPrice;
  });

  const dispatch = useDispatch();

  const defaultCoverImageUrl = "default_cover.jpg";

  const incCartitems = (id: number, name: string, price: number) => {
    dispatch(
      cartActions.addToCart({
        id,
        name,
        price,
        quantity: 1,
        totalPrice: price,
        cover: defaultCoverImageUrl,
      })
    );
  };
  const descCartitems = (id: number) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    dispatch(authActions.logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.active : ""}`}>
        <div className="scontainer flex">
          <div className="logo">
            <Link to="/">
              <Medicine />
            </Link>
          </div>
          <div className={`${styles.search} flex`}>
            <AiOutlineSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="account flexCenter">
            <div className={styles.card} onClick={() => setCardOpen(!cardOpen)}>
              <BiShoppingBag className={styles.cardIcon} />
              <span className="flexCenter">{quantity}</span>
            </div>
            <div className={styles.profile}>
              {true ? (
                <>
                  <button
                    className={styles.img}
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                      alt=""
                    />
                  </button>

                  {profileOpen && (
                    <div
                      className={`${styles.openProfile} ${styles.boxItems}`}
                      onClick={closeProfile}
                    >
                      <div className={styles.image}>
                        <Link to="/account">
                          <div className="img">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                              alt=""
                            />
                          </div>
                        </Link>
                        <div className={styles.text}>
                          <h4>Eden Smith</h4>
                          <label htmlFor="">Los Angeles, CA</label>
                        </div>
                      </div>
                      <Link to="/login">
                        <button className={styles.box}>
                          <IoSettingsOutline className={styles.icon} />
                          <h4>My Account</h4>
                        </button>
                      </Link>
                      <button className={styles.box}>
                        <BsBagCheck className={styles.icon} />
                        <h4>My Order</h4>
                      </button>
                      <button className={styles.box}>
                        <AiOutlineHeart className={styles.icon} />
                        <h4>Wishlist</h4>
                      </button>
                      <button className={styles.box}>
                        <GrHelp className={styles.icon} />
                        <h4>Help</h4>
                      </button>
                      <button className={styles.box} onClick={logoutHandler}>
                        <BiLogOut className={styles.icon} />
                        <h4>Log Out</h4>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button>My Account</button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={cardOpen ? styles.overlay : styles.nonoverlay}></div>

      <div className={cardOpen ? styles.cartItem : styles.cardhide}>
        <div className={`${styles.title} ${styles.flex}`}>
          <h2>Shopping Cart</h2>
          <button onClick={closeCard}>
            <AiOutlineClose className={styles.icon} />
          </button>
        </div>
        {cartItems.map((item: any) => (
          <div className={styles.cardList} key={item.id}>
            <div className={styles.cartContent}>
              <div className={styles.img}>
                <img src={item.cover} alt="" />
                <button
                  className={`${styles.remove} ${styles.flexCenter}`}
                  onClick={() => descCartitems(item.id)}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <div className={styles.details}>
                <p>{item.name}</p>
                <label htmlFor="">Unit Price ${item.price}</label>

                <div className={styles.price}>
                  <div className={`${styles.qty} flexCenter`}>
                    <button
                      className={styles.plus}
                      onClick={() =>
                        incCartitems(item.id, item.name, item.price)
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                    <button className={styles.num}>{item.quantity}</button>
                    <button
                      className={styles.minus}
                      onClick={() => descCartitems(item.id)}
                    >
                      <AiOutlineMinus />
                    </button>
                  </div>
                  <div className={styles.priceTitle}>${item.totalPrice}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.checkOut}>
          <button>
            <span>Priced To Checkout</span>
            <label htmlFor="">${total}</label>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
