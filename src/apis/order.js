import request from "@/utils/http";
export const getUserOrder = (params) => {
  return request({
    url: "/user/orderList",
    method: "GET",
    params: params,
  });
};
export const createOrderAPI = (gId) => {
  return request({
    url: "/user/order",
    method: "POST",
    data: {
      gId,
    },
  });
};
export const getUserDeal = (params) => {
  return request({
    url: "/user/dealList",
    method: "GET",
    params: params,
  });
};
export const updateOrder = (order) => {
  return request({
    url: "/user/order",
    method: "PUT",
    data: order,
  });
};
