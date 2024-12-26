import { actionTypes } from '../actions';

const userStatusReducer = (
  state = {
    approved: false,
    loggedIn: false,
    token: null,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_USER_STATUS:
      return {
        approved: action.payload.approved,
        loggedIn: action.payload.loggedIn,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export { userStatusReducer };
