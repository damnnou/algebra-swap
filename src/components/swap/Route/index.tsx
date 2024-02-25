import React from 'react';
import ArrowBtn from 'src/assets/arrow.svg';
import { cn } from 'src/lib/cn';
import { tokens } from 'src/constants/tokens';
import SpinnerSVG from 'src/assets/spinner.svg';

const Route: React.FC<RouteProps> = React.memo(
    ({ isLoading, route, best, className, price }) => {
        console.log('rerender route');
        const defaultStyles = `relative flex items-center justify-between px-8 w-full h-[56px] border-2 bg-light rounded-2xl`;
        const bestStyles = best ? 'border-border-best' : 'border-border-light';

        return (
            <div className={cn(defaultStyles, bestStyles, className)}>
                <ul className="flex items-center gap-2 max-w-3/4">
                    {route.map((token, index) => (
                        <li className="flex items-center gap-2" key={token}>
                            <img
                                width={24}
                                height={24}
                                src={tokens[token].logo}
                            />
                            <p>{token}</p>
                            {index !== route.length - 1 && (
                                <img
                                    className="-rotate-90"
                                    width={10}
                                    height={10}
                                    src={ArrowBtn}
                                />
                            )}
                        </li>
                    ))}
                </ul>
                {!isLoading ? (
                    <p>{price}</p>
                ) : (
                    <img
                        className="p-0 m-0"
                        width={26}
                        height={26}
                        src={SpinnerSVG}
                    />
                )}
                {best && (
                    <div className="absolute -top-3 right-6 border border-border-route bg-bg-route rounded-md flex items-center justify-center w-[87px] h-[22px]">
                        <p className="text-[12px] text-text-route">
                            Best Route
                        </p>
                    </div>
                )}
            </div>
        );
    }
);

interface RouteProps {
    isLoading: boolean;
    className?: string;
    best?: boolean;
    route: string[];
    price: number;
}

export default Route;
