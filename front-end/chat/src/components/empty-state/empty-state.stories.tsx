import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './index';
import { Lock, Placeholder } from '@/icons';

const meta: Meta<typeof EmptyState> = {
    title: 'Components/Phase II/EmptyState',
    component: EmptyState
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    args: {
        title: 'Betslips are empty',
        text: 'To generate the betslips, please ask your question by using the Jaxon chat',
        Icon: Placeholder,
        buttonText: 'Ask Jaxon'
    }
};

export const CustomMessage: Story = {
    args: {
        title: 'Create a free account to unlock this whole game',
        Icon: Lock,
        buttonText: 'Login',
        extraButtonText: 'Create free account'
    }
};
