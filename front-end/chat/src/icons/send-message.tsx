import { SVGProps } from 'react';

interface SendMessageProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const SendMessage = ({ color = '#FFF', ...props }: SendMessageProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        {...props}
    >
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
        >
            <path d="M10.88 12H5.39M5.243 3.63l14.592 7.294h0a1.203 1.203 0 0 1 0 2.152L5.243 20.37h0a1.203 1.203 0 0 1-1.701-1.384L5.392 12l-1.85-6.986h0a1.203 1.203 0 0 1 1.7-1.384Z" />
        </g>
        <path fill="none" d="M0 0h24v24H0Z" />
    </svg>
);

export default SendMessage;
