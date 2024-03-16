import {
  GET_DATA,
  CHANGE_PAGE,
  GET_ARTICLE_DATA,
  SIGN_UP,
  SET_USER,
  LOG_OUT,
  SIGN_IN,
  EDIT_PROFILE,
  NEW_ARTICLE,
  START_LOADING,
  DELETE_ARTICLE,
  ADD_LIKE,
  EDIT_ARTICLE,
  SET_ERROR,
} from './actions'

const defaultState = {
  totalCount: 0,
  totalPages: 0,
  page: 1,
  articles: [],
  articleData: '',
  isAutorized: false,
  isLoading: true,
  user: {
    status: '',
    errorMessage: '',
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        articles: action.payload.articles,
        totalCount: action.payload.articlesCount,
        totalPages: Math.ceil(action.payload.articlesCount / 5),
        isLoading: false,
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ARTICLE_DATA:
      return {
        ...state,
        articleData: action.payload.article,
        isLoading: false,
      }
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((el) => el.slug !== action.payload),
      }
    case SIGN_UP:
      return {
        ...state,
        user: {
          status: 'OK',
          errorMessage: '',
          ...action.payload.user,
        },
        isAutorized: true,
      }
    case SIGN_IN:
      return {
        ...state,
        user: {
          status: 'OK',
          errorMessage: '',
          ...action.payload.user,
        },
        isAutorized: true,
      }
    case SET_USER:
      return {
        ...state,
        user: {
          status: 'OK',
          errorMessage: '',
          ...action.payload.user,
        },
        isAutorized: true,
      }
    case LOG_OUT:
      return {
        ...state,
        user: {
          status: '',
          errorMessage: '',
        },
        isAutorized: false,
      }
    case EDIT_PROFILE:
      return {
        ...state,
        user: {
          status: 'OK',
          errorMessage: '',
          ...action.payload.user,
        },
      }
    case NEW_ARTICLE:
      return {
        ...state,
        articles: [action.payload.article, ...state.articles],
      }
    case ADD_LIKE:
      return {
        ...state,
        articleData: {
          ...action.payload,
        },
        articles: state.articles.map((el) => {
          if (el.slug === action.payload.slug) {
            return action.payload
          } else {
            return el
          }
        }),
      }
    case EDIT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((el) => {
          if (el.slug === action.payload.slug) {
            return action.payload.data.article
          } else {
            return el
          }
        }),
      }
    case SET_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          status: 'ERROR',
        },
      }
    default:
      return state
  }
}
