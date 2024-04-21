import mongoose from "mongoose";

const propertyListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    estateType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
}});

export default mongoose.model('PropertyListing', propertyListingSchema);