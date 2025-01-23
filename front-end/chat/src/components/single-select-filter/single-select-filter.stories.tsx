import type { Meta, StoryObj } from '@storybook/react';
import SingleSelectFilter from '.';
import { NFL, NHL, MLB, NBA } from '@/icons';

const meta: Meta<typeof SingleSelectFilter> = {
    title: 'Components/Phase II/SingleSelectFilter',
    component: SingleSelectFilter
};

export default meta;
type Story = StoryObj<typeof SingleSelectFilter>;

export const Default: Story = {
    args: {
        title: 'Select League',
        options: [
            {
                value: 'nfl',
                label: 'NFL'
            },
            {
                value: 'nba',
                label: 'NBA'
            },
            {
                value: 'mlb',
                label: 'MLB'
            },
            {
                value: 'nhl',
                label: 'NHL'
            }
        ]
    }
};

export const WithIcons: Story = {
    args: {
        title: 'Select League',
        options: [
            {
                value: 'nfl',
                label: (
                    <div className="flex items-center gap-[4px]">
                        <NFL /> NFL
                    </div>
                )
            },
            {
                value: 'nba',
                label: (
                    <div className="flex items-center gap-[4px]">
                        <NBA /> NBA
                    </div>
                )
            },
            {
                value: 'mlb',
                label: (
                    <div className="flex items-center gap-[4px]">
                        <MLB /> MLB
                    </div>
                )
            },
            {
                value: 'nhl',
                label: (
                    <div className="flex items-center gap-[4px]">
                        <NHL /> NHL
                    </div>
                )
            }
        ]
    }
};

export const WithPreselectedOption: Story = {
    args: {
        title: 'Select League',
        selectedOption: 'nba',
        options: [
            {
                value: 'nfl',
                label: 'NFL'
            },
            {
                value: 'nba',
                label: 'NBA'
            },
            {
                value: 'mlb',
                label: 'MLB'
            },
            {
                value: 'nhl',
                label: 'NHL'
            }
        ]
    }
};
