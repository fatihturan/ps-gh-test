import { Check } from '@/icons';
import { Root, Indicator, Item } from '@radix-ui/react-radio-group';

interface CustomRadioProps {
    label?: string;
    name?: string;
    id?: string;
    value?: string;
}

function CustomRadio({ label, name, id, value }: CustomRadioProps) {
    return (
        <Root name={name || ''}>
            <div className="flex items-center gap-[8px]">
                <Item
                    className="size-[24px] appearance-none rounded-[100px] border-[1px] border-white-20 bg-dark-blue-95 outline-none"
                    id={id}
                    defaultChecked={false}
                    value={value || ''}
                >
                    <Indicator className="ml-[-1px] mt-[-1px] flex size-[24px] items-center justify-center rounded-[100px] bg-dark-blue-95 bg-gradient">
                        <Check className="size-[16px]" />
                    </Indicator>
                </Item>

                <label
                    htmlFor={id}
                    className="text-[12px] font-semibold text-white bg-red"
                >
                    {label}
                </label>
            </div>
        </Root>
    );
}

export default CustomRadio;
