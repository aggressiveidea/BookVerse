import { JwtUtil } from "../utils/jwt.util";
import { userModel } from "../database/models/User.model";
import { StatusCodes } from "http-status-codes";
import { ErrorResponseUtil } from "../utils/Responses.util";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/global";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export class authMiddleware {
  /**
   * @description a middleware to check if the user is authenticated 
   */
  static async checkAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    
    if (!token) {
      const error = new ErrorResponseUtil().setError("token wasn't provided");
      return res.status(StatusCodes.UNAUTHORIZED).json(error);
    }

    const data = await JwtUtil.verifyToken(token); 

    if (!data || !data.id) {
      const error = new ErrorResponseUtil().setError("the provided token is invalid");
      return res.status(StatusCodes.UNAUTHORIZED).json(error);
    }

    const user = await userModel.findById(data.id);

    if (!user) {
      const error = new ErrorResponseUtil().setError("the provided token is invalid");
      return res.status(StatusCodes.UNAUTHORIZED).json(error);
    }

    req.user = user; 

    next();
  }
}
