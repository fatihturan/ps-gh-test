import { SVGProps } from 'react';

interface StatsProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Stats = ({ color = '#FFF', ...props }: StatsProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
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
            <path d="M8 13v4M12 7v10M16 10v7M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Stats;
