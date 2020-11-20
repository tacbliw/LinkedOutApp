import { AxiosResponse } from "axios"
import { Image } from "react-native-image-crop-picker"
import { API_POST_ROUTE } from "../config/api-const"
import { API_BASE_URL } from "../config/consts"
import { httpConfig } from "../config/http/config"
import { extensionFromUrl } from "../helpers/string-helper"
import { Repository } from "./base-repository"

interface PostObject {
  id: number;
  title: string;
  content: string;
}

export interface PostListRequest {
  id: number;
}

export interface PostListResponse extends Array<PostObject> {}

export interface PostGetRequest {
  id: number;
}

export interface PostGetResponse extends PostObject {}

export interface PostCreateRequest {
  content: string;
}

export interface PostCreateResponse extends PostObject {}

export interface PostUpdateRequest {
  id: number;
  content: string;
}

export interface PostUpdateResponse extends Array<PostObject> {}

export interface PostDeleteRequest {
  id: number;
}

export interface PostDeleteResponse extends Array<PostObject> {}

export class PostRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_POST_ROUTE
  }

  public async list(accountId: number): Promise<PostListResponse> {
    return this.http.get('create', {
      params: {
        id: accountId
      }
    }).then((response: AxiosResponse) => response.data)
  }

  public async create(content: string): Promise<PostCreateResponse> {
    return this.http.post('create', {
      content: content
    }).then((response: AxiosResponse) => response.data)
  }

  public async delete(id: number): Promise<PostDeleteResponse> {
    return this.http.post('delete', {
      id: id
    }).then((response: AxiosResponse) => response.data)
  }

  public async upload(id: number, image: Image): Promise<string> {
    const formData = new FormData()
    console.log(image)
    console.log(`${image.path} ${image.filename} ${image.mime}`)
    const file = {
      uri: image.path,
      name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.' + extensionFromUrl(image.path), // E=mc2
      type: image.mime || 'image/jpeg'
    }
    formData.append('file', file)
    formData.append('id', id)
    return this.http.post('upload', formData).then((response: AxiosResponse) => response.data)
  }
}

export const postRepository: PostRepository = new PostRepository()
