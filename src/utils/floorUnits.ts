import { formatUnits } from 'viem';

export const floorUnits = (value: bigint, decimals: number): number => {
    return Math.floor(Number(formatUnits(value, decimals)) * 1000) / 1000;
};
