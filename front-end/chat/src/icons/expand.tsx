const Expand = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M16 1a1 1 0 0 0-1-1h-5a1 1 0 0 0 0 2h2.57L9.29 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L14 3.42V6a1 1 0 0 0 2 0V1ZM6.71 9.29a1 1 0 0 0-1.42 0L2 12.57V10a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H3.42l3.29-3.29a1 1 0 0 0 0-1.42Z"
        />
    </svg>
);
export default Expand;
