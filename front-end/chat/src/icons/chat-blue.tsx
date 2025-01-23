import { SVGProps } from 'react';

interface ChatBlueProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const ChatBlue = ({ color = '#10111E', ...props }: ChatBlueProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <g>
            <path
                fill="url(#b)"
                d="M12.167 4c-4.97 0-9 3.359-9 7.497a7.127 7.127 0 0 0 3.63 5.998 6.45 6.45 0 0 1-.893 1.642.87.87 0 0 0 .96 1.326 10.719 10.719 0 0 0 3.343-1.649 10.52 10.52 0 0 0 1.96.18c4.97 0 9-3.358 9-7.497 0-4.138-4.03-7.497-9-7.497Z"
            />
            <path
                fill={color}
                d="M9.322 11.22a.75.75 0 1 1-1.06 1.06.75.75 0 0 1 1.06-1.06ZM12.647 11.22a.75.75 0 1 1-1.06 1.06.75.75 0 0 1 1.06-1.06ZM15.977 11.22a.75.75 0 1 1-1.061 1.06.75.75 0 0 1 1.061-1.06Z"
            />
        </g>
        <defs>
            <linearGradient
                id="b"
                x1={-0.253}
                x2={27.507}
                y1={16.206}
                y2={16.251}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#4CFFD4" />
                <stop offset={1} stopColor="#4076FF" />
            </linearGradient>
        </defs>
    </svg>
);
export default ChatBlue;
