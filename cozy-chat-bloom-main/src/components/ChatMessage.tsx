
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { MessageType } from "@/contexts/ChatbotContext";
import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { 
    addSuffix: true,
    includeSeconds: true
  });

  if (message.sender === "user") {
    return (
      <div className="flex flex-col items-end mb-4 space-y-1">
        <div className="flex items-end gap-2">
          <div className="chat-message-user">
            <p className="text-sm md:text-base">{message.content}</p>
          </div>
          <Avatar className="h-8 w-8 border-2 border-white">
            <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white text-xs font-semibold">
              YOU
            </div>
          </Avatar>
        </div>
        <span className="text-xs text-gray-500 mr-10 dark:text-gray-400">{formattedTime}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start mb-4 space-y-1">
      <div className="flex items-end gap-2">
        <Avatar className="h-8 w-8 border-2 border-white">
          <div className="bg-purple-600 w-full h-full flex items-center justify-center text-white text-xs font-semibold">
            AI
          </div>
        </Avatar>
        <div className="chat-message-bot">
          <p className="text-sm md:text-base font-serif">{message.content}</p>
        </div>
      </div>
      <span className="text-xs text-gray-500 ml-10 dark:text-gray-400">{formattedTime}</span>
    </div>
  );
};

export default ChatMessage;
