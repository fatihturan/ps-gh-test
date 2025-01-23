import { SVGProps } from 'react';

interface ChatProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Chat = ({ color = '#FFF', ...props }: ChatProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <g
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            clipPath="url(#a)"
        >
            <path d="M12 4c-4.97 0-9 3.359-9 7.497a7.127 7.127 0 0 0 3.63 5.998 6.45 6.45 0 0 1-.893 1.642.87.87 0 0 0 .96 1.326 10.72 10.72 0 0 0 3.343-1.649 10.52 10.52 0 0 0 1.96.18c4.97 0 9-3.358 9-7.497C21 7.36 16.97 4 12 4Z" />
            <path d="M12.088 11.662a.125.125 0 1 1-.176.176.125.125 0 0 1 .176-.176ZM16.088 11.662a.125.125 0 1 1-.176.176.125.125 0 0 1 .176-.176ZM8.088 11.662a.125.125 0 1 1-.177.177.125.125 0 0 1 .177-.177Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Chat;
