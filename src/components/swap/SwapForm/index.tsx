import React, { useState } from 'react';
import { InputField } from './InputField';
import { OutputField } from './OutputField';
import { SwitchButton } from 'src/components/ui/SwitchButton';
import { tokens } from 'src/constants/tokens';
import { MenuState } from 'src/types/token-menu';
import { cn } from 'src/lib/cn';
import TokenSelectMenu from '../TokenSelectMenu';
import { useAppDispatch, useAppSelector } from 'src/store/useStore';

const SwapForm = () => {
    const {
        inputCurrency,
        inputCurrencyValue,
        outputCurrency,
        outputCurrencyValue,
    } = useAppSelector(({ swap }) => swap);

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

    // useEffect(() => {
    //     if (isLoading) return;
    //     if (!bestPrice) return;
    //     setOutputValue(bestPrice);
    // }, [isLoading, bestPrice]);

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
                        onClick={() => handleChangeMenu(MenuState.INPUT)}
                        onChange={handleChangeInputValue}
                        selectedToken={inputCurrency}
                        value={inputCurrencyValue}
                    />
                    <OutputField
                        onClick={() => handleChangeMenu(MenuState.OUTPUT)}
                        selectedToken={outputCurrency}
                        value={outputCurrencyValue}
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
                            ? outputCurrency
                            : inputCurrency
                    }
                />
            )}
        </form>
    );
};

export default SwapForm;
