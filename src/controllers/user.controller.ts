import { UserService } from "../services/user.service";
import { ErrorResponseUtil, SuccessResponseUtil } from "../utils/Responses.util";
import { StatusCodes } from "http-status-codes";
import {Request, Response, NextFunction} from 'express'

export class UserController{
    static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const users = await UserService.getAllUsers()
          if (!users || users.length === 0) {
            const errorResponse = new ErrorResponseUtil().setError("no users found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "users fetched successfully",
            data: users,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.error("Error fetching users:", error)
          const errorResponse = new ErrorResponseUtil().setError("Failed to fetch users")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
    
      static async getUserByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userID: string = req.params.id
        try {
          const user = await UserService.getUserByID(userID)
          if (!user) {
            const errorResponse = new ErrorResponseUtil().setError("user not found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "user fetched successfully",
            data: user,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.log("error fetching user ")
          const errorResponse = new ErrorResponseUtil().setError("Failed to fetch user")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
      static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userID: string = req.params.id
        const userData = req.body
        try {
          const updateUser = await UserService.UpdateUser(userID, userData)
          if (!updateUser) {
            const errorResponse = new ErrorResponseUtil().setError("user not found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "user updated successfully",
            data: updateUser,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.error("Error updating user:", error)
          const errorResponse = new ErrorResponseUtil().setError("Failed to update user")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
    
      static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userID: string = req.params.id
        try {
          const deletedUser = await UserService.DeleteUser(userID)
          if (!deletedUser) {
            const errorResponse = new ErrorResponseUtil().setError("user not found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "user deleted successfully",
            data: deletedUser,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.error("error deleting user:", error)
          const errorResponse = new ErrorResponseUtil().setError("failed to delete user")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
}