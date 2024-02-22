import WETHLogo from 'src/assets/tokens/weth.svg';
import USDCLogo from 'src/assets/tokens/usdc.svg';
import ARBLogo from 'src/assets/tokens/arb.svg';
import GMXLogo from 'src/assets/tokens/gmx.svg';
import USDTLogo from 'src/assets/tokens/usdt.svg';

export interface Token {
    address: string;
    decimals: number;
    logo: string;
}

// Тип для объекта токенов
export type Tokens = {
    [key: string]: Token;
};

export const tokens: Tokens = {
    WETH: {
        address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        decimals: 18,
        logo: WETHLogo,
    },
    USDC: {
        address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
        decimals: 6,
        logo: USDCLogo,
    },
    ARB: {
        address: '0x912ce59144191c1204e64559fe8253a0e49e6548',
        decimals: 18,
        logo: ARBLogo,
    },
    GMX: {
        address: '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a',
        decimals: 18,
        logo: GMXLogo,
    },
    USDT: {
        address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
        decimals: 6,
        logo: USDTLogo,
    },
};
