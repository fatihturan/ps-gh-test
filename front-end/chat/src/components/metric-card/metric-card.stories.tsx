import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './index';

const meta: Meta<typeof MetricCard> = {
    title: 'Components/Phase II/MetricCard',
    component: MetricCard
};

export default meta;

type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
    args: {
        title: 'Implied Prob',
        persentage: 48
    }
};
