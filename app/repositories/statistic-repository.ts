import { AxiosResponse } from "axios"
import { API_STATISTIC_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"


interface UsersBySkillObject {
  name: string;
  count: number;
}

export interface UsersBySkillResponse extends Array<UsersBySkillObject> {}


interface JobsBySkillObject {
  name: string;
  count: number;
}

export interface JobsBySkillResponse extends Array<JobsBySkillObject> {}


interface PostsBySkillObject {
  name: string;
  count: number;
}

export interface PostsBySkillResponse extends Array<PostsBySkillObject> {}


export class StatisticRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_STATISTIC_ROUTE
  }
}

export const statisticRepository: StatisticRepository = new StatisticRepository()
