import React, { useState } from "react";
import heart from "./assets/heart.svg";
import commentsIcon from "./assets/comments.svg";
import send from "./assets/share.svg";
import save from "./assets/save.svg";
import emojis from "./assets/emojis.svg";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../store/reducer";

const Post = (props) => {
  const { likes, description, image, id } = props;
  const profile = useSelector((state) => state.profile);
  const comments = useSelector((state) =>
    state.posts.map((item) => item.comments)
  );
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  console.log(comments);
  const dispatch = useDispatch();
  return (
    <div className="post">
      <div className="post__header">
        <div className="account">
          <div className="account__img">
            <img src={profile.profile_img} alt="" />
          </div>
          <div className="userName">{profile.username}</div>
        </div>
        <div onClick={() => dispatch(deletePost(id))} className="options">
          ...
        </div>
      </div>
      <div className="post__img">
        <img src={image} alt="" />
      </div>
      <div className="post__icons">
        <div className="elements">
          <img src={heart} alt="" />
          <img src={commentsIcon} alt="" />
          <img src={send} alt="" />
        </div>
        <div className="save">
          <img src={save} alt="" />
        </div>
      </div>

      <div className="userBlock">
        <div className="likes">{!likes ? 0 : likes} likes</div>
        <div className="title">
          <span className="userName">{profile.username}</span>

          <span className="userComment">
            {showDescription ? description : description.substring(0, 100)}
          </span>
          <span>
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="alpha"
            >
              {showDescription ? "close" : "...more"}
            </button>
          </span>
        </div>

        {showComments ? (
          comments.map((item) => {
            return (
              <div className="title">
                <span className="userName">{item.user.username}</span>
                <span className="userComment">{item.text}</span>
              </div>
            );
          })
        ) : (
          <p onClick={() => setShowComments(!showComments)} className="alpha">
            {showComments ? "Close comments" : "See comments"}
          </p>
        )}
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

export default Post;
