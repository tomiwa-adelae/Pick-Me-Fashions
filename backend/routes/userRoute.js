import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';

import User from '../models/userModel.js';

const router = express.Router();

// Register a new user
// @route /api/users
router.post('/', (req, res) => {
   const { name, email, password, isAdmin } = req.body;

   // Validation
   if (!name) {
      res.status(400).json({ message: 'Please enter name!' });
   } else if (!email) {
      res.status(400).json({ message: 'Please enter email!' });
   } else if (!password) {
      res.status(400).json({ message: 'Please enter password!' });
   } else if (password.length <= 5) {
      res.status(400).json({
         message: 'Password should be at least 6 character!',
      });
   } else {
      // Check for existing user
      User.findOne({ email })
         .then((user) => {
            if (user) {
               return res.status(400).json({ message: 'User already exist!' });
            }

            const newUser = new User({
               name,
               email,
               password,
               isAdmin,
            });

            // create a salt
            bcrypt.genSalt(12, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  newUser.password = hash;

                  newUser.save().then((user) => {
                     jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET,
                        {
                           expiresIn: 7200,
                        },
                        (err, token) => {
                           if (err) throw err;
                           res.json({
                              token,
                              user: {
                                 id: user._id,
                                 name: user.name,
                                 email: user.email,
                                 isAdmin: user.isAdmin,
                              },
                           });
                        }
                     );
                  });
               });
            });
         })
         .catch((err) => console.log(err));
   }
});

// Get All users
// GET @/api/users
// Private
router.get('/', auth, (req, res) => {
   User.find()
      .sort({ createdAt: -1 })
      .select('-password')
      .then((user) => res.status(200).json(user))
      .catch((err) => {
         res.status(400).json({ message: 'An Error occured!' });
      });
});

// Get a user
// GET @/api/users/:id
// Private
router.get('/:id', auth, (req, res) => {
   User.findById(req.params.id)
      .select('-password')
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

// Update user profile
// PUT @/api/users/profile
// Private
router.put('/profile/mine', auth, (req, res) => {
   User.findById(req.user.id)
      .then((user) => {
         if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.emaill || user.email;

            if (req.body.password) {
               user.password = req.body.password;
            }

            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(user.password, salt, (err, hash) => {
                  if (err) throw err;
                  user.password = hash;

                  // Update User
                  user
                     .save()
                     .then((user) => {
                        jwt.sign(
                           { id: user._id },
                           process.env.JWT_SECRET,
                           {
                              expiresIn: 7200,
                           },
                           (err, token) => {
                              if (err) throw err;
                              res.json({
                                 token,
                                 user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    isAdmin: user.isAdmin,
                                 },
                              });
                           }
                        );
                     })
                     .catch((err) =>
                        res.status(400).json({ message: 'An error occured!' })
                     );
               });
            });
         } else {
            res.status(400).json({ message: 'User not found!' });
         }
      })
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

// Update user to admin
// PUT @/api/users/:id
// Private
router.put('/:id', auth, (req, res) => {
   User.findById(req.params.id)
      .then((user) => {
         // Check for user
         if (user) {
            user.isAdmin = req.body.isAdmin;

            // Save user
            user.save().then(res.status(201).json(user));
         } else {
            res.status(501).json({ message: 'User not found!' });
         }
      })
      .catch((err) => res.status(400).json({ message: 'An error occured!' }));
});

// Delete a user
// DELETE @/api/user/:id
// Private
router.delete('/:id', auth, (req, res) => {
   User.findById(req.params.id)
      .then((user) => {
         user
            .remove()
            .then(() =>
               res.status(200).json({ message: 'User Removed Successfully!' })
            );
      })
      .catch((err) =>
         res.status(400).json({
            message: 'User not deleted!',
         })
      );
});

export default router;
