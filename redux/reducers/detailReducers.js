import {
  actionTypes
} from "./../actions/actionTypes";

export const initialState = {
  detailInfo: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_HOME_DETAIL:
      return {
        ...state,
        detailInfo: action.detailInfo
      }

    default:
      return state;
  }
}

export default reducer;