import { useMemo, useState } from 'react';
import Button from '../button';
import RadioGroup from '../radio-group';
import CustomDropdown from '../custom-dropdown';
import CustomTextfield from '../custom-textfield';

interface SingleSelectFilterProps {
    title: string;
    name: string;
    options: {
        label: string | React.ReactNode;
        value: string;
    }[];
    selectedOption?: string | null;
    onApply: (selectedOption: string | null) => void;
    className?: string;
}

export function SingleSelectFilter({
    title,
    name,
    options,
    selectedOption: initialSelectedOption,
    onApply,
    className
}: SingleSelectFilterProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(
        initialSelectedOption || null
    );
    const [search, setSearch] = useState('');

    const filteredOptions = options.filter((option) => {
        const label =
            typeof option.label === 'string'
                ? option.label
                : 'complex-component';
        return (
            label.toLowerCase().includes(search.toLowerCase()) ||
            !search.toLowerCase()
        );
    });

    const Header = useMemo(() => {
        return (
            <div className="mb-[6px] mt-[8px] px-[8px]">
                <CustomTextfield
                    search
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        );
    }, [search]);

    const Footer = useMemo(() => {
        return (
            <div className="-mx-[6px] mt-[10px] flex justify-between gap-[8px] border-t border-t-white-10 px-[6px] pt-[7px]">
                <Button
                    variant="secondary"
                    className="w-full text-[16px]"
                    onClick={() => {
                        setSelectedOption(null);
                        onApply(null);
                    }}
                >
                    Reset
                </Button>
                <Button
                    variant="tertiary"
                    className="w-full flex-grow text-[16px]"
                    onClick={() => onApply(selectedOption)}
                >
                    Apply
                </Button>
            </div>
        );
    }, [selectedOption, onApply, setSelectedOption]);

    return (
        <CustomDropdown
            className={className}
            title={`${title} ${initialSelectedOption ? '(1)' : ''}`}
            headerComponent={Header}
            footerComponent={selectedOption && Footer}
        >
            <RadioGroup
                name={name}
                value={selectedOption}
                onChange={setSelectedOption}
                options={filteredOptions}
            />
        </CustomDropdown>
    );
}

export default SingleSelectFilter;
