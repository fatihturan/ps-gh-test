import { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from './index';
import { useState } from 'react';

const meta: Meta<typeof CheckboxGroup> = {
    title: 'Components/Phase II/Checkbox Group',
    component: CheckboxGroup
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const sharedOptions = [
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' }
];

export const CheckboxGroupStory: Story = {
    render: function Render(args) {
        const [selectedValues, setSelectedValues] = useState(args.value);

        return (
            <div className="flex flex-col">
                <div className="mb-[20px] text-white">
                    {JSON.stringify(selectedValues)}
                </div>
                <CheckboxGroup
                    {...args}
                    value={selectedValues}
                    onChange={(value) => {
                        setSelectedValues(value);
                        args.onChange?.(value);
                    }}
                />
            </div>
        );
    },
    args: {
        id: 'checkbox-group',
        options: sharedOptions,
        value: [sharedOptions[0].value]
    }
};
