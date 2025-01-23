import type { SVGProps } from 'react';

interface LogoutProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Logout = ({ color = '#FFF', ...props }: LogoutProps) => (
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
            <path d="M3 12h11M11 9l3 3-3 3" />
            <path d="M6 9.137V7.4a2 2 0 0 1 1.608-1.96l11-2.406A2.146 2.146 0 0 1 21 5.2V19a2 2 0 0 1-2.339 1.972l-11-1.892A2 2 0 0 1 6 17.108v-2.137" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Logout;
