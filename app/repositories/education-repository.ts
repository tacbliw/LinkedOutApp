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
}

export const educationRepository: EducationRepository = new EducationRepository()