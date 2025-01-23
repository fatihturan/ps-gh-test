import type { Meta, StoryObj } from '@storybook/react';

import CustomDropdown from '.';
import Button from '../button';

const meta: Meta<typeof CustomDropdown> = {
    title: 'Components/Phase II/CustomDropdown',
    component: CustomDropdown
};

export default meta;
type Story = StoryObj<typeof CustomDropdown>;

export const CustomDropdownStory: Story = {
    args: {
        title: 'Select League',
        headerComponent: <div className="text-white-70">Header</div>,
        footerComponent: (
            <div>
                <Button className="w-full">Footer</Button>
            </div>
        )
    }
};
