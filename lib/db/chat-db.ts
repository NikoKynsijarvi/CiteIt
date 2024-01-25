import Chat from "./../../models/chat";
import connectDB from "./connect-db";
import { stringToObjectId } from "../utils";

interface newChat {
  pdfName: String;
  pdfUrl: String;
  userId: String;
  fileKey: String;
}

export async function createChat(chat: newChat) {
  try {
    await connectDB();

    const chatToAdd = await Chat.create({ ...chat });
    return chatToAdd;
  } catch (error) {
    return error;
  }
}

export async function getChats(userId: String) {
  try {
    await connectDB();
    const retrievedChatsForUser = await Chat.find({
      userId: userId,
    });

    return retrievedChatsForUser;
  } catch (error) {
    return error;
  }
}

export async function deleteChat(chatId: String) {
  try {
    await connectDB();
    const id: string = chatId.toString();
    const response = await Chat?.deleteOne({ _id: stringToObjectId(id) });
    return response;
  } catch (error) {
    return error;
  }
}
