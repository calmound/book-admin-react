import { useCurrentUser } from "@/utils/hoos";
import { message as AntdMessage } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Router from "next/router";

// export const baseUrl = location.protocol + '//localhost';

interface AxiosInstanceType extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

export const CreateAxiosInstance = (
  config?: AxiosRequestConfig
): AxiosInstanceType => {
  const instance = axios.create({
    timeout: 5000,
    withCredentials: true,
    ...config,
  });

  instance.interceptors.request.use(
    function (config: any) {
      // 合并请求头
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      config.headers = {
        userToken: user?._id,
      };
      return config;
    },
    function (error) {
      // 处理错误请求
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      // todo
      const { status, data, message } = response as any;
      if (status === 200) {
        return data;
      } else if (status === 401) {
        return Router.push("/login");
      } else {
        AntdMessage.error(message);
        return Promise.reject(response.data);
      }
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return Router.push("/login");
        }
      }
      AntdMessage.error(error?.response?.data?.message || "服务端异常");
      return Promise.reject(error);
    }
  );

  return instance;
};

const request = CreateAxiosInstance({});
export default request;
