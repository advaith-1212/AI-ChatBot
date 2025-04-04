import React, { createContext, useContext, useState, useEffect } from "react";
import { sendMessageToBackend } from "@/pages/Index";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type ChatAttachment = {
  id: string;
  type: "image" | "file" | "link";
  url: string;
  name: string;
};

type ChatbotContextType = {
  messages: MessageType[];
  isTyping: boolean;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  sendMessage: (content: string, attachments?: ChatAttachment[]) => void;
  clearChat: () => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// Sample default messages
const defaultMessages: MessageType[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>(defaultMessages);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Check for user preference for dark mode
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newTheme;
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const sendMessage = async (content: string, attachments?: ChatAttachment[]) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const assistantContent = await sendMessageToBackend(content);
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: assistantContent,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't reach the server. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages(defaultMessages);
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isTyping,
        theme,
        sidebarOpen,
        sendMessage,
        clearChat,
        toggleTheme,
        toggleSidebar,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
