import { Send } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useChat } from "ai/react";

type Props = {
  params: {
    isDisabled: boolean;
    handleInputChange: (event: any) => void;
    handleSubmit: (event: any) => void;
    input: string;
  };
};

function ChatInput({
  params: { isDisabled, handleInputChange, handleSubmit, input },
}: Props) {
  return (
    <div className="absolut bottom-0 left-0 w-full">
      <form
        className="mx-2 flex flex-grow  gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        onSubmit={handleSubmit}
      >
        <div className="relative flex h-full flex-1 items-scretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                rows={1}
                maxRows={4}
                autoFocus
                placeholder="Enter you questions..."
                className="resize-none pr-12 text-base py-3 "
                value={input}
                onChange={handleInputChange}
              />
              <Button
                className="absolute bottom-1.5 right-[8px] bg-orange-500"
                aria-label="send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
