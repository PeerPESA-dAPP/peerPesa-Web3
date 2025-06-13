import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface TabButtonsProps {
  activeTab: "send" | "buy" | "swap";
  onTabChange: (tab: "send" | "buy" | "swap") => void;
}

export const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, onTabChange }) => {
  
  const onTabChangex = async (tab: any) => {
    await onTabChange(tab)
  }

  return (
    <div className="flex rounded-2xl overflow-hidden w-full mb-6 bg-black/5 p-1">
      <Button
        type="button"
        variant="ghost"
        onClick={() => {
          onTabChangex("send")
        }}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-base transition-all",
          activeTab === "send" 
            ? "bg-peerpesa-red text-white" 
            : "text-gray-700 hover:bg-[#8A898C] hover:text-white"
        )}
      >
        <Send
          className={cn(
            "h-5 w-5",
            activeTab === "send" ? "stroke-white" : "stroke-gray-700 group-hover:stroke-white"
          )}
        />
        <span className="flex flex-col items-center leading-none">
          <span>Send </span>
          <span>Money</span>
        </span>
      </Button>


      <Button
        type="button"
        variant="ghost"
        onClick={() => onTabChangex("buy")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-base transition-all",
          activeTab === "buy" 
            ? "bg-peerpesa-primary text-white" 
            : "text-gray-700 hover:bg-[#8A898C] hover:text-white"
        )}
      >
        <img 
          src="/uploads/cd2f2e31-7b94-4e66-9eae-38c1fcb56755.png"
          className={cn(
            "h-5 w-5",
            activeTab === "buy" ? "brightness-0 invert" : "group-hover:brightness-0 group-hover:invert"
          )}
          alt="Buy Crypto"
        />
        <span>Buy</span>
      </Button>



      <Button
        type="button"
        variant="ghost"
        onClick={() => onTabChangex("swap")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-base transition-all",
          activeTab === "swap" 
            ? "bg-peerpesa-dark text-white" 
            : "text-gray-700 hover:bg-[#8A898C] hover:text-white"
        )}
      >
        <img 
          src="/uploads/2becae6e-8b9f-4267-8cb6-9c396b977efc.png"
          className={cn(
            "h-5 w-5",
            activeTab === "swap" ? "brightness-0 invert" : "group-hover:brightness-0 group-hover:invert"
          )}
          alt="Swap Crypto"
        />
        <span>Swap</span>
      </Button>
    </div>
  );
};
