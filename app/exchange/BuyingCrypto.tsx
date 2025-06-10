
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import BuyCrypto from "@/pages/BuyCrypto";
// Static data - in a real application this would come from an API

const BuyingCrypto: React.FC = () => {

    React.useEffect(() => {
        // This recalculates the transaction details when the currency changes
    }, []);

    return (
        <AppLayout>
            <div className="container max-w-md mx-auto">
               <BuyCrypto />
            </div>
        </AppLayout>
    );
};

export default BuyingCrypto;
