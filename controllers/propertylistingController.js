import asyncHandler from 'express-async-handler';
import PropertyListing from '../models/propertylistingModel.js'

//@desc get all property listings
//@route GET /api/properties
//@access Public

const getPropertyListings = asyncHandler(async (req, res) => {
    const properties = await PropertyListing.find();
    res.status(200).json(properties)
});

//@desc Get a property listing
//@route GET /api/properties/:id
//@access Public

const getPropertyListing = asyncHandler(async (req, res) => {
    const property = await PropertyListing.findById(req.params.id);
    if (!property) {
        res.status(404);
        throw new Error('Property not found')
    }
    res.status(200).json(property)
});

//@desc Add a property listing
//@route POST /api/properties/:id
//@access Public

const addPropertyListing = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, image, estateType, description, price } = req.body;
    if (!name || !image || !estateType || !description || !price) {
        res.status(400);
        throw new Error('All fields are required')
    }
    const property = await PropertyListing.create({ name, image, estateType, description, price, });
    res.status(201).json(property)
});

//@desc Update a property listing
//@route PUT /api/properties/:id
//@access Public

const updatePropertyListing = asyncHandler(async (req, res) => {
    const property = await PropertyListing.findById(req.params.id);
    if (!property) {
        res.status(404);
        throw new Error('Property not found')
    }

    const updatedProperty = await PropertyListing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );
    res.status(200).json(updatedProperty)
});

//@desc delete a property listing
//@route DELETE /api/properties/:id
//@access Public

const deletePropertyListing = asyncHandler(async (req, res) => {
    const property = await PropertyListing.findById(req.params.id);
    if (!property) {
        res.status(404);
        throw new Error('Property not found')
    }
    await PropertyListing.findByIdAndDelete(req.params.id);
    res.status(200).json(property)
});

export { getPropertyListings, getPropertyListing, addPropertyListing, updatePropertyListing, deletePropertyListing };