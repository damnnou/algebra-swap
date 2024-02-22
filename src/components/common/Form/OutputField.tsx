import React from 'react';
import { InputField } from '.';
import { Token } from 'src/constants/tokens';

export const OutputField: React.FC<OutputFieldProps> = ({
    onClick,
    outputToken,
    className,
}) => {
    return (
        <InputField
            className={className}
            disabled
            onClick={onClick}
            inputToken={outputToken}
        />
    );
};

interface OutputFieldProps {
    className?: string;
    outputToken: Token;
    onClick: () => void;
}
