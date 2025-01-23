import type { Meta, StoryObj } from '@storybook/react';

import MultipleSelectFilter from '.';

const meta: Meta<typeof MultipleSelectFilter> = {
    title: 'Components/Phase II/MultipleSelectFilter',
    component: MultipleSelectFilter
};

export default meta;
type Story = StoryObj<typeof MultipleSelectFilter>;

export const MultipleSelectFilterStory: Story = {
    args: {
        title: 'Players',
        options: [
            {
                value: 'player 1',
                label: 'Player 1'
            },
            {
                value: 'player 2',
                label: 'Player 2'
            },
            {
                value: 'player 3',
                label: 'Player 3'
            },
            {
                value: 'player 4',
                label: 'Player 4'
            },
            {
                value: 'player 5',
                label: 'Player 5'
            },
            {
                value: 'player 6',
                label: 'Player 6'
            }
        ]
    }
};
