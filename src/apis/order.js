import request from "@/utils/http";
export const getUserOrder = (params) => {
  return request({
    url: "/user/orderList",
    method: "GET",
    params: params,
  });
};
