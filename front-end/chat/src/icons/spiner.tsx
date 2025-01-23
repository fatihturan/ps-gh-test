import { SVGProps } from 'react';

interface SpinerProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Spiner = ({ color = '#FFF', ...props }: SpinerProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
        <radialGradient
            id="gradient"
            cx={0.8}
            cy={0.313}
            fx={0.8}
            fy={0.313}
            gradientTransform="scale(1.5)"
        >
            <stop offset={0} stopColor={color} />
            <stop offset={0.3} stopColor={color} stopOpacity={1} />
            <stop offset={0.6} stopColor={color} stopOpacity={0.6} />
            <stop offset={0.8} stopColor={color} stopOpacity={0.2} />
            <stop offset={1} stopColor={color} stopOpacity={0} />
        </radialGradient>
        <circle
            cx={100}
            cy={100}
            r={70}
            fill="none"
            stroke="url(#gradient)"
            strokeDasharray="200 1000"
            strokeLinecap="round"
            strokeWidth={30}
            transform-origin="center"
        ></circle>
        <circle
            cx={100}
            cy={100}
            r={70}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={30}
            opacity={0.5}
            transform-origin="center"
        />
    </svg>
);
export default Spiner;
