import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
        <radialGradient
            id="loader-gradient"
            cx={0.66}
            cy={0.4}
            fx={0.66}
            fy={0.4}
            gradientTransform="scale(1.5)"
        >
            <stop offset={0} stopColor="rgba(76, 255, 212, 1)" />
            <stop
                offset={0.3}
                stopColor="rgba(76, 255, 212, 1)"
                stopOpacity={1}
            />
            <stop
                offset={1}
                stopColor="rgba(64, 118, 255, 1)"
                stopOpacity={0}
            />
        </radialGradient>
        <circle
            cx={100}
            cy={100}
            r={70}
            fill="none"
            stroke="url(#loader-gradient)"
            strokeDasharray="100 1000"
            strokeLinecap="round"
            strokeWidth={30}
            transform-origin="center"
        />
        <circle
            cx={100}
            cy={100}
            r={70}
            fill="none"
            stroke="rgba(64, 118, 255, 0.1)"
            strokeLinecap="round"
            strokeWidth={30}
            transform-origin="center"
        />
    </svg>
);
export default SvgComponent;
