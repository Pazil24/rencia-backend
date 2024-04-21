import express from 'express';
import dotenv from 'dotenv';
import propertylistingRoute from './routes/propertylistingRoute.js';
import userRoute from './routes/userRoute.js';
import errorHandler from './middleware/errorhandler.js';
import connectDb from './config/dbConnection.js';

dotenv.config();
connectDb();

const app = express();

const port = process.env.PORT || 3000;

//add middleware to parse the request body (this is to get the data from the client which would be the company posting through an admin dashboard)
app.use(express.json());

//add the propertylistingRoute to the app
app.use('/api/properties', propertylistingRoute);
app.use('/api/users', userRoute);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`My express server has started on Port ${port}`)
})