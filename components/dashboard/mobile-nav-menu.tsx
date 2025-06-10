import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Layers, 
  Wallet, 
  ShoppingCart, 
  FileText,
  User,
  LogOut,
  Settings,
  ArrowDownUp,
  ArrowUpDown,
  Send,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useLogout } from "@/hooks/use-logout";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <SheetClose asChild>
      <Link 
        to={href} 
        className={`flex items-center gap-3 px-4 py-1.5 text-black font-medium hover:bg-gray-50 transition-all duration-200 border-l-2 ${isActive ? 'border-l-black' : 'border-l-transparent'}`}
      >
        <div className="flex items-center justify-center w-5 h-5 text-black">
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </Link>
    </SheetClose>
  );
};

export const MobileNavMenu = () => {
  const { logout } = useLogout();
  const location = useLocation();

  // Custom logout handler that also closes the sheet
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>
      <div className="flex flex-col flex-grow">
        <nav className="flex flex-col">
          <NavItem 
            href="/dashboard" 
            icon={<LayoutDashboard className="h-4 w-4" />} 
            label="Dashboard"
          />
          <NavItem 
            href="/dashboard/assets" 
            icon={<Layers className="h-4 w-4" />} 
            label="Assets"
          />
          <NavItem 
            href="/dashboard/wallets" 
            icon={<Wallet className="h-4 w-4" />} 
            label="Wallets"
          />
          {/* Wallet Sub-menu */}
          {location.pathname.startsWith('/dashboard/wallets') && (
            <div className="ml-6 space-y-1 mt-1">
              <NavItem 
                href="/dashboard/wallets/deposit" 
                icon={<ArrowDownUp className="h-4 w-4" />} 
                label="Deposit"
              />
              <NavItem 
                href="/dashboard/wallets/withdraw" 
                icon={<ArrowUpDown className="h-4 w-4" />} 
                label="Withdraw"
              />
              <NavItem 
                href="/dashboard/wallets/send" 
                icon={<Send className="h-4 w-4" />} 
                label="Send"
              />
              <NavItem 
                href="/dashboard/wallets/swap" 
                icon={<ArrowLeftRight className="h-4 w-4" />} 
                label="Swap"
              />
            </div>
          )}
          <NavItem 
            href="/dashboard/orders" 
            icon={<ShoppingCart className="h-4 w-4" />} 
            label="Orders"
          />
          <NavItem 
            href="/dashboard/transactions" 
            icon={<FileText className="h-4 w-4" />} 
            label="Transactions"
          />
          <NavItem 
            href="/dashboard/profile" 
            icon={<User className="h-4 w-4" />} 
            label="Profile"
          />
          <NavItem 
            href="/dashboard/settings" 
            icon={<Settings className="h-4 w-4" />} 
            label="Settings"
          />
        </nav>
      </div>
      <div className="border-t border-gray-100 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
