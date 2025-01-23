import type { Meta, StoryObj } from '@storybook/react';

import ScrollArea from '.';

const meta: Meta<typeof ScrollArea> = {
    title: 'Components/Phase II/ScrollArea',
    component: ScrollArea
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const ScrollAreaStory: Story = {
    args: {
        className: 'border border-white-5',
        children: [
            <div className="text-white">Row 1</div>,
            <div className="text-white">Row 2</div>,
            <div className="text-white">Row 3</div>,
            <div className="text-white">Row 4</div>,
            <div className="text-white">Row 5</div>,
            <div className="text-white">Row 6</div>,
            <div className="text-white">Row 7</div>,
            <div className="text-white">Row 8</div>,
            <div className="text-white">Row 9</div>,
            <div className="text-white">Row 10</div>
        ]
    }
};
