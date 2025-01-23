import type { Meta, StoryObj } from '@storybook/react';
import CompactTextfield, { CompactTextfieldProps } from './index';
import { useState } from 'react';

const meta: Meta<typeof CompactTextfield> = {
    title: 'Components/Phase II/Compact Textfield',
    component: CompactTextfield
};

export default meta;

type Story = StoryObj<typeof CompactTextfield>;

// Create a wrapper component to use hooks
const StoryWrapper = (args: CompactTextfieldProps) => {
    const [value, setValue] = useState(args.value);
    return (
        <div className="flex w-full flex-col gap-[16px]">
            <CompactTextfield
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export const Default: Story = {
    render: (args) => <StoryWrapper {...args} />,
    args: {
        label: 'From',
        value: '-220'
    }
};
