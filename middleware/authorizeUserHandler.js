import asyncHandler from 'express-async-handler';

const authorizeUser = roles => asyncHandler(async (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  });

  export default authorizeUser;