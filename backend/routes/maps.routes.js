import express from 'express';
import { getCoordinates } from '../controllers/map.controller';
import { authUser } from '../middlewares/auth.middleware';
const router = express.Router();

// Example route with express-validator
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUser,
    getCoordinates
);

export default router;
