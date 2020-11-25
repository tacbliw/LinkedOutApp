import { API_COMMENT_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"

interface CommentObject {
  commentId: number;
  accountId: number;
  userFirstname: string;
  userLastname: string;
  content: string;
  publishedDate: number;
}

export interface CommentListRequest {
  postId: number;
}

export interface CommentListResponse extends Array<CommentObject> {}

export interface CommentCreateRequest {
  postId: number;
  content: string;
}

export interface CommentCreateResponse extends Array<CommentObject> {}

export interface CommentUpdateRequest {
  commentId: number;
  content: string;
}

export interface CommentUpdateResponse extends Array<CommentObject> {}

export interface CommentDeleteRequest {
  commentId: number;
}

export interface CommentDeleteResponse extends Array<CommentObject> {}

export class CommentRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_COMMENT_ROUTE
  }
}

export const commentRepository: CommentRepository = new CommentRepository()
