import React from 'react';
import Route from 'src/components/swap/Route';
import { useSimulation } from 'src/hooks/useSimulation';
import { useAppSelector } from 'src/store/useStore';

const RoutesSection = () => {
    const { isLoading, outputCurrency } = useAppSelector(({ swap }) => swap);

    const route = outputCurrency.route;
    const price = outputCurrency.value;
    const bestRoute =
        JSON.stringify(outputCurrency.bestRoute) === JSON.stringify(route)
            ? []
            : outputCurrency.bestRoute;
    const bestPrice = outputCurrency.bestValue ?? 0;

    return (
        <section>
            <h2 className="mb-3">Routes</h2>
            <div className="flex flex-col gap-3">
                <Route
                    className={bestRoute.length < 1 ? 'hidden' : ''}
                    best
                    price={bestPrice}
                    route={bestRoute}
                    isLoading={isLoading}
                />
                <Route isLoading={isLoading} price={price} route={route} />
            </div>
        </section>
    );
};

export default RoutesSection;
