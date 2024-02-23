import React from 'react';
import { UpdateButton } from 'src/components/ui/UpdateButton';
import SwapForm from 'src/components/swap/SwapForm';

const SwapSection = () => {
    return (
        <section className="w-[500px] mx-auto">
            <div className="flex items-center justify-between mb-3">
                <h1>Swap</h1>
                <UpdateButton onClick={() => {}} />
            </div>
            <SwapForm />
        </section>
    );
};

export default SwapSection;
