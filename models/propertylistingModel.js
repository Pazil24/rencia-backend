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
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
{ 
    timestamps: { 
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    updatedAt: {
        type: Date,
        default: Date.now
    }
    }
});

export default mongoose.model('PropertyListing', propertyListingSchema);