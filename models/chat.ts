import mongoose, { Schema } from "mongoose";

const chatSchema: Schema = new Schema(
  {
    pdfName: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    userId: { type: String, required: true },
    fileKey: { type: String, required: true },
  },
  { timestamps: true }
);

function getModel() {
  let chat;
  if (mongoose.models.Chat) chat = mongoose.models.Chat;
  else chat = mongoose.model("Chat", chatSchema);
  return chat;
}
const Chat = mongoose.models["Chat"] || mongoose.model("Chat", chatSchema);
export default Chat;
