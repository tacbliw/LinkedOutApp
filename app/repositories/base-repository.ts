import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

export class Repository {
  /**
   * HTTP Promise instance
   *
   * @type {AxiosInstance}
   */
  protected http: AxiosInstance

  /**
   * Interceptor to handle API Request
   *
   * @param config {AxiosRequestConfig}
   * @return {AxiosRequestConfig | Promise<AxiosRequestConfig>}
   */
  public static requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>

  /**
   * Interceptor to handle API Response
   *
   * @param response {AxiosResponse}
   * @return {AxiosResponse | Promise<AxiosResponse>}
   */
  public static responseInterceptor: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>

  /**
   * Interceptor to handle API Call errors
   *
   * @param error {AxiosError}
   * @throws {AxiosError}
   * @return {void | Promise<void>}
   */
  public static errorInterceptor: (error: AxiosError) => any | Promise<any>

  /**
   * Store current request interceptors
   * @protected
   */
  protected currentRequestInterceptors: [number]

  /**
   * Store current response interceptors
   * @protected
   */
  protected currentResponseInterceptors: [number]

  /**
   * Construct a repository
   * @param httpConfig {AxiosRequestConfig}
   * @param baseURL {string}
   */
  constructor(httpConfig: AxiosRequestConfig, baseURL?: string) {
    this.http = Axios.create(httpConfig)

    // Configure base url
    if (typeof baseURL === 'string') {
      this.baseURL = baseURL
    }

    // Configure interceptor for Axios instance
    if (typeof Repository.requestInterceptor === 'function') {
      this.currentRequestInterceptors = [
        this.http.interceptors.request.use(Repository.requestInterceptor)
      ]
    }

    if (typeof Repository.responseInterceptor === 'function') {
      this.currentResponseInterceptors = [
        this.http.interceptors.response.use(Repository.responseInterceptor, Repository.errorInterceptor)
      ]
    }
  }

  /**
   * Set baseURL for http instance of this repository
   *
   * @param baseURL {string}
   */
  public set baseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL
  }

  /**
   * Get baseURL
   *
   */
  public get baseURL() {
    return this.http.defaults.baseURL
  }

  /**
   * Eject an interceptor
   * @param type {'request' | 'response' | 'both'}
   */
  public ejectInterceptor = (type: 'request' | 'response' | 'both') => {
    switch (type) {
      case 'request':
        this.currentRequestInterceptors.forEach((id) => {
          this.http.interceptors.request.eject(id)
        })
        break

      case 'response':
        this.currentResponseInterceptors.forEach((id) => {
          this.http.interceptors.response.eject(id)
        })
        break

      case 'both':
        this.ejectInterceptor('request')
        this.ejectInterceptor('response')
        break

      default:
        throw new Error('Param accept only request | response | both')
    }
  }
}
