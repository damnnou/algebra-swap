import { tokens } from 'src/constants/tokens';
import { parseAbiItem, encodeFunctionData, parseUnits } from 'viem';

type PathJoined = `0x${string}`;

// Енкодит маршрут в calldata
export const encodePath = (
    tokenIn: string,
    amountIn: number,
    path: PathJoined
) => {
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
