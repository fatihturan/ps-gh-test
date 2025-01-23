import type { SVGProps } from 'react';

interface CheckmarkCircleProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const CheckmarkCircle = ({
    color = '#FFF',
    ...props
}: CheckmarkCircleProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18" />
            <path d="m8.44 12.339 2.167 2.167-.02-.02 4.88-4.89" />
        </g>
        <path fill="none" d="M0 0h24v24H0Z" />
    </svg>
);
export default CheckmarkCircle;
