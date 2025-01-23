import { Arrow1, RightArrow } from '@/icons';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface SuggestionsProps {
    className?: string;
    suggestions: string[];
    onSelect: (suggestion: string) => void;
}

function Suggestions({className, suggestions, onSelect }: SuggestionsProps) {
    const [open, setOpen] = useState(false);

    return suggestions.length > 0 && (
        <div className={cn('mb-[16px] select-none', className)}>
            <div
                onClick={() => setOpen(!open)}
                className="flex cursor-pointer items-center gap-[6px] font-semibold text-white"
            >
                Suggested Questions{' '}
                <Arrow1
                    className={cn('w-[24px]', open ? 'rotate-0' : 'rotate-180')}
                />
            </div>
            {open && (
                <ul className="order-1 mb-auto mt-[24px] grid grid-cols-1 items-center gap-[8px] lg:order-2 lg:grid-cols-3">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="flex cursor-pointer select-none justify-between gap-[8px] rounded-[20px] bg-white-10 px-[16px] py-[8px] text-[14px] text-white"
                            onClick={() => onSelect(suggestion)}
                        >
                            {suggestion}
                            <RightArrow className="w-[24px]" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Suggestions;
