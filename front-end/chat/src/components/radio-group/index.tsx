import { ReactNode } from 'react';
import { Item, Root, Indicator } from '@radix-ui/react-radio-group';
import { Check } from '@/icons';
import { cn } from '@/utils/cn';

interface RadioGroupProps {
    name: string;
    value: string | null;
    options: {
        value: string;
        label: ReactNode;
    }[];
    onChange: (value: string) => void;
}

export function RadioGroup({
    name,
    value: selectedValue,
    options,
    onChange
}: RadioGroupProps) {
    return (
        <Root
            name={name}
            id={name}
            className="flex flex-col"
            value={selectedValue || ''}
            onValueChange={onChange}
        >
            {options.map(({ value, label }, index) => (
                <div
                    key={value}
                    className={cn(
                        'relative flex items-center gap-[8px] rounded-[8px] px-[8px] py-[10px]',
                        value === selectedValue && 'bg-white-5'
                    )}
                >
                    <Item
                        className="size-[24px] appearance-none rounded-[100px] border-[1px] border-white-20 outline-none before:absolute before:left-0 before:top-0 before:size-[100%]"
                        id={`${name}-${index}`}
                        value={value}
                    >
                        <Indicator className="ml-[-1px] mt-[-1px] flex size-[24px] items-center justify-center rounded-[100px] bg-gradient">
                            <Check className="size-[16px]" />
                        </Indicator>
                    </Item>

                    <label
                        htmlFor={`${name}-${index}`}
                        className="cursor-pointer text-[12px] font-semibold text-white"
                    >
                        {label}
                    </label>
                </div>
            ))}
        </Root>
    );
}

export default RadioGroup;
