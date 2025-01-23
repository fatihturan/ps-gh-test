import { Check } from '@/icons';
import { Root, Indicator } from '@radix-ui/react-checkbox';

interface CustomCheckboxProps {
    name: string;
    value: string;
}

function CustomCheckbox({ name, value }: CustomCheckboxProps) {
    return (
        <Root
            name={name}
            className="size-[24px] appearance-none rounded-[4px] border-[1px] border-[rgba(255,255,255,0.2)] bg-[#1b1d29] outline-none"
            value={value}
        >
            <Indicator className="ml-[-1px] mt-[-1px] flex size-[24px] items-center justify-center rounded-[4px] bg-[#1b1d29] bg-gradient">
                <Check className="size-[16px]" color="" />
            </Indicator>
        </Root>
    );
}

export default CustomCheckbox;
