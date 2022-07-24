import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

import Order from '../models/orderModel.js';

// Get all orders
// GET @/api/orders
// Private
router.get('/', auth, (req, res) => {
   Order.find()
      .sort({ createdAt: -1 })
      .then((order) => res.status(200).json(order))
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

// Get an order
// GET @/api/orders/id
// Private
router.get('/:id', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => res.status(200).json(order))
      .catch((err) => res.status(400).json({ message: 'No order found!' }));
});

// Create an order
// POST @/api/orders
// Private
router.post('/', auth, (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      totalPrice,
      user,
      userObject,
   } = req.body;
   if (orderItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty!' });
   } else {
      const newOrder = new Order({
         orderItems,
         shippingAddress,
         paymentMethod,
         itemPrice,
         shippingPrice,
         totalPrice,
         user,
         userObject,
      });

      newOrder
         .save()
         .then((order) => res.status(201).json(order))
         .catch((err) =>
            res.status(400).json({ message: 'An error occured!' })
         );
   }
});

// Pay an order
// PUT @/api/orders/:id/pay
// Private
router.put('/:id/pay', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => {
         if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
               id: req.body.id,
               status: req.body.status,
               updateTime: req.body.update_time,
               emailAddress: req.body.payer.email_address,
            };

            order
               .save()
               .then((order) => res.status(201).json(order))
               .catch((err) =>
                  res.status(400).json({ message: 'An error occured!' })
               );
         } else {
            res.status(400).json({ message: 'Order not found!' });
         }
      })
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

// Pay an order oncash
// PUT @/api/orders/:id/pay/cash
// Private
router.put('/:id/pay/cash', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => {
         if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();

            order
               .save()
               .then((order) => res.status(201).json(order))
               .catch((err) =>
                  res.status(400).json({ message: 'An error occured!' })
               );
         } else {
            res.status(400).json({ message: 'Order not found!' });
         }
      })
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

// Deliver an order
// PUT @/api/orders/:id/deliver
// Private
router.put('/:id/deliver', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => {
         if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            order
               .save()
               .then((order) => res.status(201).json(order))
               .catch((err) =>
                  res.status(400).json({ message: 'An error occured!' })
               );
         } else {
            res.status(400).json({ message: 'Order not found!' });
         }
      })
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

// Get logged in user order
// GET @/api/orders/myorders/mine
// Private
router.get('/myorders/mine', auth, (req, res) => {
   Order.find({ user: req.user.id })
      .sort({ orderDate: -1 })
      .then((order) => res.status(200).json(order))
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

export default router;
