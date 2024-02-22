import React, { useState } from 'react';
import { InputField, OutputField } from '.';
import { SwitchButton } from '../SwitchButton';
import { tokens } from 'src/constants/tokens';
import { TokenSelectMenu } from '../TokenSelectMenu';

export const Form = () => {
    const [activeToken, setActiveToken] = useState(tokens.WETH);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleOpenMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // const handleChangeToken = ({ target }) => {
    //     console.log('selected - ', target.value);
    // };

    return (
        <form className="relative shadow-2xl shadow-[#db4bff85] flex flex-col w-full h-fit gap-3 border-2 border-[#34364C] p-4 rounded-[35px] bg-[#1A1D2B]">
            {!isMenuOpen && (
                <>
                    <InputField onClick={handleOpenMenu} />
                    <OutputField />
                    <SwitchButton
                        onClick={() => {}}
                        className="absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"
                    />
                </>
            )}
            {isMenuOpen && <TokenSelectMenu onClick={handleOpenMenu} />}
        </form>
    );
};
