import {
  actionTypes
} from "./../actions/actionTypes";

export const initState = {
  homeList: [],
  page: 1
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_HOME_LIST:
      return {
        ...state,
        homeList: [...state.homeList, ...action.homeList]
      };
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.page
      }

    default:
      return state;
  }
}