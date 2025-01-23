import type { SVGProps } from 'react';

interface MenuBurgeProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const MenuBurge = ({ color = '#FFF', ...props }: MenuBurgeProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
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
            <path d="M7.334 16h17.333M7.334 24h17.333M7.334 8h17.333" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h32v32H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default MenuBurge;
