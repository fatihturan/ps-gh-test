import type { Meta, StoryObj } from '@storybook/react';

import SampleQuestions from '.';

const meta: Meta<typeof SampleQuestions> = {
    title: 'Components/Phase II/Sample Questions',
    component: SampleQuestions
};

export default meta;
type Story = StoryObj<typeof SampleQuestions>;

const sampleQuestions = [
    {
        category: '📊 Trending',
        questions: [
            'What is the best bet for the NBA Finals?',
            'What is the best team to bet on?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?'
        ]
    },
    {
        category: '⚽️ Best Bets',
        questions: [
            'What is the best bet for the NBA Finals?',
            'What is the best team to bet on?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?'
        ]
    },
    {
        category: '🎰 Parlays',
        questions: [
            'What is the best bet for the NBA Finals?',
            'What is the best team to bet on?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?'
        ]
    },
    {
        category: '🔔 Alerts',
        questions: [
            'What is the best bet for the NBA Finals?',
            'What is the best team to bet on?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?'
        ]
    },
    {
        category: '🎯 Chargers vs Ravens',
        questions: [
            'What is the best bet for the NBA Finals?',
            'What is the best team to bet on?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?',
            'What is the best bet for the NBA Finals?'
        ]
    }
];

export const SampleQuestionsStory: Story = {
    args: {
        sampleQuestions: sampleQuestions
    }
};
