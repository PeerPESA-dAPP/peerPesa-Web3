
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, BellDot, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const DashboardHeader = () => {
  const { logout } = useLogout();
  
  // Mock notification data - in a real app, this would come from an API
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New deposit received", read: false },
    { id: 2, message: "Your withdrawal has been processed", read: false },
    { id: 3, message: "Security alert: New login detected", read: false }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  return (
    <header className="hidden md:block sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex-1" />
        <div className="flex items-center space-x-3">
          {/* Notification Bell */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 relative"
                      aria-label="Notifications"
                    >
                      {unreadCount > 0 ? (
                        <BellDot className="h-6 w-6 text-peerpesa-primary font-bold stroke-[2.5px]" />
                      ) : (
                        <BellDot className="h-6 w-6 text-gray-800 font-bold stroke-[2.5px]" />
                      )}
                      
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-white shadow-lg rounded-md p-1.5 max-h-[400px] overflow-y-auto">
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <span className="text-sm font-medium">Notifications</span>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead} 
                          className="text-xs text-peerpesa-primary hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem 
                          key={notification.id}
                          className={`text-sm cursor-pointer px-3 py-2 ${notification.read ? 'text-gray-600' : 'bg-blue-50 font-medium'}`}
                        >
                          <div className="flex items-start justify-between w-full">
                            <div className="flex items-start">
                              {!notification.read && (
                                <div className="h-2 w-2 mt-1.5 mr-2 rounded-full bg-peerpesa-primary flex-shrink-0" />
                              )}
                              <span className={`${!notification.read && 'pl-0'}`}>{notification.message}</span>
                            </div>
                            {!notification.read && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="ml-2 text-peerpesa-primary hover:bg-peerpesa-primary/10 p-1 rounded-full"
                                title="Mark as read"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="py-4 px-2 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="text-center justify-center">
                      <Link to="/dashboard/notifications" className="text-peerpesa-primary text-sm hover:underline">
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100"
                aria-label="Profile"
              >
                <User className="h-6 w-6 text-gray-800 font-bold stroke-[2.5px]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg rounded-md p-1.5">
              <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-100 rounded-sm">
                <Link to="/dashboard/profile" className="w-full px-2 py-1.5">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-100 rounded-sm">
                <Link to="/dashboard/wallets" className="w-full px-2 py-1.5">My Wallets</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-gray-800 hover:bg-gray-100 rounded-sm cursor-pointer"
                onClick={logout}
              >
                <span className="w-full px-2 py-1.5">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
