import { AxiosResponse } from "axios"
import { Image } from "react-native-image-crop-picker"
import { API_JOB_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { extensionFromUrl } from "../helpers/string-helper"
import { Repository } from "./base-repository"

interface JobObject {
  id: number
  title: string
  description: string
  seniorityLevel: string
  employmentType: string
  recruimentUrl: string
  publishedDate: number
  jobPicture: string
  cities: string[]
  skills: string[]
}

export interface JobListRequest {
  id: number
}

export interface JobListResponse extends Array<JobObject> {}

export interface JobGetRequest {
  jobId: number
}

export interface JobGetResponse {
  title: string
  description: string
  seniorityLevel: string
  employmentType: string
  recruimentUrl: string
  publishedDate: number
  cities: string[]
  skills: string[]
}

export interface JobCreateRequest {
  title: string
  description: string
  seniorityLevel: string
  employmentType: string
  recruimentUrl: string
  publishedDate: number
  cities: string[]
  skills: string[]
}

export interface JobCreateResponse extends Array<JobObject> {}

export interface JobUpdateRequest {
  jobId: number
  title: string
  description: string
  seniorityLevel: string
  employmentType: string
  recruimentUrl: string
  cities: string[]
  skills: string[]
}

export interface JobUpdateResponse extends Array<JobObject> {}

export interface JobDeleteRequest {
  jobId: number
}

export interface JobDeleteResponse extends Array<JobObject> {}

export class JobRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_JOB_ROUTE
  }

  public async create(title: string, description: string, seniority_level: string, employment_type: string, recruitment_url: string, cities: string[], skills: string[]): Promise<JobCreateResponse> {
    return this.http.post('create', {
      title: title,
      description: description,
      seniority_level: seniority_level,
      employment_type: employment_type,
      recruitment_url: recruitment_url,
      cities: cities,
      skills: skills
    }).then((response: AxiosResponse) => response.data)
  }

  public async upload(id: number, image: Image): Promise<string> {
    const formData = new FormData()
    console.log(image)
    console.log(`${image.path} ${image.filename} ${image.mime}`)
    const file = {
      uri: image.path,
      name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.' + extensionFromUrl(image.path), // E=mc2
      type: image.mime || 'image/jpeg'
    }
    formData.append('file', file)
    formData.append('id', id)
    return this.http.post('upload', formData).then((response: AxiosResponse) => response.data)
  }
}

export const jobRepository: JobRepository = new JobRepository()
