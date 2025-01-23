import { SVGProps } from 'react';

interface SheetsProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Sheets = ({ color = '#FFF', ...props }: SheetsProps) => (
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
            <path d="M20.625 5.149c0-.98-.794-1.774-1.774-1.774H5.149c-.98 0-1.774.794-1.774 1.774v13.702c0 .98.794 1.774 1.774 1.774h13.702c.98 0 1.774-.794 1.774-1.774V5.149ZM16.89 12h-5.26" />
            <path d="M7.677 11.823a.25.25 0 1 1-.354.354.25.25 0 0 1 .354-.354ZM16.89 7.5h-5.26M7.677 7.326a.25.25 0 1 1-.354.354.25.25 0 0 1 .354-.354ZM16.98 16.5h-5.26M7.765 16.327a.25.25 0 1 1-.354.354.25.25 0 0 1 .354-.354Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill={color} d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default Sheets;
