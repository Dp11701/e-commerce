import React from "react";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import styles from "./style.module.css";

const Footer: React.FC = () => {
  return (
    <footer className="boxItems">
      <div className="container flex">
        <p>
          Cartsy Medicine - All right reserved - Design & Developed by RedQ, Inc
        </p>
        <div className="social">
          <a
            href="https://www.facebook.com/ngducphu170129/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsFacebook className="icon" />
          </a>
          <a
            href="https://www.instagram.com/dppain11701/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiInstagramFill className="icon" />
          </a>
          <AiFillTwitterCircle className="icon" />
          <AiFillLinkedin className="icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
