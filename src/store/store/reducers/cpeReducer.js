const cpeReducer = (
  state = "cpe:2.3:a:oracle:peoplesoft_enterprise:8.22.14",
  action
) => {
  switch (action.type) {
    case "CPE":
      return state;
    default:
      return state;
  }
};
export { cpeReducer };
