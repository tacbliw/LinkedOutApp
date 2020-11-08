import { API_EMAIL_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface EmailListRequest {
  id: number;
}

export interface EmailListResponse {
  emails: string[];
}

export interface EmailCreateRequest {
  email: string;
}

export interface EmailCreateResponse {
  emails: string[];
}

export interface EmailUpdateRequest {
  oldEmail: string;
  newEmail: string;
}

export interface EmailUpdateResponse {
  emails: string[];
}

export interface EmailDeleteRequest {
  email: string;
}

export interface EmailDeleteResponse {
  emails: string[];
}

export class EmailRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_EMAIL_ROUTE
  }
}

export const emailRepository: EmailRepository = new EmailRepository()
