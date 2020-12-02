import { AxiosResponse } from "axios"
import { API_NOTIFICATION_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"
import { FeedRepository } from "./feed-repository"

export interface NotificationListRequest {
  t: number;
}

export interface NotificationListResponse {
  id: number;
  receiverId: number;
  type: string;
  content: string;
  accountId: number;
  postJobId: number;
  commentId: number;
  publishedDate: number;
}

export class NotificationRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_NOTIFICATION_ROUTE
  }

  public async list(timestamp: number): Promise<NotificationListResponse[]> {
    if (timestamp) { // only send with timestamp when it's not null
      return this.http.get('list', {
        params: {
          t: timestamp
        }
      }).then((response: AxiosResponse) => response.data)
    }
    return this.http.get('list').then((response: AxiosResponse) => response.data)
  }
}

export const notificationRepository: FeedRepository = new FeedRepository()
