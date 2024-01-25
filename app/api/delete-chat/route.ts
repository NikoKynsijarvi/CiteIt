import { deleteChat } from "@/lib/db/chat-db";

export async function DELETE(req: Request, res: Response) {
  try {
    const body = await req.json();

    const chats = await deleteChat(body.chatId);
    return chats;
  } catch (error) {}
}
