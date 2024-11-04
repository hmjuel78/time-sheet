import axios from "axios";
import { toast } from "react-hot-toast";
import { getNewAccessToken, userLogout } from "../features/auth/authSlice";
const { REACT_APP_NODE_ENV, REACT_APP_API_BASE_URL } = import.meta.env;
let store;

export const injectStoreToAxios = (_store) => {
  store = _store;
};

/** Extract Device Information */
let ua = navigator.userAgent,
  tem,
  M =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    [];
if (/trident/i.test(M[1])) {
  tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
  // return { name: 'IE ', version: (tem[1] || '') };
}
if (M[1] === "Chrome") {
  tem = ua.match(/\bOPR\/(\d+)/);
  // if (tem != null) { return { name: 'Opera', version: tem[1] }; }
}
M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
if ((tem = ua.match(/version\/(\d+)/i)) != null) {
  M.splice(1, 1, tem[1]);
}

const source = "web";
const platform = navigator.platform;
const browser = M[0];
const version = M[1];
/** Extract Device Information */

export const client = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let queuedRequests = [];
let isRefreshing = false;

const executeQueuedRequests = (token) => {
  while (queuedRequests.length > 0) {
    const queuedRequest = queuedRequests.shift();
    queuedRequest(token);
  }
};

client.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};

    if (!config.headers["x-authorization"]) {
      config.headers["x-authorization"] = `${
        store.getState().authReducer?.token || "token-not-found"
      }`;
    }
    config.headers["x-source"] = source;
    config.headers["x-platform"] = platform;
    config.headers["x-browser"] = browser;
    config.headers["x-version"] = version;
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 430 || error?.code == "ERR_NETWORK") {
      queuedRequests = [];
      store.dispatch(userLogout());
      toast.info("Refresh token error, please login again.");
      window.location.reload();
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await store.dispatch(getNewAccessToken()).unwrap();
          if (!response?.token) {
            return Promise.reject(error);
          }

          //const response = await store.dispatch(getNewAccessToken()).unwrap();
          executeQueuedRequests(response.token);

          error.config.headers["x-authorization"] = response.token;
          return client(error.config);
        } catch (error) {
          if (error?.response?.status === 430) {
            store.dispatch(userLogout());
            toast.info("Refresh token error, please login again.");
          }
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          queuedRequests.push((token) => {
            error.config.headers["x-authorization"] = token;
            resolve(client(error.config));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

const request = function (options, type) {
  return client(options);
};

export default request;
