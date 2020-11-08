import { API_TAG_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface SkillTagRequest {
  query: string;
}

export interface SkillTagResponse {
  tag: string[];
}

export interface TitleTagRequest {
  query: string;
}

export interface TitleTagResponse {
  tag: string[];
}

export interface SchoolTagRequest {
  query: string;
}

export interface SchoolTagResponse {
  name: string[];
}

export interface CompanyTagRequest {
  query: string;
}

export interface CompanyTagResponse {
  name: string[];
}

export interface SpecialtyTagRequest {
  query: string;
}

export interface SpecialtyTagResponse {
  tag: string[];
}

export interface LocationTagRequest {
  query: string;
}

export interface LocationTagResponse {
  tag: string[];
}

export class TagRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_TAG_ROUTE
  }
}

export const tagRepository: TagRepository = new TagRepository()
