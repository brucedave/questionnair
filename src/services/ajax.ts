import axios from 'axios';
import { message } from 'antd';
const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('USER_TOKEN')||'';
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    message.error('请求失败');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType;
    const { errno, data, msg } = resData;
    if (errno !== 0) {
      if(msg){
        message.error(msg);
      }
      throw new Error(msg);
    }
    return data as any;
  },
);

export default instance;

export type ResDataType = {
  [key: string]: any;
};

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
}