import { useMemo } from 'react';
import { tokens } from 'src/constants/tokens';

// Возвращает все возможные маршруты в виде массива символов
const getAllRoutes = (tokenIn: string, tokenOut: string): string[][] => {
    const visited = new Set();
    const routes: string[][] = [];

    function dfs(currentToken: string, path: string[]) {
        if (path.length > 4) {
            return;
        }
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

    const paths = routes.map((route) => route.map((token) => token));

    // перемещает базовый путь в начало массива
    const index = paths.findIndex(
        (route) => JSON.stringify(route) === JSON.stringify([tokenIn, tokenOut])
    );
    if (index !== -1) {
        paths.unshift(paths.splice(index, 1)[0]);
    }

    return paths;
};

export function useAllRoutes(tokenIn: string, tokenOut: string): string[][] {
    return useMemo(() => {
        const routes = getAllRoutes(tokenIn, tokenOut);
        return routes;
    }, [tokenIn, tokenOut]);
}
