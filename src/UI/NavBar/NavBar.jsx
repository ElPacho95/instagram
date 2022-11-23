import logo from "../../assets/LOGO.png";
import home from "../../assets/home.svg";
import msg from "../../assets/msg.svg";
import add from "../../assets/add.svg";
import compass from "../../assets/compass.svg";
import heart from "../../assets/heart.svg";
import search from "../../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import "./NavBar.scss";
import React, { useState } from "react";
import arrow from "../../assets/Arrow 1.svg";
import emojis from "../../assets/emojis.svg";
import { addPost } from "../../store/reducer";

const NavBar = () => {
  const profile = useSelector((state) => state.profile);
  const [modalActive, setModalActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleAddPost = () => {
    const Post = {
      image: imageUrl,
      description: description,
      comments: [],
      user: profile,
    };
    dispatch(addPost(Post));
    setModalActive(false);
  };

  return (
    <div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className="modal-header">
          <img onClick={() => setModalActive(false)} src={arrow} alt="" />
          <h1>Создание публикации</h1>
          <button onClick={handleAddPost}>
            <span>Поделиться</span>
          </button>
        </div>
        <div className="form-block">
          <div className="account">
            <div className="account__img">
              <img src={profile.profile_img} alt="" />
            </div>
            <div>{profile.username}</div>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            type="text"
            placeholder="Добавьте подпись..."
          />
          <div className="smile">
            <img src={emojis} alt="" />
            <p className="alpha">{description?.length}/2,200</p>
          </div>
        </div>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.currentTarget.value)}
          className="url"
          type="text"
          placeholder="Введите URL-картинки"
        />
      </Modal>
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
