import type { Meta, StoryObj } from '@storybook/react';

import FeedbackForm from '.';

const meta: Meta<typeof FeedbackForm> = {
    title: 'Components/Phase I/FeedbackForm',
    component: FeedbackForm
};

export default meta;
type Story = StoryObj<typeof FeedbackForm>;

export const FeedbackFormStory: Story = {};
