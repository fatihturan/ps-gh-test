import type { Meta, StoryObj } from '@storybook/react';

import CustomTextfield from '.';
import { useState } from 'react';

const meta: Meta<typeof CustomTextfield> = {
    title: 'Components/Phase II/CustomTextfield',
    component: CustomTextfield
};

export default meta;
type Story = StoryObj<typeof CustomTextfield>;

export const CustomTextfieldStory: Story = {
    render: function CustomTextfieldStory(args) {
        const [value, setValue] = useState('');
        return (
            <CustomTextfield
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        );
    }
};
