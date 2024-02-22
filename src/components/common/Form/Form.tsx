import React, { useState } from 'react';
import { InputField, OutputField } from '.';
import { SwitchButton } from '../SwitchButton';
import { Token, tokens } from 'src/constants/tokens';
import { TokenSelectMenu } from '../TokenSelectMenu';
import { MenuState } from 'src/types/token-menu';

export const Form = () => {
    const [inputToken, setInputToken] = useState<Token>(tokens.WETH);
    const [outputToken, setOutputToken] = useState<Token>(tokens.USDC);

    const [menuState, setMenuState] = useState<MenuState>(MenuState.CLOSED);

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

    return (
        <form className="relative shadow-2xl shadow-[#db4bff85] flex flex-col w-full h-fit gap-3 border-2 border-[#34364C] p-4 rounded-[35px] bg-[#1A1D2B]">
            {menuState === MenuState.CLOSED && (
                <>
                    <InputField
                        onClick={() => handleChangeMenu(MenuState.INPUT)}
                        inputToken={inputToken}
                    />
                    <OutputField
                        onClick={() => handleChangeMenu(MenuState.OUTPUT)}
                        outputToken={outputToken}
                    />
                    <SwitchButton
                        onClick={() => {}}
                        className="absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"
                    />
                </>
            )}
            {menuState !== MenuState.CLOSED && (
                <TokenSelectMenu
                    onSelect={handleChangeToken}
                    onClick={handleChangeMenu}
                />
            )}
        </form>
    );
};
