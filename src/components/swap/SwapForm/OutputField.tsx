import React from 'react';
import { InputField } from './InputField';
import { Token } from 'src/constants/tokens';

export const OutputField: React.FC<OutputFieldProps> = ({
    isLoading,
    onClick,
    selectedToken,
    className,
    value,
}) => {
    return (
        <InputField
            isLoading={isLoading}
            className={className}
            disabled
            onClick={onClick}
            selectedToken={selectedToken}
            value={value}
        />
    );
};

interface OutputFieldProps {
    isLoading?: boolean;
    className?: string;
    selectedToken: Token;
    onClick: () => void;
    value: number;
}
