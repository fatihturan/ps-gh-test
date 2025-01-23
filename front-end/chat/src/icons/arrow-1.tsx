import type { SVGProps } from 'react';

interface Arrow1Props extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Arrow1 = ({ color = '#FFF', ...props }: Arrow1Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g fill="none">
            <path d="M0 0h24v24H0Z" />
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m16 14-4-4-4 4"
            />
        </g>
    </svg>
);
export default Arrow1;
