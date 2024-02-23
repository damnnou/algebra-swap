import { tokens } from 'src/constants/tokens';

export const useBestRoute = (tokenIn: string, tokenOut: string) => {
    const tokensList = Object.keys(tokens);
    const result = [];

    for (let token of tokensList) {
        if (result.length === 0) result.push(token);
    }
};

// ['WETH', 'USDC'], ['WETH', 'ARB','USDC'], ['WETH', 'USDT', "ARB", "USDC"]
