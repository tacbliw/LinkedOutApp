import { API_JOB_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface JobObject {
  jobId: number;
  title: string;
  description: string;
  seniorityLevel: string;
  employmentType: string;
  recruimentUrl: string;
  publishedDate: Date;
  cities: string[];
  skills: string[];
}

export interface JobListRequest {
  id: number;
}

export interface JobListResponse extends Array<JobObject> {}

export interface JobGetRequest {
  jobId: number;
}

export interface JobGetResponse {
  title: string;
  description: string;
  seniorityLevel: string;
  employmentType: string;
  recruimentUrl: string;
  publishedDate: Date;
  cities: string[];
  skills: string[];
}

export interface JobCreateRequest {
  title: string;
  description: string;
  seniorityLevel: string;
  employmentType: string;
  recruimentUrl: string;
  publishedDate: Date;
  cities: string[];
  skills: string[];
}

export interface JobCreateResponse extends Array<JobObject> {}

export interface JobUpdateRequest {
  jobId: number;
  title: string;
  description: string;
  seniorityLevel: string;
  employmentType: string;
  recruimentUrl: string;
  cities: string[];
  skills: string[];
}

export interface JobUpdateResponse extends Array<JobObject> {}

export interface JobDeleteRequest {
  jobId: number;
}

export interface JobDeleteResponse extends Array<JobObject> {}

export class JobRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_JOB_ROUTE
  }
}

export const jobRepository: JobRepository = new JobRepository()
