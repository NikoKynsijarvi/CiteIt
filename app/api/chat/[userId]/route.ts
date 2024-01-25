import { getChats } from "@/lib/db/chat-db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    const res = await getChats(userId);
    console.log(res);

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
