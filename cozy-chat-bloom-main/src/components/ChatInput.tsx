import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatbot } from "@/contexts/ChatbotContext";
import { Mic, MicOff, Send, Image, Paperclip, Smile } from "lucide-react";
import { sendMessageToBackend } from "@/pages/Index";

const ChatInput: React.FC = () => {
  const { sendMessage } = useChatbot();
  const [message, setMessage] = useState("");
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = message;
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const assistantReply = await sendMessageToBackend(userMessage);
      sendMessage(userMessage, assistantReply);
    } catch (error) {
      console.error("Error getting reply from backend:", error);
      sendMessage(userMessage, "Oops! Something went wrong.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const toggleVoiceInput = () => {
    setIsVoiceInput(!isVoiceInput);
    // Here you would implement the actual voice input functionality
  };

  return (
    <div className="p-4 border-t bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-700 transition-colors">
      <div className="relative flex items-end max-w-3xl mx-auto gap-2">
        <div className="flex-1 rounded-2xl overflow-hidden border shadow-sm focus-within:ring-2 ring-primary/20 transition-all dark:border-slate-700">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={isVoiceInput ? "Listening..." : "Type your message..."}
            disabled={isVoiceInput}
            className="min-h-[50px] max-h-[150px] bg-background resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
          />
          
          <div className="flex items-center justify-between px-3 py-2 bg-muted/40 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
                onClick={() => alert("Attachment feature coming soon!")}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
                onClick={() => alert("Image upload feature coming soon!")}
              >
                <Image className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
                onClick={() => alert("Emoji picker coming soon!")}
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant={isVoiceInput ? "default" : "ghost"} 
                className="h-8 w-8 rounded-full"
                onClick={toggleVoiceInput}
              >
                {isVoiceInput ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleSendMessage} 
          size="icon" 
          className="h-[50px] w-[50px] rounded-full shadow-md"
          disabled={message.trim() === "" && !isVoiceInput}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
