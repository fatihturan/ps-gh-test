import type { Meta, StoryObj } from '@storybook/react';
import Graph from '.';

const meta: Meta<typeof Graph> = {
    title: 'Components/Phase II/Graph',
    component: Graph
};

export default meta;
type Story = StoryObj<typeof Graph>;

export const Default: Story = {
    args: {
        data: [
            {
                dataLabel: '8/11 \n @WS',
                dataLabelTop: '8/11 \n @WS',
                value: 280
            },
            {
                dataLabel: '8/17 \n @WS',
                dataLabelTop: '8/17 \n @WS',
                value: 320
            },
            {
                dataLabel: '8/22 \n @WS',
                dataLabelTop: '8/22 \n @WS',
                value: 400
            },
            {
                dataLabel: '8/27 \n @WS',
                dataLabelTop: '8/27 \n @WS',
                value: 20
            },
            { dataLabel: '9/1 \n @WS', dataLabelTop: '9/1 \n @WS', value: 350 }
        ]
    }
};
