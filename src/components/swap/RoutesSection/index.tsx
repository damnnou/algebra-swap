import Route from 'src/components/swap/Route';
import { useAppSelector } from 'src/store/useStore';
import { floorUnits } from 'src/utils/floorUnits';

const RoutesSection = () => {
    const { isLoading, outputCurrency } = useAppSelector(({ swap }) => swap);

    const routes = outputCurrency.routes ? outputCurrency.routes : new Map();

    console.log('rerender');

    if (routes.size > 0)
        return (
            <section className="w-[500px] mx-auto animate-fade-in">
                <h2 className="mb-3">Routes</h2>
                <div className="flex flex-col gap-3">
                    {[...routes.entries()].map(([route, value], index) => {
                        if (index >= 5 || route.length > 3) return;
                        else
                            return (
                                <Route
                                    key={value}
                                    best={index === 0 ? true : false}
                                    price={floorUnits(
                                        value,
                                        outputCurrency.token.decimals
                                    )}
                                    route={route}
                                    isLoading={isLoading}
                                />
                            );
                    })}
                </div>
            </section>
        );
};

export default RoutesSection;
