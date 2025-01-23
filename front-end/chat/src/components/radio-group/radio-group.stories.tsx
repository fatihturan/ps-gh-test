import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './index';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
    title: 'Components/Phase II/Radio Group',
    component: RadioGroup
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const sharedOptions = [
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' }
];

export const RadioGroupStory: Story = {
    render: function Render(args) {
        const [selectedValue, setSelectedValue] = useState(args.value);

        return (
            <div className="flex flex-col">
                <div className="mb-[20px] text-white">
                    {JSON.stringify(selectedValue)}
                </div>
                <RadioGroup
                    {...args}
                    value={selectedValue}
                    onChange={(value) => {
                        setSelectedValue(value);
                        args.onChange?.(value);
                    }}
                />
            </div>
        );
    },
    args: {
        name: 'radio-group',
        id: 'radio-group',
        options: sharedOptions,
        value: sharedOptions[0].value
    }
};
