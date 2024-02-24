import express from "express";
import dotenv from "dotenv";
import dbConnect from "./configs/dbConnect";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})

dbConnect();
