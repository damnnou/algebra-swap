import { useMemo } from 'react';
import { tokens } from 'src/constants/tokens';
import { parseAbiItem, encodeFunctionData, parseUnits } from 'viem';

type PathJoined = `0x${string}`;

// Енкодит маршрут в calldata
const getEncodePath = (tokenIn: string, amountIn: number, path: PathJoined) => {
    const inputTokenDecimals = tokens[tokenIn].decimals;

    // Введенный пользователем input amount
    const amount = amountIn.toString();

    const quoteAbiItem = parseAbiItem(
        'function quoteExactInput(bytes path, uint256 amountIn) returns (uint256, uint16[])'
    );

    const calldata = encodeFunctionData({
        abi: [quoteAbiItem],
        args: [path, parseUnits(amount, inputTokenDecimals)],
    });

    return calldata;
};

export function useEncodePath(
    tokenIn: string,
    amountIn: number,
    path: PathJoined
) {
    return useMemo(() => {
        const routes = getEncodePath(tokenIn, amountIn, path);
        return routes;
    }, [tokenIn, amountIn, path]);
}
