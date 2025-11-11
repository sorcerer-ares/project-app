import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// You can add your routes or middleware below
// app.use(express.json());
// app.use("/api/files", fileRoutes);

export { app, server };
