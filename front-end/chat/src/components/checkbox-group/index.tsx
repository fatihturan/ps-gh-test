import { ReactNode } from 'react';
import { Root, Indicator } from '@radix-ui/react-checkbox';
import { Check } from '@/icons';
import { cn } from '@/utils/cn';

interface CheckboxGroupProps {
    id: string;
    value: string[];
    options: {
        value: string;
        label: ReactNode;
    }[];
    onChange: (value: string[]) => void;
}

export function CheckboxGroup({
    id,
    value: selectedValues,
    options,
    onChange
}: CheckboxGroupProps) {
    return (
        <div className="flex flex-col gap-[2px]">
            {options.map(({ value, label }, index) => (
                <div
                    key={value}
                    className={cn(
                        'relative flex items-center gap-[8px] rounded-[8px] px-[8px] py-[10px]',
                        selectedValues.includes(value) && 'bg-white-5'
                    )}
                >
                    <Root
                        className="size-[24px] appearance-none rounded-[4px] border-[1px] border-white-20 outline-none before:absolute before:left-0 before:top-0 before:size-[100%]"
                        id={`${id}-${index}`}
                        defaultChecked={false}
                        value={value}
                        checked={selectedValues.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                onChange([...selectedValues, value]);
                            } else {
                                onChange(
                                    selectedValues.filter((v) => v !== value)
                                );
                            }
                        }}
                    >
                        <Indicator className="ml-[-1px] mt-[-1px] flex size-[24px] items-center justify-center rounded-[4px] bg-gradient">
                            <Check className="size-[16px]" />
                        </Indicator>
                    </Root>

                    <label
                        htmlFor={`${id}-${index}`}
                        className="cursor-pointer text-[12px] font-semibold text-white"
                    >
                        {label}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default CheckboxGroup;
