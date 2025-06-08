import { body } from "express-validator";

export class bookValidatorMiddleware {
    static validBook = [
        body('title').notEmpty().withMessage('title is required'),
        body('author').notEmpty().withMessage('author is required'),
        
    ]
}