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
