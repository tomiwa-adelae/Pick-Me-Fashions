import express from 'express';
import cloudinary from '../middleware/cloudinary.js';

const router = express.Router();

// Login a User
// POST @/api/auth
// Public
router.post('/', async (req, res) => {
   try {
      const fileStr = req.body.data;

      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
         upload_preset: 'birthday_images',
      });

      res.send(uploadResponse.url);
   } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
   }
});

export default router;
