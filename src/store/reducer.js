import { get, getId, post } from "./api";
import userPic from "../UI/assets/user-pic.svg";
const initialState = {
  profile: {},
  posts: [],
  profiles: [
    {
      nickName: "janedoe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      nickName: "robertdoe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      nickName: "sandradoe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      nickName: "pepedoe_",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      nickName: "simon.doe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
  ],
  loading: false,
  postAddLoading: false,
  postIdLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "pending":
      return { ...state, loading: true };
    case "profile/load/fulfilled":
      return { ...state, profile: action.payload, loading: false };
    case "posts/load/fulfilled":
      return { ...state, posts: action.payload, loading: false };
    case "post/add/started":
      return { ...state, postAddLoading: true };
    case "post/add/fulfilled":
      return {
        ...state,
        postAddLoading: false,
        posts: [action.payload, ...state.posts],
      };
    case "post/getId/started":
      return { ...state, postIdLoading: true };
    case "post/getId/fulfilled":
      return {
        ...state,
        postIdLoading: false,
        posts: action.payload,
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
    dispatch({ type: "post/getId/started" });
    const response = await getId("posts", id);
    const postId = await response.json();
    dispatch({ type: "post/getId/fulfilled", payload: postId });
  };
};
