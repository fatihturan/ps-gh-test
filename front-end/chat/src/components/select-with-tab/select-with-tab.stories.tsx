import type { Meta, StoryObj } from '@storybook/react';

import SelectWithTab from '.';
import { MLB, NBA, NFL, NHL } from '@/icons';
import { useState } from 'react';

const meta: Meta<typeof SelectWithTab> = {
    title: 'Components/Phase II/SelectWithTab',
    component: SelectWithTab
};

export default meta;
type Story = StoryObj<typeof SelectWithTab>;

export const SelectWithTabStory: Story = {
    render: function Component(args) {
        const [selectedOption, setSelectedOption] = useState('player-props');
        return (
            <SelectWithTab
                {...args}
                selectedOption={selectedOption}
                onApply={setSelectedOption}
            />
        );
    },
    args: {
        title: 'Select Sheet',
        contentTitle: 'Sheet',
        selectedOption: 'player-props',
        tabs: [
            {
                id: 'nfl',
                label: 'Nfl',
                icon: <NFL />,
                options: [
                    {
                        value: 'player-props',
                        label: 'Player Props'
                    },
                    {
                        value: 'anytime-td-scorer-sheet',
                        label: 'Anytime TD Scorer Sheet'
                    },
                    {
                        value: 'single-game-consistency-sheet',
                        label: 'Single Game Consistency Sheet'
                    },
                    {
                        value: 'all-games-consistency-sheet',
                        label: 'All Games Consistency Sheet'
                    },
                    {
                        value: '100-sheet',
                        label: '100% Sheet'
                    },
                    {
                        value: 'prize-picks-sheet',
                        label: 'PrizePicks Sheet'
                    },
                    {
                        value: 'underdog-sheet',
                        label: 'Underdog Sheet'
                    }
                ]
            },
            {
                id: 'nba',
                label: 'Nba',
                icon: <NBA />,
                options: [
                    {
                        value: 'player-props',
                        label: 'Player Props'
                    },
                    {
                        value: 'anytime-td-scorer-sheet',
                        label: 'Anytime TD Scorer Sheet'
                    },
                    {
                        value: 'single-game-consistency-sheet',
                        label: 'Single Game Consistency Sheet'
                    },
                    {
                        value: 'all-games-consistency-sheet',
                        label: 'All Games Consistency Sheet'
                    },
                    {
                        value: '100-sheet',
                        label: '100% Sheet'
                    },
                    {
                        value: 'prize-picks-sheet',
                        label: 'PrizePicks Sheet'
                    },
                    {
                        value: 'underdog-sheet',
                        label: 'Underdog Sheet'
                    }
                ]
            },
            {
                id: 'mlb',
                label: 'Mlb',
                icon: <MLB />,
                options: [
                    {
                        value: 'player-props',
                        label: 'Player Props'
                    },
                    {
                        value: 'anytime-td-scorer-sheet',
                        label: 'Anytime TD Scorer Sheet'
                    },
                    {
                        value: 'single-game-consistency-sheet',
                        label: 'Single Game Consistency Sheet'
                    },
                    {
                        value: 'all-games-consistency-sheet',
                        label: 'All Games Consistency Sheet'
                    },
                    {
                        value: '100-sheet',
                        label: '100% Sheet'
                    },
                    {
                        value: 'prize-picks-sheet',
                        label: 'PrizePicks Sheet'
                    },
                    {
                        value: 'underdog-sheet',
                        label: 'Underdog Sheet'
                    }
                ]
            },
            {
                id: 'nhl',
                label: 'Nhl',
                icon: <NHL />,
                options: [
                    {
                        value: 'player-props',
                        label: 'Player Props'
                    },
                    {
                        value: 'anytime-td-scorer-sheet',
                        label: 'Anytime TD Scorer Sheet'
                    },
                    {
                        value: 'single-game-consistency-sheet',
                        label: 'Single Game Consistency Sheet'
                    },
                    {
                        value: 'all-games-consistency-sheet',
                        label: 'All Games Consistency Sheet'
                    },
                    {
                        value: '100-sheet',
                        label: '100% Sheet'
                    },
                    {
                        value: 'prize-picks-sheet',
                        label: 'PrizePicks Sheet'
                    },
                    {
                        value: 'underdog-sheet',
                        label: 'Underdog Sheet'
                    }
                ]
            }
        ]
    }
};
