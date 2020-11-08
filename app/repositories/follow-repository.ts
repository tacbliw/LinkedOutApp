import { API_FOLLOW_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

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
  description: string;
  followedCount: number;
}

export interface CompanyFollowedRequest {
  id: number;
}

export interface CompanyFollowedResponse extends Array<CompanyFollowedObject> {}

export class FollowRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_FOLLOW_ROUTE
  }
}

export const followRepository: FollowRepository = new FollowRepository()
