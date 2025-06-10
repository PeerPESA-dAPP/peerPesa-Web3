import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Layers, 
  Wallet, 
  ShoppingCart, 
  FileText,
  User,
  Settings,
  LogOut,
  ArrowDownUp,
  ArrowUpDown,
  Send,
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  Home,
  BarChart2,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PeerPesaLogo } from "../peerpesa-logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLogout } from "@/hooks/use-logout";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  subItems?: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }[];
}

const NavItem = ({ href, icon, children, isActive, isExpanded, onClick, subItems }: NavItemProps) => {
  const [isOpen, setIsOpen] = React.useState(isExpanded || false);

  const handleClick = () => {
    if (subItems) {
      setIsOpen(!isOpen);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 h-10 px-3",
          isActive && "bg-accent text-accent-foreground",
          subItems && "cursor-pointer"
        )}
        onClick={handleClick}
        asChild={!subItems}
      >
        {subItems ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {icon}
              <span>{children}</span>
            </div>
            {subItems && (isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </div>
        ) : (
          <Link to={href} className="flex items-center gap-2">
            {icon}
            <span>{children}</span>
          </Link>
        )}
      </Button>
      {subItems && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {subItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 h-9 px-3 text-sm",
                useLocation().pathname === item.href && "bg-accent text-accent-foreground"
              )}
              asChild
            >
              <Link to={item.href}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export const SidebarNav = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isWalletActive = location.pathname.startsWith("/dashboard/wallets");

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <PeerPesaLogo variant="dashboard" />
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground"
            >
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-full bg-white px-3 pt-2">
        <SidebarMenu className="space-y-1">
          <NavItem
            href="/dashboard"
            icon={<Home className="h-5 w-5" />}
            isActive={isActive("/dashboard")}
          >
            Dashboard
          </NavItem>
          <NavItem
            href="/dashboard/wallets"
            icon={<Wallet className="h-5 w-5" />}
            isActive={isWalletActive}
            isExpanded={false}
            subItems={[
              {
                href: "/dashboard/wallets/deposit",
                icon: <ArrowDownUp className="h-4 w-4" />,
                label: "Deposit"
              },
              {
                href: "/dashboard/wallets/withdraw",
                icon: <ArrowUpDown className="h-4 w-4" />,
                label: "Withdraw"
              },
              {
                href: "/dashboard/wallets/send",
                icon: <Send className="h-4 w-4" />,
                label: "Send"
              },
              {
                href: "/dashboard/wallets/swap",
                icon: <ArrowLeftRight className="h-4 w-4" />,
                label: "Swap"
              },
              {
                href: "/dashboard/wallets/transfer",
                icon: <ArrowRightLeft className="h-4 w-4" />,
                label: "Transfer"
              }
            ]}
          >
            Wallets
          </NavItem>
          <NavItem
            href="/dashboard/assets"
            icon={<BarChart2 className="h-5 w-5" />}
            isActive={isActive("/dashboard/assets")}
          >
            Assets
          </NavItem>
          <NavItem
            href="/dashboard/orders"
            icon={<ShoppingCart className="h-5 w-5 text-gray-500" />}
            isActive={isActive("/dashboard/orders")}
          >
            Orders
          </NavItem>
          <NavItem
            href="/dashboard/transactions"
            icon={<FileText className="h-5 w-5 text-gray-500" />}
            isActive={isActive("/dashboard/transactions")}
          >
            Transactions
          </NavItem>
          <NavItem
            href="/dashboard/profile"
            icon={<User className="h-5 w-5 text-gray-500" />}
            isActive={isActive("/dashboard/profile")}
          >
            Profile
          </NavItem>
          <NavItem
            href="/dashboard/settings"
            icon={<Settings className="h-5 w-5 text-gray-500" />}
            isActive={isActive("/dashboard/settings")}
          >
            Settings
          </NavItem>
        </SidebarMenu>
        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
