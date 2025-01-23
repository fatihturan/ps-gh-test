import type { Meta, StoryObj } from '@storybook/react';

import Suggestions from '.';

const meta: Meta<typeof Suggestions> = {
    title: 'Components/Phase I/Suggestions',
    component: Suggestions
};

export default meta;
type Story = StoryObj<typeof Suggestions>;

export const SuggestionsStory: Story = {
    args: {
        suggestions: [
            'Gorem ipsum dolor sit amet, consectetur?',
            'Torem ipsum dolor sit amet adipiscing elit?',
            'Nunc vulputate libero et velit interdum?',
            'Class aptent taciti sociosqu?'
        ],
        onSelect: (suggestion: string) => {
            console.log(suggestion);
        }
    }
};
