import type { Meta, StoryObj } from '@storybook/react';

import BestOddsSelector from '.';

const meta: Meta<typeof BestOddsSelector> = {
    title: 'Components/Phase II/BestOddsSelector',
    component: BestOddsSelector
};

export default meta;
type Story = StoryObj<typeof BestOddsSelector>;

export const BestOddsSelectorStory: Story = {
    args: {
        line: 'O 4.5',
        odds: '-130',
        actionButton: true,
        selected: true,
        highValue: true
    }
};
