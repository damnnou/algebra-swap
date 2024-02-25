import { useCallback, useEffect, useState } from 'react';
import { simulateTransaction } from 'src/api/simulateTransaction';
import { useAllRoutes } from './useAllRoutes';
import { getEncodePath } from './useEncodePath';
import { tokens } from 'src/constants/tokens';
import { useAppDispatch, useAppSelector } from 'src/store/useStore';
import { formatUnits } from 'viem';

type PathJoined = `0x${string}`;

function findBestRoute(routes: Map<string[], bigint>): {
    bestPrice: bigint;
    bestRoute: string[];
} {
    const sortedArray = [...routes.entries()].sort(
        (a, b) => Number(b[1]) - Number(a[1])
    );

    const bestPrice = sortedArray[0][1];
    const bestRoute = sortedArray[0][0];

    return {
        bestPrice,
        bestRoute,
    };
}

export function useSimulation(
    tokenIn: string,
    tokenOut: string,
    amountIn: number
) {
    const { isLoading } = useAppSelector(({ swap }) => swap);
    const dispatch = useAppDispatch();

    const routes: string[][] = useAllRoutes(tokenIn, tokenOut);

    const paths: PathJoined[] = routes.map(
        (route): PathJoined =>
            `0x${route.reduce((acc, token) => {
                return acc + tokens[token].address.slice(2);
            }, '')}`
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

            const decimals = tokens[tokenOut].decimals;

            const { bestPrice, bestRoute } = findBestRoute(routeToValue);

            const formattedBestPrice = Number(formatUnits(bestPrice, decimals));
            const flooredBestPrice =
                Math.floor(formattedBestPrice * 10000) / 10000;

            const baseRoute = routeToValue.get(routes[0])
                ? routes[0]
                : bestRoute;
            const formattedBasePrice = Number(
                formatUnits(routeToValue.get(baseRoute), decimals)
            );
            const basePrice =
                Math.floor(Number(formattedBasePrice) * 10000) / 10000;

            console.log('Calculated!', 'Routes map - ', routeToValue);

            dispatch({
                type: 'swap/setOutputCurrencyValue',
                payload: basePrice,
            });
            dispatch({
                type: 'swap/setOutputCurrencyRoute',
                payload: baseRoute,
            });
            dispatch({
                type: 'swap/setOutputCurrencyBestValue',
                payload: flooredBestPrice,
            });
            dispatch({
                type: 'swap/setOutputCurrencyBestRoute',
                payload: bestRoute,
            });
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({ type: 'swap/setLoading' });
        }
    }, [amountIn]);

    return simulate;
}
