const nameReducer = (state = "", action) => {
  switch (action.type) {
    case "NAME":
      return action.payload;
    default:
      return state;
  }
};
export { nameReducer };
