import type { SVGProps } from 'react';

interface StatisticsAnalyticsArrowUpCircleProps
    extends SVGProps<SVGSVGElement> {
    color?: string;
}

const StatisticsAnalyticsArrowUpCircle = ({
    color = '#FFF',
    ...props
}: StatisticsAnalyticsArrowUpCircleProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <circle cx={12} cy={12} r={9} />
            <path d="m16.5 9.75-3.938 3.938-2.25-2.25L7.5 14.25" />
            <path d="M13.688 9.75H16.5v2.812" />
        </g>
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);
export default StatisticsAnalyticsArrowUpCircle;
