import { AxiosResponse } from "axios"
import { API_ACCOUNT_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export class AccountRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_ACCOUNT_ROUTE
  }

  public async login(username: string, password: string) {
    return this.http.post('login', {
      username,
      password,
    }).then((response: AxiosResponse) => response.data)
  }
}

export const accountRepository: AccountRepository = new AccountRepository()
