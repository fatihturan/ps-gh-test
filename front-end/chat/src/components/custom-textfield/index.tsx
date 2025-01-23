import { InputHTMLAttributes, useState } from 'react';
import { Search, DeleteDisabled } from '@/icons';
import { cn } from '@/utils/cn';

interface CustomTextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
    search?: boolean;
    className?: string;
}

function CustomTextfield({
    search,
    className,
    ...props
}: CustomTextfieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    return (
        <div
            className={cn(
                'relative flex h-[32px] w-auto items-center gap-[8px] rounded-[8px] border-[1px] border-white-20 p-[1px] focus-within:border-0 focus-within:gradient-border',
                className
            )}
        >
            {search && <Search className="ml-[8px] size-[24px]" color="#fff" />}
            <input
                type="text"
                value={inputValue}
                {...props}
                className={cn(
                    'absolute left-0 top-0 h-full w-full bg-transparent',
                    search
                        ? 'pl-[36px] focus-within:!pl-[37px]'
                        : 'px-[8px] focus-within:!pl-[9px]',
                    'text-[13px] font-normal text-white placeholder:text-white-70 focus-within:text-white focus:outline-none'
                )}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {search && (
                <DeleteDisabled
                    className={`ml-auto mr-[4px] size-[24px] cursor-pointer opacity-50 ${
                        isFocused ? 'block' : 'hidden'
                    }`}
                    onClick={() => setInputValue('')}
                />
            )}
        </div>
    );
}

export default CustomTextfield;
