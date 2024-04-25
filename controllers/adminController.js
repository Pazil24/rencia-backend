import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';


//@desc Generate an invite token for new admin registration
//@route POST /api/admin/invite
//@access private
const generateAdminInvite = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  
  const inviteToken = jwt.sign(
    { role: 'admin' }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
  res.status(200).json({ inviteToken });
});

// 
//@desc Create an admin using an invite token
//@route POST /api/admin/register
//@access Private
const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, token } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== 'admin') {
    res.status(401).json({ message: "Invalid or expired token" });
  }

  const adminAvailable = await User.findOne({ email });
  if (adminAvailable) {
    res.status(400); 
    throw new Error("Admin already exists" );
    }

  //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:',hashedPassword);
    const admin = await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'admin'
  });
  console.log(`User created: ${admin}`);
    if(admin) {
        res.status(201).json({ _id: admin._id, email: admin.email , role: admin.role})
    }else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
    res.json({
        message: 'Admin Registered'
    });
});

//@desc Admin login
//@route POST /api/admin/login
//@access Public
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Find the user by email and ensure they are an admin
    const user = await User.findOne({ email, role: 'admin' });
    if (!user) {
        res.status(401).json({ message: 'Invalid email or not authorized as admin' });
        return;
    }

    // Check if the password is correct
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

//@desc current admin info
//@route GET /api/admin/current
//@access private
const currentAdmin = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    });
  });

export { generateAdminInvite, createAdmin, adminLogin, currentAdmin };


