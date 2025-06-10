
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import SwapCrypto from "@/pages/SwapCrypto";
// Static data - in a real application this would come from an API

const SwappingCrypto: React.FC = () => {

        React.useEffect(() => {
            // This recalculates the transaction details when the currency changes
        }, []);

        return (
            <AppLayout>
                <div className="container max-w-md mx-auto">
                   <SwapCrypto />
                </div>
            </AppLayout>
        );
};

export default SwappingCrypto;
