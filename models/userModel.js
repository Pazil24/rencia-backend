import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
}});

export default mongoose.model('User', userSchema);