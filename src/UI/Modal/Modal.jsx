import "./Modal.scss";
import React, { useState } from "react";
import arrow from "../../assets/Arrow 1.svg";
import emojis from "../../assets/emojis.svg";
import { useSelector } from "react-redux";

const Modal = ({
  active,
  setActive,
  defaultImage,
  defaultDescription,
  onSubmit,
  title,
  button,
}) => {
  const profile = useSelector((state) => state.profile);
  const [imageUrl, setImageUrl] = useState(defaultImage || "");
  const [description, setDescription] = useState(defaultDescription || "");

  if (!active) {
    return null;
  }
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img onClick={() => setActive(false)} src={arrow} alt="" />
          <h1>{title}</h1>
          <button onClick={() => onSubmit(imageUrl, description)}>
            <span>{button}</span>
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
      </div>
    </div>
  );
};

export default Modal;
