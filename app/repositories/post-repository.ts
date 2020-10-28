import { AxiosResponse } from "axios"
import { API_POST_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { Repository } from "./base-repository"


interface PostObject {
  postId: number;
  title: string;
  content: string;
  publishedDate: Date;
  skills: string[];
}

export interface PostListRequest {
  id: number;
}

export interface PostListResponse extends Array<PostObject> {}


export interface PostGetRequest {
  postId: number;
}

export interface PostGetResponse extends PostObject {}


export interface PostCreateRequest {
  title: string;
  content: string;
  skills: string[];
}

export interface PostCreateResponse extends Array<PostObject> {}


export interface PostUpdateRequest {
  postId: number;
  title: string;
  content: string;
  skills: string[];
}

export interface PostUpdateResponse extends Array<PostObject> {}


export interface PostDeleteRequest {
  postId: number;
}

export interface PostUpdateResponse extends Array<PostObject> {}


export class PostRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_POST_ROUTE
  }
}

export const postRepository: PostRepository = new PostRepository()
