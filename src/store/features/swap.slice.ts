import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Token, tokens } from 'src/constants/tokens';
import { floorUnits } from 'src/utils/floorUnits';
import { enableMapSet } from 'immer';

enableMapSet();

interface Currency {
    token: Token;
    value: number;
    bestValue?: number;
    route?: string[];
    bestRoute?: string[];
    routes: Map<string[], bigint>;
}

export interface swapState {
    isLoading: boolean;
    inputCurrency: Currency;
    outputCurrency: Currency;
}

const initialState: swapState = {
    isLoading: false,
    inputCurrency: {
        token: tokens['WETH'],
        value: 0,
        routes: new Map(),
    },
    outputCurrency: {
        token: tokens['USDC'],
        value: 0,
        routes: new Map(),
    },
};

export const swapSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {
        setInputCurrency: (state, action: PayloadAction<Token>) => {
            state.inputCurrency.token = action.payload;
            state.inputCurrency.value = 0;
            state.outputCurrency.routes = new Map();
            state.outputCurrency.value = 0;
        },

        setOutputCurrency: (state, action: PayloadAction<Token>) => {
            state.outputCurrency.token = action.payload;
            state.outputCurrency.value = 0;
            state.outputCurrency.routes = new Map();
            state.inputCurrency.value = 0;
        },

        setInputCurrencyValue: (state, action: PayloadAction<number>) => {
            state.inputCurrency.value = action.payload;
        },

        switchCurrencies: (state) => {
            const temp = { ...state.outputCurrency };

            state.outputCurrency.token = state.inputCurrency.token;
            state.outputCurrency.value = state.inputCurrency.value;
            state.outputCurrency.routes = new Map();

            state.inputCurrency.token = temp.token;
            state.inputCurrency.value = temp.value;
            state.inputCurrency.routes = new Map();
        },

        setLoading: (state) => {
            state.isLoading = !state.isLoading;
        },

        setRoutes: (state, action: PayloadAction<Map<string[], bigint>>) => {
            state.outputCurrency.routes = new Map(
                [...action.payload.entries()].sort((a, b) =>
                    a[0].length < 4 || b[0].length < 4
                        ? Number(b[1]) - Number(a[1])
                        : 0
                )
            );
            const [bestRoute] = state.outputCurrency.routes.keys();
            state.outputCurrency.value = floorUnits(
                state.outputCurrency.routes.get(bestRoute),
                state.outputCurrency.token.decimals
            );
        },
    },
});

export const {
    setInputCurrency,
    setOutputCurrency,
    switchCurrencies,
    setInputCurrencyValue,
} = swapSlice.actions;

export default swapSlice.reducer;
