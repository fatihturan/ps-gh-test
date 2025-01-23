import React from 'react';
import Button from '../button';

interface EmptyStateProps {
    title: string;
    text?: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    buttonText?: string;
    extraButtonText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    text,
    Icon,
    buttonText,
    extraButtonText
}) => {
    return (
        <div className="flex w-full max-w-[380px] flex-col items-center">
            {Icon && <Icon />}
            <span className="mt-[24px] text-center text-[20px] text-white sm:text-[24px]">
                {title}
            </span>
            {text && (
                <p className="mt-[16px] text-center text-[16px] text-white-70">
                    {text}
                </p>
            )}
            <div className="mt-[24px] flex w-full flex-col items-center gap-[8px] p-[10px_16px]">
                {extraButtonText && (
                    <Button variant="tertiary" className="w-full">
                        {extraButtonText}
                    </Button>
                )}
                {buttonText && (
                    <Button variant="primary" className="w-full">
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
