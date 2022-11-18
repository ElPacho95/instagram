import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, loadProfile } from "../store/reducer";
import Card from "./Card";
import Suggestions from "./Suggestions";
import Modal from "./Modal";
const Content = () => {
  const loading = useSelector((state) => state.loading);

  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
    dispatch(loadProfile());
  }, []);

  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="bg">
      <div className="content">
        <div>
          {posts.map((item) => {
            return (
              <Card
                likes={item.likes}
                description={item.description}
                image={item.image}
                key={item.id}
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
