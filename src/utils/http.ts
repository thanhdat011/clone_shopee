import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '../constants/HttpStatusCode.enum'
import { AuthReponse } from '../types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import path from '../constants/path'

class Http {
  instance: AxiosInstance
  private accesToken: string
  constructor() {
    this.accesToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accesToken && config.headers) {
          config.headers.authorization = this.accesToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthReponse
          this.accesToken = data.data.access_token
          setAccessTokenToLS(this.accesToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accesToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
