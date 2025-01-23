import { cn } from '@/utils/cn';
import { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';

interface IGraphProps {
    data: { dataLabel: string; dataLabelTop: string; value: number }[];
    expanded?: boolean;
    minimized?: boolean;
}

const Graph = ({ data, expanded, minimized }: IGraphProps) => {
    const average = useMemo(() => {
        const allValues = data.map((d) => d.value);
        return allValues.reduce((sum, val) => sum + val, 0) / allValues.length;
    }, [data]);

    const dataWithFill = data.map((d) => ({
        ...d,
        value: minimized ? average : d.value,
        fill: d.value <= average ? '#4076FF' : '#4CFFD4'
    }));

    const CustomLabel = ({
        x,
        y,
        width,
        value
    }: {
        x: number;
        y: number;
        width: number;
        height: number;
        value: number;
        fill: string;
    }) => {
        const textX = x + width / 2;
        const textY = y + 18;

        return (
            <text
                x={textX}
                y={textY}
                width={width}
                fontSize={14}
                fontWeight={600}
                fontFamily="Aktiv-Grotesk"
                fill={value > average ? 'black' : 'white'}
                textAnchor="middle"
            >
                {value}
            </text>
        );
    };

    const CustomMinimizedLabel = ({
        x,
        y,
        width,
        index
    }: {
        x: number;
        y: number;
        width: number;
        height: number;
        fill: string;
        index: number;
    }) => {
        const textX = x + width / 2;
        const textY = y - 8;
        return (
            <text
                x={textX}
                y={textY}
                width={width}
                fontSize={10}
                fontFamily="Aktiv-Grotesk"
                fill="white"
                opacity={0.9}
                textAnchor="middle"
            >
                {data[index].dataLabelTop}
            </text>
        );
    };

    return (
        <div
            className={cn(
                'transition-height h-[200px] duration-300',
                minimized && 'h-[70px]'
            )}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataWithFill} margin={{ top: 30 }}>
                    {!minimized ? (
                        <>
                            <CartesianGrid
                                strokeDasharray="5 5"
                                horizontal={true}
                                vertical={false}
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth={2}
                            />
                            <XAxis
                                dataKey="dataLabel"
                                strokeWidth={0}
                                tick={{
                                    fill: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 10
                                }}
                            />
                            <YAxis
                                width={25}
                                stroke="transparent"
                                orientation="left"
                                tick={{
                                    fill: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 12
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <XAxis
                                dataKey="dataLabel"
                                strokeWidth={0}
                                orientation="bottom"
                                tick={{
                                    fill: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 10
                                }}
                            />
                            <XAxis
                                dataKey="dataLabelTop"
                                strokeWidth={0}
                                orientation="top"
                                tick={{
                                    fill: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 10
                                }}
                            />
                        </>
                    )}
                    <Bar
                        dataKey="value"
                        radius={[4, 4, 4, 4]}
                        isAnimationActive={false}
                        label={
                            expanded
                                ? CustomLabel
                                : minimized
                                  ? CustomMinimizedLabel
                                  : undefined
                        }
                    />
                    {!minimized && (
                        <ReferenceLine
                            y={average}
                            stroke="#4076FF"
                            strokeWidth={2}
                            opacity={0.5}
                        />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
