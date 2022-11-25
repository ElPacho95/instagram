import { get, del, patch, post } from "./api";
import { suggestions } from "../consts";

const initialState = {
  profile: {},
  posts: [],
  suggestions,
  loadPosts: true,
  loadProfile: false,
  postAddLoading: false,
  postIdLoading: false,
  postUpDataLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "profile/load/started":
      return { ...state, loadProfile: true };
    case "profile/load/fulfilled":
      return { ...state, profile: action.payload, loadProfile: false };
    case "posts/load/started":
      return { ...state, loadPosts: true };
    case "posts/load/fulfilled":
      return { ...state, posts: action.payload, loadPosts: false };
    case "post/add/started":
      return { ...state, postAddLoading: true };
    case "post/add/fulfilled":
      return {
        ...state,
        postAddLoading: false,
        posts: [action.payload, ...state.posts],
      };
    case "post/delete/started":
      return { ...state, postIdLoading: true };
    case "post/delete/fulfilled":
      return {
        ...state,
        postIdLoading: false,
        posts: state.posts.filter((item) => item.id !== action.payload),
      };
    case "post/update/started":
      return { ...state, postUpDataLoading: true };
    case "post/update/fulfilled":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                description: action.payload.description,
                image: action.payload.image,
              }
            : post
        ),
        postUpDataLoading: false,
      };
    default:
      return state;
  }
};

export const loadProfile = () => {
  return async (dispatch) => {
    dispatch({ type: "pending" });
    const response = await get("profile");
    const profile = await response.json();
    dispatch({
      type: "profile/load/fulfilled",
      payload: profile,
    });
  };
};

export const loadPosts = () => {
  return async (dispatch) => {
    dispatch({ type: "pending" });
    const response = await get("posts");
    const posts = await response.json();
    dispatch({
      type: "posts/load/fulfilled",
      payload: posts,
    });
  };
};

export const addPost = (body) => {
  return async (dispatch) => {
    dispatch({ type: "post/add/started" });
    const response = await post("posts", JSON.stringify(body));
    const newPost = await response.json();
    dispatch({
      type: "post/add/fulfilled",
      payload: newPost,
    });
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    dispatch({ type: "post/delete/started" });
    await del("posts", id);
    dispatch({ type: "post/delete/fulfilled", payload: id });
  };
};

export const updatePost = (id, description, image) => {
  return async (dispatch) => {
    dispatch({ type: "post/update/started" });
    await patch("posts", id, JSON.stringify({ description, image }));

    dispatch({
      type: "post/update/fulfilled",
      payload: { id, description, image },
    });
    dispatch({ type: "fulfilled" });
  };
};
