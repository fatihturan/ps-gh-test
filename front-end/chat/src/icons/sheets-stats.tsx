import { SVGProps } from 'react';

interface SheetsStatsProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const SheetsStats = ({ color = '#FFF', ...props }: SheetsStatsProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={20}
        viewBox="0 0 21 20"
        fill="none"
        {...props}
    >
        <g
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            clipPath="url(#a)"
        >
            <path d="M17.167 17.5c.92 0 1.666-.746 1.666-1.667V4.167a1.666 1.666 0 1 0-3.333 0v11.666c0 .921.746 1.667 1.667 1.667ZM10.5 17.5c.921 0 1.667-.746 1.667-1.666v-6.93a1.666 1.666 0 1 0-3.333 0v6.93c0 .92.745 1.666 1.666 1.666ZM3.833 17.5c.921 0 1.667-.746 1.667-1.667V13.64a1.666 1.666 0 1 0-3.333 0v2.193c0 .921.745 1.667 1.666 1.667Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M.5 0h20v20H.5z" />
            </clipPath>
        </defs>
    </svg>
);
export default SheetsStats;
