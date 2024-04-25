// adminRoutes.js
import express from 'express';
import { addPropertyListing, updatePropertyListing, deletePropertyListing } from '../controllers/propertylistingController.js';
import { generateAdminInvite,createAdmin, adminLogin, currentAdmin } from '../controllers/adminController.js';
import tokenValidator from '../middleware/tokenValidatorHandler.js';
import authorizeUser from '../middleware/authorizeUserHandler.js';

const router = express.Router();

router.post('/invite', tokenValidator, authorizeUser(['admin']), generateAdminInvite);
router.post('/register', createAdmin);
router.post('/login', adminLogin);

router.get('/current', tokenValidator, currentAdmin);

router.post('/property', tokenValidator, authorizeUser(['admin']), addPropertyListing);

router.put('/property/:id', tokenValidator, authorizeUser(['admin']), updatePropertyListing);

router.delete('/property/:id', tokenValidator, authorizeUser(['admin']), deletePropertyListing);

export default router;
