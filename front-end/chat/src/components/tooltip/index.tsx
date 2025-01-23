import React, { useState } from 'react';

interface TooltipProps {
    title: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    averageStats: string;
    overGames: string;
    underGames: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    title,
    Icon,
    averageStats,
    overGames,
    underGames
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleIconClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        isVisible && (
            <div
                className={`relative flex max-w-[269px] flex-col items-start p-[8px] before:absolute before:left-0 before:top-0 before:z-[1] before:h-full before:w-full before:rounded-[4px] before:bg-gradient after:absolute after:left-[1px] after:top-[1px] after:z-[2] after:h-[calc(100%-2px)] after:w-[calc(100%-2px)] after:rounded-[5px] after:bg-dark-blue after:transition-all`}
            >
                <div className="z-[3] flex w-full items-center justify-between">
                    <span className="text-center text-[12px] text-white">
                        {title}
                    </span>
                    <div onClick={handleIconClick}>
                        <Icon className="cursor-pointer" />
                    </div>
                </div>
                <div className="relative z-[3] w-full rounded-[8px] bg-[#232430] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-full after:translate-y-[-50%] after:bg-[#393a45] after:content-['']">
                    {' '}
                    <div className="p-[0px_8px]">
                        <div>
                            <div className="relative flex w-full items-center gap-[8px] p-[8px_0px]">
                                <span className="text-center text-[12px] text-white-50">
                                    Average
                                </span>
                                <span className="text-center text-[12px] text-white">
                                    {averageStats}
                                </span>
                            </div>
                        </div>
                        <div className="flex w-full items-center p-[8px_0px] after:absolute after:bottom-0 after:left-1/2 after:h-1/2 after:w-[1px] after:translate-x-[-50%] after:bg-[#393a45] after:content-['']">
                            <div className="flex w-full items-center gap-[8px]">
                                <span className="text-center text-[12px] text-white-50">
                                    Over
                                </span>
                                <span className="text-center text-[12px] text-white">
                                    {overGames}
                                </span>
                            </div>
                            <div className="flex w-full items-center gap-[8px] pl-[8px]">
                                <span className="text-center text-[12px] text-white-50">
                                    Under
                                </span>
                                <span className="text-center text-[12px] text-white">
                                    {underGames}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Tooltip;
