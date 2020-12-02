import { AxiosResponse } from "axios"
import { API_COMMENT_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

export interface CommentListRequest {
  id: number;
}

export interface CommentListResponse {
  id: number;
  accountId: number;
  userFirstName: string;
  userLastName: string;
  userProfilePicture: string;
  content: string;
  publishedDate: number;
}

export interface CommentCreateRequest {
  id: number;
  content: string;
}

export interface CommentCreateResponse {
  id: number;
  accountId: number;
  userFirstName: string;
  userLastName: string;
  userProfilePicture: string;
  content: string;
  publishedDate: number;
}

export interface CommentUpdateRequest {
  id: number;
  content: string;
}

export interface CommentUpdateResponse {
  id: number;
  accountId: number;
  userFirstName: string;
  userLastName: string;
  userProfilePicture: string;
  content: string;
  publishedDate: number;
}

export interface CommentDeleteRequest {
  id: number;
}

export interface CommentDeleteResponse {
  id: number;
  accountId: number;
  userFirstName: string;
  userLastName: string;
  userProfilePicture: string;
  content: string;
  publishedDate: number;
}

export interface CommentCountRequest {
  id: number;
}

export interface CommentCountResponse {
  count: number;
}

export class CommentRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_COMMENT_ROUTE
  }

  public async list(id: number): Promise<CommentListResponse[]> {
    return this.http.get('list', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async create(id: number, content: string): Promise<CommentCreateResponse[]> {
    return this.http.post('create', {
      id: id,
      content: content
    }).then((response: AxiosResponse) => response.data)
  }

  public async update(id: number, content: string): Promise<CommentUpdateResponse[]> {
    return this.http.post('update', {
      id: id,
      content: content
    }).then((response: AxiosResponse) => response.data)
  }

  public async delete(id: number): Promise<CommentDeleteResponse[]> {
    return this.http.post('delete', {
      id: id
    }).then((response: AxiosResponse) => response.data)
  }

  public async count(id: number): Promise<CommentCountResponse> {
    return this.http.get('count', {
      params: {
        id: id
      }
    }).then((response: AxiosResponse) => response.data)
  }
}

export const commentRepository: CommentRepository = new CommentRepository()
