import { Message } from "element-ui";
import axios from "axios";
import qs from "qs";
// eslint-disable-next-line import/no-cycle
import router from "@src/router/index";
import store from "@src/store/index";

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: "comma" });

const tip = (message, type = "warning") => {
  Message({
    message,
    type,
  });
};
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};
const errorHandle = (status, other) => {
  switch (status) {
    case 401:
      tip("您尚未登录");
      store.dispatch("site/setUserInfo", null);
      toLogin();
      break;
    default:
      tip(other);
  }
};

const defaultConfig = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
};

const instance = axios.create(defaultConfig);

// 请求拦截
instance.interceptors.request.use(
  (config) => config,
  (error) => {
    Promise.error(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response);
  },
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.data.code, response.data.message);
      return Promise.reject(response);
    }
    // tip('请求超时！');
    return Promise.reject(error);
  }
);

export default instance;
