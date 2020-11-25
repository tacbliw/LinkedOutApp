import { API_SEARCH_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface PostObject {
  type: string;
  postId: number;
  userFirstname: string;
  userLastname: string;
  content: string;
  publishedDate: number;
}

interface JobObject {
  type: string;
  jobId: number;
  accountId: number;
  title: string;
  description: string;
  seniorityLevel: string;
  employmentType: string;
  recruimentUrl: string;
  publishedDate: number;
  cities: string[];
  skills: string[];
}

interface CompanyObject {
  type: string;
  id: number;
  name: string;
  website: string;
  description: string;
  specialties: string[];
}

interface UserObject {
  type: string;
  id: number;
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: string;
  description: string;
  skills: string[];
}

export interface SearchRequest {
  type: string;
  query: string;
  skills: string[];
  specialties: string[];
}

export interface SearchResponse extends Array<PostObject | JobObject | UserObject | CompanyObject> {}

export class SearchRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_SEARCH_ROUTE
  }
}

export const searchRepository: SearchRepository = new SearchRepository()
