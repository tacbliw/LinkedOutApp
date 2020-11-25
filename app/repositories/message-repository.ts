import { API_MESSAGE_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface MessageObject {
  senderId: number;
  receiverId: number;
  type: string;
  content: string;
  publishedDate: number;
}

export interface MessageSendRequest {
  id: number;
  type: string;
  content: string;
}

export interface ConversationListRequest {
  t: number;
}

export interface ConversationListResponse {
  id: number;
  name: string;
  lastMessageContent: string;
  lastMessageTimestamp: number;
  outgoing: boolean;
}

export interface ConversationGetRequest {
  id: number;
  t: number;
}

export interface ConversationGetResponse extends Array<MessageObject> {}

export class MessageRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_MESSAGE_ROUTE
  }
}

export const messageRepository: MessageRepository = new MessageRepository()
