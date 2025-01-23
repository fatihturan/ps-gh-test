import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from '.';

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Phase II/Tooltip',
    component: Tooltip
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        title: 'Last 20',
        Icon: (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                {...props}
            >
                <g
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    clipPath="url(#a)"
                    opacity={0.5}
                >
                    <path d="m8 8 8 8M16 8l-8 8" />
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" d="M0 0h24v24H0z" />
                    </clipPath>
                </defs>
            </svg>
        ),
        averageStats: '53.33 points, assists & rebounds',
        overGames: '12 games',
        underGames: '4 games'
    }
};
