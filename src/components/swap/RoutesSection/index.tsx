import React from 'react';
import Route from 'src/components/swap/Route';
import { useSimulation } from 'src/hooks/useSimulation';

const RoutesSection = () => {
    const bestRoute = ['WETH', 'ARB', 'GMX', 'USDT'];
    const bestPrice = 2900;
    const route = ['WETH', 'USDT'];
    const price = 2895;

    return (
        <section>
            <h2 className="mb-3">Routes</h2>
            <div className="flex flex-col gap-3">
                <Route best price={bestPrice} route={bestRoute} />
                <Route price={price} route={route} />
            </div>
        </section>
    );
};

export default RoutesSection;
