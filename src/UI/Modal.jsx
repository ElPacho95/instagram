import React, { useState } from "react";
import arrow from "./assets/Arrow 1.svg";
import emojis from "./assets/emojis.svg";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/reducer";
const Modal = ({ active, setActive }) => {
  const profile = useSelector((state) => state.profile);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const mockPost = {
    image: imageUrl,
    description: description,
    comments: [],
    user: profile,
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img onClick={() => setActive(false)} src={arrow} alt="" />
          <h1>Создание публикации</h1>
          <button onClick={() => dispatch(addPost(mockPost))}>
            <span onClick={() => setActive(false)}>Поделиться</span>
          </button>
        </div>
        <div className="form-block">
          <div className="account">
            <div className="account__img">
              <img src={profile.profile_img} alt="" />
            </div>
            <div>{profile.username}</div>
          </div>
          <input
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            type="text"
            placeholder="Добавьте подпись..."
          />
          <div className="smile">
            <img src={emojis} alt="" />
            <p className="alpha">0/2,200</p>
          </div>
        </div>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.currentTarget.value)}
          className="url"
          type="text"
          placeholder="Введите URL-картинки"
        />
      </div>
    </div>
  );
};

export default Modal;
