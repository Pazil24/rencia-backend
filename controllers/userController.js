import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//@desc Register a user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are required')
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists')
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:',hashedPassword);
    const user = await User.create({
        username, 
        email, 
        password: hashedPassword
    });
    console.log(`User created: ${user}`);
    if(user) {
        res.status(201).json({ _id: user._id, email: user.email })
    }else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.json({
        message: 'User Registered'
    });
});

//@desc Current user info
//@route POST /api/users/current
//@access Private
const userLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are required')
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }, process.env.JWT_SECRET, { expiresIn: '30s' });
        res.status(200).json({ token });
    }else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

//@desc Register a user
//@route POST /api/users/register
//@access Public
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
}
)

export { registerUser, userLogin, currentUser };