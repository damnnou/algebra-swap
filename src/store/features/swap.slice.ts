import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Token, tokens } from 'src/constants/tokens';

export interface swapState {
    isLoading: boolean;
    inputCurrency: Token;
    inputCurrencyValue: number;
    outputCurrency: Token;
    outputCurrencyValue: number;
    outputCurrencyRoute: string[];
}

const initialState: swapState = {
    isLoading: false,
    inputCurrency: tokens['WETH'],
    inputCurrencyValue: 0,
    outputCurrency: tokens['USDC'],
    outputCurrencyValue: 0,
    outputCurrencyRoute: [],
};

export const swapSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {
        setInputCurrency: (state, action: PayloadAction<Token>) => {
            state.inputCurrency = action.payload;
        },

        setOutputCurrency: (state, action: PayloadAction<Token>) => {
            state.inputCurrency = action.payload;
        },

        setInputCurrencyValue: (state, action: PayloadAction<number>) => {
            state.inputCurrencyValue = action.payload;
        },

        switchCurrencies: (state) => {
            const temp = state.inputCurrency;
            state.inputCurrency = state.outputCurrency;
            state.outputCurrency = temp;
            state.inputCurrencyValue = 0;
            state.outputCurrencyValue = 0;
        },
    },
});

export const { setInputCurrency, setOutputCurrency, switchCurrencies } =
    swapSlice.actions;

export default swapSlice.reducer;
