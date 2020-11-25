import { API_FEED_ROUTE } from "../config/api-const"
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
  publishedDate: number;
  skills: string[];
}

interface JobObject {
  type: string;
  jobId: number;
  companyName: string;
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
  accountId: number;
  name: string;
  description: string;
}

interface UserObject {
  type: string;
  accountId: number;
  firstname: string;
  lastname: string;
  description: string;
}


export interface FeedGetRequest {
  t: number;
}

export interface FeedGetResponse extends Array<PostObject | JobObject> {}


export interface FeedSuggestFollowResponse extends Array<CompanyObject | UserObject> {}


export class FeedRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_FEED_ROUTE
  }
}

export const feedRepository: FeedRepository = new FeedRepository()
