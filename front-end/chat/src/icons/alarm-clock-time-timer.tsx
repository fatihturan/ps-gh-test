import type { SVGProps } from 'react';

interface AlarmClockTimeTimerProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const AlarmClockTimeTimer = ({
    color = '#FFF',
    ...props
}: AlarmClockTimeTimerProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g fill={color}>
            <path d="M8.532 2.89c4.91-1.873 10.45.493 12.474 5.38 2.06 4.973-.302 10.675-5.276 12.736-4.973 2.06-10.675-.302-12.736-5.276-2.023-4.887.22-10.476 5.017-12.624l.259-.112zM19.62 8.844a8.248 8.248 0 1 0-15.24 6.312 8.248 8.248 0 0 0 15.24-6.312" />
            <path d="M11.718 7.235a.75.75 0 0 1 .743.648l.007.102v4.229l3.296 2.01a.75.75 0 0 1 .297.941l-.047.09a.75.75 0 0 1-.94.297l-.09-.047-3.656-2.229a.75.75 0 0 1-.352-.53l-.008-.11V7.985a.75.75 0 0 1 .75-.75" />
        </g>
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);
export default AlarmClockTimeTimer;
