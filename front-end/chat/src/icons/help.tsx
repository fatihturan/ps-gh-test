import type { SVGProps } from 'react';

interface HelpProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Help = ({ color = '#FFF', ...props }: HelpProps) => (
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
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
            <path d="M9.686 9.686A2.18 2.18 0 0 1 11.9 8a2.136 2.136 0 0 1 2.25 2c0 1.504-2.15 2-2.15 3M12.125 15.75a.124.124 0 0 1-.077.116.126.126 0 0 1-.17-.092.126.126 0 0 1 .122-.149" />
            <path d="M12 15.625a.125.125 0 0 1 .125.125" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Help;
