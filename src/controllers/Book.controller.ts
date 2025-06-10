import { BookService } from "../services/Books.service"
import { StatusCodes } from "http-status-codes"
import type { Request, Response, NextFunction } from "express"
import { ErrorResponseUtil, SuccessResponseUtil } from "../utils/Responses.util"

export class bookController {
  static async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await BookService.getAllBooks()
      if (!books || books.length === 0) {
        const errorResponse = new ErrorResponseUtil().setError("no book found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "books fetched successfully",
        data: books,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.error("Error fetching books:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to fetch books")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async getBookByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bookID: string = req.params.id
    try {
      const book = await BookService.getBookByID(bookID)
      if (!book) {
        const errorResponse = new ErrorResponseUtil().setError("book not found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "book fetched successfully",
        data: book,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.log("error fetching book ")
      const errorResponse = new ErrorResponseUtil().setError("Failed to fetch book")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bookData = req.body
    try {
      const createdBook = await BookService.createBook(bookData)
      const SuccessResponse = new SuccessResponseUtil({
        message: "book created successfully",
        data: createdBook,
      })
      res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
      console.error("Error creating book:", error)
      const errorResponse = new ErrorResponseUtil().setError("filed to create book")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bookID: string = req.params.id
    const bookData = req.body
    try {
      const updateBook = await BookService.updateBook(bookID, bookData)
      if (!updateBook) {
        const errorResponse = new ErrorResponseUtil().setError("book not found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "book updated successfully",
        data: updateBook,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.error("Error updating book:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to update book")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bookID: string = req.params.id
    try {
      const deletedBook = await BookService.deleteBook(bookID)
      if (!deletedBook) {
        const errorResponse = new ErrorResponseUtil().setError("book not found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "book deleted successfully",
        data: deletedBook,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.error("eror deleting book:", error)
      const errorResponse = new ErrorResponseUtil().setError("failed to delete book")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }
}
