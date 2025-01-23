import type { Meta, StoryObj } from '@storybook/react';

import CustomAccordion from '.';

const meta: Meta<typeof CustomAccordion> = {
    title: 'Components/Phase II/CustomAccordion',
    component: CustomAccordion
};

export default meta;
type Story = StoryObj<typeof CustomAccordion>;

const sampleItems = [
    {
        id: '1',
        title: 'Predictions',
        actionButton: true,
        children: (
            <div>
                <h4 className="mb-[20px] text-white">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </h4>
                <p className="text-white-70">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
        )
    },
    {
        id: '2',
        title: 'Best Odds',
        children: (
            <div>
                <h4 className="mb-[20px] text-white">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </h4>
                <p className="text-white-70">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
        )
    }
];

export const Default: Story = {
    args: {
        type: 'single',
        items: sampleItems
    }
};

export const WithOpenedOnTop: Story = {
    args: {
        type: 'single',
        items: sampleItems,
        showOpenedOnTop: true
    }
};

export const Multiple: Story = {
    args: {
        type: 'multiple',
        items: sampleItems,
        showOpenedOnTop: true
    }
};
