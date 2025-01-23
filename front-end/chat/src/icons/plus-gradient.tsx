import { SVGProps } from 'react';

interface ChatProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const PlusGradient = ({ ...props }: ChatProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={16}
        fill="none"
        {...props}
    >
        <path
            stroke="url(#plus-gradient)"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M8.5 2.5v11M14 8H3"
        />
        <defs>
            <linearGradient
                id="plus-gradient"
                x1={0.91}
                x2={17.875}
                y1={10.639}
                y2={10.664}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#4CFFD4" />
                <stop offset={1} stopColor="#4076FF" />
            </linearGradient>
        </defs>
    </svg>
);
export default PlusGradient;
