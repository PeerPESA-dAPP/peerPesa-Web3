
import React from "react";
import { Link } from "react-router-dom";

interface PeerPesaLogoProps {
  className?: string;
  variant?: 'dashboard' | 'navbar' | 'default' | 'footer';
}

export const PeerPesaLogo: React.FC<PeerPesaLogoProps> = ({ 
  className, 
  variant = 'default' 
}) => {
  const sizeVariants = {
    dashboard: 'h-28 w-auto', // Increased from h-24 to h-28
    navbar: 'h-40 w-auto',    // Increased from h-16 to h-20
    footer: 'h-28 w-auto',    // New dedicated size for footer
    default: 'h-40 w-auto'    // Increased from h-18 to h-24
  };

  return (
    <Link to="/" className="flex items-center transition-transform hover:scale-105">
      <div className="flex items-center">
        <img 
          src="/uploads/d736ef5a-1d0b-4873-9626-415d2c26a76c.png" 
          alt="PeerPesa Logo" 
          className={className || `${sizeVariants[variant]} object-contain`} 
        />
      </div>
    </Link>
  );
};
