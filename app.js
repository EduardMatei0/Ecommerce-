const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });
// import routes
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRouter');
const categoryRoutes = require('./routes/categoryRouter');
const productRoutes = require('./routes/productRouter');
// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Database connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// set port
const port = process.env.PORT || 8000;

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
