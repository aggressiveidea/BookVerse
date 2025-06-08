import { SuccessResponse, ErrorResponse } from "../types/response";

export class SuccessResponseUtil<T> implements SuccessResponse<T> {
  public data: T | null | undefined = undefined;
  public message: string | null = null;
  public success: boolean = true;

  constructor(data?: T | null, message?: string | null) {
    this.data = data;
    this.message = message || null;
  }

  public setData(data: T): this {
    this.data = data;
    return this;
  }

  public setMessage(message: string): this {
    this.message = message;
    return this;
  }
}
export class ErrorResponseUtil implements ErrorResponse {
  public error: string | null = null;
  public success: boolean = false;

  constructor(message?: string | null) {
    this.error = message ?? null;
  }

  public setError(message: string): this {
    this.error = message;
    return this;
  }
}