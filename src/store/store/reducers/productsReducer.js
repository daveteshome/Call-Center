const productsReducer = (state = 'Windows', action) => {
  switch (action.type) {
    case 'PRODUCT':
      return state;
    default:
      return state;
  }
};
export { productsReducer };
