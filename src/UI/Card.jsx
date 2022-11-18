import React from "react";
import heart from "./assets/heart.svg";
import comments from "./assets/comments.svg";
import send from "./assets/share.svg";
import save from "./assets/save.svg";
import emojis from "./assets/emojis.svg";
import { useSelector } from "react-redux";

const Card = (props) => {
  const { likes, description, image } = props;
  const profile = useSelector((state) => state.profile);
  return (
    <div className="post">
      <div className="post__header">
        <div className="account">
          <div className="account__img">
            <img src={profile.profile_img} alt="" />
          </div>
          <div className="userName">{profile.username}</div>
        </div>
        <div className="options">...</div>
      </div>
      <div className="post__img">
        <img src={image} alt="" />
      </div>
      <div className="post__icons">
        <div className="elements">
          <img src={heart} alt="" />
          <img src={comments} alt="" />
          <img src={send} alt="" />
        </div>
        <div className="save">
          <img src={save} alt="" />
        </div>
      </div>

      <div className="userBlock">
        <div className="likes">{likes} likes</div>
        <div className="title">
          <span className="userName">{profile.username}</span>

          <span className="userComment">
            {description.length > 21 && `${description.substring(0, 100)}`}
          </span>
          <span>
            <button className="alpha">... more</button>
          </span>
        </div>

        <p className="alpha">See comments</p>
        <p className="alpha hours">9 HOURS AGO</p>
      </div>
      <div className="form-card">
        <img src={emojis} alt="" />
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </div>
    </div>
  );
};

export default Card;
