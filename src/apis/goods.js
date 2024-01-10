import httpInstance from "@/utils/http";

export function getGoodsAPI(id) {
  return httpInstance({
    url: "/goods/goodList",
    method: "GET",
    params: {
      pageNum: 1,
      pageSize: 200,
      categoryId: id,
    },
  });
}
export function getGoodsDetailById(id) {
  return httpInstance({
    url: `/goods/${id}`,
    method: "GET",
  });
}
export function getGoodsList(params) {
  return httpInstance({
    url: "/user/goodsList",
    method: "GET",
    params: params,
  });
}
export function uploadGoodsAPI(goods) {
  return httpInstance({
    url: "/user/goods/upload",
    method: "POST",
    data: goods,
  });
}
export function updateGoodsAPI(goods) {
  return httpInstance({
    url: "/user/goods/update",
    method: "PUT",
    data: goods,
  });
}
export function deleteGoodsAPI(gId) {
  return httpInstance({
    url: `/user/goods/${gId}`,
    method: "DELETE",
  });
}
export function getunSoldGoodsList(params) {
  return httpInstance({
    url: "/user/goodList/unsold",
    method: "GET",
    params: params,
  });
}

export const updateGoodsState = (stateDto) => {
  return httpInstance({
    url: "/sys/goods",
    method: "PUT",
    data: stateDto,
  });
};
