
import React from "react";
import { useChatbot } from "@/contexts/ChatbotContext";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import ChatOverlay from "./ChatOverlay";

const ChatLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <ChatSidebar />
      <ChatOverlay />
      
      <div className="flex-1 flex flex-col relative ml-0 md:ml-72">
        <ChatHeader />
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatLayout;
