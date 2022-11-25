import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost } from "../../store/reducer";

import Modal from "../Modal/Modal";

import compass from "../../assets/compass.svg";
import search from "../../assets/search.svg";
import heart from "../../assets/heart.svg";
import home from "../../assets/home.svg";
import logo from "../../assets/logo.png";
import msg from "../../assets/msge.svg";
import add from "../../assets/add.svg";

import "./NavBar.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [modalActive, setModalActive] = useState(false);

  const handleAddPost = (imageUrl, description) => {
    const post = {
      image: imageUrl,
      description: description,
      comments: [],
      user: profile,
    };
    dispatch(addPost(post));
    setModalActive(false);
  };

  return (
    <div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        onSubmit={handleAddPost}
        title="Создание Публикации"
        button="Поделиться"
      />
      <div className="header">
        <div className="nav-bar">
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
