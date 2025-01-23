import { IMarketData, IStatistics } from '@/state/types';

interface MetricData {
    key: string;
    percentage: number;
}

export function generateMetricData(marketData: IMarketData): MetricData[] {
    return Object.keys(marketData)
        .filter((key) => /^L(?:[1-9]|1[0-5])$/.test(key))
        .map((key) => {
            const metric = marketData[key as keyof IMarketData] as IStatistics;
            return {
                key,
                percentage: Math.round(metric.hitPerc)
            };
        });
}
