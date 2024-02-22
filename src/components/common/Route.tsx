import React from 'react';
import WETHLogo from 'src/assets/tokens/weth.svg';
import { cn } from 'src/lib/cn';

export const Route: React.FC<RouteProps> = ({ best, className }) => {
    const defaultStyles = `relative flex items-center justify-between px-8 w-full h-[56px] border-2 bg-light rounded-2xl`;
    const bestStyles = best ? 'border-border-best' : 'border-border-light';

    return (
        <div className={cn(defaultStyles, bestStyles, className)}>
            <div className="flex items-center gap-2 max-w-3/4">
                <img width={26} height={26} src={WETHLogo} />
                <p>WETH</p>
            </div>
            <p>2900</p>
            {best && (
                <div className="absolute -top-3 right-6 border border-border-route bg-bg-route rounded-md flex items-center justify-center w-[87px] h-[22px]">
                    <p className="text-[12px] text-text-route">Best Route</p>
                </div>
            )}
        </div>
    );
};

interface RouteProps {
    className?: string;
    best?: boolean;
}
