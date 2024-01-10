import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import "element-plus/theme-chalk/el-message.css";

const httpInstance = axios.create({
  baseURL: "http://market.somebodycn.xyz:7886",
  // baseURL: "http://localhost:7886",
  timeout: 10000,
});

//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => {
    res = res.data;
    if (res.code != 200) {
      ElMessage({
        type: "warning",
        message: res.msg,
      });
      return Promise.reject();
    }
    return res;
  },

  (e) => {
    return Promise.reject(e);
  }
);
export default httpInstance;
