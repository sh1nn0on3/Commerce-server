interface Idata {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    name: string
    email: string
    number: string
    role: string
  }
}
export interface IResponse {
  status: number
  message: string
  data?: Idata
}
