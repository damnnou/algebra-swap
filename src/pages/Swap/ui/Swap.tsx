import React from 'react';
import RoutesSection from 'src/components/swap/RoutesSection';
import SwapSection from 'src/components/swap/SwapSection';

export const Swap = () => {
    return (
        <div className="flex flex-col gap-16 w-fit h-fit mx-auto">
            <SwapSection />
            <RoutesSection />
        </div>
    );
};
