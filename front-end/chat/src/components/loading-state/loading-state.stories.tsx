import type { Meta, StoryObj } from '@storybook/react';
import LoadingState from './index';

const meta: Meta<typeof LoadingState> = {
    title: 'Components/Phase II/LoadingState',
    component: LoadingState
};

export default meta;

type Story = StoryObj<typeof LoadingState>;

export const Default: Story = {
    args: {
        title: 'Betslips are loading',
        text: 'Please wait a moment as our system finalizes the details for you.'
    }
};
