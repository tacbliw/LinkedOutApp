import { API_USER_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface UserGetRequest {
  id: number;
}

export interface UserGetResponse {
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: string;
  description: string;
}

export interface UserCreateRequest {
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: string;
  description: string;
}

export interface UserCreateResponse {
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: string;
  description: string;
}

export interface UserUpdateRequest {
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: string;
  description: string;
}

export interface UserUpdateResponse {
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: string;
  description: string;
}

export class UserRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_USER_ROUTE
  }
}

export const userRepository: UserRepository = new UserRepository()
