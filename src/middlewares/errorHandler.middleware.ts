import { StatusCodes } from "http-status-codes"
import { ErrorResponseUtil } from "../utils/Responses.util"
import type { NextFunction, Request, RequestHandler, Response } from "express"

export class ErrorHandler {
  /**
   * @description handles async request handlers and catches any errors
   * @param handler the request handler function
   * @returns
   */
  static asyncHandler(handler: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
      return Promise.resolve(handler(req, res, next)).catch(next)
    }
  }

  static notFound(req: Request, res: Response, next: NextFunction) {
    const errorResponse = new ErrorResponseUtil().setError("Not Found")
    return res.status(StatusCodes.NOT_FOUND).json(errorResponse)
  }

  static internalServerError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error("Error:", err)
    const errorResponse = new ErrorResponseUtil().setError("Internal Server Error - " + err.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
  }
}
