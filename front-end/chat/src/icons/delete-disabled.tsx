import type { SVGProps } from 'react';

interface DeleteDisabledProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const DeleteDisabled = ({ color = '#FFF', ...props }: DeleteDisabledProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g fill="none">
            <path d="M0 0h24v24H0Z" />
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m8 8 8 8M16 8l-8 8"
            />
        </g>
    </svg>
);
export default DeleteDisabled;
