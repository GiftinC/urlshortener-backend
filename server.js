import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import urlRoutes from "./routes/urlRoutes.js"

import { forgotPassword, resetPassword, loginUser, registerUser } from './controllers/authController.js';
import shortenRoute from './routes/shorten.js';

dotenv.config();

mongoose.set('strictQuery', true);

const app = express();

const corsOptions = {
    origin: `${process.env.FEURL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};


app.use(cors(corsOptions));
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.post('/forgot-password', forgotPassword);
app.post('/reset-password', resetPassword);
app.post('/login', loginUser);
app.post('/register', registerUser);

app.use('/api', shortenRoute);
app.use('/', shortenRoute);
app.use('/api/urls', urlRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
