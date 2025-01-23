import type { Meta, StoryObj } from '@storybook/react';

import EventCard from '.';
import { market } from '@/state/data';

const meta: Meta<typeof EventCard> = {
    title: 'Components/Phase II/EventCard',
    component: EventCard
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const EventCardStory: Story = {
    args: {
        eventItem: {}
    }
};
