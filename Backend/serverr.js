import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import connectDB from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js"
import { app, server } from "./lib/app.js";
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }) 
);

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "../frontend",  "index.html"));
    res.send("Server running ")
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB()
});