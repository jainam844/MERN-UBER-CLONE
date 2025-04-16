import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./db/db.js";

dotenv.config();
connectToDb();
const app = express();
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app;
