import { AxiosResponse } from "axios"
import { API_ACCOUNT_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  account: {
    accountType: string;
    id: number;
    username: string;
  }
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  accountType: string;
}

export interface RegisterResponse {
  accessToken: string;
  account: {
    accountType: string;
    id: number;
    username: string;
  }
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export class AccountRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_ACCOUNT_ROUTE
  }

  public async login(username: string, password: string): Promise<LoginResponse> {
    return this.http.post('login', {
      username,
      password,
    }).then((response: AxiosResponse) => response.data)
  }

  public async register(username: string, password: string, email: string, accountType: string): Promise<RegisterResponse> {
    return this.http.post('register', {
      username,
      password,
      email,
      accountType
    }).then((response: AxiosResponse) => response.data)
  }
}

export const accountRepository: AccountRepository = new AccountRepository()
