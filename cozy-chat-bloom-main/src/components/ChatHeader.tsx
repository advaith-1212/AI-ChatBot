
import React from "react";
import { Button } from "@/components/ui/button";
import { useChatbot } from "@/contexts/ChatbotContext";
import { Menu, Settings, Sun, Moon, HelpCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

const ChatHeader: React.FC = () => {
  const { toggleTheme, theme, toggleSidebar } = useChatbot();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-700 transition-colors py-3 px-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-8 w-8 border-2 border-white">
            <div className="bg-purple-600 w-full h-full flex items-center justify-center text-white text-xs font-semibold">
              AI
            </div>
          </Avatar>
          
          <div>
            <h1 className="text-lg font-semibold">AI Assistant</h1>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => alert("Help and support coming soon!")}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => alert("Settings panel coming soon!")}
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
