import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      rating: {
         type: Number,
         required: true,
      },
      comment: {
         type: String,
         required: true,
      },
      userId: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      category: {
         type: String,
         required: true,
      },
      countInStock: {
         type: Number,
         required: true,
         default: 0,
      },
      rating: {
         type: Number,
         required: true,
         default: 0,
      },
      numReviews: {
         type: Number,
         required: true,
         default: 0,
      },
      reviews: [reviewSchema],
   },
   {
      timestamps: true,
   }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
