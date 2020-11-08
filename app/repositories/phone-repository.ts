import { API_PHONE_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface PhoneListRequest {
  id: number;
}

export interface PhoneListResponse {
  phones: string[];
}

export interface PhoneCreateRequest {
  phone: string;
}

export interface PhoneCreateResponse {
  phones: string[];
}

export interface PhoneUpdateRequest {
  oldPhone: string;
  newPhone: string;
}

export interface PhoneUpdateResponse {
  phones: string[];
}

export interface PhoneDeleteRequest {
  phone: string;
}

export interface PhoneDeleteResponse {
  phones: string[];
}

export class PhoneRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_PHONE_ROUTE
  }
}

export const phoneRepository: PhoneRepository = new PhoneRepository()
