import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const tokenValidator = asyncHandler(async (req, res, next) => {
   let token;
   let authorization = req.headers.Authorization || req.headers.authorization;
   if(authorization && authorization.startsWith('Bearer')) {
       try {
           token = authorization.split(' ')[1];
           const decoded = jwt.verify(token, process.env.JWT_SECRET);
           req.user = decoded.user;
           next();
       } catch (error) {
           res.status(401);
           throw new Error('Not authorized, token failed');
       }
   }
    if (!token) {
         res.status(401);
         throw new Error('Not authorized, no token');
    }
});

export default tokenValidator;