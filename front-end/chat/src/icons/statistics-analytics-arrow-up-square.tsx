import type { SVGProps } from 'react';

interface StatisticsAnalyticsArrowUpSquareProps
    extends SVGProps<SVGSVGElement> {
    color?: string;
}

const StatisticsAnalyticsArrowUpSquare = ({
    color = '#FFF',
    ...props
}: StatisticsAnalyticsArrowUpSquareProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            clipPath="url(#a)"
        >
            <path d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3Z" />
            <path d="M13.688 9.75H16.5v2.812" />
            <path d="m16.5 9.75-3.938 3.938-2.25-2.25L7.5 14.25" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default StatisticsAnalyticsArrowUpSquare;
