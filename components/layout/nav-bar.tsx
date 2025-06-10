import React, { useState, useEffect } from "react";
import { PeerPesaLogo } from "../peerpesa-logo";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const {isAuthenticated, user} = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 pt-3 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-24 px-4 md:px-6">

        <PeerPesaLogo variant="navbar" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-base ${isActive('/') ? 'text-peerpesa-primary font-medium' : 'text-peerpesa-dark hover:text-peerpesa-primary'} transition-colors`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-base ${isActive('/about') ? 'text-peerpesa-primary font-medium' : 'text-peerpesa-dark hover:text-peerpesa-primary'} transition-colors`}
          >
            About
          </Link>
          <a
              href="https://pay.peerpesa.co/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base ${isActive('/services') ? 'text-peerpesa-primary font-medium' : 'text-peerpesa-dark hover:text-peerpesa-primary'} transition-colors`}
          >
            dApp
          </a>
          <Link
              to="/support"
              className={`text-base ${isActive('/support') ? 'text-peerpesa-primary font-medium' : 'text-peerpesa-dark hover:text-peerpesa-primary'} transition-colors`}
          >
            Support
          </Link>
        </nav>
        



        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                className="text-peerpesa-dark border-peerpesa-dark hover:bg-peerpesa-gray rounded-full"
                asChild
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
                <Button 
                  variant="outline" 
                  className="text-peerpesa-dark border-peerpesa-dark hover:bg-peerpesa-gray rounded-full"
                  asChild
                >
                  <Link to="/login">Log In</Link>
                </Button>
                <Button 
                  className="bg-peerpesa-primary hover:bg-peerpesa-primary-dark text-white rounded-full"
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
            </>
          )}
        </div>
        



        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="md:hidden text-peerpesa-dark p-2"
              variant="ghost"
              size="icon"
            >
              <img 
                src="/uploads/ca4b3729-0d2b-45b2-9af3-0e201006acdb.png" 
                alt="Menu" 
                className="h-6 w-6"
              />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 bg-white shadow-lg w-[220px] max-h-[50vh] rounded-l-lg overflow-y-auto">
            <MobileMenu isAuthenticated={isAuthenticated} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

// Mobile Menu Component similar to MobileNavMenu for dashboard
const MobileMenu = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavItem = ({ href, label, target }: { href: string, label: string, target?: string }) => (
    <SheetClose asChild>
      <Link 
        to={href} 
        target={(target !== undefined &&  target === '_blank')? '_blank': undefined}  
        className={`flex items-center gap-3 px-4 py-2.5 text-black font-medium hover:bg-gray-50 transition-all duration-200 border-l-2 ${isActive(href) ? 'border-l-peerpesa-primary bg-peerpesa-primary/5' : 'border-l-transparent'}`}
      >
        <span className="text-sm">{label}</span>
      </Link>
    </SheetClose>
  );

  
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>
      <div className="flex flex-col flex-grow">
        <nav className="flex flex-col py-2">
          <NavItem href="/" label="Home" />
          <NavItem href="/about" label="About" />
          <NavItem href="http://pay.peerpesa.co" target='_blank' label="dApp" />
        </nav>
      </div>
      
      <div className="border-t border-gray-100 mt-auto">
        <div className="p-4 flex flex-col space-y-2">
          {isAuthenticated ? (
            <>
              <SheetClose asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-center text-peerpesa-dark border-peerpesa-dark hover:bg-peerpesa-gray-light rounded-lg"
                  asChild
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </SheetClose>
            </>
          ):
          (<>
              <SheetClose asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-center text-peerpesa-dark border-peerpesa-dark hover:bg-peerpesa-gray-light rounded-lg"
                  asChild
                >
                  <Link to="/login">Log In</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button 
                  className="w-full justify-center bg-peerpesa-primary hover:bg-peerpesa-primary-dark text-white rounded-lg"
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </SheetClose>
            </>)}
        </div>
      </div>
    </div>
  );
};
