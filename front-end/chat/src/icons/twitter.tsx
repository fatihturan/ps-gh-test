import type { SVGProps } from 'react';
const Twitter = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={512}
        height={512}
        fill="none"
        {...props}
    >
        <g clipPath="url(#twitter_svg__a)">
            <rect width={512} height={512} fill="#000" rx={60} />
            <path
                fill="#fff"
                d="M355.904 100h52.928L293.2 232.16 429.232 412H322.72l-83.424-109.072L143.84 412H90.88l123.68-141.36L84.065 100H193.28l75.408 99.696zm-18.576 280.32h29.328L177.344 130.016h-31.472z"
            />
        </g>
        <defs>
            <clipPath id="twitter_svg__a">
                <path fill="#fff" d="M0 0h512v512H0z" />
            </clipPath>
        </defs>
    </svg>
);

export default Twitter;
