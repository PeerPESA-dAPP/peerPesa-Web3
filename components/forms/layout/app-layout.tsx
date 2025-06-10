
import React, { useState } from "react";
import { NavBar } from "./nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />

      <main className="flex-1">
        {children}
      </main>
      
      {/* Support Chat Widget */}
      {/* <div className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${showSupport ? 'translate-y-0' : 'translate-y-0'}`}>
        {showSupport ? (
          <div className="bg-white rounded-lg shadow-lg w-80 sm:w-96 overflow-hidden">
            <div className="bg-peerpesa-primary p-4 flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-white" />
                <span className="ml-2 text-white font-medium">Support Chat</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSupport(false)} 
                className="text-white hover:text-white hover:bg-peerpesa-primary-dark h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-4">
              <div className="bg-peerpesa-gray p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">Hello! How can we help you today?</p>
              </div>
              <div className="self-end bg-peerpesa-primary/10 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                <p className="text-sm">I have a question about sending money.</p>
              </div>
              <div className="bg-peerpesa-gray p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">Of course! What would you like to know about our money transfer service?</p>
              </div>
            </div>
            <div className="p-3 border-t">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 px-3 py-2 text-sm border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-peerpesa-primary"
                />
                <Button className="bg-peerpesa-primary hover:bg-peerpesa-primary-dark text-white rounded-l-none">
                  Send
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setShowSupport(true)}
            className="bg-peerpesa-primary hover:bg-peerpesa-primary-dark text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div> */}
      
      <Toaster />
      <Sonner />
    </div>
  );
};
