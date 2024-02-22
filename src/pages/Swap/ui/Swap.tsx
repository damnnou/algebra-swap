import React from 'react';
import { RoutesSection } from 'src/components/ui/RoutesSection';
import { SwapSection } from 'src/components/ui/SwapSection';

export const Swap = () => {
    return (
        <div className="flex flex-col gap-16 w-fit h-fit mx-auto">
            <SwapSection />
            <RoutesSection />
        </div>
    );
};
