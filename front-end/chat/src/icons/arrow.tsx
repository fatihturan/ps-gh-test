import type { SVGProps } from 'react';

interface ArrowProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Arrow = ({ color = '#FFF', ...props }: ArrowProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g fill="none">
            <path d="M0 0h24v24H0Z" />
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m8 10 4 4 4-4"
            />
        </g>
    </svg>
);
export default Arrow;
