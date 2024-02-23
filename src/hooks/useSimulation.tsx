import { useCallback, useState } from 'react';
import { simulateTransaction } from 'src/api/simulateTx';
import { useAllRoutesPaths } from './useAllRoutesPaths';
import { useEncodePath } from './useEncodePath';

export function useSimulation(
    tokenIn: string,
    tokenOut: string,
    amountIn: number
) {
    const [isLoading, setIsLoading] = useState(false);
    const paths = useAllRoutesPaths(tokenIn, tokenOut);
    const calldata = useEncodePath(tokenIn, amountIn, paths[0]);

    const simulate = useCallback(async () => {
        if (isLoading) return;
        if (amountIn <= 0) return;
        setIsLoading(true);
        try {
            const { data } = await simulateTransaction(calldata);
            return data;
        } catch (error) {
            console.error('Failed to simulate transaction: ', error);
        } finally {
            setIsLoading(false);
        }
    }, [amountIn, isLoading, calldata]);

    return { isLoading, simulate };
}
