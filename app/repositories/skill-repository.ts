import { API_SKILL_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface SkillListRequest {
  id: number;
}

export interface SkillListResponse {
  skills: string[];
}

export interface SkillCreateRequest {
  skill: string;
}

export interface SkillCreateResponse {
  skills: string[];
}

export interface SkillDeleteRequest {
  skill: string;
}

export interface SkillDeleteResponse {
  skills: string[];
}

export class SkillRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_SKILL_ROUTE
  }
}

export const skillRepository: SkillRepository = new SkillRepository()
