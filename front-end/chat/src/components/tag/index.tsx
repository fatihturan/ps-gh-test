import React from 'react';

interface TagProps {
    text: string;
    theme?: 'default' | 'green';
    filled?: boolean;
}

const Tag: React.FC<TagProps> = ({
    text,
    theme = 'default',
    filled = true
}) => {
    const colorClasses =
        theme === 'green'
            ? filled
                ? 'bg-[rgba(76,255,212,0.1)] text-green'
                : 'bg-[rgba(76,255,212,0.1)] border border-green text-green'
            : filled
              ? 'bg-[rgba(64,118,255,0.1)] text-blue'
              : 'bg-[rgba(64,118,255,0.1)] border border-blue text-blue';

    const borderRadius = filled ? 'rounded-none' : 'rounded-full';
    const textSize = filled ? 'text-[10px]' : 'text-[12px]';
    const width = filled ? 'w-[36px]' : 'w-[74px]';
    const height = filled ? 'h-full' : 'h-[30px]';

    return (
        <span
            className={`flex items-center justify-center p-[8px_16px] ${textSize} ${colorClasses} ${borderRadius} ${width} ${height}`}
        >
            {text}
        </span>
    );
};

export default Tag;
