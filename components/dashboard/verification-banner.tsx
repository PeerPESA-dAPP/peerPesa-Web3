import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VerificationBanner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg py-2 px-4 border">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="hidden sm:block">
          <h3 className="text-sm font-medium">Get Verified</h3>
          <p className="text-xs text-muted-foreground">Complete identity verification</p>
        </div>
      </div>
      <Button 
        size="sm" 
        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs"
        onClick={() => navigate('/dashboard/verify/kyc')}
      >
        Verify Now
      </Button>
    </div>
  );
};
