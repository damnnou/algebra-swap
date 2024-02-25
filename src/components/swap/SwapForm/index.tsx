import React, { useEffect, useState } from 'react';
import { InputField } from './InputField';
import { OutputField } from './OutputField';
import { SwitchButton } from 'src/components/ui/SwitchButton';
import { tokens } from 'src/constants/tokens';
import { MenuState } from 'src/types/token-menu';
import { cn } from 'src/lib/cn';
import TokenSelectMenu from '../TokenSelectMenu';
import { useAppDispatch, useAppSelector } from 'src/store/useStore';
import { useSimulation } from 'src/hooks/useSimulation';
import { useDebounce } from 'src/hooks/useDebounce';

const SwapForm = () => {
    const { isLoading, inputCurrency, outputCurrency } = useAppSelector(
        ({ swap }) => swap
    );
    const debouncedCurrencyValue = useDebounce(inputCurrency.value, 500);

    const simulate = useSimulation();

    const dispatch = useAppDispatch();

    const [menuState, setMenuState] = useState<MenuState>(MenuState.CLOSED);

    const handleChangeMenu = (state: MenuState) => {
        setMenuState(state);
    };

    const handleChangeInputValue = (value: number) => {
        dispatch({ type: 'swap/setInputCurrencyValue', payload: value });
    };

    const handleChangeToken = (token: string) => {
        if (menuState === MenuState.OUTPUT) {
            dispatch({
                type: 'swap/setOutputCurrency',
                payload: tokens[token],
            });
        }
        if (menuState === MenuState.INPUT) {
            dispatch({ type: 'swap/setInputCurrency', payload: tokens[token] });
        }
        handleChangeMenu(MenuState.CLOSED);
    };

    const handleSwitchTokens = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch({ type: 'swap/switchCurrencies' });
    };

    useEffect(() => {
        if (debouncedCurrencyValue && inputCurrency.value > 0) simulate();
    }, [debouncedCurrencyValue]);

    useEffect(() => {
        if (inputCurrency.value <= 0) return;
        const intervalId = setInterval(() => {
            console.log('autosimulating...');
            simulate();
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    });

    return (
        <form
            className={cn(
                'relative w-full transition-all duration-300 delay-50 overflow-hidden shadow-2xl shadow-glow flex flex-col gap-3 border-2 border-border-light p-4 rounded-[35px] bg-light',
                menuState !== MenuState.CLOSED ? 'h-[400px]' : 'h-[250px]'
            )}
        >
            {menuState === MenuState.CLOSED && (
                <>
                    <InputField
                        disabled={isLoading}
                        onClick={() => handleChangeMenu(MenuState.INPUT)}
                        onChange={handleChangeInputValue}
                        selectedToken={inputCurrency.token}
                        value={inputCurrency.value}
                    />
                    <OutputField
                        isLoading={isLoading}
                        onClick={() => handleChangeMenu(MenuState.OUTPUT)}
                        selectedToken={outputCurrency.token}
                        value={outputCurrency.value}
                    />
                    <SwitchButton
                        onClick={handleSwitchTokens}
                        className="absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] animate-fade-in"
                    />
                </>
            )}
            {menuState !== MenuState.CLOSED && (
                <TokenSelectMenu
                    onSelect={handleChangeToken}
                    onClick={handleChangeMenu}
                    selectedToken={
                        menuState === MenuState.INPUT
                            ? outputCurrency.token
                            : inputCurrency.token
                    }
                />
            )}
        </form>
    );
};

export default SwapForm;
