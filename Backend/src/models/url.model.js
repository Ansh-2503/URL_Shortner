import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: String,
  userId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Url", urlSchema);
