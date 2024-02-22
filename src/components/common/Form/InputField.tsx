import React from 'react';
import WETHLogo from '../../../assets/tokens/weth.svg';

export const InputField = () => {
    return (
        <label className="flex w-full items-center h-fit border-2 border-[#34364C] p-6 rounded-3xl bg-[#101321]">
            <div className="flex w-1/3 items-center gap-4">
                <img width={36} height={36} src={WETHLogo} />
                <p className="font-semibold text-xl">WETH</p>
            </div>
            <input
                defaultValue={0}
                type="number"
                className="w-full h-full text-[24px] outline-none bg-transparent text-right"
            />
        </label>
    );
};
