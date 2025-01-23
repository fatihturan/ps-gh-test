import { SVGProps } from 'react';

interface ShortProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Short = ({ color = '#FFF', ...props }: ShortProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={10}
        height={11}
        fill="none"
        {...props}
    >
        <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
            opacity={0.7}
        >
            <path d="m4.166 3.833-1.25-1.25-1.25 1.25M2.916 8.417V2.584M5.832 7.167l1.25 1.25 1.25-1.25M7.082 2.583v5.834" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 .5h10v10H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Short;
