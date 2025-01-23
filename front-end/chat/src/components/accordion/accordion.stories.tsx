import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '.';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Phase I/Accordion',
    component: Accordion
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const AccordionStory: Story = {
    args: {
        items: [
            {
                id: '1',
                title: 'YESTERDAY',
                count: 4,
                content: [
                    {
                        id: '1-1',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '1-2',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '1-3',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '1-4',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '1-5',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '1-6',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    }
                ]
            },
            {
                id: '2',
                title: 'TODAY',
                count: 4,
                content: [
                    {
                        id: '2-1',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '2-2',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '2-3',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '2-4',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    },
                    {
                        id: '2-5',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
                    }
                ]
            }
        ]
    }
};
