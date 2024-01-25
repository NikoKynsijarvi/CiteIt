import mongoose, { Schema } from "mongoose";

const messageSchema: Schema = new Schema(
  {
    chatId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    role: {
      type: String,
      enum: ["SYSTEM", "USER"],
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
