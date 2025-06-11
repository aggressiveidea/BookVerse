import { StatusCodes } from "http-status-codes";
import { ErrorResponseUtil, SuccessResponseUtil } from "../utils/Responses.util";
import { AuthService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";

class authController {
  static async login(req: Request, res: Response, next: NextFunction){
    const email :string = req.body.email
    const password :string = req.body.password
    const data = await AuthService.Login(email, password);
    if(!data){
        const error = new ErrorResponseUtil().setError("invalid password or email");
        return res.status(StatusCodes.UNAUTHORIZED).json(error);
    }
    const success = new SuccessResponseUtil({
      message: 'Login successful',
      data: data
    });
  }
  static async Register(req: Request, res: Response, next: NextFunction){
    const userData = req.body
    if(!userData){
        const error = new ErrorResponseUtil().setError("no user data");
        return res.status(StatusCodes.BAD_REQUEST).json(error)
     }
     
      
  }
}