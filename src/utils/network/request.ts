import { Toast } from 'antd-mobile';
import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.timeout = 1000 * 10;
interface AxiosErrorInterface {
  message: string;
  config: any;
  response: any;
}

axios.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: AxiosErrorInterface) => {
    return error;
  },
);

axios.interceptors.response.use(
  (response: any) => {
    if (response.status !== 200) {
      response.data.message &&
        Toast.show({ icon: 'fail', content: response.data.message });
        // Storage.setItem()
        console.log('response', response);
      return Promise.reject(response);
    }
    return Promise.resolve(response.data);
  },
  (error: AxiosErrorInterface) => {
    if (~`${error.message}`.indexOf('timeout')) {
      Toast.show({ icon: 'fail', content: '网络超时' });
    }
    error.response &&
      error.response.data.message &&
      Toast.show({ icon: 'fail', content: error.response.data.message });
    if (error.response && error.response.status === 401) {
    //  window.location.assign(`${window.location.origin}/login`);
    Toast.show({ icon: 'fail', content: '无权限' });
    } else {
      error.response &&
        error.response.statusText &&
        Toast.show({ icon: 'fail', content: error.response.data.message });
    }
    return Promise.reject(error);
  },
);

const baseRequest = (config: any): Promise<any> => {
  config = {
    ...config,
    headers: {
    //   Authorization: `Beara ${getAuth()}`,
    },
    url: `${config.url}`,
  };
  return axios.request(config);
};

 const request = {
  get: (url: string, params?: object, config?: AxiosRequestConfig) => () => {
    return baseRequest({
      method: 'get',
      params,
      url,
      ...config,
    });
  },
  post: (url: string, data: object, config?: AxiosRequestConfig) => () => {
    return baseRequest({
      data,
      method: 'post',
      url,
      ...config,
    });
  },
  patch: (url: string, data: object, config?: AxiosRequestConfig) => () => {
    return baseRequest({
      data,
      method: 'patch',
      url,
      ...config,
    });
  },
  put: (url: string, data?: object, config?: AxiosRequestConfig) => () => {
    return baseRequest({
      data,
      method: 'put',
      url,
      ...config,
    });
  },
  delete: (url: string, data?: object, config?: AxiosRequestConfig) => () => {
    return baseRequest({
      data,
      method: 'delete',
      url,
      ...config,
    });
  },
};

export default request;