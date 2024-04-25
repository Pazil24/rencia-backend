import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        required: [true, 'Please provide a password']
    },
    role: {
        type: String,
        enum: ['admin', 'renter'],
        default: 'renter'
    }
});

export default mongoose.model('User', userSchema);