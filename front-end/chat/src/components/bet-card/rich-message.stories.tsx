import type { Meta, StoryObj } from '@storybook/react';
import BetCard from '.';

const meta: Meta<typeof BetCard> = {
    title: 'Components/Phase I/Bet Card',
    component: BetCard
};

export default meta;
type Story = StoryObj<typeof BetCard>;

export const BetCardStory: Story = {
    args: {
        bets: [
            {
                date: 'Thu, Sep 26, 10:10 PM',
                event: 'New York Mets vs. Washington Nationals',
                line: '-1.5',
                id: '1',
                betMetric: 'Runs',
                betMetricValue: '1.5',
                positionImageUrl: 'https://via.placeholder.com/150',
                odds: '-160',
                betPlaceUrl: 'https://www.google.com',
                bookImage: 'https://via.placeholder.com/150'
            }
        ],
    }
};
