import asyncHandler from 'express-async-handler';

//@desc get all property listings
//@route GET /api/properties
//@access Public

const getPropertyListings = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get all properties' })
});

//@desc Get a property listing
//@route GET /api/propertyli
//@access Public

const getPropertyListing = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Get a property listing for ${req.params.id}` })
});

//@desc Add a property listing
//@route POST /api/propertylistings
//@access Public

const addPropertyListing = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, image, description, price } = req.body;
    if (!name || !image || !description || !price) {
        res.status(400);
        throw new Error('All fields are required')
    }
    res.status(200).json({ message: 'Add new properties listings' })
});

//@desc Update a property listing
//@route PUT /api/propertylistings
//@access Public

const updatePropertyListing = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update a property listing for ${req.params.id}` })
});

//@desc delete a property listing
//@route DELETE /api/propertylistings
//@access Public

const deletePropertyListing = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete a property listing for ${req.params.id}` })
});

export { getPropertyListings, getPropertyListing, addPropertyListing, updatePropertyListing, deletePropertyListing };