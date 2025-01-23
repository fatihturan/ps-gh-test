import type { SVGProps } from 'react';

interface ShareProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Share = ({ color = '#FFF', ...props }: ShareProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g fill={color}>
            <path d="M8 9.25a.75.75 0 0 1 .102 1.493L8 10.75H6a1.25 1.25 0 0 0-1.244 1.122L4.75 12v7c0 .648.492 1.18 1.122 1.244L6 20.25h12a1.25 1.25 0 0 0 1.244-1.122L19.25 19v-7a1.25 1.25 0 0 0-1.122-1.244L18 10.75h-2a.75.75 0 0 1-.102-1.493L16 9.25h2a2.75 2.75 0 0 1 2.745 2.582l.005.168v7a2.75 2.75 0 0 1-2.582 2.745L18 21.75H6a2.75 2.75 0 0 1-2.745-2.582L3.25 19v-7a2.75 2.75 0 0 1 2.582-2.745L6 9.25z" />
            <path d="M12 2.25a.75.75 0 0 1 .743.648L12.75 3v11a.75.75 0 0 1-1.493.102L11.25 14V3a.75.75 0 0 1 .75-.75" />
            <path d="M11.47 2.47a.75.75 0 0 1 .976-.073l.084.073 3 3a.75.75 0 0 1-.976 1.133l-.084-.073L12 4.061l-2.469 2.47a.75.75 0 0 1-.976.072L8.47 6.53a.75.75 0 0 1-.073-.976l.073-.084z" />
        </g>
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

export default Share;
