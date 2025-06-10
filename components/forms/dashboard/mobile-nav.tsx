
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { PeerPesaLogo } from "../peerpesa-logo";
import { Link } from "react-router-dom";
import { MobileNavMenu } from "./mobile-nav-menu";
import { Settings, ShieldCheck, Repeat, Bell, Key, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MobileNav = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-background px-4">
      <PeerPesaLogo variant="navbar" />
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100"
              aria-label="Settings"
            >
              <img 
                src="/lovable-uploads/20531ab5-0ecf-4de7-8d46-7281e6736d29.png" 
                alt="Settings" 
                className="h-5 w-5"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg rounded-md p-1.5">
            <DropdownMenuItem asChild className="text-sm text-gray-800 hover:bg-gray-100 rounded-sm">
              <Link to="/dashboard/settings/2fa" className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-gray-600" />
                <span>Two Factor Authentication</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-sm text-gray-800 hover:bg-gray-100 rounded-sm">
              <Link to="/dashboard/settings/recurring-payments" className="flex items-center">
                <Repeat className="h-4 w-4 mr-2 text-gray-600" />
                <span>Recurring Payments</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-sm text-gray-800 hover:bg-gray-100 rounded-sm">
              <Link to="/dashboard/settings/notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2 text-gray-600" />
                <span>Notifications</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-sm text-gray-800 hover:bg-gray-100 rounded-sm">
              <Link to="/dashboard/settings/password" className="flex items-center">
                <Key className="h-4 w-4 mr-2 text-gray-600" />
                <span>Change Password</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-sm text-gray-800 hover:bg-gray-100 rounded-sm">
              <Link to="/dashboard/settings/payment-methods" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-gray-600" />
                <span>Payment Methods</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <img 
                src="/lovable-uploads/ca4b3729-0d2b-45b2-9af3-0e201006acdb.png" 
                alt="Menu" 
                className="h-6 w-6"
              />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 bg-white shadow-lg w-[220px] max-h-[50vh] rounded-l-lg overflow-y-auto">
            <MobileNavMenu />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
