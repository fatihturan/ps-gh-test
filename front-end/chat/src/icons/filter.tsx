import { SVGProps } from 'react';

interface FilterProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Filter = ({ color = '#FFF', ...props }: FilterProps) => (
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
            <path d="M18 5h3M3 5h11M10 12h11M3 12h3M18 19h3M3 19h11M17.414 3.586a2 2 0 1 1-2.828 2.828 2 2 0 0 1 2.828-2.828ZM9.414 10.586a2 2 0 1 1-2.828 2.828 2 2 0 0 1 2.828-2.828ZM17.414 17.586a2 2 0 1 1-2.828 2.828 2 2 0 0 1 2.828-2.828Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Filter;
