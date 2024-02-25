import RoutesSection from 'src/components/swap/RoutesSection';
import SwapSection from 'src/components/swap/SwapSection';

export const Swap = () => {
    return (
        <div className="flex flex-col gap-16 w-fit h-fit mx-32 my-32 max-sm:scale-75 max-sm:my-8 max-[410px]:my-2 max-[410px]:scale-[.66] max-[310px]:scale-50 transition-all ease-in-out duration-300">
            <SwapSection />
            <RoutesSection />
        </div>
    );
};
