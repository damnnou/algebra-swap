import React, { useEffect, useState } from 'react';
import { InputField } from './InputField';
import { OutputField } from './OutputField';
import { SwitchButton } from 'src/components/ui/SwitchButton';
import { Token, tokens } from 'src/constants/tokens';
import { MenuState } from 'src/types/token-menu';
import { cn } from 'src/lib/cn';
import { getAllRoutesPaths, getCalldata } from 'src/utils/helpers';
import TokenSelectMenu from '../TokenSelectMenu';

const SwapForm = () => {
    const [inputToken, setInputToken] = useState<Token>(tokens.WETH);
    const [outputToken, setOutputToken] = useState<Token>(tokens.USDC);

    const [inputValue, setInputValue] = useState<number>(0);

    const [menuState, setMenuState] = useState<MenuState>(MenuState.CLOSED);

    const handleChangeInputValue = (value: number) => {
        setInputValue(value);
    };

    const handleChangeMenu = (state: MenuState) => {
        setMenuState(state);
    };

    const handleChangeToken = (token: string) => {
        console.log('selected - ', token);
        if (menuState === MenuState.OUTPUT) {
            setOutputToken(tokens[token]);
        }
        if (menuState === MenuState.INPUT) {
            setInputToken(tokens[token]);
        }
        setMenuState(MenuState.CLOSED);
    };

    const handleSwitchTokens = (e: React.MouseEvent) => {
        e.preventDefault();
        setInputToken(outputToken);
        setOutputToken(inputToken);
        setInputValue(0);
    };

    useEffect(() => {
        const path0 = getAllRoutesPaths(
            inputToken.ticker,
            outputToken.ticker
        )[0];
        console.log(getCalldata(inputToken.ticker, inputValue, path0));
    }, [inputValue, inputToken, outputToken]);

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
                        selectedToken={inputToken}
                        value={inputValue}
                    />
                    <OutputField
                        onClick={() => handleChangeMenu(MenuState.OUTPUT)}
                        selectedToken={outputToken}
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
                        menuState === MenuState.INPUT ? outputToken : inputToken
                    }
                />
            )}
        </form>
    );
};

export default SwapForm;