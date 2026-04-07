import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth.route.js";
import { urlRouter } from "./routes/url.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/url", urlRouter);

export default app;