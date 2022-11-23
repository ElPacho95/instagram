import "./Dropdown.scss";
import { deletePost, upDataPost } from "../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import arrow from "../assets/Arrow 1.svg";
import emojis from "../assets/emojis.svg";

const Dropdown = ({ id }) => {
  const profile = useSelector((state) => state.profile);
  const post = useSelector((state) => state.posts).find(
    (post) => post.id === id
  );
  const [initialPost, setInitialPost] = useState({
    image: "",
    description: "",
  });
  const [modalActive, setModalActive] = useState(false);
  useEffect(() => {
    setInitialPost(post);
  }, [post]);
  const dispatch = useDispatch();
  const handleUpdateDescription = (description) => {
    setInitialPost({ ...initialPost, description: description });
  };
  const handleUpdateImg = (img) => {
    setInitialPost({ ...initialPost, image: img });
  };
  const handleChangePost = () => {
    dispatch(upDataPost(id, initialPost.description, initialPost.image));
    setModalActive(false);
  };
  const handleOpenModal = (e) => {
    e.stopPropagation();
    setModalActive(true);
  };
  return (
    <div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className="modal-header">
          <img onClick={() => setModalActive(false)} src={arrow} alt="" />
          <h1>Изменение публикации</h1>
          <button onClick={handleChangePost}>
            <span>Change</span>
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
            value={initialPost.description}
            onChange={(e) => handleUpdateDescription(e.currentTarget.value)}
            type="text"
            placeholder="Добавьте подпись..."
          />
          <div className="smile">
            <img src={emojis} alt="" />
            <p className="alpha">0/2,200</p>
          </div>
        </div>
        <input
          value={initialPost.image}
          onChange={(e) => handleUpdateImg(e.currentTarget.value)}
          className="url"
          type="text"
          placeholder="Введите URL-картинки"
        />
      </Modal>
      <div className="dropdown">
        <div className="options">...</div>
        <div className="dropdown-content">
          <button onClick={(e) => handleOpenModal(e)} className="change">
            Change
          </button>
          <button onClick={() => dispatch(deletePost(id))} className="delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
