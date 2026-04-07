import urlModel from "../models/url.model.js";
import { nanoid } from "nanoid";

const shortenUrl = async (req, res) => {
  try {
    const shortID = nanoid(8);
    const { originalUrl } = req.body;

    await urlModel.create({
      originalUrl,
      shortId: shortID,
      userId: req.user.id,
    });

    res.json({ shortUrl: `http://${req.headers.host}/url/${shortID}` });
  } catch (error) {
    console.log("ERROR in urlController", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const redirectUrl = async (req, res) => {
  const url = await urlModel.findOne({ shortId: req.params.id });
  res.redirect(url.originalUrl);
};

const getHistory = async (req, res) => {
  const urls = await urlModel.find({ userId: req.user.id });
  res.json(urls);
};

export { shortenUrl, redirectUrl, getHistory };
