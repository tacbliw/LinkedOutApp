import Axios, { AxiosResponse } from 'axios'
import { Image } from 'react-native-image-crop-picker'
import { API_USER_ROUTE } from '../config/api-const'
import { API_BASE_URL } from '../config/consts'
import { httpConfig } from '../config/http/config'
import { extensionFromUrl } from '../helpers/string-helper'
import { Repository } from './base-repository'

export interface UserGetRequest {
  id: number
}

export interface UserGetResponse {
  firstname: string
  lastname: string
  dateofbirth: string
  gender: string
  profilePicture: string
  description: string
}

export interface UserCreateRequest {
  firstname: string
  lastname: string
  dateofbirth: Date
  gender: string
  description: string
}

export interface UserCreateResponse {
  firstname: string
  lastname: string
  dateofbirth: Date
  gender: string
  profilePicture: string
  description: string
}

export interface UserUpdateRequest {
  firstname: string
  lastname: string
  dateofbirth: Date
  gender: string
  profilePicture: string
  description: string
}

export interface UserUpdateResponse {
  firstname: string
  lastname: string
  dateofbirth: Date
  gender: string
  description: string
}

export class UserRepository extends Repository {
  constructor() {
    super(httpConfig)
    this.baseURL = API_BASE_URL + API_USER_ROUTE
  }

  public async get(id: number): Promise<UserGetResponse> {
    return this.http
      .get('get', {
        params: {
          id,
        },
      })
      .then((response: AxiosResponse) => response.data)
  }

  public async create(
    firstname: string,
    lastname: string,
    dateofbirth: string,
    gender: string,
    description: string,
    accessToken: string,
  ): Promise<UserCreateResponse> {
    return Axios.create({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: this.baseURL,
    })
      .post('create', {
        firstname,
        lastname,
        dateofbirth,
        gender,
        description,
      })
      .then((response: AxiosResponse) => response.data)
  }

  public async update(
    firstname: string,
    lastname: string,
    dateofbirth: string,
    gender: string,
    description: string,
  ): Promise<UserUpdateResponse> {
    return this.http
      .post('update', {
        firstname,
        lastname,
        dateofbirth,
        gender,
        description,
      })
      .then((response: AxiosResponse) => response.data)
  }

  public async upload(image: Image): Promise<string> {
    const formData = new FormData()
    const file = {
      uri: image.path,
      name:
        image.filename ||
        Math.floor(Math.random() * Math.floor(999999999)) +
          '.' +
          extensionFromUrl(image.path), // E=mc2
      type: image.mime || 'image/jpeg',
    }
    formData.append('file', file)
    return this.http
      .post('upload', formData)
      .then((response: AxiosResponse) => response.data)
  }
}

export const userRepository: UserRepository = new UserRepository()
