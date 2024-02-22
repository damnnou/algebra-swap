import React from 'react';
import { InputField } from '.';
import { SwitchButton } from '../SwitchButton';

export const Form = () => {
    return (
        <form className="relative shadow-2xl shadow-[#DB4BFF] flex flex-col w-full h-fit gap-3 border-2 border-[#34364C] p-4 rounded-[35px] bg-[#1A1D2B]">
            <InputField />
            <InputField />
            <SwitchButton
                onClick={() => {}}
                className="absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"
            />
        </form>
    );
};
