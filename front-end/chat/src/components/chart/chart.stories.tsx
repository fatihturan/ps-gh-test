import type { Meta, StoryObj } from '@storybook/react';

import Chart from './index';

const meta: Meta<typeof Chart> = {
    title: 'Components/Phase II/Chart',
    component: Chart
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const ChartStory: Story = {
    args: {
        minValue: 0,
        step: 100,
        minimal: true,
        data: [
            { label: '@MIA', subLabel: '11/8', value: 260 },
            { label: '', subLabel: '', value: 100 },
            { label: '@MIA', subLabel: '11/11', value: 150 },
            { label: '', subLabel: '', value: 330 },
            { label: '@MIA', subLabel: '11/8', value: 260 },
            { label: '', subLabel: '', value: 100 },
            { label: '@MIA', subLabel: '11/11', value: 150 },
            { label: '', subLabel: '', value: 300 },
            { label: '@MIA', subLabel: '11/8', value: 260 },
            { label: '', subLabel: '', value: 100 },
            { label: '@MIA', subLabel: '11/11', value: 150 },
            { label: '', subLabel: '', value: 500 }
        ]
    }
};
