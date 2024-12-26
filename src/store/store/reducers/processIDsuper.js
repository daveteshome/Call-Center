const processIDsuper = (state = 1, action) => {
  switch (action.type) {
    case "PID":
      return action.payload;
    default:
      return state;
  }
};
export { processIDsuper };
