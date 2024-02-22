import React, { useState } from 'react';
import { InputField, OutputField } from '.';
import { SwitchButton } from '../SwitchButton';
import { Token, tokens } from 'src/constants/tokens';
import { TokenSelectMenu } from '../TokenSelectMenu';
import { MenuState } from 'src/types/token-menu';

export const Form = () => {
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

    return (
        <form className="relative shadow-2xl shadow-[#db4bff85] flex flex-col w-full h-fit gap-3 border-2 border-[#34364C] p-4 rounded-[35px] bg-[#1A1D2B]">
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
                        className="absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"
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
