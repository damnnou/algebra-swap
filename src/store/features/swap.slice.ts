import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Token, tokens } from 'src/constants/tokens';

interface Currency {
    token: Token;
    value: number;
    bestValue?: number;
    route?: string[];
    bestRoute?: string[];
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
    },
    outputCurrency: {
        token: tokens['USDC'],
        value: 0,
        bestValue: 0,
        route: ['WETH', 'USDC'],
        bestRoute: [],
    },
};

export const swapSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {
        setInputCurrency: (state, action: PayloadAction<Token>) => {
            state.inputCurrency.token = action.payload;
            const inpSymb = state.inputCurrency.token.symbol;
            const outSymb = state.outputCurrency.token.symbol;
            state.outputCurrency.route = [inpSymb, outSymb];
            state.inputCurrency.value = 0;
            state.outputCurrency.value = 0;
            state.outputCurrency.bestValue = 0;
            state.outputCurrency.bestRoute = [];
        },

        setInputCurrencyValue: (state, action: PayloadAction<number>) => {
            state.inputCurrency.value = action.payload;
        },

        setOutputCurrency: (state, action: PayloadAction<Token>) => {
            state.outputCurrency.token = action.payload;
            const inpSymb = state.inputCurrency.token.symbol;
            const outSymb = state.outputCurrency.token.symbol;
            state.outputCurrency.route = [inpSymb, outSymb];
            state.outputCurrency.bestRoute = [inpSymb, outSymb];
            state.inputCurrency.value = 0;
            state.outputCurrency.value = 0;
            state.outputCurrency.bestValue = 0;
            state.outputCurrency.bestRoute = [];
        },

        setOutputCurrencyValue: (state, action: PayloadAction<number>) => {
            state.outputCurrency.value = action.payload;
        },

        setOutputCurrencyBestValue: (state, action: PayloadAction<number>) => {
            state.outputCurrency.bestValue = action.payload;
        },

        setOutputCurrencyRoute: (state, action: PayloadAction<string[]>) => {
            state.outputCurrency.route = action.payload;
        },

        setOutputCurrencyBestRoute: (
            state,
            action: PayloadAction<string[]>
        ) => {
            state.outputCurrency.bestRoute = action.payload;
        },

        switchCurrencies: (state) => {
            const temp = state.inputCurrency.token;

            state.inputCurrency.token = state.outputCurrency.token;
            state.outputCurrency.token = temp;
            state.inputCurrency.value = 0;
            state.outputCurrency.value = 0;
            state.outputCurrency.bestValue = 0;
            state.outputCurrency.route = [
                state.inputCurrency.token.symbol,
                state.outputCurrency.token.symbol,
            ];
            state.outputCurrency.bestRoute = [];
        },

        setLoading: (state) => {
            state.isLoading = !state.isLoading;
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
