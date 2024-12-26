import { actionTypes } from "../actions";

const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};

export { userDataReducer };
