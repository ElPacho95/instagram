import { useState } from "react";
import { useSelector } from "react-redux";

import emojis from "../../assets/emojis.svg";
import arrow from "../../assets/arrow.svg";

import "./Modal.scss";

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
    <div className="modal" onClick={() => setActive(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img onClick={() => setActive(false)} src={arrow} alt="" />
          <h1>{title}</h1>
          <button onClick={() => onSubmit(imageUrl, description)}>
            <span>{button}</span>
          </button>
        </div>
        <div className="form-block">
          <div className="account">
            <div className="user-pic">
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
