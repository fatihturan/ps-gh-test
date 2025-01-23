import type { Meta, StoryObj } from '@storybook/react';

import { Chat } from './index';
import { useState } from 'react';

const meta: Meta<typeof Chat> = {
    title: 'Screens/Chat',
    component: Chat
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const ChatStory: Story = {
    render: function ChatStory(args) {
        const [message, setMessage] = useState('');
        const onSend = () => {};
        return (
            <Chat
                {...args}
                message={message}
                setMessage={setMessage}
                onSend={onSend}
            />
        );
    },
    args: {}
};
