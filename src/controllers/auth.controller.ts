import { StatusCodes } from "http-status-codes"
import { ErrorResponseUtil, SuccessResponseUtil } from "../utils/Responses.util"
import { AuthService } from "../services/auth.service"
import type { Request, Response, NextFunction } from "express"
import { userModel } from "../database/models/User.model"

export class authController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email
      const password: string = req.body.password

      const data = await AuthService.Login(email, password)

      if (!data) {
        const error = new ErrorResponseUtil().setError("invalid password or email")
        res.status(StatusCodes.UNAUTHORIZED).json(error)
        return
      }

      const success = new SuccessResponseUtil({
        message: "Login successful",
        data: data,
      })

      res.status(StatusCodes.OK).json(success)
    } catch (error) {
      console.error("Login error:", error)
      const errorResponse = new ErrorResponseUtil().setError("Database connection error")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body

      if (!userData) {
        const error = new ErrorResponseUtil().setError("no user data")
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
      }

      const user = await userModel.findOne({ email: userData.email })

      if (user) {
        const error = new ErrorResponseUtil().setError("user already exists")
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
      }

      const newUser = await AuthService.Register(
        userData.email,
        userData.firstName,
        userData.lastName,
        userData.password,
        userData.role || "user",
      )

      if (!newUser) {
        const error = new ErrorResponseUtil().setError("Failed to create user")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return
      }

      const success = new SuccessResponseUtil({
        message: "Registration successful",
        data: newUser,
      })

      res.status(StatusCodes.CREATED).json(success)
    } catch (error) {
      console.error("Registration error:", error)
      const errorResponse = new ErrorResponseUtil().setError("Database connection error")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }
}
