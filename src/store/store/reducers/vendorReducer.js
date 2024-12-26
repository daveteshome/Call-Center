const vendorReducer = (state = 'Oracle', action) => {
  switch (action.type) {
    case 'VENDOR':
      return action.payload;
    default:
      return state;
  }
};
export { vendorReducer };
