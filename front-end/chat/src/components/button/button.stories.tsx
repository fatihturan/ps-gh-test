import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';
import SendMessage from '@/icons/send-message';

const meta: Meta<typeof Button> = {
    title: 'Components/Phase I/Button',
    component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Button',
        disabled: false,
        loading: false
    }
};

export const Secondary: Story = {
    args: {
        children: 'Button',
        disabled: false,
        loading: false,
        variant: 'secondary'
    }
};
export const Tertiary: Story = {
    args: {
        children: 'Button',
        disabled: false,
        loading: false,
        variant: 'tertiary'
    }
};

export const Sentence: Story = {
    args: {
        children: 'Start new chat',
        disabled: false,
        loading: false,
        sentence: true
    }
};

export const Icon: Story = {
    args: {
        children: <SendMessage className="size-[16px]" color="#10111E" />,
        disabled: false,
        loading: false,
        variant: 'icon'
    }
};

export const IconSecondary: Story = {
    args: {
        children: <SendMessage className="size-[16px]" />,
        disabled: false,
        loading: false,
        variant: 'iconSecondary'
    }
};
