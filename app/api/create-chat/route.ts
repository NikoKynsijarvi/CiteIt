import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createChat } from "@/lib/db/chat-db";
import { getUserChats } from "@/app/action";
import { loadToS3IntoPinecone } from "@/lib/pinecone";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const res = await createChat(body);
    const fileKey: string = body.fileKey;
    const fileName = body.fileName;
    const pages = await loadToS3IntoPinecone(fileKey);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
