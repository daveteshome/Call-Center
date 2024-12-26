import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { userDataReducer } from "./userReducer";
import { userStatusReducer } from "./userStatusReducer";
import { assetRiskReducer } from "./assetRiskReducer";
import { cpeReducer } from "./cpeReducer";
import { processReducer } from "./processReducer";
import { nameReducer } from "./nameReducer";
import { clientIdReducer } from "./clientIdReducer";
import { processIDsuper } from "./processIDsuper";
import { vendorReducer } from "./vendorReducer";
import { productsReducer } from "./productsReducer";
import Mode from "../../setting/setting";

export default combineReducers({
  token: tokenReducer,
  user: userDataReducer,
  user_status: userStatusReducer,
  assetRisk: assetRiskReducer,
  id: processReducer,
  name: nameReducer,
  cid: clientIdReducer,
  pid: processIDsuper,
  vendor: vendorReducer,
  cpe: cpeReducer,
  pr: productsReducer,
  mode: Mode,
});
