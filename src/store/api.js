import { baseUrl } from "../consts";

export const get = (path) => {
  return fetch(`${baseUrl}/${path}`);
};

export const post = (path, body) => {
  return fetch(`${baseUrl}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};
export const getId = (path, id) => {
  return fetch(`${baseUrl}/${path}/${id}`, {
    method: "DELETE",
  });
};
