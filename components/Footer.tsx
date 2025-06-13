import React from "react";
import { Home, Wallet, Settings, Logs } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonsProps {
  activeNav: "home" | "send" | "transactions";
  onNavChange: (tab: "home" | "send" | "transactions") => void;
}

const Footer: React.FC<NavButtonsProps> = ({ activeNav, onNavChange }) => {
  return (
    <footer className="sticky bottom-0 left-0 w-full bg-white border-t z-50">
      <div className="max-w-[480px] mx-auto flex justify-between items-center px-4 py-2">
        <Button
          variant="ghost"
          onClick={() => onNavChange("home")}
          className={cn(
            "flex flex-col items-center gap-1 text-xs bg-white hover:bg-white hover:text-green-600 focus:bg-white focus:text-green-600 text-gray-700 border-none shadow-none"
          )}
        >
          <Home className="h-6 w-6" />
          <span>Home</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavChange("send")}
          className={cn(
            "flex flex-col items-center gap-1 text-xs bg-white hover:bg-white hover:text-green-600 focus:bg-white focus:text-green-600 text-gray-700 border-none shadow-none"
          )}
        >
          <Wallet className="h-8 w-8" />
          <span>Send Money</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavChange("transactions")}
          className={cn(
            "flex flex-col items-center gap-1 text-xs bg-white hover:bg-white hover:text-green-600 focus:bg-white focus:text-green-600 text-gray-700 border-none shadow-none"
          )}
        >
          <Logs className="h-6 w-6" />
          <span>Activity</span>
        </Button>
      </div>
    </footer>
  );
};

export default Footer; 