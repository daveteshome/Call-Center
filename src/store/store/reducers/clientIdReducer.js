const clientIdReducer = (state = 1, action) => {
  switch (action.type) {
    case "CID":
      return action.payload;
    default:
      return state;
  }
};
export { clientIdReducer };
