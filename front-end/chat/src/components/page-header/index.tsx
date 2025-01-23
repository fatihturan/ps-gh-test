interface PageHeaderProps {
    title?: string;
    description?: string;
    action?: React.ReactNode;
}

function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="relative flex flex-col justify-between gap-[16px] pb-[24px] lg:flex-row lg:items-end lg:border-b-[1px] lg:border-b-white-10">
            <div className="flex flex-col gap-[16px]">
                <h1 className="bg-gradient-to-r from-[#4CFFD4] to-[#4076FF] bg-clip-text text-[32px] font-bold leading-[40px] text-transparent lg:text-[40px] lg:leading-[50px]">
                    {title}
                </h1>
                <p className="text-[16px] leading-[20px] text-white">
                    {description}
                </p>
            </div>
            <div className="flex min-w-[300px] items-center gap-[8px]">
                {action}
            </div>
        </div>
    );
}

export default PageHeader;
