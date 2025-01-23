import { SVGProps } from 'react';

interface CollapseProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const Collapse = ({ color = '#FFF', ...props }: CollapseProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        {...props}
    >
        <path
            fill={color}
            d="M15.833 7.5h-2.15l2.742-2.742a.837.837 0 0 0-1.184-1.183L12.5 6.308V4.167a.833.833 0 1 0-1.667 0v4.166a.834.834 0 0 0 .833.834h4.167a.833.833 0 0 0 0-1.667Zm-7.5 3.334H4.166a.833.833 0 0 0 0 1.666h2.142l-2.733 2.742a.834.834 0 0 0 .27 1.366.833.833 0 0 0 .913-.183L7.5 13.683v2.15a.833.833 0 1 0 1.666 0v-4.166a.833.833 0 0 0-.833-.833Z"
        />
    </svg>
);
export default Collapse;
