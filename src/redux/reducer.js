import { GET_DATA, CHANGE_PAGE } from "./actions";

const defaultState = {
  totalCount: 0,
  totalPages: 0,
  page: 1,
  articles: [],
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        articles: action.payload.articles,
        totalCount: action.payload.articlesCount,
        totalPages: Math.ceil(action.payload.articlesCount / 5),
      };
      case CHANGE_PAGE:
        return {
          ...state,
          page: action.payload
        }
    default:
      return state;
  }
};
