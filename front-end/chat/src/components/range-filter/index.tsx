import { useMemo, useState } from 'react';
import Button from '../button';
import CustomDropdown from '../custom-dropdown';
import CompactTextfield from '../compact-textfield';
import RangeSlider from '../range-slider';

interface RangeFilterProps {
    title: string;
    appliedOptions: string[];
    onApply: (selectedOptions: string[]) => void;
}

export function RangeFilter({
    title,
    appliedOptions = [],
    onApply
}: RangeFilterProps) {
    const [selectedOptions, setSelectedOptions] =
        useState<string[]>(appliedOptions);

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

    const [sliderValues, setSliderValues] = useState([0, 100]);
    const handleSliderChange = (newValues: number[]) => {
        setSliderValues(newValues);
    };

    return (
        <CustomDropdown
            title={`${title} ${selectedOptions.length > 0 ? `(${selectedOptions.length})` : ''}`}
            footerComponent={selectedOptions.length > 0 && Footer}
        >
            <div className="mb-[21px] mt-[8px] flex gap-[8px] p-[0px_8px]">
                <CompactTextfield
                    className="max-w-[50%]"
                    type="number"
                    value={sliderValues[0]}
                    onChange={(e) =>
                        setSliderValues([+e.target.value, sliderValues[1]])
                    }
                    label="From"
                    placeholder=""
                />
                <CompactTextfield
                    className="max-w-[50%]"
                    type="number"
                    label="To"
                    placeholder=""
                    value={sliderValues[1]}
                    onChange={(e) =>
                        setSliderValues([sliderValues[0], +e.target.value])
                    }
                />
            </div>
            <div className="mb-[41px] p-[0px_8px]">
                <RangeSlider
                    values={sliderValues}
                    defaultValue={sliderValues}
                    onChange={handleSliderChange}
                />
            </div>
        </CustomDropdown>
    );
}

export default RangeFilter;
