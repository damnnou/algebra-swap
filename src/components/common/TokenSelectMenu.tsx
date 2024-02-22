import React from 'react';
import { tokens } from 'src/constants/tokens';
import ArrowBtn from 'src/assets/arrow.svg';
import WETHLogo from 'src/assets/tokens/weth.svg';

export const TokenSelectMenu: React.FC<TokenSelectMenuProps> = ({
    onClick,
}) => {
    return (
        <fieldset className="p-2">
            <label
                onClick={onClick}
                className="flex items-center gap-2 mb-2 cursor-pointer"
            >
                <img
                    width={14}
                    height={14}
                    className="rotate-90"
                    src={ArrowBtn}
                />
                <p className="text-[24px]">Select a token</p>
            </label>
            <ul className="w-full h-fit">
                {Object.keys(tokens).map((token) => (
                    <li
                        className="flex items-center gap-4 w-full p-3 hover:bg-[#101321] cursor-pointer"
                        key={token}
                        value={token}
                    >
                        <img width={24} height={24} src={WETHLogo} />
                        <span>{token}</span>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
};

interface TokenSelectMenuProps {
    onClick: () => void;
}
