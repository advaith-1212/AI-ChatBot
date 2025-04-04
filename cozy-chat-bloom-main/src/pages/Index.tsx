import React from "react";
import { ChatbotProvider } from "@/contexts/ChatbotContext";
import ChatLayout from "@/components/ChatLayout";

const Index = () => {
  return (
    <ChatbotProvider>
      <ChatLayout />
    </ChatbotProvider>
  );
};

export default Index;

export const sendMessageToBackend = async (message: string): Promise<string> => {
  const response = await fetch("http://localhost:5050/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from backend");
  }

  const data = await response.json();
  return data.response;
};
