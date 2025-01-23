import { SVGProps } from 'react';

interface CheckProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Check = ({ color = '#FFF', ...props }: CheckProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                stroke="#10111E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.334 4.333 6 11.667 2.667 8.333"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Check;
