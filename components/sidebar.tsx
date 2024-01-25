"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsersChats,
  selectChat,
  nullCurrentChat,
} from "@/app/redux/reducers/chatsReducer";
import { MessageSquareQuote, Trash2, Upload } from "lucide-react";
import axios from "axios";

type UserChat = {
  _id: string;
  pdfName: string;
  pdfUrl: string;
  userId: string;
  fileKey: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Props = {
  params: {
    userId: string;
  };
};

type ChatPageProps = {
  params: {
    chat: UserChat;
    dispatch: any;
  };
};

interface ChatState {
  chats: UserChat[];
  currentChat: null | UserChat;
}

//TODO Link to the chat page
const ChatPageLink = ({ params: { chat, dispatch } }: ChatPageProps) => {
  const selectedChat = useSelector(
    (state: { chats: ChatState }) => state.chats.currentChat
  );

  const userSelectedChat = () => {
    localStorage.setItem("currentChat", JSON.stringify(chat));
    dispatch(selectChat(chat));
  };

  const notSelected =
    "w-11/12 h-14 bg-orange-700 rounded-lg flex items-center flex-row gap-1 p-2";
  const selected =
    "w-11/12 h-14 bg-purple-700 rounded-lg flex items-center flex-row gap-1 p-2";
  return (
    <Link
      href={`/chat/${chat._id}`}
      className={chat._id == selectedChat?._id ? selected : notSelected}
      onClick={(e) => userSelectedChat()}
    >
      {chat._id === selectedChat?._id ? (
        <Trash2
          className="mr-2 h-8 w-8 text-white hover:text-white-500 hover:scale-110 "
          onClick={() => console.log("delete")}
        />
      ) : (
        <MessageSquareQuote color="white" className="mr-2 h-8 w-8" />
      )}

      <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis text-white">
        {chat.pdfName}
      </p>
    </Link>
  );
};

const Sidebar = ({ params: { userId } }: Props) => {
  const dispatch = useDispatch();

  const chats = useSelector((state: { chats: ChatState }) => state.chats);
  const { mutate } = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const response = await axios.get(`/api/chat/${userId}`);
      return response.data;
    },
  });

  const currentChatToNull = () => {
    console.log("click");
    localStorage.removeItem("currentChat");
    dispatch(nullCurrentChat(""));
  };

  useEffect(() => {
    mutate(
      { userId },
      {
        onSuccess: (data) => {
          if (data.data[0]) {
            dispatch(setUsersChats(data.data));
          }
        },
      }
    );
    const currentChat = JSON.parse(localStorage.getItem("currentChat")!);
    console.log(currentChat);

    dispatch(selectChat(currentChat));
  }, []);

  return (
    <div className="  space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-orange-500 via-red-500 to-orange-500">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className="text-2xl font-bold text-white">CiteIt</h1>
        </Link>
        <div className="space-y-2 flex items-center flex-col">
          <Link
            href="/dashboard"
            className="flex items-center w-11/12 h-14"
            onClick={(e) => currentChatToNull()}
          >
            <Button className="w-full h-full bg-orange-700  border-white border">
              <Upload className="mr-2 w-4 h-4" />
              New File
            </Button>
          </Link>
          {chats.chats.map((e) => (
            <ChatPageLink
              key={e.pdfUrl}
              params={{
                chat: e,
                dispatch: dispatch,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
