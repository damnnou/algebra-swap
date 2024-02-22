import React from 'react';
import { UpdateButton } from 'src/components/common/UpdateButton';
import { Form } from 'src/components/common/Form';

export const SwapSection = () => {
    return (
        <section className="w-[500px] mx-auto">
            <div className="flex items-center justify-between mb-3">
                <h1>Swap</h1>
                <UpdateButton onClick={() => {}} />
            </div>
            <Form />
        </section>
    );
};
