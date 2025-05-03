import express from 'express';
import { getCoordinates } from '../controllers/map.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
import { query } from 'express-validator';
const router = express.Router();

// Example route with express-validator
router.get('/get-coordinates',
    query('text').isString().isLength({ min: 3 }),
    authUser,
    getCoordinates
);

export default router;
