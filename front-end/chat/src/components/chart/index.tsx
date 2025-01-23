import { cn } from '@/utils/cn';

interface ChartProps {
    data: { subLabel: string; label?: string; value: number }[];
    maxValue?: number;
    minValue?: number;
    step: number;
    expanded?: boolean;
    minimal?: boolean;
}

function Chart({
    data,
    maxValue,
    minValue = 0,
    step,
    expanded,
    minimal
}: ChartProps) {
    maxValue =
        maxValue || data.reduce((acc, item) => Math.max(acc, item.value), 0);
    const steps = (maxValue - minValue) / step;

    const average =
        data.reduce((acc, item) => acc + item.value, 0) / data.length;

    return (
        <div className="w-full overflow-x-scroll">
            <div className="w-auto">
                <div
                    className={cn(
                        'hidden flex-row gap-[8px]',
                        minimal ? 'flex' : ''
                    )}
                >
                    {data.map((item, index) => (
                        <div
                            className={cn(
                                'mt-[8px] w-full truncate text-center text-[14px] text-white-70'
                            )}
                            key={index}
                        >
                            {item.subLabel}
                        </div>
                    ))}
                </div>
                <div
                    className={cn(
                        'relative flex h-[200px] flex-row items-end gap-[8px]',
                        !minimal ? 'h-[200px] pl-[40px]' : 'h-auto'
                    )}
                >
                    <div
                        className={cn(
                            'absolute bottom-0 left-0 right-0 top-0 flex flex-col',
                            minimal ? 'hidden' : ''
                        )}
                    >
                        <div
                            className="absolute z-[4] w-full border-t-[2px] border-blue opacity-50"
                            style={{
                                top: `${(average / (maxValue - minValue)) * 100}%`
                            }}
                        ></div>
                        {Array.from({ length: steps }, (_, index) => (
                            <div
                                className="z-[1] w-full border-t-[2px] border-dashed border-white-10 last:border-b-[2px]"
                                style={{ height: `${step * 100}%` }}
                                key={`${index}-bar`}
                            >
                                <div className="text-[14px] text-white-70">
                                    {maxValue - index * step}
                                </div>
                                {index === steps - 1 && (
                                    <div className="absolute bottom-0 translate-y-[100%] text-[14px] text-white-70">
                                        {minValue}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {data.map((item, index) => (
                        <div
                            className={cn(
                                'relative z-[2] flex w-full flex-grow-0 flex-col gap-[2px] truncate rounded-[3px] px-[4px] text-center text-[14px] font-semibold',
                                parseInt(`${item.value}`) > average
                                    ? 'bg-green text-black'
                                    : 'bg-blue text-white'
                            )}
                            style={{
                                height: !minimal
                                    ? `${(item.value / maxValue) * 100}%`
                                    : '10px'
                            }}
                            key={`${index}-label`}
                        >
                            <span
                                className={cn(expanded ? 'inline' : 'hidden')}
                            >
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                <div
                    className={cn(
                        'flex flex-row gap-[8px]',
                        !minimal ? 'pl-[40px]' : ''
                    )}
                >
                    {data.map((item, index) => (
                        <div
                            className={cn(
                                'mt-[8px] w-full text-center text-[14px] text-white-70'
                            )}
                            key={`${index}-sublabel`}
                        >
                            <span
                                className={cn(
                                    minimal &&
                                        'rotate-180 truncate [writing-mode:vertical-rl]'
                                )}
                            >
                                {expanded || minimal
                                    ? item.label
                                    : item.subLabel}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chart;
