import express from 'express';
import Product from '../models/productModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all products
// GET @route /api/products
// Public
router.get('/', (req, res) => {
   Product.find()
      .sort({ createdAt: -1 })
      .then((product) => res.status(200).json(product));
});

// Get single product
// GET @route /api/products/:id
// Public
router.get('/:id', (req, res) => {
   Product.findById(req.params.id)
      .then((product) =>
         res.status(200).json({ product: product, reviews: product.reviews })
      )
      .catch((err) => res.status(400).json({ message: 'No Product Found!' }));
});

// Create a product
// POST @route /api/products/:id
// Private
router.post('/', auth, (req, res) => {
   // Get data from request  body
   const {
      name,
      image,
      description,
      countInStock,
      price,
      brand,
      category,
      numReviews,
   } = req.body;

   // Simple validation
   if (!name) {
      res.status(400).json({ message: 'Please Enter Product Name!' });
   } else if (!price) {
      res.status(400).json({ message: 'Please Enter Product Price!' });
   } else if (!image) {
      res.status(400).json({ message: 'Please Input Image!' });
   } else if (!brand) {
      res.status(400).json({ message: 'Please Enter Product Brand!' });
   } else if (!countInStock) {
      res.status(400).json({ message: 'Please Enter Count In Stock!' });
   } else if (!category) {
      res.status(400).json({ message: 'Please Enter Product Category!' });
   } else if (!description) {
      res.status(400).json({ message: 'Please Product Description!' });
   } else {
      // Create a new product object
      const newProduct = new Product({
         name,
         image,
         description,
         countInStock,
         price,
         brand,
         category,
         numReviews,
      });

      // Save new Product
      newProduct
         .save()
         .then((product) => {
            res.status(201).json(product);
         })
         .catch((err) =>
            res.status(400).json({ message: 'An error occured!' })
         );
   }
});

// Create a product review
// POST @route /api/products/:id/reviews
// Private
router.post('/:id/reviews', auth, (req, res) => {
   const { userId, name, rating, comment } = req.body;

   Product.findById(req.params.id)
      .then((product) => {
         if (product) {
            const alreadyReviewed = product.reviews.find(
               (r) => r.userId.toString() === userId.toString()
            );

            if (alreadyReviewed) {
               res.status(400).json({ message: 'Product already reviewed!' });
            } else {
               if (!rating) {
                  res.status(400).json({
                     message: 'Please give the product a Rating!',
                  });
               } else if (!comment) {
                  res.status(400).json({
                     message: 'Please give the product a comment!',
                  });
               } else {
                  const review = {
                     name,
                     rating: Number(rating),
                     comment,
                     userId,
                  };

                  product.reviews.push(review);

                  product.numReviews = product.reviews.length;

                  product.rating =
                     product.reviews.reduce(
                        (acc, item) => item.rating + acc,
                        0
                     ) / product.reviews.length;

                  product
                     .save()
                     .then(() =>
                        res.status(201).json({ message: 'Review Added!' })
                     );
               }
            }
         } else {
            res.status(400).json({ message: 'Product Not Found!' });
         }
      })
      .catch((err) => res.status(400).json({ message: 'Product not Found!' }));
});

// Delete a Product
// DELETE @/api/products/:id
// Private
router.delete('/:id', auth, (req, res) => {
   Product.findById(req.params.id)
      .then((product) => {
         product
            .remove()
            .then(() =>
               res
                  .status(200)
                  .json({ message: 'Product deleted successfully!' })
            );
      })
      .catch((err) =>
         res.status(400).json({
            message: 'Product not deleted!',
         })
      );
});

// Get most rating products
// GET @route /api/products/most/rated
// Public
router.get('/most/rated', (req, res) => {
   Product.find()
      .sort({ rating: -1 })
      .limit(3)
      .then((product) => res.status(200).json(product))
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

export default router;
