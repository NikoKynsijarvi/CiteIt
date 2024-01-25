"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import ChatInput from "./chatinput";
import MessageList from "./messagelist";
import { useChat } from "ai/react";

function ChatWrapper() {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  const isLoading = false;
  if (isLoading)
    return (
      <div className="relative min-h-full flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            <h3 className="font-semibold text-xl">Loading...</h3>
            <p className="text-zinc-500 text-sm">We are preparing your PDF.</p>
          </div>
        </div>

        <ChatInput
          params={{
            isDisabled: false,
            input: input,
            handleInputChange: handleInputChange,
            handleSubmit: handleSubmit,
          }}
        />
      </div>
    );
  return (
    <div className="relative min-h-full flex divide-y divide-zinc-200 flex-col justify-between">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <MessageList messages={messages} />
      </div>
      <ChatInput
        params={{
          isDisabled: false,
          input: input,
          handleInputChange: handleInputChange,
          handleSubmit: handleSubmit,
        }}
      />
    </div>
  );
}

export default ChatWrapper;
