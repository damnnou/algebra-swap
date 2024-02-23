import React from 'react';
import Route from 'src/components/swap/Route';

const RoutesSection = () => {
    return (
        <section>
            <h2 className="mb-3">Routes</h2>
            <div className="flex flex-col gap-3">
                <Route best />
                <Route />
            </div>
        </section>
    );
};

export default RoutesSection;
