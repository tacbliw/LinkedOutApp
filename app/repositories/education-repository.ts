import { AxiosResponse } from "axios"
import { API_EDUCATION_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface EducationObject {
  educationId: number;
  schoolName: string;
  startDate: Date;
  endDate: Date;
  major: string;
  degree: string;
}

export interface EducationListRequest {
  id: number;
}

export interface EducationListRespond extends Array<EducationObject> {}

export interface EducationCreateRequest {
  schoolName: string;
  startDate: Date;
  endDate: Date;
  major: string;
  degree: string;
}

export interface EducationCreateRespond extends Array<EducationObject> {}

export interface EducationUpdateRequest {
  educationId: number;
  education: {
    schoolName: string;
    startDate: Date;
    endDate: Date;
    major: string;
    degree: string;
  }
}

export interface EducationUpdateRespond extends Array<EducationObject> {}

export interface EducationDeleteRequest {
  educationId: number;
}

export interface EducationDeleteRespond extends Array<EducationObject> {}

export class EducationRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_EDUCATION_ROUTE
  }
  
  public async get(id: number): Promise<EducationListRespond> {
    return this.http.get('list', {
      params: {
        id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async create(
    schoolName: string,
    startDate: string,
    endDate: string,
    major: string,
    degree: string,
  ): Promise<EducationCreateRespond> {
    return this.http.post('create', {
      schoolName,
      startDate,
      endDate,
      major,
      degree
    }).then((response: AxiosResponse) => response.data)
  }

  public async delete(id: number): Promise<EducationDeleteRespond> {
    return this.http.post('delete', {
      id: id
    }).then((response: AxiosResponse) => response.data)
  }
}

export const educationRepository: EducationRepository = new EducationRepository()
