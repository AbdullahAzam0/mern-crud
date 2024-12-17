// const express = require('express')   //treditianal way of import express that we donot use we use new way by importing them
import express from "express";
import dotenv from "dotenv";            // dotenv simplifies managing and securing environment variables in Node.js applications
import path from "path";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  //app.listen is used to start a web server and make your application listen for incoming requests on a specific port.
  connectDB();
  console.log("Server Started at :", PORT);
});
