import React from 'react';
import { UpdateButton } from 'src/components/ui/UpdateButton';
import SwapForm from 'src/components/swap/SwapForm';
import { useAppSelector } from 'src/store/useStore';
import { useSimulation } from 'src/hooks/useSimulation';

const SwapSection = () => {
    const simulate = useSimulation();

    return (
        <section className="w-[500px] mx-auto">
            <div className="flex items-center justify-between mb-3">
                <h1>Swap</h1>
                <UpdateButton onClick={() => simulate()} />
            </div>
            <SwapForm />
        </section>
    );
};

export default SwapSection;
