import { AxiosResponse } from "axios"
import { API_SEARCH_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface PostObject {
  type: string;
  postId: number;
  userFirstname: string;
  userLastname: string;
  title: string;
  content: string;
  publishedDate: Date;
  skills: string[];
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
  publishedDate: Date;
  cities: string[];
  skills: string[];
}

interface CompanyObject {
  type: string;
  id: number;
  name: string;
  website: string;
  description: string;
  profilePicture: string;
  specialties: string[];
}

interface UserObject {
  type: string;
  id: number;
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: string;
  profilePicture: string;
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

  public async search(type: string, query: string, skills: string, specialties: string): Promise<SearchResponse> {
    console.log(`${type}, ${query}`)
    return this.http.get('', {
      params: {
        type,
        query,
        skills,
        specialties
      }
    }).then((response: AxiosResponse) => response.data)
  }
}

export const searchRepository: SearchRepository = new SearchRepository()
