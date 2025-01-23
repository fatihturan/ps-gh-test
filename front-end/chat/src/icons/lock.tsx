import { SVGProps } from 'react';

export function Lock(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={80}
            height={80}
            fill="none"
            {...props}
        >
            <g
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                clipPath="url(#a)"
            >
                <path
                    stroke="url(#b)"
                    d="M26.666 33.333v-10C26.666 15.97 32.636 10 39.999 10c7.364 0 13.334 5.97 13.334 13.333v10"
                />
                <path
                    fill="url(#c)"
                    stroke="url(#d)"
                    d="M56.666 70H23.333a6.665 6.665 0 0 1-6.667-6.667V40a6.665 6.665 0 0 1 6.667-6.667h33.333A6.665 6.665 0 0 1 63.333 40v23.333A6.665 6.665 0 0 1 56.666 70Z"
                />
                <path stroke="#10111E" d="M40 46.667v10" />
            </g>
            <defs>
                <linearGradient
                    id="b"
                    x1={21.599}
                    x2={62.726}
                    y1={27.264}
                    y2={27.334}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#4CFFD4" />
                    <stop offset={1} stopColor="#4076FF" />
                </linearGradient>
                <linearGradient
                    id="c"
                    x1={7.799}
                    x2={79.77}
                    y1={60.463}
                    y2={60.598}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#4CFFD4" />
                    <stop offset={1} stopColor="#4076FF" />
                </linearGradient>
                <linearGradient
                    id="d"
                    x1={7.799}
                    x2={79.77}
                    y1={60.463}
                    y2={60.598}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#4CFFD4" />
                    <stop offset={1} stopColor="#4076FF" />
                </linearGradient>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h80v80H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}
