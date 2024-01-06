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
