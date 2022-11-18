export const fetchAPI = (content) => {
  return fetch(`http://localhost:3000/${content}`);
};
