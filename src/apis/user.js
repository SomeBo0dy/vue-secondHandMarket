import request from "@/utils/http";
export const loginAPI = ({ account, password, type }) => {
  return request({
    url: "/login/password",
    method: "POST",
    data: {
      account,
      password,
      type,
    },
  });
};
export const registerAPI = (data) => {
  return request({
    url: "/register",
    method: "POST",
    data,
  });
};
export const updateUserInfoAPI = (user) => {
  return request({
    url: "/users/info",
    method: "PUT",
    data: user,
  });
};
