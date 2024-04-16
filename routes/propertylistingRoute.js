import express from 'express';
import { getPropertyListings, getPropertyListing, addPropertyListing, updatePropertyListing, deletePropertyListing } from '../controllers/propertylistingController.js';

const router = express.Router();

router.route('/').get(getPropertyListings).post(addPropertyListing);

router.route('/:id').get(getPropertyListing).put(updatePropertyListing).delete(deletePropertyListing);


export default router;