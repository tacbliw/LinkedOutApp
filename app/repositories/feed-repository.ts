import { API_FEED_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface PostObject {
  type: string;
  postId: number;
  userFirstname: string;
  userLastname: string;
  userProfilePicture: string;
  title: string;
  content: string;
  publishedDate: Date;
  skills: string[];
}

interface JobObject {
  type: string;
  jobId: number;
  companyName: string;
  accountId: number;
  companyProfilePicture: string;
  title: string;
  description: string;
  seniorityLevel: string;
  employmentType: string;
  recruimentUrl: string;
  publishedDate: Date;
  cities: string[];
  skills: string[];
}

export interface FeedGetResponse extends Array<PostObject | JobObject> {}

// We don't need suggest job and suggest follow here, right?

export class FeedRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_FEED_ROUTE
  }
}

export const feedRepository: FeedRepository = new FeedRepository()
