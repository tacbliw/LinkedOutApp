import { AxiosResponse } from 'axios'
import { API_EXPERIENCE_ROUTE } from '../config/api-const'
import { API_BASE_URL } from '../config/consts'
import { httpConfig } from '../config/http/config'
import { Repository } from './base-repository'

export interface ExperienceObject {
  id: number
  accountId: number
  companyName: string
  profilePicture: string
  startDate: Date
  endDate: Date
  title: string
  description: string
}

export interface ExperienceListRequest {
  id: number
}

export interface ExperienceListResponse extends Array<ExperienceObject> {}

export interface ExperienceCreateRequest {
  companyName: string
  startDate: Date
  endDate: Date
  title: string
  description: string
}

export interface ExperienceCreateResponse extends Array<ExperienceObject> {}

export interface ExperienceUpdateRequest {
  experienceId: number
  experience: {
    companyName: string
    startDate: Date
    endDate: Date
    title: string
    description: string
  }
}

export interface ExperienceUpdateResponse extends Array<ExperienceObject> {}

export interface ExperienceDeleteRequest {
  experienceId: number
}

export interface ExperienceDeleteResponse extends Array<ExperienceObject> {}

export class ExperienceRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_EXPERIENCE_ROUTE
  }

  public async get(id: number): Promise<ExperienceListResponse> {
    return this.http
      .get('list', {
        params: {
          id,
        },
      })
      .then((response: AxiosResponse) => response.data)
  }

  public async create(
    companyName: string,
    startDate: string,
    endDate: string,
    title: string,
    description: string,
  ): Promise<ExperienceCreateResponse> {
    return this.http
      .post('create', {
        companyName,
        startDate,
        endDate,
        title,
        description,
      })
      .then((response: AxiosResponse) => response.data)
  }

  public async delete(id: number): Promise<ExperienceDeleteResponse> {
    return this.http
      .post('delete', {
        id: id,
      })
      .then((response: AxiosResponse) => response.data)
  }
}

export const experienceRepository: ExperienceRepository = new ExperienceRepository()
