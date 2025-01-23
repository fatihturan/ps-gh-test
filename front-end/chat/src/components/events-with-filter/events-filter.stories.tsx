import type { Meta, StoryObj } from '@storybook/react';
import EventsWithFilter from './index';
import { useChatContext } from '@/state';

const meta: Meta<typeof EventsWithFilter> = {
    title: 'Components/Phase II/Events With Filter',
    component: EventsWithFilter,
    parameters: {
        layout: 'centered'
    }
};

export default meta;

type Story = StoryObj<typeof EventsWithFilter>;

export const Default: Story = {
    render: function DefaultStory() {
        const { events } = useChatContext();
        return (
            <div className="max-w-[1000px]">
                <EventsWithFilter events={events} />
            </div>
        );
    },
    args: {}
};
