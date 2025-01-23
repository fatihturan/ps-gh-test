import type { SVGProps } from 'react';

interface CalendarScheduleTimeProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const CalendarScheduleTime = ({
    color = '#FFF',
    ...props
}: CalendarScheduleTimeProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M7.5 3v3M16.5 3v3M10 21H6l-.01-.001c-1.66-.01-3-1.35-3-3V7.49h0a2.996 2.996 0 0 1 2.99-3.01h12-.01c1.65-.01 3 1.34 3 3v2.5M16.393 14.983v1.75l1.38.843" />
            </g>
            <path
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                d="M16.5 21h-.01a4.5 4.5 0 0 1-4.5-4.5c-.01-.01-.01-.01 0-.01v-.01a4.553 4.553 0 0 1 4.5-4.5c2.48 0 4.49 2.01 4.49 4.5a4.507 4.507 0 0 1-4.51 4.49"
            />
            <path fill="none" d="M0 0h24v24H0Z" />
        </svg>
    );
};
export default CalendarScheduleTime;
