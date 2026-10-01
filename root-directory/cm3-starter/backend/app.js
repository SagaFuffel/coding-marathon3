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
app.use('/api/users', userRouter);
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use(express.static('view'));
app.use('/api',unknownEndpoint);
app.use(errorHandler);
app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});







module.exports = app;

