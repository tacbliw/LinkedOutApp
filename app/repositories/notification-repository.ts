import { API_NOTIFICATION_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface NotificationObject {
  id: number;
  receiverId: number;
  type: string;
  content: string;
  accountId: number;
  postJobId: number;
  commentId: number;
  publishedDate: number;
}

export interface NotificationListRequest {
  t: number;
}

export interface NotificationListResponse extends Array<NotificationObject> {}

export class NotificationRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_NOTIFICATION_ROUTE
  }
}

export const notificationRepository: NotificationRepository = new NotificationRepository()
