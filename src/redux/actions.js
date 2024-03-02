export const GET_DATA = "GET_DATA";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const getDataAction = (payload) => ({ type: GET_DATA, payload });
export const changePageAction = (payload) => ({type: CHANGE_PAGE, payload})
