import React from 'react';
import SwitchBtn from 'src/assets/switch-btn.svg';
import { cn } from 'src/lib/cn';

export const SwitchButton: React.FC<SwitchButtonProps> = ({
    className,
    onClick,
}) => {
    const defaultStyles =
        'border-2 rounded-full bg-[#101321] border-[#34364C] w-fit h-fit p-1.5';

    return (
        <button onClick={onClick} className={cn(defaultStyles, className)}>
            <img src={SwitchBtn} />
        </button>
    );
};

interface SwitchButtonProps {
    className?: string;
    onClick: (e: React.MouseEvent) => void;
}
