import { body } from "express-validator"

export class bookValidatorMiddleware {
  static validBook = [
    body("title").notEmpty().withMessage("title is required"),
    body("author").notEmpty().withMessage("author is required"),
  ];
  static validUser = [
    body("email").notEmpty().normalizeEmail().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
    body("firstName").notEmpty().withMessage("first name is required"),
    body("lastName").notEmpty().withMessage("last name is required")
  ]
}
