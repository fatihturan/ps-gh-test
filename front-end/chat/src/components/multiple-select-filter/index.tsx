import { useEffect, useMemo, useState } from 'react';
import Button from '../button';
import CheckboxGroup from '../checkbox-group';
import CustomDropdown from '../custom-dropdown';
import CustomTextfield from '../custom-textfield';

interface MultipleSelectFilterProps {
    title: string;
    options: {
        label: string;
        value: string;
    }[];
    appliedOptions: string[];
    onApply: (selectedOptions: string[]) => void;
}

export function MultipleSelectFilter({
    title,
    options,
    appliedOptions = [],
    onApply
}: MultipleSelectFilterProps) {
    const [selectedOptions, setSelectedOptions] =
        useState<string[]>(appliedOptions);
    const [search, setSearch] = useState('');
    const filteredOptions = options.filter(
        (option) =>
            option.label.toLowerCase().includes(search.toLowerCase()) ||
            !search.toLowerCase()
    );
    const selectedOptionsWithoutAll = selectedOptions.filter(
        (option) => option !== 'select-all'
    );

    // Handle checkbox group changes
    const handleSelectionChange = (newSelection: string[]) => {
        const hasSelectAll = newSelection.includes('select-all');
        const prevHadSelectAll = selectedOptions.includes('select-all');

        if (hasSelectAll && !prevHadSelectAll) {
            // If "select all" was just checked, select all options
            setSelectedOptions([
                ...options.map((option) => option.value),
                'select-all'
            ]);
        } else if (!hasSelectAll && prevHadSelectAll) {
            // If "select all" was just unchecked, clear all selections
            setSelectedOptions([]);
        } else {
            // Handle individual item selection/deselection
            const updatedSelection = newSelection.filter(
                (item) => item !== 'select-all'
            );

            // Check if all options are selected after the change
            const allOptionsSelected = options.every((opt) =>
                updatedSelection.includes(opt.value)
            );

            setSelectedOptions(
                allOptionsSelected
                    ? [...updatedSelection, 'select-all']
                    : updatedSelection
            );
        }
    };

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

    useEffect(() => {
        setSelectedOptions([]);
    }, [search]);

    const Footer = useMemo(() => {
        return (
            <div className="-mx-[6px] flex justify-between gap-[8px] border-t border-t-white-10 px-[6px] pt-[7px]">
                <Button
                    variant="secondary"
                    className="w-full text-[16px]"
                    onClick={() => {
                        setSelectedOptions([]);
                        onApply([]);
                    }}
                >
                    Reset
                </Button>
                <Button
                    variant="tertiary"
                    className="w-full flex-grow text-[16px]"
                    onClick={() => onApply(selectedOptions)}
                >
                    Apply
                </Button>
            </div>
        );
    }, [selectedOptions, onApply]);

    return (
        <CustomDropdown
            title={`${title} ${selectedOptionsWithoutAll.length > 0 ? `(${selectedOptionsWithoutAll.length})` : ''}`}
            headerComponent={Header}
            footerComponent={selectedOptionsWithoutAll.length > 0 && Footer}
        >
            <CheckboxGroup
                id="multiple-select-filter"
                value={selectedOptions}
                onChange={handleSelectionChange}
                options={[
                    {
                        label: 'All',
                        value: 'select-all'
                    },
                    ...filteredOptions
                ]}
            />
        </CustomDropdown>
    );
}

export default MultipleSelectFilter;
