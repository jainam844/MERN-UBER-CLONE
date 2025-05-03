import express from 'express';
import { getAutocomplete, getCoordinates, getDistanceTime } from '../controllers/map.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
import { body, query } from 'express-validator';
const router = express.Router();

// Example route with express-validator
router.get('/get-coordinates',
    query('text').isString().isLength({ min: 3 }),
    authUser,
    getCoordinates
);
router.post('/get-distance-time',
    body('origin').isString().isLength({ min: 3 }),
    body('destination').isString().isLength({ min: 3 }),
    getDistanceTime
);
router.get('/getAutocomplete', getAutocomplete);

export default router;
