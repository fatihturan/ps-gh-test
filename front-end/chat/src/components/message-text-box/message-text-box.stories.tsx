import type { Meta, StoryObj } from '@storybook/react';

import MessageTextBox from '.';

const meta: Meta<typeof MessageTextBox> = {
    title: 'Components/Phase I/Message Text Box',
    component: MessageTextBox
};

export default meta;
type Story = StoryObj<typeof MessageTextBox>;

export const TextBox: Story = {
    args: {}
};
