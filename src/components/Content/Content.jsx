import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadPosts, loadProfile } from "../../store/reducer";

import Suggestions from "../Suggestions/Suggestions";
import Post from "../Post/Post";

import instagramPic from "../../assets/favicon.ico";

import "./Content.scss";

const Content = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadPosts);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(loadPosts());
    dispatch(loadProfile());
  }, [dispatch]);

  if (loading) {
    return <img className="loading" src={instagramPic} alt="" />;
  }

  return (
    <div className="bg">
      <div className="content">
        <div>
          {posts.map((item) => {
            return (
              <Post
                likes={item.likes}
                description={item.description}
                image={item.image}
                key={item.id}
                id={item.id}
                comments={item.comments}
              />
            );
          })}
        </div>
        <Suggestions />
      </div>
    </div>
  );
};

export default Content;
