import axios from 'axios';
import { ElMessage } from 'element-plus';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const request = axios.create({
  baseURL: '/api',
  timeout: 8000
});

request.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiResponse<unknown>;
    if (payload && typeof payload.code === 'number' && payload.code !== 0) {
      ElMessage.error(payload.message || '业务请求失败');
      return Promise.reject(new Error(payload.message));
    }
    return response;
  },
  (error) => {
    const message = error?.response?.data?.message || error?.message || '网络请求失败';
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

