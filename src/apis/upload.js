import request from "@/utils/http";
export const uploadImgAPI = (item) => {
  let FormDatas = new FormData();
  FormDatas.append("img", item.file);
  return request({
    url: "/upload/img",
    method: "POST",
    data: FormDatas,
  });
};
