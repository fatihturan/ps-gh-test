import type { Meta, StoryObj } from '@storybook/react';

import Message from '.';

const meta: Meta<typeof Message> = {
    title: 'Components/Phase I/Message',
    component: Message
};

export default meta;
type Story = StoryObj<typeof Message>;

export const MessageStory: Story = {
    args: {
        message: {
            id: '1',
            chatId: '1',
            sender: 'assistant',
            text: '# Hello, how are you? <a href="https://www.google.com">1</a>'
        }
    }
};
