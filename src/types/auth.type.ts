import { User } from './user.type'
import { SuccesReponse } from './utils.type'

export type AuthReponse = SuccesReponse<{
  access_token: string
  expires: string
  user: User
}>
