import jwt from 'jsonwebtoken';

function auth(req, res, next) {
   const token = req.header('authorization');

   // Check for token
   if (!token) {
      return res
         .status(401)
         .json({ message: 'No Token! Authorization denied!' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
   } catch (error) {
      res.status(400).json({ message: 'Invalid Token!' });
   }
}

export default auth;
