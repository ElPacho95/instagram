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
export const getDelete = (path, id) => {
  return fetch(`${baseUrl}/${path}/${id}`, {
    method: "DELETE",
  });
};

export const patchAPI = (path, id, data) => {
  return fetch(`${baseUrl}/${path}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      description: data.description,
      image: data.image,
    }),
  });
};
