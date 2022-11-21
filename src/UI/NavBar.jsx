import logo from "./assets/LOGO.jpg";
import home from "./assets/home.svg";
import msg from "./assets/msg.svg";
import add from "./assets/add.svg";
import compass from "./assets/compass.svg";
import heart from "./assets/heart.svg";
import search from "./assets/search.svg";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import React, { useState } from "react";

const NavBar = () => {
  const profile = useSelector((state) => state.profile);
  const [modalActive, setModalActive] = useState(false);
  return (
    <div>
      <Modal active={modalActive} setActive={setModalActive} />
      <div className="header">
        <div className="navBar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="form">
            <div>
              <img src={search} alt="" />
            </div>
            <input type="text" placeholder="Search" />
          </div>
          <div className="icons">
            <button className="btn">
              <img src={home} alt="" />
            </button>
            <button className="btn">
              <img src={msg} alt="" />
            </button>
            <button onClick={() => setModalActive(true)} className="btn">
              <img src={add} alt="" />
            </button>
            <button className="btn">
              <img src={compass} alt="" />
            </button>
            <button className="btn">
              <img src={heart} alt="" />
            </button>
            <button className="profile">
              <img src={profile.profile_img} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
