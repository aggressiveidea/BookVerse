import { bookModel } from "../database/models/Book.model";
import type { Book } from "../types/global";

export class BookService {
  static async getAllBooks(): Promise<Book[]> {
    try {
      const books = await bookModel.find();
      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw new Error("Failed to fetch books");
    }
  }

  static async getBookByID(id: string): Promise<Book | null> {
    try {
      const book = await bookModel.findById(id);
      if (!book) {
        console.error("Book not found with ID:", id);
        return null;
      }
      return book;
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      throw new Error("Failed to fetch book by ID");
    }
  }

  static async createBook(bookData: Book): Promise<Book> {
    try {
      const newBook = await bookModel.create(bookData);
      return newBook;
    } catch (error) {
      console.error("Error creating book:", error);
      throw new Error("Failed to create book");
    }
  }

  static async updateBook(id: string, bookData: Partial<Book>): Promise<Book | null> {
    try {
      const updatedBook = await bookModel.findByIdAndUpdate(id, bookData, { new: true });
      if (!updatedBook) {
        console.log("Book not found");
        return null;
      }
      return updatedBook;
    } catch (error) {
      console.error("Error updating book:", error);
      throw new Error("Failed to update book");
    }
  }

  static async deleteBook(id: string): Promise<boolean> {
    try {
      const deletedBook = await bookModel.findByIdAndDelete(id);
      if (!deletedBook) {
        console.error("Book not found with ID:", id);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw new Error("Failed to delete book");
    }
  }
}
