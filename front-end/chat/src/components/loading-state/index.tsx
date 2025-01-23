import React from 'react';
import Loader from './loader';
interface LoadingStateProps {
    title?: string;
    text?: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const LoadingState: React.FC<LoadingStateProps> = ({ title, text, Icon }) => {
    return (
        <div className="flex max-w-[380px] flex-col items-center">
            {Icon ? (
                <Icon className="animate-reverse-spin" />
            ) : (
                <Loader
                    className="animate-reverse-spin"
                    width={80}
                    height={80}
                />
            )}
            {title && (
                <span className="mt-[24px] text-center text-[20px] text-white sm:text-[24px]">
                    {title}
                </span>
            )}
            {text && (
                <p className="mt-[16px] text-center text-[16px] text-white-70">
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingState;
