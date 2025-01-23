import { Info } from '@/icons';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';

interface MetricCardProps {
    title: string;
    persentage: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, persentage }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleCardClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div
            className={cn('rounded-[8px] border-[1px] border-white-10')}
            onClick={handleCardClick}
        >
            <div
                className={cn(
                    'relative flex w-full cursor-pointer flex-col items-start rounded-[8px] bg-dark-blue p-[8px] before:absolute before:left-0 before:top-0 before:block before:size-[100%] before:rounded-[8px] before:bg-white-5 hover:bg-dark-blue hover:before:block',
                    isClicked && '!before:hidden bg-white-5 hover:bg-white-5'
                )}
            >
                <div className="flex items-center gap-[8px]">
                    <span className="select-none text-center text-[14px] text-white-70">
                        {title}
                    </span>
                    <div className="cursor-pointer">
                        <Info
                            className="size-[16px]"
                            color="rgba(255,255,255,0.7)"
                        />
                    </div>
                </div>
                <p className="mb-[8px] mt-[5px] select-none text-center text-[16px] text-white">
                    {persentage}%
                </p>
                <div className="h-[4px] w-full rounded-full bg-white-10">
                    <div
                        className="h-[4px] rounded-full bg-green"
                        style={{ width: `${persentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
