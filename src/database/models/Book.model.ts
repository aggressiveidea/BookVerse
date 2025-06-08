import {Schema, model} from 'mongoose';
import type {Book} from '../../types/global';
export const bookSchema = new Schema<Book>({
    title: {
        type: String,
        required: true,
        trim : true,
    },
    author: {
        type: String,
        required : true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim : true,
    },
}) 
export const bookModel = model<Book>('Book', bookSchema);
