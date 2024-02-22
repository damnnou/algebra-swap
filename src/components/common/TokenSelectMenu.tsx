import React from 'react';
import { Token, tokens } from 'src/constants/tokens';
import ArrowBtn from 'src/assets/arrow.svg';
import { MenuState } from 'src/types/token-menu';
import { cn } from 'src/lib/cn';

export const TokenSelectMenu: React.FC<TokenSelectMenuProps> = ({
    onClick,
    onSelect,
    selectedToken,
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
                {Object.keys(tokens).map((token) => {
                    const isTokenSelected =
                        selectedToken.address === tokens[token].address;
                    return (
                        <li
                            onClick={() => !isTokenSelected && onSelect(token)}
                            className={cn(
                                'flex items-center gap-4 w-full p-3 hover:bg-[#101321] cursor-pointer',
                                isTokenSelected
                                    ? 'bg-[#32343E] text-[#9D9D9D] cursor-not-allowed hover:bg-[#32343E]'
                                    : ''
                            )}
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
                    );
                })}
            </ul>
        </fieldset>
    );
};

interface TokenSelectMenuProps {
    onClick: (state: MenuState) => void;
    onSelect: (token: string) => void;
    selectedToken: Token;
}
