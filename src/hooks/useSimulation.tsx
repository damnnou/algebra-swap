import { useCallback, useEffect, useMemo, useState } from 'react';
import { simulateTransaction } from 'src/api/simulateTransaction';
import { useAllRoutes } from './useAllRoutes';
import { getEncodePath } from './useEncodePath';
import { tokens } from 'src/constants/tokens';
import { useAppDispatch, useAppSelector } from 'src/store/useStore';

type PathJoined = `0x${string}`;

export function useSimulation(
    tokenIn: string,
    tokenOut: string,
    amountIn: number
) {
    const { isLoading } = useAppSelector(({ swap }) => swap);
    const dispatch = useAppDispatch();

    const routes: string[][] = useAllRoutes(tokenIn, tokenOut);

    const paths: PathJoined[] = useMemo(
        () =>
            routes.map(
                (route): PathJoined =>
                    `0x${route.reduce((acc, token) => {
                        return acc + tokens[token].address.slice(2);
                    }, '')}`
            ),
        [routes]
    );

    const simulate = useCallback(async () => {
        try {
            if (isLoading) throw new Error('in simulating...');

            dispatch({ type: 'swap/setLoading' });
            console.log('calculating...');
            const routeToValue: Map<string[], bigint> = new Map();

            const promises = [];
            for (let i = 0; i < paths.length; i++) {
                const calldata = getEncodePath(tokenIn, amountIn, paths[i]);
                promises.push(simulateTransaction(calldata));
            }

            const prices = await Promise.allSettled(promises);

            prices.forEach((promise, index) => {
                if (
                    promise.value.data.transaction.transaction_info.call_trace
                        ?.decoded_output !== null &&
                    promise.status === 'fulfilled'
                ) {
                    const outputPrice: bigint =
                        promise.value.data.transaction.transaction_info
                            .call_trace?.decoded_output[0].value;
                    routeToValue.set(routes[index], outputPrice);
                    return;
                }
            });

            console.log('Calculated!', 'Routes map - ', routeToValue);

            dispatch({
                type: 'swap/setRoutes',
                payload: routeToValue,
            });
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({ type: 'swap/setLoading' });
        }
    }, [amountIn]);

    return simulate;
}
