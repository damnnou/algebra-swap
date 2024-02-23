import { useEffect, useState } from 'react';
import { simulateTransaction } from 'src/api/simulateTransaction';
import { useAllRoutes } from './useAllRoutes';
import { getEncodePath } from './useEncodePath';
import { tokens } from 'src/constants/tokens';

type PathJoined = `0x${string}`;

function findBestRoute(routes: Map): {
    price: number;
    bestRoute: string[];
} {
    const sortedArray = [...routes.entries()].sort((a, b) => a[1] - b[1]);

    const price = sortedArray[0][1];
    const bestRoute = sortedArray[0][0];

    return {
        price,
        bestRoute,
    };
}

export function useSimulation(
    tokenIn: string,
    tokenOut: string,
    amountIn: number
) {
    const [isLoading, setIsLoading] = useState(false);
    const [bestPrice, setBestPrice] = useState<number>(0);
    const [bestRoute, setBestRoute] = useState<string[]>([]);

    const routes = useAllRoutes(tokenIn, tokenOut);

    const paths = routes.map(
        (route): PathJoined =>
            `0x${route.reduce((acc, token) => {
                return acc + tokens[token].address.slice(2);
            }, '')}`
    );

    const simulate = async () => {
        try {
            if (isLoading) return;
            setIsLoading(true);
            console.log('calculating...');
            const newRoutes = new Map();
            const promises = [];
            for (let i = 0; i < paths.length; i++) {
                const calldata = getEncodePath(tokenIn, amountIn, paths[i]);
                promises.push(simulateTransaction(calldata));
            }
            const prices = await Promise.allSettled(promises);
            prices.map((promise, index) => {
                if (
                    promise.value.data.transaction.transaction_info.call_trace
                        ?.decoded_output !== null &&
                    promise.status === 'fulfilled'
                ) {
                    const outputPrice =
                        promise.value.data.transaction.transaction_info
                            .call_trace?.decoded_output[0].value;
                    newRoutes.set(routes[index], outputPrice);
                    return;
                }
            });
            return newRoutes;
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (amountIn <= 0) return;
        if (isLoading) return;
        simulate().then((data: Map) => {
            console.log('calculated - ', data);
            const { price, bestRoute } = findBestRoute(data);
            const parsedPrice = Number(
                price.toString().slice(0, -tokens[tokenOut].decimals)
            );
            setBestPrice(parsedPrice);
            setBestRoute(bestRoute);
        });
    }, [amountIn]);

    return { isLoading, bestPrice, bestRoute };
}
