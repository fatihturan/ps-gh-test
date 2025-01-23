import { Betslips } from './index';
import { Meta, StoryObj } from '@storybook/react';

export default {
    title: 'Components/Phase II/Betslips',
    component: Betslips
} as Meta<typeof Betslips>;

type Story = StoryObj<typeof Betslips>;

export const Default: Story = {
    args: {
        items: [
            {
                bets: [
                    {
                        line: '6.5',
                        odds: '-145',
                        bookImage:
                            'https://www.sportsvideo.org/wp-content/uploads/2023/10/ESPN-BET-Logo-Secondary-768x768-1.jpg',
                        date: '2025-01-20T20:30:00Z',
                        event: 'Phoenix Suns @ Cleveland Cavaliers',
                        id: 'bs',
                        betMetric: 'Implied Probability',
                        betMetricValue: '59.18%',
                        positionImageUrl:
                            'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/PLYR_17487e20319d4f3c844ebd9295837b29.png',
                        betPlaceUrl:
                            'https://ui.sharpsports.io/place/MRKT_a118df221e82429d9886e2a4683071ca/BOOK_c81242f993894e67966b3ccfc4ba3a65?line=6.5'
                    },
                    {
                        line: '6.5',
                        odds: '-148',
                        bookImage:
                            'https://milehighsports.com/wp-content/uploads/2021/02/Caesars-300-x-300.png',
                        date: '2025-01-20T20:30:00Z',
                        event: 'Phoenix Suns @ Cleveland Cavaliers',
                        id: 'ca',
                        betMetric: 'Implied Probability',
                        betMetricValue: '59.68%',
                        positionImageUrl:
                            'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/PLYR_17487e20319d4f3c844ebd9295837b29.png',
                        betPlaceUrl:
                            'https://ui.sharpsports.io/place/MRKT_a118df221e82429d9886e2a4683071ca/BOOK_IPBQaQQTCRxplZx7SYOA?line=6.5'
                    },
                    {
                        line: '6.5',
                        odds: '-150',
                        bookImage:
                            'https://gamblespot-images.s3.amazonaws.com/betmgm-sports_sq.png',
                        date: '2025-01-20T20:30:00Z',
                        event: 'Phoenix Suns @ Cleveland Cavaliers',
                        id: 'mg',
                        betMetric: 'Implied Probability',
                        betMetricValue: '60.00%',
                        positionImageUrl:
                            'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/PLYR_17487e20319d4f3c844ebd9295837b29.png',
                        betPlaceUrl:
                            'https://ui.sharpsports.io/place/MRKT_a118df221e82429d9886e2a4683071ca/BOOK_pPg9ABaPSj2mL6qoMTKR1A?line=6.5'
                    },
                    {
                        line: '6.5',
                        odds: '-150',
                        bookImage:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpDcHBn0QjpOHrHXo3b8GwKsVy89Q-vZiMg&s',
                        date: '2025-01-20T20:30:00Z',
                        event: 'Phoenix Suns @ Cleveland Cavaliers',
                        id: 'fd',
                        betMetric: 'Implied Probability',
                        betMetricValue: '60.00%',
                        positionImageUrl:
                            'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/PLYR_17487e20319d4f3c844ebd9295837b29.png',
                        betPlaceUrl:
                            'https://ui.sharpsports.io/place/MRKT_a118df221e82429d9886e2a4683071ca/BOOK_Rf7xRhS7TKQUl94Xkt5w?line=6.5'
                    },
                    {
                        line: '6.5',
                        odds: '-155',
                        bookImage:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBWeocVibP40CmAZOeVpyqT70RFaXwqQ2og&s',
                        date: '2025-01-20T20:30:00Z',
                        event: 'Phoenix Suns @ Cleveland Cavaliers',
                        id: 'dk',
                        betMetric: 'Implied Probability',
                        betMetricValue: '60.78%',
                        positionImageUrl:
                            'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/PLYR_17487e20319d4f3c844ebd9295837b29.png',
                        betPlaceUrl:
                            'https://ui.sharpsports.io/place/MRKT_a118df221e82429d9886e2a4683071ca/BOOK_nhLZ9l5DRs6w6KcE2n7vnw?line=6.5'
                    },
                    {
                        line: '6.5',
                        odds: '-157',
                        bookImage:
                            'https://sportsbooksonline-com.imgix.net/assets/local/Company/BetRivers-Square-Logo-2024.jpg',
                        date: '2025-01-20T20:30:00Z',
                        event: 'Phoenix Suns @ Cleveland Cavaliers',
                        id: 'br',
                        betMetric: 'Implied Probability',
                        betMetricValue: '61.09%',
                        positionImageUrl:
                            'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/PLYR_17487e20319d4f3c844ebd9295837b29.png',
                        betPlaceUrl:
                            'https://ui.sharpsports.io/place/MRKT_a118df221e82429d9886e2a4683071ca/BOOK_88064cc6787c47ccbd4bbb036c7f55c5?line=6.5'
                    }
                ],
                id: 'MRKT_a118df221e82429d9886e2a4683071ca',
                title: 'Darius Garland Over 6.5 Assists',
                count: 6
            }
        ]
    }
};
