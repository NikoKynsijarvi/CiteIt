import { cn } from "@/lib/utils";
import { Message } from "ai";
import React from "react";

type Props = {
  messages: Message[];
};

function MessageList({ messages }: Props) {
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((msg) => {
        return (
          <div
            key={msg.id}
            className={cn("flex ", {
              "justify-end pl-10": msg.role === "user",
              "justify-start pr-10": msg.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-purple-600 text-white": msg.role === "user",
                }
              )}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
