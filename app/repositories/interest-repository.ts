import { AxiosResponse } from "axios"
import { API_INTEREST_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface InterestCheckRequest {
  postId: number;
}

export interface InterestCheckResponse {
  interested: boolean;
}

export interface InterestCreateRequest {
  postId: number;
}

export interface InterestCreateResponse {
  interested: boolean;
}

export interface InterestDeleteRequest {
  postId: number;
}

export interface InterestDeleteResponse {
  interested: boolean;
}

export interface InterestCountRequest {
  postId: number;
}

export interface InterestCountResponse {
  count: number;
}

interface AccountInterestedObject {
  id: number;
  firstname: string;
  lastname: string;
  profilePicture: string;
}

export interface AccountInterestedRequest {
  postId: number;
}

export interface AccountInterestedResponse extends Array<AccountInterestedObject> {}

interface PostInterestedObject {
  postId: number;
  title: string;
  content: string;
  interestedCount: number;
}

export interface PostInterestedRequest {
  id: number;
}

export interface PostInterestedResponse extends Array<PostInterestedObject> {}

export class InterestRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_INTEREST_ROUTE
  }

  public async count(id: number): Promise<InterestCountResponse> {
    return this.http.get('count', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async check(id: number): Promise<InterestCheckResponse> {
    return this.http.get('check', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }
}

export const interestRepository: InterestRepository = new InterestRepository()
