
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface LegalDocumentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  version?: string;
  effectiveDate?: string;
  children: React.ReactNode;
}

export function LegalDocumentDialog({
  open,
  onOpenChange,
  title,
  version,
  effectiveDate,
  children
}: LegalDocumentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {title}
          </DialogTitle>
          {effectiveDate && (
            <DialogDescription className="text-center">
              Effective Date: {effectiveDate}
            </DialogDescription>
          )}
          {version && (
            <DialogDescription className="text-center">
              Version: {version}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-row gap-6 flex-1">
            <div className="bg-gray-100 p-4 rounded-lg w-64 shrink-0 hidden md:block">
              <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                <div className="text-blue-600 hover:underline">
                  <Link to="#introduction">1. Introduction</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#scope">2. Scope and Applicability</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#definitions">3. Key Definitions</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#principles">4. Privacy Principles</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#information">5. Types of Personal Information Collected</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#legal-basis">6. Legal Basis for Processing Personal Data</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#collection">7. How Personal Information is Collected</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#purpose">8. Purpose of Data Collection</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#sharing">9. How We Share Your Data</Link>
                </div>
                <div className="text-blue-600 hover:underline">
                  <Link to="#transfers">10. International Data Transfers</Link>
                </div>
              </nav>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="pr-4 pb-8">
                {children}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
