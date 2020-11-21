import { AxiosResponse } from "axios"
import { API_FOLLOW_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface FollowListRequest{
  id: number;
}

export interface FollowListResponse {
  id: number;
  firstname: string;
  lastname: string;
  profilePicture: string;
  description: string;
  followedCount: number;
}

export interface FollowCheckRequest {
  id: number;
}

export interface FollowCheckResponse {
  followed: boolean;
}

export interface FollowCreateRequest {
  id: number;
}

export interface FollowCreateResponse {
  followed: boolean;
}

export interface FollowDeleteRequest {
  id: number;
}

export interface FollowDeleteResponse {
  followed: boolean;
}

export interface FollowCountRequest {
  id: number;
}

export interface FollowCountResponse {
  count: number;
}

export interface CompanyFollowedObject {
  id: number;
  name: string;
  profilePicture: string;
  description: string;
  followedCount: number;
}

export interface CompanyFollowedRequest {
  id: number;
}

export interface CompanyFollowedResponse extends Array<CompanyFollowedObject> {}

export interface UserFollowedObject {
  id: number;
  firstname: string;
  lastname: string;
  profilePicture: string;
  description: string;
  followedCount: number;
}

export interface UserFollowedRequest {
  id: number;
}

export interface UserFollowedResponse extends Array<UserFollowedObject> {}

export class FollowRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_FOLLOW_ROUTE
  }

  public async list(id: number): Promise<FollowListResponse[]> {
    return this.http.get('list', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async count(id: number): Promise<FollowCountResponse> {
    return this.http.get('count', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async check(id: number): Promise<FollowCheckResponse> {
    return this.http.get('check', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async userFollowed(id: number): Promise<UserFollowedResponse> {
    return this.http.get('user-followed', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async companyFollowed(id: number): Promise<CompanyFollowedResponse> {
    return this.http.get('company-followed', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async create(id: number): Promise<FollowCreateResponse> {
    return this.http.post('create', {
      id: id
    }).then((response: AxiosResponse) => response.data)
  }

  public async delete(id: number): Promise<FollowDeleteResponse> {
    return this.http.post('delete', {
      id: id
    }).then((response: AxiosResponse) => response.data)
  }
}

export const followRepository: FollowRepository = new FollowRepository()
