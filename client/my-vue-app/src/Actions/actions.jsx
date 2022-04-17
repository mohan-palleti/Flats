export const getData = (data) => {
  return {
    type: "GET_DATA",
    payload: data,
  };
};

export const sortData = (data) => {
  return {
    type: "SORT_DATA",
    payload: data,
  };
};
export const UserData = (data) => {
  return {
    type: "USER_DATA",
    payload: data,
  };
};
export const Login_action = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};
export const LogOut_action = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
