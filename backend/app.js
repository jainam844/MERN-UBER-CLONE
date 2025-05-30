import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./db/db.js";
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js'
import mapsRoutes from './routes/maps.routes.js'
import rideRoutes from './routes/ride.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config();
connectToDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapsRoutes)
app.use('/rides', rideRoutes)

export default app;
