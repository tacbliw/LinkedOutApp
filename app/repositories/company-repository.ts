import { AxiosResponse } from "axios"
import { API_COMPANY_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface CompanyGetRequest {
  id: number;
}

export interface CompanyGetResponse {
  name: string;
  website: string;
  specialties: string[];
  description: string;
}

export interface CompanyCreateRequest {
  name: string;
  website: string;
  specialties: string[];
  description: string;
}

export interface CompanyCreateResponse {
  name: string;
  website: string;
  specialties: string[];
  description: string;
}

export interface CompanyUpdateRequest {
  name: string;
  website: string;
  specialties: string[];
  description: string;
}

export interface CompanyUpdateResponse {
  name: string;
  website: string;
  specialties: string[];
  description: string;
}

export class CompanyRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_COMPANY_ROUTE
  }
}

export const companyRepository: CompanyRepository = new CompanyRepository()
