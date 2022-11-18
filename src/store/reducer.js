import { fetchAPI } from "./api";
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
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "pending":
      return { ...state, loading: true };
    case "profile/load/fulfilled":
      return { ...state, profile: action.payload, loading: false };
    case "posts/load/fulfilled":
      return { ...state, posts: action.payload, loading: false };
    default:
      return state;
  }
};

export const loadProfile = () => {
  return async (dispatch) => {
    dispatch({ type: "pending" });
    const response = await fetchAPI("profile");
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
    const response = await fetchAPI("posts");
    const posts = await response.json();
    dispatch({
      type: "posts/load/fulfilled",
      payload: posts,
    });
  };
};
