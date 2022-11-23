import React, { useState } from "react";
import heart from "../../assets/heart.svg";
import commentsIcon from "../../assets/comments.svg";
import send from "../../assets/share.svg";
import save from "../../assets/save.svg";
import emojis from "../../assets/emojis.svg";
import { useDispatch, useSelector } from "react-redux";
import "./Post.scss";
import Dropdown from "../../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import { deletePost, upDatePost } from "../../store/reducer";

const Post = (props) => {
  const dispatch = useDispatch();
  const { likes, description, image, id, comments } = props;
  const profile = useSelector((state) => state.profile);
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const handleUpdatePost = (imageUrl, newDescription) => {
    dispatch(upDatePost(id, newDescription, imageUrl));
    setModalActive(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(id));
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="account">
          <div className="account__img">
            <img src={profile.profile_img} alt="" />
          </div>
          <div className="userName">{profile.username}</div>
        </div>
        <div onClick={handleOpen} className="options">
          {open ? (
            <Dropdown
              id={id}
              openEditModal={() => setModalActive(true)}
              deletePost={handleDeletePost}
            />
          ) : (
            <div className="points">...</div>
          )}
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
          {description.length > 100 && (
            <span>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="alpha"
              >
                {showDescription || "...more"}
              </button>
            </span>
          )}
        </div>

        {showComments &&
          comments.map((item) => {
            return (
              <div key={item.id} className="title">
                <span className="userName">{item.user.username}</span>
                <span className="userComment">{item.text}</span>
              </div>
            );
          })}
        <p onClick={() => setShowComments(!showComments)} className="alpha">
          {showComments ? "Hide comments" : "See comments"}
        </p>

        <p className="alpha hours">9 HOURS AGO</p>
      </div>
      <div className="form-card">
        <img src={emojis} alt="" />
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        defaultDescription={description}
        defaultImage={image}
        onSubmit={handleUpdatePost}
        title="Изменение Публикации"
        button="Изменить"
      />
    </div>
  );
};

export default Post;
