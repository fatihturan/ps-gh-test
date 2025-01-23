import { cn } from '@/utils/cn';
import React from 'react';

export interface CompactTextfieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
}

const CompactTextfield: React.FC<CompactTextfieldProps> = ({
    label,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                'relative flex h-[32px] w-full max-w-[max-content] items-center gap-[8px] rounded-[8px] border-[1px] border-white-20',
                'box-border !p-[4px_8px]',
                'focus-within:border-0 focus-within:!p-[4px_9px] focus-within:gradient-border',
                className
            )}
        >
            <span className="z-[3] text-center text-[13px] text-white-70">
                {label}:
            </span>
            <input
                className="z-[3] h-full w-full bg-transparent text-[14px] text-white outline-none"
                type="text"
                {...props}
            />
        </div>
    );
};

export default CompactTextfield;
