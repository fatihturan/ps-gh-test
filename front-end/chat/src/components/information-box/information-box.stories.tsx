import type { Meta, StoryObj } from '@storybook/react';

import InformationBox from '.';

const meta: Meta<typeof InformationBox> = {
    title: 'Components/Phase I/Information Box',
    component: InformationBox
};

export default meta;
type Story = StoryObj<typeof InformationBox>;

export const InformationBoxStory: Story = {
    args: {
        markdown: `
# Hello World

result | team A | team B
--- | --- | ---
win | 1 | 0
draw | 1 | 1
lose | 0 | 1
`
    }
};
