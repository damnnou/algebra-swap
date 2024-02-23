import { tokens } from 'src/constants/tokens';
import { parseAbiItem, encodeFunctionData, parseUnits } from 'viem';

type PathJoined = `0x${string}`;

export const getAllRoutesPaths = (
    tokenIn: string,
    tokenOut: string
): PathJoined[] => {
    const visited = new Set();
    const routes: string[][] = [];

    function dfs(currentToken: string, path: string[]) {
        visited.add(currentToken);

        if (currentToken === tokenOut) {
            routes.push(path);
        } else {
            for (const nextToken in tokens) {
                if (!visited.has(nextToken) && nextToken !== currentToken) {
                    dfs(nextToken, [...path, nextToken]);
                }
            }
        }

        visited.delete(currentToken);
    }

    dfs(tokenIn, [tokenIn]);

    const paths = routes.map(
        (route): PathJoined =>
            `0x${route.reduce((acc, token) => {
                return acc + token.slice(2);
            }, '')}`
    );

    return paths;
};

export const getCalldata = (
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
