import { get, getDelete, patchAPI, post } from "./api";
import userPic from "../assets/user-pic.svg";
const initialState = {
  profile: {},
  posts: [],
  profiles: [
    {
      id: 1,
      nickName: "janedoe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      id: 2,
      nickName: "robertdoe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      id: 3,
      nickName: "sandradoe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      id: 4,
      nickName: "pepedoe_",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
    {
      id: 5,
      nickName: "simon.doe",
      suggestion: "Suggestion for you",
      image: userPic,
      btn: "Follow",
    },
  ],
  loading: false,
  postAddLoading: false,
  postIdLoading: false,
  postUpDataLoading: false,
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
    case "post/getDelete/started":
      return { ...state, postIdLoading: true };
    case "post/Delete/fulfilled":
      return {
        ...state,
        postIdLoading: false,
        posts: state.posts.filter((item) => item.id !== action.payload),
      };
    case "post/upDate/started":
      return { ...state, postUpDataLoading: true };
    case "post/upDate/fulfilled":
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
    case "fulfilled":
      return { ...state, loading: false };
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
    dispatch({ type: "post/Delete/started" });
    await getDelete("posts", id);
    dispatch({ type: "post/Delete/fulfilled", payload: id });
  };
};

export const upDatePost = (id, description, image) => {
  return async (dispatch) => {
    dispatch({ type: "post/upDate/started" });
    await patchAPI("posts", id, { description, image });

    dispatch({
      type: "post/upDate/fulfilled",
      payload: { id, description, image },
    });
    dispatch({ type: "fulfilled" });
  };
};
