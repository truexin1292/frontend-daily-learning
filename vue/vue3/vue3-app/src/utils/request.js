import axios from 'axios';
import {
  Message,
  Msgbox
} from 'element3';
import store from '@/store';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 100000
})

service.interceptors.request.use(
  (config) => {
    console.log('log:', config);
    config.headers['X-token'] = 'x-token';
  },
  (err) => {
    console.log('log:', err);
    return Promise.reject(err)
  }
)
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 20000) {
      Message.error({
        message: res.message || '请求错误！',
        duration: 5 * 100
      })

      if (res.code === 301 || res.code === 20) {
        Msgbox.confirm({

        })
      }
      return Promise.reject(new Error('') || 'error')
    } else {
      return res;
    }
  },
  (err) => {
    console.log('log:', err);
    return Promise.reject(err);
  }
)
