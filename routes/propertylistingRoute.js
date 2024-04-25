import express from 'express';
import { getPropertyListings, getPropertyListing} from '../controllers/propertylistingController.js';

const router = express.Router();

router.get('/', getPropertyListings);


router.get('/:id', getPropertyListing);


export default router;