import { SVGProps } from 'react';

interface InfoProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Info = ({ color = '#FFF', ...props }: InfoProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <g
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.7}
            strokeWidth={1.5}
            clipPath="url(#a)"
        >
            <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM7.334 10.334h1.54" />
            <path d="M8.107 10.333V7.5H7.34M8.066 5.498a.167.167 0 1 1-.167-.166M7.9 5.332a.167.167 0 0 1 .167.166" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Info;
