import React from 'react';
import ArrowBtn from 'src/assets/arrow.svg';
import { Token, tokens } from 'src/constants/tokens';

export const InputField: React.FC<InputFieldProps> = ({
    className,
    onClick,
    onChange,
    selectedToken,
    disabled,
    value,
}) => {
    return (
        <label className="flex w-full items-center h-fit border-2 border-[#34364C] p-6 rounded-3xl bg-[#101321]">
            <div
                onClick={onClick}
                className="flex w-1/3 items-center gap-4 cursor-pointer"
            >
                <img width={36} height={36} src={selectedToken.logo} />
                <p className="font-semibold text-xl">
                    {Object.keys(tokens).find(
                        (key) => tokens[key] === selectedToken
                    )}
                </p>
                <img src={ArrowBtn} />
            </div>
            <input
                onChange={(e) => onChange && onChange(Number(e.target.value))}
                disabled={disabled}
                value={value}
                type="number"
                className="w-1/2 h-full ml-auto text-[24px] outline-none bg-transparent text-right"
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
