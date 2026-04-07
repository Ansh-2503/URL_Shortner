import express from "express";
import {
  shortenUrl as createShortUrl,
  redirectUrl,
  getHistory,
} from "../controller/url.controller.js";
import { authMiddelware as auth } from "../middlewares/authMiddleware.js";

const urlRouter = express.Router();

urlRouter.post("/shorten", auth, createShortUrl);
urlRouter.get("/history", auth, getHistory);
urlRouter.get("/:id", redirectUrl);

export { urlRouter };
