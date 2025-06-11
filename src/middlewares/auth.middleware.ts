import { JwtUtil } from "../utils/jwt.util"
import { userModel } from "../database/models/User.model"
import { StatusCodes } from "http-status-codes"
import { ErrorResponseUtil } from "../utils/Responses.util"
import type { Request, Response, NextFunction } from "express"
import type { User } from "../types/global"

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export class authMiddleware {
  /**
   * @description a middleware to check if the user is authenticated
   */
 static async checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new ErrorResponseUtil().setError("token wasn't provided or malformed");
      res.status(StatusCodes.UNAUTHORIZED).json(error);
      return
    }

    const splited = authHeader.split(" "); 
    const token = splited[1];

    const data = await JwtUtil.verifyToken(token);

    if (!data || !data.id) {
      const error = new ErrorResponseUtil().setError("The provided token is invalid");
      res.status(StatusCodes.UNAUTHORIZED).json(error);
      return
    }

    const user = await userModel.findById(data.id);

    if (!user) {
      const error = new ErrorResponseUtil().setError("The provided token is invalid");
      res.status(StatusCodes.UNAUTHORIZED).json(error);
      return
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("auth error:", error);
    const errorResponse = new ErrorResponseUtil().setError("authentication error");
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    return
  }
}


  /**
   * @description middleware to check if user is admin
   */
  static async checkAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      await authMiddleware.checkAuth(req, res, () => {
        if (!req.user || req.user.role !== "admin") {
          const error = new ErrorResponseUtil().setError("admin access required")
          res.status(StatusCodes.FORBIDDEN).json(error)
          return
        }
        next()
      })
    } catch (error) {
      console.error("access error:", error)
      const errorResponse = new ErrorResponseUtil().setError("authentication error")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }
}
