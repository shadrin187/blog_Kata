export const GET_DATA = 'GET_DATA'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA'
export const SIGN_UP = 'SIGN_UP'
export const SET_USER = 'SET_USER'
export const LOG_OUT = 'LOG_OUT'
export const SIGN_IN = 'SIGN_IN'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const NEW_ARTICLE = 'NEW_ARTICLE'
export const START_LOADING = 'START_LOADING'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const ADD_LIKE = 'ADD_LIKE'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const SET_ERROR = 'SET_ERROR'

export const getDataAction = (payload) => ({ type: GET_DATA, payload })
export const changePageAction = (payload) => ({ type: CHANGE_PAGE, payload })
export const getArticleDataAction = (payload) => ({
  type: GET_ARTICLE_DATA,
  payload,
})
export const signUpAction = (payload) => ({ type: SIGN_UP, payload })
export const setUserAction = (payload) => ({ type: SET_USER, payload })
export const logOutAction = () => ({ type: LOG_OUT })
export const signInAction = (payload) => ({ type: SIGN_IN, payload })
export const editProfileAction = (payload) => ({ type: EDIT_PROFILE, payload })
export const newArticleAction = (payload) => ({ type: NEW_ARTICLE, payload })
export const editArticleAction = (payload) => ({ type: EDIT_ARTICLE, payload })
export const startLoadingAction = () => ({ type: START_LOADING })
export const deleteArticleAction = (payload) => ({ type: DELETE_ARTICLE, payload })
export const addLikeAction = (payload) => ({ type: ADD_LIKE, payload })
export const setErrorAction = () => ({ type: SET_ERROR })
