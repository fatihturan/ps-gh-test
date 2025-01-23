import { Meta, StoryObj } from '@storybook/react';
import RangeFilter from '.';

const meta: Meta<typeof RangeFilter> = {
    title: 'Components/Phase II/RangeFilter',
    component: RangeFilter
};

export default meta;

type Story = StoryObj<typeof RangeFilter>;

export const RangeFilterStory: Story = {
    args: {
        title: 'Moneyline',
        appliedOptions: ['']
    }
};
