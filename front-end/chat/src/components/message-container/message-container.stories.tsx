import type { Meta, StoryObj } from '@storybook/react';

import MessageContainer from '.';

const meta: Meta<typeof MessageContainer> = {
    title: 'Components/Phase I/Message Container',
    component: MessageContainer
};

export default meta;
type Story = StoryObj<typeof MessageContainer>;

export const Container: Story = {
    args: {
        messages: [
            {
                id: '1',
                chatId: '1',
                sender: 'you',
                text: `
Who should I bet on tonight: the New Orleans Saints or. the Kansas
City Chiefs?
                `
            }
        ]
    }
};
