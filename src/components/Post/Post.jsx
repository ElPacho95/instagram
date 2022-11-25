import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePost, updatePost } from "../../store/reducer";

import commentsIcon from "../../assets/comments.svg";
import emojis from "../../assets/emojis.svg";
import heart from "../../assets/heart.svg";
import send from "../../assets/share.svg";
import save from "../../assets/save.svg";

import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";

import "./Post.scss";

const Post = (props) => {
  const dispatch = useDispatch();
  const { likes, description, image, id, comments } = props;
  const profile = useSelector((state) => state.profile);
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleUpdatePost = (imageUrl, newDescription) => {
    dispatch(updatePost(id, newDescription, imageUrl));
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
      <div className="post-header">
        <div className="account">
          <div className="user-picture">
            <img src={profile.profile_img} alt="" />
          </div>
          <div className="username">{profile.username}</div>
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
      <div className="user-post">
        <img src={image} alt="" />
      </div>
      <div className="post-icons">
        <div className="elements">
          <img src={heart} alt="" />
          <img src={commentsIcon} alt="" />
          <img src={send} alt="" />
        </div>
        <div className="save">
          <img src={save} alt="" />
        </div>
      </div>
      <div className="user-block">
        <div className="likes">{!likes ? 0 : likes} likes</div>
        <div className="title">
          <span className="username">{profile.username}</span>
          <span className="user-comment">
            {showDescription ? description : description.substring(0, 100)}
          </span>
          {description.length > 100 && (
            <span>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="alpha cursor"
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
                <span className="username">{item.user.username}</span>
                <span className="user-comment">{item.text}</span>
              </div>
            );
          })}
        <p
          onClick={() => setShowComments(!showComments)}
          className="alpha cursor"
        >
          {showComments ? "Hide comments" : "See comments"}
        </p>

        <p className="alpha hours">9 HOURS AGO</p>
      </div>
      <div className="form-card">
        <img src={emojis} alt="" />
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.currentTarget.value)}
          type="text"
          placeholder="Add a comment..."
        />
        <button className={commentInput ? "addPostActive" : "add-comment"}>
          Post
        </button>
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
