export declare interface Book {
  _id?: string
  title: string
  author: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}
export declare interface User {
  _id?: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: string,
  createdAt?: Date
  updatedAt?: Date
}
