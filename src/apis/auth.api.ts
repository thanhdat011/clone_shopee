import { AuthReponse } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthReponse>('/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthReponse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  }
}
export default authApi
