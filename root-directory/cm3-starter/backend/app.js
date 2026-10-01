const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const connectDB = require("./config/db");
const cors = require('cors');

// Middleware

app.use(cors());
app.use(express.json());
//app.use(requestLogger);
connectDB();
// Routes
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use('/api/users', userRouter);
// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

