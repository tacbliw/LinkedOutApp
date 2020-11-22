import { AxiosResponse } from "axios"
import { API_FEED_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface PostObject {
  type: string;
  postId: number;
  userFirstname: string;
  userLastname: string;
  userProfilePicture: string;
  content: string;
  publishedDate: number;
  postPicture: string;
}

export interface JobObject {
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
  publishedDate: number;
  jobPicture: string;
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

  public async get(timestamp: number): Promise<FeedGetResponse> {
    if (timestamp) { // only send with timestamp when it's not null
      return this.http.get('get', {
        params: {
          t: timestamp
        }
      }).then((response: AxiosResponse) => response.data)
    }
    return this.http.get('get',).then((response: AxiosResponse) => response.data)
  }
}

export const feedRepository: FeedRepository = new FeedRepository()
