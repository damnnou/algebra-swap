import { useCallback, useMemo } from 'react';
import { simulateTransaction } from 'src/api/simulateTransaction';
import { useAllRoutes } from './useAllRoutes';
import { getEncodePath } from './useEncodePath';
import { tokens } from 'src/constants/tokens';
import { useAppDispatch, useAppSelector } from 'src/store/useStore';

type PathJoined = `0x${string}`;

export function useSimulation() {
    const { isLoading, outputCurrency, inputCurrency } = useAppSelector(
        ({ swap }) => swap
    );
    const dispatch = useAppDispatch();

    const tokenIn = inputCurrency.token.symbol;
    const tokenOut = outputCurrency.token.symbol;
    const amountIn = inputCurrency.value;

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

            const txsReciept = await Promise.allSettled(promises);

            txsReciept.forEach((promise, index) => {
                if (
                    promise.status === 'fulfilled' &&
                    promise.value !== undefined &&
                    promise.value.data.transaction.transaction_info.call_trace
                        ?.decoded_output !== null
                ) {
                    const outputPrice: bigint =
                        promise.value.data.transaction.transaction_info
                            .call_trace?.decoded_output[0].value;
                    routeToValue.set(routes[index], outputPrice);
                    return;
                }
            });

            if (!routeToValue.size) throw new Error('no route found');

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountIn]);

    return simulate;
}
