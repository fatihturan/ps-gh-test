import { SVGProps } from 'react';

interface PredictWinnersProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const PredictWinners = ({ color = '#FFF', ...props }: PredictWinnersProps) => (
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
            <path d="M16.243 10.757a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486Z" />
            <path d="m11 14 1-1v4M11 17h2M16.53 11.073l3.758-6.577A1 1 0 0 0 19.42 3h-3.411a.999.999 0 0 0-.868.504L12 9M7.47 11.073 3.712 4.496A1 1 0 0 1 4.58 3h3.411c.36 0 .69.192.868.504L12 9" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default PredictWinners;
