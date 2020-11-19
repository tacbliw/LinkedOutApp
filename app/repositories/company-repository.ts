import Axios, { AxiosResponse } from "axios"
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

  public async get(id: number): Promise<CompanyGetResponse> {
    return this.http.get('get', {
      params: {
        id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async create(
    name: string,
    website: string,
    specialties: string[],
    description: string,
    accessToken: string
  ): Promise<CompanyCreateResponse> {
    return Axios.create({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      baseURL: this.baseURL
    }).post('create', {
      name,
      website,
      specialties,
      description
    }).then((response: AxiosResponse) => response.data)
  }
}

export const companyRepository: CompanyRepository = new CompanyRepository()
