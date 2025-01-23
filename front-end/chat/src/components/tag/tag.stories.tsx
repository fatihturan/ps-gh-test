import type { Meta, StoryObj } from '@storybook/react';
import Tag from './index';

const meta: Meta<typeof Tag> = {
    title: 'Components/Phase II/Tag',
    component: Tag
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const FilledDefault: Story = {
    args: {
        text: 'Under',
        theme: 'default',
        filled: true
    }
};
