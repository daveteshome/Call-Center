export const lowRisk = () => {
  return {
    type: 'LOW',
  };
};

export const mediumRisk = () => {
  return {
    type: 'MEDIUM',
  };
};
export const highRisk = () => {
  return {
    type: 'RISK',
  };
};
export const risk = (risk) => {
  return {
    type: 'RISK',
    payload: risk,
  };
};
export const cpe = (cpe) => {
  return {
    type: 'CPE',
    payload: cpe,
  };
};
export const id = (id) => {
  return {
    type: 'ID',
    payload: id,
  };
};
export const pid = (pid) => {
  return {
    type: 'PID',
    payload: pid,
  };
};
export const name = (name) => {
  return {
    type: 'NAME',
    payload: name,
  };
};
export const cid = (cid) => {
  return {
    type: 'CID',
    payload: cid,
  };
};
export const vendors = (vendor) => {
  return {
    type: 'VENDOR',
    payload: vendor,
  };
};
export const products = (product) => {
  return {
    type: 'PRODUCT',
    payload: product,
  };
};

export const actionTypes = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER_STATUS: 'SET_USER_STATUS',
  SET_USER_DATA: 'SET_USER_DATA',
};

export const set_user_status = (payload) => {
  return {
    type: actionTypes.SET_USER_STATUS,
    payload,
  };
};

export const set_user_data = (payload) => {
  return {
    type: actionTypes.SET_USER_DATA,
    payload,
  };
};

export const set_token = (payload) => {
  return {
    type: actionTypes.SET_TOKEN,
    payload,
  };
};
