import { useMemo } from 'react';
import { tokens } from 'src/constants/tokens';

type PathJoined = `0x${string}`;

// Возвращает все возможные маршруты в виде массива склееных адресов
const getAllRoutesPaths = (tokenIn: string, tokenOut: string): PathJoined[] => {
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
                return acc + tokens[token].address.slice(2);
            }, '')}`
    );

    return paths;
};

export function useAllRoutesPaths(
    tokenIn: string,
    tokenOut: string
): PathJoined[] {
    return useMemo(() => {
        const paths = getAllRoutesPaths(tokenIn, tokenOut);
        return paths;
    }, [tokenIn, tokenOut]);
}
