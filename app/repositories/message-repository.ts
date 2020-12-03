import { AxiosResponse } from 'axios'
import { API_MESSAGE_ROUTE } from '../config/api-const'
import { API_BASE_URL } from '../config/consts'
import { httpConfig } from '../config/http/config'
import { Repository } from './base-repository'

export interface MessageSendRequest {
  id: number
  type: string
  content: string
}

export interface MessageSendResponse {
  // just a string
}

export interface ConversationListRequest {
  t: number
}

export interface ConversationListResponse {
  id: number // account id
  name: string
  profilePicture: string
  lastMessageContent: string
  lastMessageTimestamp: number
  outgoing: boolean
}

export interface ConversationGetRequest {
  id: number // account id
  t: number
}

export interface ConversationGetResponse {
  id: number
  senderId: number
  receiverId: number
  type: string
  content: string
  publishedDate: number
}

export class MessageRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_MESSAGE_ROUTE
  }

  public async list(timestamp: number): Promise<ConversationListResponse[]> {
    if (timestamp) {
      // only send with timestamp when it's not null
      return this.http
        .get('list-conversation', {
          params: {
            t: timestamp,
          },
        })
        .then((response: AxiosResponse) => response.data)
    }
    return this.http
      .get('list-conversation')
      .then((response: AxiosResponse) => response.data)
  }

  public async get(
    id: number,
    timestamp: number,
  ): Promise<ConversationGetResponse[]> {
    if (timestamp) {
      // only send with timestamp when it's not null
      return this.http
        .get('get-conversation', {
          params: {
            id: id,
            t: timestamp,
          },
        })
        .then((response: AxiosResponse) => response.data)
    }
    return this.http
      .get('get-conversation', {
        params: {
          id: id,
        },
      })
      .then((response: AxiosResponse) => response.data)
  }

  public async send(
    id: number,
    type: string,
    content: string,
  ): Promise<string> {
    return this.http
      .post('send', {
        id: id,
        type: type,
        content: content,
      })
      .then((response: AxiosResponse) => response.data)
  }
}

export const messageRepository: MessageRepository = new MessageRepository()
