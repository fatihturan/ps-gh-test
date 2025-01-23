import type { SVGProps } from 'react';

interface ArrowForwardProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const ArrowForward = ({ color = '#FFF', ...props }: ArrowForwardProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="m13.5 16 4-4-4-4M6.5 17l5-5-5-5" />
        </g>
        <path fill="none" d="M0 0h24v24H0Z" />
    </svg>
);
export default ArrowForward;
