export interface SuccesReponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
