import {Schema, model} from 'mongoose';
import {User} from '../../types/global';

export const Userschema = new Schema<User>({
    email : {
        type: String,
        trim: true,
        required: true
    },
     password: {
        type: String,
        trim: true,
        required: true
    },
      firstName: {
        type: String,
        trim: true,
        required: true
    },
      lastName : {
        type: String,
        trim: true,
        required: true
    },
      role : {
        type: String,
        trim: true,
        required: false,
        enum: ['user', 'admin'],
        default: 'user'
    },

},
    {
     timestamps: true,
    }
);
export const userModel = model<User>("user", Userschema);