import express from 'express';
import { getPropertyListings, getPropertyListing, addPropertyListing, updatePropertyListing, deletePropertyListing } from '../controllers/propertylistingController.js';
import tokenValidator from '../middleware/tokenValidatorHandler.js';
import authorizeUser from '../middleware/authorizeUserHandler.js';

const router = express.Router();

router.get('/', getPropertyListings);

router.post('/', tokenValidator, authorizeUser(['admin']), addPropertyListing);

router.route('/:id').get(getPropertyListing);
router.route('/:id', tokenValidator, authorizeUser(['admin'])).put(updatePropertyListing).delete(deletePropertyListing);


export default router;