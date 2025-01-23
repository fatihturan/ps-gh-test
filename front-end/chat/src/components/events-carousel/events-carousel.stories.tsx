import type { Meta, StoryObj } from '@storybook/react';

import EventsCarousel from '.';

const meta: Meta<typeof EventsCarousel> = {
    title: 'Components/Phase II/EventsCarousel',
    component: EventsCarousel
};

export default meta;
type Story = StoryObj<typeof EventsCarousel>;

export const EventsCarouselStory: Story = {
    args: {
        events: [
            {
                startTime: '2025-01-18T21:30:00Z',
                name: 'Houston Texans @ Kansas City Chiefs',
                id: 'EVNT_feea39e6a37c4feba354055793be0a02',
                contestantHome: {
                    id: 'TEAM_8bfd1dfe1a09451195d19c792ea18567',
                    fullName: 'Kansas City Chiefs'
                },
                contestantHomeAbbr: 'KC',
                contestantHomeLogo:
                    'https://upload.wikimedia.org/wikipedia/en/e/e1/Kansas_City_Chiefs_logo.svg',
                contestantAway: {
                    id: 'TEAM_11f9b965677b45689a19973e5ae2ddf4',
                    fullName: 'Houston Texans'
                },
                contestantAwayAbbr: 'HOU',
                contestantAwayLogo:
                    'https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Texans_logo.svg',
                homeMoneyline: [
                    'dk',
                    { line: 0.0, odds: -440, main: true, live: false }
                ],
                awayMoneyline: [
                    'mg',
                    { line: 0.0, odds: 375, main: true, live: false }
                ],
                homeSpread: [
                    'pn',
                    { line: -8.0, odds: -107, main: true, live: false }
                ],
                awaySpread: [
                    'dk',
                    { line: 8.5, odds: -115, main: true, live: false }
                ],
                totalOver: [
                    'dk',
                    { line: 41.5, odds: -112, main: true, live: false }
                ],
                totalUnder: [
                    'mg',
                    { line: 42.0, odds: -110, main: true, live: false }
                ]
            },
            {
                startTime: '2025-01-18T21:30:00Z',
                name: 'Houston Texans @ Kansas City Chiefs',
                id: 'EVNT_feea39e6a37c4feba354055793be0a02',
                contestantHome: {
                    id: 'TEAM_8bfd1dfe1a09451195d19c792ea18567',
                    fullName: 'Kansas City Chiefs'
                },
                contestantHomeAbbr: 'KC',
                contestantHomeLogo:
                    'https://upload.wikimedia.org/wikipedia/en/e/e1/Kansas_City_Chiefs_logo.svg',
                contestantAway: {
                    id: 'TEAM_11f9b965677b45689a19973e5ae2ddf4',
                    fullName: 'Houston Texans'
                },
                contestantAwayAbbr: 'HOU',
                contestantAwayLogo:
                    'https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Texans_logo.svg',
                homeMoneyline: [
                    'dk',
                    { line: 0.0, odds: -440, main: true, live: false }
                ],
                awayMoneyline: [
                    'mg',
                    { line: 0.0, odds: 375, main: true, live: false }
                ],
                homeSpread: [
                    'pn',
                    { line: -8.0, odds: -107, main: true, live: false }
                ],
                awaySpread: [
                    'dk',
                    { line: 8.5, odds: -115, main: true, live: false }
                ],
                totalOver: [
                    'dk',
                    { line: 41.5, odds: -112, main: true, live: false }
                ],
                totalUnder: [
                    'mg',
                    { line: 42.0, odds: -110, main: true, live: false }
                ]
            },
            {
                startTime: '2025-01-18T21:30:00Z',
                name: 'Houston Texans @ Kansas City Chiefs',
                id: 'EVNT_feea39e6a37c4feba354055793be0a02',
                contestantHome: {
                    id: 'TEAM_8bfd1dfe1a09451195d19c792ea18567',
                    fullName: 'Kansas City Chiefs'
                },
                contestantHomeAbbr: 'KC',
                contestantHomeLogo:
                    'https://upload.wikimedia.org/wikipedia/en/e/e1/Kansas_City_Chiefs_logo.svg',
                contestantAway: {
                    id: 'TEAM_11f9b965677b45689a19973e5ae2ddf4',
                    fullName: 'Houston Texans'
                },
                contestantAwayAbbr: 'HOU',
                contestantAwayLogo:
                    'https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Texans_logo.svg',
                homeMoneyline: [
                    'dk',
                    { line: 0.0, odds: -440, main: true, live: false }
                ],
                awayMoneyline: [
                    'mg',
                    { line: 0.0, odds: 375, main: true, live: false }
                ],
                homeSpread: [
                    'pn',
                    { line: -8.0, odds: -107, main: true, live: false }
                ],
                awaySpread: [
                    'dk',
                    { line: 8.5, odds: -115, main: true, live: false }
                ],
                totalOver: [
                    'dk',
                    { line: 41.5, odds: -112, main: true, live: false }
                ],
                totalUnder: [
                    'mg',
                    { line: 42.0, odds: -110, main: true, live: false }
                ]
            }
        ]
    }
};
