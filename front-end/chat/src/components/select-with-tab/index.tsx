import { useMemo, useState } from 'react';
import CustomDropdown from '../custom-dropdown';
import CustomTextfield from '../custom-textfield';
import Tabbar from '../tab-bar';
import RadioGroup from '../radio-group';
import ScrollArea from '../scroll-area';

interface SelectWithTabProps {
    title: string;
    contentTitle: string;
    tabs: {
        id: string;
        label: string;
        icon?: React.ReactNode;
        options: {
            label: string;
            value: string;
        }[];
    }[];
    selectedOption: string;
    onApply: (selectedOption: string) => void;
}

export function SelectWithTab({
    title,
    contentTitle,
    tabs,
    selectedOption,
    onApply
}: SelectWithTabProps) {
    const [search, setSearch] = useState('');

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

    return (
        <CustomDropdown
            title={`${title}`}
            contentTitle={contentTitle}
            headerComponent={Header}
            withoutScrollArea
        >
            <Tabbar
                size="small"
                tabs={tabs.map(({ id, label, icon, options }) => ({
                    id: id,
                    label: label,
                    icon: icon,
                    content: (
                        <ScrollArea viewPortClassName="max-h-[200px]">
                            <RadioGroup
                                name={id}
                                value={selectedOption}
                                options={options.filter((option) =>
                                    option.label
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )}
                                onChange={(value) => {
                                    onApply(value);
                                }}
                            />
                        </ScrollArea>
                    )
                }))}
            />
        </CustomDropdown>
    );
}

export default SelectWithTab;
