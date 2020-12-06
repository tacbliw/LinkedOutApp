import { AxiosResponse } from "axios"
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

  public async get(id: number): Promise<PhoneListResponse> {
    return this.http.get('list', {
      params: {
        id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async update(oldPhone: string, newPhone: string): Promise<PhoneUpdateResponse> {
    return this.http.post('update', {
      oldPhone,
      newPhone
    }).then((response: AxiosResponse) => response.data)
  }

  public async create(
    phone : string
  ): Promise<PhoneCreateResponse> {
    return this.http.post('create', {
      phone
    }).then((response: AxiosResponse) => response.data)
  }
}

export const phoneRepository: PhoneRepository = new PhoneRepository()
