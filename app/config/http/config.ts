import { AxiosRequestConfig } from "axios"
import { Repository } from "../../repositories/base-repository"
import { API_BASE_URL } from "../consts"
import { errorInterceptor } from "./interceptor.error"
import { requestInterceptor } from "./interceptor.request"
import { responseInterceptor } from "./interceptor.response"

export const httpConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {}
}

Repository.requestInterceptor = requestInterceptor
Repository.responseInterceptor = responseInterceptor
Repository.errorInterceptor = errorInterceptor
