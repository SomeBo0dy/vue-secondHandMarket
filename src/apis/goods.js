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