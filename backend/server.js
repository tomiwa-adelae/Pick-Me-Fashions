import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import orderRoute from './routes/orderRoute.js';

dotenv.config();

const app = express();

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// DB Connect
const db = process.env.MONGO_URI;

// Connect MongoDB
mongoose
   .connect(db)
   .then(() => console.log('Mongo DB Connected!!!'))
   .catch((err) => console.log('An error occured!!!'));

// API Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoute);

// Paypal API
app.get('/api/config/paypal', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID || 'sandbox');
});

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '/frontend/build')));

   app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
   );
} else {
   app.get('/', (req, res) => {
      res.send('API is running...');
   });
}
const PORT = process.env.PORT || 5000;

app.listen(
   PORT,
   console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
);
