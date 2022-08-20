import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

const router = express.Router();

// Register a new user
// @route /api/users
router.post('/', (req, res) => {
   const { name, email, password, isAdmin } = req.body;

   // Validation
   if (!email) {
      res.status(400).json({ message: 'Please enter email!' });
   } else if (!password) {
      res.status(400).json({
         message: 'Please enter password!',
      });
   } else {
      // Check for existing user
      User.findOne({ email })
         .then((user) => {
            if (!user) {
               return res.status(400).json({ message: 'User does not exist!' });
            }

            bcrypt.compare(password, user.password).then((isMatch) => {
               if (!isMatch) {
                  return res
                     .status(400)
                     .json({ message: 'Invalid credentials!' });
               }

               jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET,
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
         })
         .catch((err) => console.log(err));
   }
});

export default router;
