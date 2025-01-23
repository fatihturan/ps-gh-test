import type { Meta, StoryObj } from '@storybook/react';
import { ChatWithMessages } from '.';

const meta: Meta<typeof ChatWithMessages> = {
    title: 'Screens/ChatWithMessages',
    component: ChatWithMessages
};

export default meta;
type Story = StoryObj<typeof ChatWithMessages>;

export const ChatWithMessagesStory: Story = {};
