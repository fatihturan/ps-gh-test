import type { SVGProps } from 'react';

interface RightArrowProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const RightArrow = ({ color = '#FFF', ...props }: RightArrowProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g fill="none">
            <path d="M0 0h24v24H0Z" />
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.48 11.98h14.99M13.483 5.988 19.52 12l-6.037 6.012"
            />
        </g>
    </svg>
);

export default RightArrow;
