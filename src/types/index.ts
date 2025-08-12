export type Task = {
  id: string
  title: string
  body: string
  label: string[]
}

type ApiErrorResponse = {
  data: null
  success: false
  message: string
  errorCode: string
}

type ApiSuccessResponse<T> = {
  data: T
  success: true
  message: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
