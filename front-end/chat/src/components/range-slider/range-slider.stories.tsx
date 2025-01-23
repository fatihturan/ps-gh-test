import type { Meta, StoryObj } from '@storybook/react';
import RangeSlider from './index';

const meta: Meta<typeof RangeSlider> = {
    title: 'Components/Phase II/RangeSlider',
    component: RangeSlider
};

export default meta;

type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
    args: {
        defaultValue: [20, 70],
        values: [20, 70],
        max: 100,
        step: 1,
        onChange: (value: number[]) => console.log('Slider values:', value)
    }
};
