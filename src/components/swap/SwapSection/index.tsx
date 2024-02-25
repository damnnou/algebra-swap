import { UpdateButton } from 'src/components/ui/UpdateButton';
import SwapForm from 'src/components/swap/SwapForm';
import { useAppSelector } from 'src/store/useStore';
import { useSimulation } from 'src/hooks/swap/useSimulation';

const SwapSection = () => {
    const { isLoading, inputCurrency } = useAppSelector(({ swap }) => swap);
    const simulate = useSimulation();

    const handleSimulate = () => {
        if (isLoading || inputCurrency.value <= 0) return;
        simulate();
    };

    return (
        <section className="w-[500px] mx-auto ">
            <div className="flex items-center justify-between mb-3">
                <h1>Swap</h1>
                <UpdateButton onClick={handleSimulate} />
            </div>
            <SwapForm />
        </section>
    );
};

export default SwapSection;
