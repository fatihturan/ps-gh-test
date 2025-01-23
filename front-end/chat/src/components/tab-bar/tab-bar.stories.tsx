import type { Meta, StoryObj } from '@storybook/react';
import { MLB, NBA, NFL, NHL } from '@/icons';

import Tabbar from '.';

const meta: Meta<typeof Tabbar> = {
    title: 'Components/Phase II/Tabbar',
    component: Tabbar
};

export default meta;
type Story = StoryObj<typeof Tabbar>;

export const TabbarStory: Story = {
    args: {
        tabs: [
            {
                id: 'nfl',
                label: 'Nfl',
                icon: <NFL />,
                badgeLabel: '3',
                content: <div>Nfl</div>
            },
            { id: 'nba', label: 'Nba', icon: <NBA />, content: <div>Nba</div> },
            { id: 'mlb', label: 'Mlb', icon: <MLB />, content: <div>Mlb</div> },
            { id: 'nhl', label: 'Nhl', icon: <NHL />, content: <div>Nhl</div> }
        ]
    }
};
