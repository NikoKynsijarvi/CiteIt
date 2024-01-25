"use server";
import { createChat, getChats, deleteChat } from "@/lib/db/chat-db";
import { revalidatePath } from "next/cache";

// interface newChat {
//   pdfName: String;
//   pdfUrl: String;
//   userId: String;
//   fileKey: String;
// }

/**
 * Server Action: Create a new chat.
 */
export async function createChatAction({
  pdfName,
  pdfUrl,
  userId,
  fileKey,
}: {
  pdfName: String;
  pdfUrl: String;
  userId: String;
  fileKey: String;
}) {
  const newChat = {
    pdfName,
    pdfUrl,
    userId,
    fileKey,
  };
  const response = await createChat(newChat);
  // revalidatePath(path);
  return response;
}

export async function getUserChats({ userId }: { userId: String }) {
  const response = await getChats(userId);
  return response;
}
