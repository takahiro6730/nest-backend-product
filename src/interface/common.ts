import { Types } from 'mongoose';
export interface responseData {
    statusCode: Number;
    timestamp: String;
    path?: String;
    data?: [] | null;
    message: String,
    isSuccess: Boolean,
    error: string | null | []

}

export interface userData {
    username?: String;
    first_name?: String;
    last_name?: String;
    activation_code?: String;
    email?: String;
    email_code?: String;
    password?: String;
    password_reset_code?: String
    _id?: Types.ObjectId | String | null
    hashdRt?: String | null
}
export interface UserRequest extends Request {
    user: any
}


