import { actionTypes } from '../actions';

const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export { tokenReducer };
