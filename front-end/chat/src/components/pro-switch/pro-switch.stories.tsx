import type { Meta, StoryObj } from '@storybook/react';

import ProSwitch from '.';

const meta: Meta<typeof ProSwitch> = {
    title: 'Components/Phase I/Pro Switch',
    component: ProSwitch
};

export default meta;
type Story = StoryObj<typeof ProSwitch>;

export const ProSwitchStory: Story = {
    args: {}
};
