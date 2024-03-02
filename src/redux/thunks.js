import { getDataAction } from "./actions";

export const fetchArticles = (page) => {
  const offset = (page - 1) * 5
  return (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`)
      .then((res) => res.json())
      .then((res) => dispatch(getDataAction(res)));
  };
};
