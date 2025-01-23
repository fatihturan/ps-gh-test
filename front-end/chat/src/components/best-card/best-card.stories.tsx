import type { Meta, StoryObj } from '@storybook/react';

import BestCard from '.';

const meta: Meta<typeof BestCard> = {
    title: 'Components/Phase II/BestCard',
    component: BestCard
};

export default meta;
type Story = StoryObj<typeof BestCard>;

export const BestCardStory: Story = {
    args: {
        bets: [
            {
                id: '1',
                imageUrl: '/images/walker-logo-thumb.png',
                betMetric: 'Implied Probability',
                betMetricValue: '62.26%',
                line: 'O 4.5',
                odds: '-130',
                actionButton: true,
                selected: true
            },

            {
                id: '2',
                imageUrl: '/images/walker-logo-thumb.png',
                betMetric: 'Implied Probability',
                betMetricValue: '62.26%',
                line: 'O 4.5',
                odds: '-130'
            }
        ]
    }
};
