import React from 'react';
import ArrowBtn from 'src/assets/arrow.svg';
import { Token } from 'src/constants/tokens';

export const InputField: React.FC<InputFieldProps> = ({
    onClick,
    onChange,
    selectedToken,
    disabled,
    value,
}) => {
    return (
        <label className="flex w-full items-center h-[104px] border-2 border-border-light rounded-3xl bg-dark">
            <div
                onClick={onClick}
                className="flex w-1/2 p-4 ml-4 rounded-2xl h-3/4 hover:bg-light items-center gap-4 cursor-pointer transition-all ease-in-out duration-300"
            >
                <img width={40} height={40} src={selectedToken.logo} />
                <p className="font-semibold text-token-select">
                    {selectedToken.ticker}
                </p>
                <img src={ArrowBtn} />
            </div>
            <input
                onChange={(e) => onChange && onChange(Number(e.target.value))}
                disabled={disabled}
                value={value}
                type="number"
                className="w-1/2 h-3/4 p-4 mr-4 ml-auto text-token-select outline-none bg-transparent text-right"
            />
        </label>
    );
};

interface InputFieldProps {
    className?: string;
    onClick: () => void;
    onChange?: (value: number) => void;
    selectedToken: Token;
    disabled?: boolean;
    value?: number;
}
