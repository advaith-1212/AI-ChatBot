
import React from "react";
import { useChatbot } from "@/contexts/ChatbotContext";

const ChatOverlay: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useChatbot();

  if (!sidebarOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 bg-black/40 md:hidden" 
      onClick={toggleSidebar}
    />
  );
};

export default ChatOverlay;
