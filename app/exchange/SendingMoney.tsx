import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import SendMoney from "./SendMoney";

const SendingMoney: React.FC = () => {

    React.useEffect(() => {
        // This recalculates the transaction details when the currency changes
    }, []);

    return (
      <AppLayout>
        <div className="container max-w-md mx-auto">
          <SendMoney />
        </div>
      </AppLayout>
    );
};

export default SendingMoney;
