import React from 'react';
import { InputField } from './InputField';
import { Token } from 'src/constants/tokens';

export const OutputField: React.FC<OutputFieldProps> = ({
    onClick,
    selectedToken,
    className,
    value,
}) => {
    return (
        <InputField
            className={className}
            disabled
            onClick={onClick}
            selectedToken={selectedToken}
            value={value}
        />
    );
};

interface OutputFieldProps {
    className?: string;
    selectedToken: Token;
    onClick: () => void;
    value: number;
}
