import { AxiosResponse } from "axios"
import { API_INTEREST_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface InterestCheckRequest {
  id: number;
}

export interface InterestCheckResponse {
  interested: boolean;
}

export interface InterestCreateRequest {
  id: number;
}

export interface InterestCreateResponse {
  interested: boolean;
}

export interface InterestDeleteRequest {
  id: number;
}

export interface InterestDeleteResponse {
  interested: boolean;
}

export interface InterestCountRequest {
  id: number;
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
  id: number;
}

export interface AccountInterestedResponse extends Array<AccountInterestedObject> {}

interface PostInterestedObject {
  id: number;
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

  public async create(id: number): Promise<InterestCreateResponse> {
    return this.http.post('create', {
      id: id
    }).then((response: AxiosResponse) => response.data)
  }

  public async delete(id: number): Promise<InterestDeleteResponse> {
    return this.http.post('delete', {
      id: id
    }).then((response: AxiosResponse) => response.data)
  }

  public async accountInterested(id: number): Promise<AccountInterestedResponse> {
    return this.http.get('account-interested', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }
}

export const interestRepository: InterestRepository = new InterestRepository()
