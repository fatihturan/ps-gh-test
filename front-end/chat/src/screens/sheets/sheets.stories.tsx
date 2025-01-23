import type { Meta, StoryObj } from '@storybook/react';

import { Sheets } from '.';
import { sheetItems, messages } from '../../state/data';

const meta: Meta<typeof Sheets> = {
    title: 'Screens/Sheets',
    component: Sheets
};

export default meta;
type Story = StoryObj<typeof Sheets>;

export const SheetsStory: Story = {
    args: {
        items: sheetItems,
        messages
    }
};
