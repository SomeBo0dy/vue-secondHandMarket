import request from "@/utils/http";
export const getUserChatListAPI = () => {
  return request({
    url: "/chatUserLink",
    method: "GET",
  });
};
export const getMessageAPI = (params) => {
  return request({
    url: `/chatMessage/${params.value.toUser}`,
    method: "GET",
  });
};
export const addLink = (ownerId) => {
  return request({
    url: "/chatUserLink",
    method: "POST",
    data: {
      ownerId,
    },
  });
};