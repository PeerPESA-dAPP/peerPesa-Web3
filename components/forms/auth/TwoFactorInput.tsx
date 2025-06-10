import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface TwoFactorInputProps {
  onVerify: (code: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  showSuccess?: boolean;
}

const TwoFactorInput: React.FC<TwoFactorInputProps> = ({ onVerify, onCancel, isLoading, showSuccess }) => {
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Animation timing
  useEffect(() => {
    if (showSuccess) {
      toast({
        title: "Authentication Successful",
        description: "Redirecting to dashboard...",
        className: "bg-white border-green-500 text-green-600"
      }); 
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (value.length === 6) {
      // For now, allow direct login without API hooks
       // Only for demo/testing until API is connected
      // In production, you would actually call onVerify(value)
      onVerify(value);

    } else {
      toast({
        title: "Incomplete Code",
        description: "Please enter all 6 digits",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {showSuccess ? (
        <div className="text-center space-y-4 p-6 animate-fade-in">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold text-green-600">Authentication Successful</h2>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 bg-gradient-to-br from-teal-50 to-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-7 w-7 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
            <p className="text-gray-600 max-w-sm">
              Enter the 6-digit code from your authentication app to verify your identity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="otp-container">
              <div className="otp-input-group">
                <InputOTP 
                  maxLength={6} 
                  value={value} 
                  onChange={setValue}
                  className="gap-2 md:gap-3"
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index} 
                        className="otp-input-slot"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="otp-digit-indicator">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`otp-dot ${value.length > i ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Button 
                type="submit" 
                className="verify-button group"
                disabled={value.length !== 6 || isLoading}
              >
                {isLoading ? (
                  "Verifying..."
                ) : (
                  <>Verify & Login <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                )}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="back-button"
                onClick={onCancel}
                disabled={isLoading}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default TwoFactorInput;
