const processReducer = (state = 1, action) => {
  switch (action.type) {
    case "ID":
      return action.payload;
    default:
      return state;
  }
};
export { processReducer };
