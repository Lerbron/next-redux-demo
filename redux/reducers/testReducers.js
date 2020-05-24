import {
  actionTypes
} from "./../actions/actionTypes";


export const initialState = {
  num: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_NUM:
      return {
        ...state,
        num: action.num
      }

    default:
      return state;
  }
}

export default reducer;