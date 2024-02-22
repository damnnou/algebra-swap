import React from 'react';
import { tokens } from 'src/constants/tokens';
import ArrowBtn from 'src/assets/arrow.svg';
import { MenuState } from 'src/types/token-menu';

export const TokenSelectMenu: React.FC<TokenSelectMenuProps> = ({
    onClick,
    onSelect,
}) => {
    return (
        <fieldset className="p-2">
            <label
                onClick={() => onClick(MenuState.CLOSED)}
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
                        onClick={() => onSelect(token)}
                        className="flex items-center gap-4 w-full p-3 hover:bg-[#101321] cursor-pointer"
                        key={token}
                        value={token}
                    >
                        <img
                            alt={`${token} Logo`}
                            width={24}
                            height={24}
                            src={tokens[token].logo}
                        />
                        <span>{token}</span>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
};

interface TokenSelectMenuProps {
    onClick: (state: MenuState) => void;
    onSelect: (token: string) => void;
}
