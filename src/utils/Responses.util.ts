export class SuccessResponseUtil {
  success: boolean
  message: string
  data?: any

  constructor({ message, data }: { message: string; data?: any }) {
    this.success = true
    this.message = message
    this.data = data
  }
}

export class ErrorResponseUtil {
  success: boolean
  error: string

  constructor() {
    this.success = false
    this.error = ""
  }

  setError(error: string): this {
    this.error = error
    return this
  }
}
