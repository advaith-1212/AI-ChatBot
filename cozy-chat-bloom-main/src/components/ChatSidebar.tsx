
import React from "react";
import { Button } from "@/components/ui/button";
import { useChatbot } from "@/contexts/ChatbotContext";
import { 
  Home, MessageSquare, UserCircle, Settings, HelpCircle, 
  Trash2, ChevronLeft, ThumbsUp, ThumbsDown
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
  icon, label, onClick, active = false 
}) => (
  <Button
    variant={active ? "secondary" : "ghost"}
    className="w-full justify-start gap-3"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Button>
);

const ChatSidebar: React.FC = () => {
  const { clearChat, sidebarOpen, toggleSidebar } = useChatbot();

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r dark:border-slate-700
        transition-transform duration-300 md:translate-x-0 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-serif font-semibold">Chat Assistant</h2>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            <SidebarButton 
              icon={<Home className="h-5 w-5" />} 
              label="Home" 
              active 
            />
            <SidebarButton 
              icon={<MessageSquare className="h-5 w-5" />} 
              label="New Chat" 
            />
            <SidebarButton 
              icon={<UserCircle className="h-5 w-5" />} 
              label="Profile" 
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-1">
            <h3 className="px-3 text-sm font-medium text-muted-foreground mb-2">
              Recent Conversations
            </h3>
            <Button variant="ghost" className="w-full justify-start text-sm text-left pl-6 py-2 h-auto">
              How can I improve my productivity?
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm text-left pl-6 py-2 h-auto">
              Tell me about machine learning...
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm text-left pl-6 py-2 h-auto">
              What's the weather forecast?
            </Button>
          </div>
          
          <div className="mt-6 bg-secondary/50 dark:bg-slate-800/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Rate your experience</h3>
            <p className="text-sm text-muted-foreground mb-3">
              How satisfied are you with the assistant's responses?
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>Good</span>
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <ThumbsDown className="h-4 w-4" />
                <span>Bad</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t dark:border-slate-700">
          <div className="space-y-2">
            <SidebarButton 
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help & FAQ" 
            />
            <SidebarButton 
              icon={<Settings className="h-5 w-5" />} 
              label="Settings" 
            />
            <SidebarButton 
              icon={<Trash2 className="h-5 w-5" />} 
              label="Clear Chat"
              onClick={clearChat}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
