const assetRiskReducer = (state = "Low", action) => {
  switch (action.type) {
    case "LOW":
      return "Low";
    case "MEDIUM":
      return "Medium";
    case "HIGH":
      return "High";
    default:
      return state;
  }
};
export { assetRiskReducer };
