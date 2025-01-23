import type { SVGProps } from 'react';

interface ArrowDownProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const ArrowDown = ({ color = '#FFF', ...props }: ArrowDownProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
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
            <path d="M8.007 3.007v9.986M4.016 9.005 8 12.989l3.985-3.984" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default ArrowDown;
